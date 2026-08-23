import { 
  Activity, 
  Heart, 
  Pill,
  Sparkles,
  User
} from 'lucide-react';
import { TabType } from '../types/biotech';

interface MobileBottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSettings?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'command_center', label: 'Command', icon: <Activity className="w-5 h-5" /> },
    { id: 'nova_careguide', label: 'CareGuide', icon: <Sparkles className="w-5 h-5 text-emerald-400" /> },
    { id: 'nova_pharma', label: 'Pharma', icon: <Pill className="w-5 h-5 text-pink-400" /> },
    { id: 'patient_monitor', label: 'Vitals', icon: <Heart className="w-5 h-5 text-rose-400" /> },
    { id: 'user_profile', label: 'Profiles', icon: <User className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#060913]/95 backdrop-blur-2xl border-t border-slate-800/90 py-1.5 px-2 safe-area-pb shadow-2xl">
      <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-2xl transition-all ${
                isActive 
                  ? 'text-cyan-400 font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-cyan-500/20 shadow-glow-cyan' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-mono mt-0.5 tracking-tight font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
