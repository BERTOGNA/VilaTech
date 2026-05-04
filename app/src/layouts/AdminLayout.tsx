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
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-neutral-200 flex flex-col shadow-sm">
        <div className="p-4 pt-8">
          <div className="flex items-center mb-6">
            <img 
              src={siteConfig.logo} 
              alt="Vila Tech Hub Logo" 
              className="h-auto w-full max-w-[200px] object-contain invert"
            />
          </div>
          <p className="text-[10px] text-neutral-400 mt-2 uppercase tracking-[0.2em] font-bold px-2">CRM Central</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              className={({isActive}) => `flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all duration-200 ${isActive ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-200' : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'}`}
            >
              <item.icon className="w-5 h-5 mr-3.5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-100 mt-auto bg-neutral-50/50">
          <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-neutral-900 truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-neutral-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3.5 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-50 transition-all active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5 mr-3.5" />
            Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-neutral-50">
        <div className="max-w-7xl mx-auto py-10 px-6 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
