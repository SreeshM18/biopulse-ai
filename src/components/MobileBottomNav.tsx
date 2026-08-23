import { 
  Activity, 
  Heart, 
  Brain, 
  Flame, 
  QrCode, 
  Settings as SettingsIcon,
  Menu,
  Pill,
  Sparkles,
  User
} from 'lucide-react';
import { TabType } from '../types/biotech';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSettings: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command', icon: <Activity className="w-4 h-4" /> },
    { id: 'nova_careguide', label: 'CareGuide', icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
    { id: 'nova_pharma', label: 'Pharma', icon: <Pill className="w-4 h-4 text-pink-400" /> },
    { id: 'patient_monitor', label: 'Vitals', icon: <Heart className="w-4 h-4 text-rose-400" /> },
    { id: 'nova_rescue', label: 'SOS', icon: <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> },
    { id: 'user_profile', label: 'Profile', icon: <User className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060913]/95 backdrop-blur-xl border-t border-slate-800/90 py-2 px-3 safe-area-pb shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-xl transition-all ${
                isActive 
                  ? 'text-cyan-400 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/20 shadow-glow-cyan' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-mono mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center p-1 text-slate-400 hover:text-slate-200"
        >
          <div className="p-1 rounded-lg">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] font-mono mt-0.5 tracking-tight font-medium">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};
