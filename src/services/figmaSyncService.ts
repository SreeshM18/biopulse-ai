/**
 * BioPulse AI - Figma & Stitch Design System Sync Service
 * Handles Figma REST API authentication, design token extraction,
 * Stitch UI integration, and live style synchronization.
 */

export interface FigmaFileMetadata {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
}

export interface DesignTokens {
  colors: { [key: string]: string };
  typography: { [key: string]: string };
  spacing: { [key: string]: string };
  borderRadius: { [key: string]: string };
  shadows: { [key: string]: string };
}

export interface FigmaSyncConfig {
  apiKey: string;
  fileKey: string;
  nodeId?: string;
  stitchProjectUrl?: string;
  lastSynced?: string;
}

const STORAGE_KEY = 'biopulse_figma_config';

export const DEFAULT_DESIGN_TOKENS: DesignTokens = {
  colors: {
    'bg-primary': '#070a12',
    'bg-secondary': '#0c1220',
    'bg-tertiary': '#111a2e',
    'accent-cyan': '#0284c7',
    'accent-sky': '#38bdf8',
    'accent-emerald': '#10b981',
    'accent-rose': '#ef4444',
    'accent-amber': '#f59e0b',
    'border-base': '#1e2c44',
    'text-primary': '#f8fafc',
    'text-secondary': '#94a3b8'
  },
  typography: {
    'font-sans': 'Inter, system-ui, sans-serif',
    'font-mono': 'JetBrains Mono, Menlo, monospace',
    'heading-xl': '28px / 1.2',
    'heading-lg': '20px / 1.3',
    'body-base': '13px / 1.5',
    'caption': '11px / 1.4'
  },
  spacing: {
    'card-padding': '16px',
    'grid-gap': '12px',
    'header-height': '56px'
  },
  borderRadius: {
    'card': '12px',
    'badge': '9999px',
    'button': '8px'
  },
  shadows: {
    'card-elevation': '0 4px 12px rgba(0, 0, 0, 0.25)',
    'card-hover': '0 8px 20px rgba(0, 0, 0, 0.35)',
    'glow-cyan': '0 0 20px rgba(2, 132, 199, 0.25)'
  }
};

class FigmaSyncService {
  private config: FigmaSyncConfig;

  constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): FigmaSyncConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load Figma config from localStorage', e);
    }
    return {
      apiKey: '',
      fileKey: 'Vq9sKz49XpL1BioPulseHealth',
      stitchProjectUrl: 'https://stitch.withgoogle.com/projects/biopulse-ai'
    };
  }

  public saveConfig(config: Partial<FigmaSyncConfig>): void {
    this.config = { ...this.config, ...config, lastSynced: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.warn('Failed to save Figma config to localStorage', e);
    }
  }

  public getConfig(): FigmaSyncConfig {
    return { ...this.config };
  }

  public isConfigured(): boolean {
    return Boolean(this.config.apiKey && this.config.fileKey);
  }

  /**
   * Test Connection with Figma REST API
   */
  public async testFigmaConnection(apiKey: string, fileKey: string): Promise<{ success: boolean; data?: FigmaFileMetadata; error?: string }> {
    if (!apiKey || !fileKey) {
      return { success: false, error: 'Figma Personal Access Token and File Key are required.' };
    }

    try {
      const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
        headers: {
          'X-Figma-Token': apiKey
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { 
          success: false, 
          error: response.status === 403 
            ? 'Invalid Figma Access Token or insufficient permissions.' 
            : response.status === 404 
            ? 'Figma File Key not found.' 
            : `Figma API Error (${response.status}): ${errorText}`
        };
      }

      const json = await response.json();
      return {
        success: true,
        data: {
          name: json.name || 'BioPulse Design System',
          lastModified: json.lastModified || new Date().toISOString(),
          thumbnailUrl: json.thumbnailUrl || '',
          version: json.version || '1.0',
          role: json.role || 'viewer'
        }
      };
    } catch (e: any) {
      // In browser contexts with CORS or demo mode, provide graceful diagnostic
      return {
        success: false,
        error: e.message || 'Network error connecting to Figma API. Ensure CORS or proxy settings allow requests to api.figma.com.'
      };
    }
  }

  /**
   * Apply Design Tokens to Live CSS Root Variables
   */
  public applyTokensToDOM(tokens: DesignTokens): void {
    const root = document.documentElement;

    // Apply Colors
    Object.entries(tokens.colors).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });

    // Apply Border Radii
    if (tokens.borderRadius.card) {
      root.style.setProperty('--radius-card', tokens.borderRadius.card);
    }
  }

  /**
   * Generate Figma Live Embed URL
   */
  public getEmbedUrl(fileKey?: string, nodeId?: string): string {
    const key = fileKey || this.config.fileKey || 'Vq9sKz49XpL1BioPulseHealth';
    const nodeParam = nodeId ? `&node-id=${encodeURIComponent(nodeId)}` : '';
    return `https://www.figma.com/embed?embed_host=biopulse&url=https://www.figma.com/file/${key}/BioPulse-Clinical-EHR-Design-System?${nodeParam}`;
  }
}

export const figmaSync = new FigmaSyncService();
