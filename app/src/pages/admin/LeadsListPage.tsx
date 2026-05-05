import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Search, Filter, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  types: string[];
  created_at: string;
}

const LeadsListPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = import.meta.env.VITE_API_TOKEN || 'super_secret_crm_token_2026';
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        
        const response = await axios.get(`${apiUrl}/leads`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setLeads(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'novo': return 'bg-blue-500/10 text-blue-400';
      case 'em contato': return 'bg-amber-500/10 text-amber-400';
      case 'convertido': return 'bg-emerald-500/10 text-emerald-400';
      case 'perdido': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-neutral-800 text-neutral-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Leads</h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">Gerencie os contatos captados pelo site e campanhas em tempo real.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar leads..." 
              className="w-full pl-11 pr-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all text-white placeholder:text-neutral-700 font-medium"
            />
          </div>
          <button className="p-3 bg-[#111111] border border-neutral-800 text-neutral-400 rounded-2xl hover:bg-neutral-800 hover:text-white transition-all shadow-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>
      </div>

      <div className="bg-[#111111] border border-neutral-800 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
          <table className="min-w-full divide-y divide-neutral-800/50 text-sm text-left">
            <thead className="bg-white/[0.02]">
              <tr>
                <th scope="col" className="py-5 pl-8 pr-3 text-left text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Lead</th>
                <th scope="col" className="px-3 py-5 text-left text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Contato</th>
                <th scope="col" className="px-3 py-5 text-left text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Interesses</th>
                <th scope="col" className="px-3 py-5 text-left text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Status</th>
                <th scope="col" className="px-3 py-5 text-left text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">Data</th>
                <th scope="col" className="relative py-5 pl-3 pr-8 text-right"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/30 bg-transparent">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center text-neutral-500">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-2 border-white/5 border-t-white rounded-full animate-spin"></div>
                      <span className="text-xs font-bold uppercase tracking-widest">Sincronizando Leads...</span>
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center text-neutral-600 font-bold uppercase tracking-widest text-xs italic">Nenhum lead encontrado.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="py-6 pl-8 pr-3">
                      <div className="font-black text-white text-base tracking-tight">{lead.name}</div>
                      <div className="text-neutral-500 text-xs mt-1 font-medium">{lead.email}</div>
                    </td>
                    <td className="px-3 py-6 text-neutral-400 font-bold">{lead.phone || '-'}</td>
                    <td className="px-3 py-6">
                      <div className="flex flex-wrap gap-1.5">
                        {lead.types.map((t, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black bg-neutral-800 text-neutral-500 uppercase tracking-tighter border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border border-white/5 ${getStatusColor(lead.status)} shadow-lg`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-6 text-neutral-600 font-bold text-[10px] uppercase tracking-widest">
                      {lead.created_at ? format(new Date(lead.created_at), 'dd MMM yyyy', { locale: ptBR }) : '-'}
                    </td>
                    <td className="py-6 pl-3 pr-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link to={`/admin/leads/${lead.id}`} className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-xl transition-all border border-transparent hover:border-white/5" title="Ver Detalhes">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-neutral-800 rounded-xl transition-all border border-transparent hover:border-white/5" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadsListPage;
