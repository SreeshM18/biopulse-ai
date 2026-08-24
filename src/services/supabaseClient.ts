import { createClient, SupabaseClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  SUPABASE_URL: 'biopulse_supabase_url',
  SUPABASE_ANON_KEY: 'biopulse_supabase_anon_key',
  REALTIME_ENABLED: 'biopulse_supabase_realtime_enabled'
};

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  source: 'env' | 'localStorage' | 'none';
}

export interface SupabaseConnectionStatus {
  connected: boolean;
  message: string;
  latencyMs?: number;
  tablesDetected?: string[];
  error?: string;
  checkedAt: string;
}

class SupabaseManager {
  private client: SupabaseClient | null = null;
  private currentUrl: string = '';
  private currentKey: string = '';

  constructor() {
    this.initClient();
  }

  public getConfig(): SupabaseConfig {
    const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
    const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

    let localUrl = '';
    let localKey = '';

    if (typeof window !== 'undefined') {
      localUrl = (localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) || '').trim();
      localKey = (localStorage.getItem(STORAGE_KEYS.SUPABASE_ANON_KEY) || '').trim();
    }

    if (localUrl && localKey) {
      return {
        url: localUrl,
        anonKey: localKey,
        isConfigured: true,
        source: 'localStorage'
      };
    }

    if (envUrl && envKey && !envUrl.includes('your-project-id')) {
      return {
        url: envUrl,
        anonKey: envKey,
        isConfigured: true,
        source: 'env'
      };
    }

    return {
      url: localUrl || envUrl || '',
      anonKey: localKey || envKey || '',
      isConfigured: false,
      source: 'none'
    };
  }

  public initClient(): SupabaseClient | null {
    const config = this.getConfig();
    if (!config.url || !config.anonKey) {
      this.client = null;
      this.currentUrl = '';
      this.currentKey = '';
      return null;
    }

    // Reuse client if credentials haven't changed
    if (this.client && this.currentUrl === config.url && this.currentKey === config.anonKey) {
      return this.client;
    }

    try {
      this.currentUrl = config.url;
      this.currentKey = config.anonKey;
      this.client = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      return this.client;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      this.client = null;
      return null;
    }
  }

  public getClient(): SupabaseClient | null {
    if (!this.client) {
      return this.initClient();
    }
    return this.client;
  }

  public isConfigured(): boolean {
    return this.getConfig().isConfigured;
  }

  public setCredentials(url: string, anonKey: string): { success: boolean; message: string } {
    try {
      const cleanUrl = url.trim();
      const cleanKey = anonKey.trim();

      if (!cleanUrl.startsWith('https://') || !cleanUrl.includes('.supabase.co')) {
        return { 
          success: false, 
          message: 'Invalid Supabase URL. Must be in the format: https://<project-ref>.supabase.co' 
        };
      }

      if (cleanKey.length < 20) {
        return { 
          success: false, 
          message: 'Invalid Anon Public Key. Please paste the full public anon key from Supabase Dashboard.' 
        };
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, cleanUrl);
        localStorage.setItem(STORAGE_KEYS.SUPABASE_ANON_KEY, cleanKey);
      }

      this.initClient();
      return { success: true, message: 'Supabase credentials saved successfully!' };
    } catch (err: any) {
      return { success: false, message: `Failed to save credentials: ${err.message}` };
    }
  }

  public clearCredentials(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);
      localStorage.removeItem(STORAGE_KEYS.SUPABASE_ANON_KEY);
    }
    this.client = null;
    this.currentUrl = '';
    this.currentKey = '';
  }

  public isRealtimeEnabled(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(STORAGE_KEYS.REALTIME_ENABLED) !== 'false';
  }

  public setRealtimeEnabled(enabled: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REALTIME_ENABLED, enabled ? 'true' : 'false');
    }
  }

  public async testConnection(): Promise<SupabaseConnectionStatus> {
    const config = this.getConfig();
    if (!config.url || !config.anonKey) {
      return {
        connected: false,
        message: 'No Supabase credentials configured. Please enter your Supabase URL and Anon Key.',
        checkedAt: new Date().toISOString()
      };
    }

    const client = this.getClient();
    if (!client) {
      return {
        connected: false,
        message: 'Could not create Supabase client. Check URL and Key format.',
        checkedAt: new Date().toISOString()
      };
    }

    const start = performance.now();
    const tablesDetected: string[] = [];

    try {
      // 1. Try querying patients table
      const { data: patientData, error: patientError } = await client
        .from('patients')
        .select('id')
        .limit(1);

      const latencyMs = Math.round(performance.now() - start);

      if (!patientError) {
        tablesDetected.push('patients');
      }

      // 2. Check other tables in parallel
      const [usersRes, invRes, aptRes, logsRes] = await Promise.allSettled([
        client.from('users').select('id').limit(1),
        client.from('invoices').select('id').limit(1),
        client.from('appointments').select('id').limit(1),
        client.from('audit_logs').select('id').limit(1)
      ]);

      if (usersRes.status === 'fulfilled' && !usersRes.value.error) tablesDetected.push('users');
      if (invRes.status === 'fulfilled' && !invRes.value.error) tablesDetected.push('invoices');
      if (aptRes.status === 'fulfilled' && !aptRes.value.error) tablesDetected.push('appointments');
      if (logsRes.status === 'fulfilled' && !logsRes.value.error) tablesDetected.push('audit_logs');

      if (patientError && tablesDetected.length === 0) {
        // If error is table not found, connection is valid but migration hasn't been run
        if (patientError.message?.includes('does not exist') || patientError.code === '42P01') {
          return {
            connected: true,
            message: 'Connected to Supabase project! However, database tables have not been created yet. Please execute the SQL migration script.',
            latencyMs,
            tablesDetected: [],
            error: 'Missing schema: Run migration script in Supabase SQL Editor',
            checkedAt: new Date().toISOString()
          };
        }

        return {
          connected: false,
          message: `Connection failed: ${patientError.message}`,
          latencyMs,
          error: patientError.message,
          checkedAt: new Date().toISOString()
        };
      }

      return {
        connected: true,
        message: `Successfully connected to Supabase PostgreSQL! (${tablesDetected.length} tables active, ping: ${latencyMs}ms)`,
        latencyMs,
        tablesDetected,
        checkedAt: new Date().toISOString()
      };
    } catch (err: any) {
      const latencyMs = Math.round(performance.now() - start);
      return {
        connected: false,
        message: `Network or authorization error: ${err.message || 'Unknown error'}`,
        latencyMs,
        error: err.message,
        checkedAt: new Date().toISOString()
      };
    }
  }
}

export const supabaseManager = new SupabaseManager();
export const getSupabase = () => supabaseManager.getClient();
