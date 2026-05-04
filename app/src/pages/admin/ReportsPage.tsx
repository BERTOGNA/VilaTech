import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart3, TrendingUp, Users, Target, MousePointer2, Percent } from 'lucide-react';

const ReportsPage = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    conversionRate: 0,
    activeTasks: 0
  });

  useEffect(() => {
    // In a real scenario, we'd have a specific analytics endpoint
    // For now, let's derive some basic stats from existing endpoints
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const leadsRes = await axios.get('/api/leads');
      const leads = leadsRes.data.items || [];
      const tasksRes = await axios.get('/api/tasks?status=pending');
      const tasks = tasksRes.data.items || [];

      setStats({
        totalLeads: leads.length,
        newLeads: leads.filter((l: any) => {
          const createdDate = new Date(l.created_at);
          const now = new Date();
          return createdDate > new Date(now.setDate(now.getDate() - 7));
        }).length,
        conversionRate: 15.5, // Mock conversion rate
        activeTasks: tasks.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Insights</h1>
        <p className="text-gray-500">Acompanhe o desempenho do seu funil e produtividade do time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Leads', value: stats.totalLeads, icon: Users, color: 'blue', trend: '+12%' },
          { label: 'Novos (7 dias)', value: stats.newLeads, icon: TrendingUp, color: 'green', trend: '+5%' },
          { label: 'Taxa de Conversão', value: `${stats.conversionRate}%`, icon: Percent, color: 'purple', trend: '+2%' },
          { label: 'Tarefas Pendentes', value: stats.activeTasks, icon: Target, color: 'orange', trend: '-3%' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${item.color}-50 text-${item.color}-600`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                item.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {item.trend}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{item.label}</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              Leads por Origem
            </h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">Ver detalhes</button>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Formulário Site', value: 65, color: 'bg-blue-500' },
              { label: 'Indicação', value: 20, color: 'bg-purple-500' },
              { label: 'Eventos', value: 10, color: 'bg-green-500' },
              { label: 'Outros', value: 5, color: 'bg-gray-300' },
            ].map((source, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">{source.label}</span>
                  <span className="text-gray-900 font-bold">{source.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${source.color} rounded-full transition-all duration-1000`} style={{ width: `${source.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <MousePointer2 className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Geração de Relatórios PDF</h3>
          <p className="text-gray-500 max-w-sm mb-6">Exporte seus dados em formato profissional para apresentações ou arquivamento.</p>
          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
            Exportar agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
