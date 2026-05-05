import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { siteConfig } from '../config';
import { 
  Users, 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  User as UserIcon
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Leads', path: '/admin/leads', icon: Users },
    { name: 'Funis de Vendas', path: '/admin/pipelines', icon: LayoutDashboard },
    { name: 'Minhas Tarefas', path: '/admin/tasks', icon: CheckSquare },
    { name: 'Relatórios', path: '/admin/reports', icon: BarChart3 },
    { name: 'Configurações', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row font-sans text-neutral-200">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#111111] border-r border-neutral-800 flex flex-col shadow-2xl z-20">
        <div className="p-8 pt-10">
          <div className="flex items-center mb-8">
            <img 
              src={siteConfig.logo} 
              alt="Vila Tech Hub Logo" 
              className="h-auto w-full max-w-[200px] object-contain brightness-110"
            />
          </div>
          <p className="text-[10px] text-neutral-600 mt-2 uppercase tracking-[0.3em] font-black px-1">Sistema de Gestão</p>
        </div>
        
        <nav className="flex-1 px-6 space-y-2 overflow-y-auto mt-4">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({isActive}) => `flex items-center px-5 py-4 text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 ${isActive ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-neutral-500 hover:bg-white/[0.03] hover:text-white'}`}
            >
              <item.icon className="w-5 h-5 mr-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-neutral-800 mt-auto bg-black/20">
          <div className="flex items-center gap-4 px-5 py-4 mb-4 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white border border-white/5">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-white truncate uppercase tracking-widest">{user?.email?.split('@')[0]}</p>
              <p className="text-[9px] text-neutral-600 truncate font-medium mt-0.5">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 rounded-2xl hover:bg-rose-500/10 hover:text-rose-400 transition-all active:scale-[0.98] border border-transparent hover:border-rose-500/10"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Encerrar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto py-12 px-8 lg:px-12 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
