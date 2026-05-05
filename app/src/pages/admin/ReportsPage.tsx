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
    <div className="space-y-8 animate-in fade-in duration-500 text-white">
      <div>
        <h1 className="text-2xl font-bold text-white">Relatórios e Insights</h1>
        <p className="text-neutral-500">Acompanhe o desempenho do seu funil e produtividade do time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total de Leads', value: stats.totalLeads, icon: Users, color: 'blue', trend: '+12%' },
          { label: 'Novos (7 dias)', value: stats.newLeads, icon: TrendingUp, color: 'green', trend: '+5%' },
          { label: 'Taxa de Conversão', value: `${stats.conversionRate}%`, icon: Percent, color: 'purple', trend: '+2%' },
          { label: 'Tarefas Pendentes', value: stats.activeTasks, icon: Target, color: 'orange', trend: '-3%' },
        ].map((item, i) => (
          <div key={i} className="bg-[#111111] p-6 rounded-3xl border border-neutral-800 shadow-xl hover:border-neutral-700 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-2xl bg-neutral-800 text-white">
                <item.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                item.trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {item.trend}
              </span>
            </div>
            <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{item.label}</p>
            <h3 className="text-3xl font-black text-white mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111111] p-8 rounded-[2.5rem] border border-neutral-800 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-neutral-600" />
              Leads por Origem
            </h3>
            <button className="text-xs text-neutral-400 font-bold uppercase tracking-widest hover:text-white transition-colors">Detalhes</button>
          </div>
          <div className="space-y-8">
            {[
              { label: 'Formulário Site', value: 65, color: 'bg-white' },
              { label: 'Indicação', value: 20, color: 'bg-neutral-600' },
              { label: 'Eventos', value: 10, color: 'bg-neutral-800' },
              { label: 'Outros', value: 5, color: 'bg-neutral-900' },
            ].map((source, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-neutral-500">{source.label}</span>
                  <span className="text-white">{source.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                  <div className={`h-full ${source.color} rounded-full transition-all duration-1000`} style={{ width: `${source.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111111] p-8 rounded-[2.5rem] border border-neutral-800 shadow-2xl flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-neutral-800 text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/5">
            <MousePointer2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Relatórios PDF</h3>
          <p className="text-neutral-500 max-w-xs mb-8 text-sm">Exporte seus dados em formato profissional para apresentações ou arquivamento.</p>
          <button className="bg-white text-black px-8 py-3.5 rounded-2xl font-bold hover:bg-neutral-200 transition-all shadow-xl active:scale-95">
            Exportar agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
