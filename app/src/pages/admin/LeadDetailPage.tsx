import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowLeft, User, Mail, Phone, MapPin, Tag, Activity } from 'lucide-react';

interface HistoryEvent {
  type: string;
  form_id: string;
  created_at: string;
  metadata?: any;
}

interface LeadDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  types: string[];
  subtypes: string[];
  tags: string[];
  history: HistoryEvent[];
  created_at: string;
  updated_at: string;
}

const LeadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const token = import.meta.env.VITE_API_TOKEN || 'super_secret_crm_token_2026';
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
        
        const response = await axios.get(`${apiUrl}/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setLead(response.data);
      } catch (error) {
        console.error('Failed to fetch lead details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLead();
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!lead) return;
    const newStatus = e.target.value;
    setStatusUpdating(true);
    
    try {
      const token = import.meta.env.VITE_API_TOKEN || 'super_secret_crm_token_2026';
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      
      const response = await axios.patch(`${apiUrl}/leads/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLead(response.data);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Erro ao atualizar o status do lead.');
    } finally {
      setStatusUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'novo': return 'bg-blue-500/10 text-blue-400';
      case 'em contato': return 'bg-amber-500/10 text-amber-400';
      case 'convertido': return 'bg-emerald-500/10 text-emerald-400';
      case 'perdido': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-neutral-800 text-neutral-400';
    }
  };

  if (loading) {
    return <div className="py-32 text-center text-neutral-500 font-bold uppercase tracking-widest text-xs">Sincronizando detalhes do lead...</div>;
  }

  if (!lead) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Lead não encontrado</h2>
        <Link to="/admin/leads" className="text-blue-600 hover:underline mt-2 inline-block">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Link to="/admin/leads" className="w-12 h-12 flex items-center justify-center text-neutral-500 hover:text-white transition-all rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 active:scale-95">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tight">{lead.name}</h1>
                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border border-white/5 ${getStatusColor(lead.status)} shadow-lg`}>
                    {lead.status}
                </span>
            </div>
            <p className="text-neutral-500 text-sm font-medium mt-1">Lead ID: {lead.id}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <select 
                value={lead.status} 
                onChange={handleStatusChange}
                disabled={statusUpdating}
                className="bg-neutral-900 border border-neutral-800 text-[10px] font-black uppercase tracking-widest rounded-2xl pl-6 pr-12 py-4 text-white focus:ring-2 focus:ring-white/10 focus:border-white/20 disabled:opacity-50 transition-all appearance-none cursor-pointer hover:bg-neutral-800"
            >
                <option value="novo">Novo</option>
                <option value="em contato">Em Contato</option>
                <option value="convertido">Convertido</option>
                <option value="perdido">Perdido</option>
            </select>
            <Activity className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 pointer-events-none group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#111111] border border-neutral-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-bl-[5rem]" />
            <h2 className="text-xl font-black text-white mb-10 flex items-center gap-3">
              <User className="w-6 h-6 text-neutral-500" />
              Informações do Contato
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <dt className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
                  <Mail className="w-3.5 h-3.5" /> Email
                </dt>
                <dd className="text-base text-white font-bold tracking-tight">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
                  <Phone className="w-3.5 h-3.5" /> Telefone
                </dt>
                <dd className="text-base text-white font-bold tracking-tight">{lead.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5" /> Localização
                </dt>
                <dd className="text-base text-white font-bold tracking-tight">
                  {lead.city || lead.state ? `${lead.city || ''}, ${lead.state || ''}` : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] flex items-center gap-2 mb-3">
                  <Tag className="w-3.5 h-3.5" /> Tags de Origem
                </dt>
                <dd className="flex flex-wrap gap-2 mt-1">
                  {lead.tags?.length > 0 ? lead.tags.map(t => (
                    <span key={t} className="inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black bg-neutral-800 text-neutral-500 uppercase tracking-widest border border-white/5">
                      {t.replace('form_', '')}
                    </span>
                  )) : <span className="text-sm text-neutral-700 font-bold uppercase tracking-widest">—</span>}
                </dd>
              </div>
            </div>
            
            {(lead.types?.length > 0 || lead.subtypes?.length > 0) && (
              <div className="mt-10 pt-10 border-t border-neutral-800/50">
                <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-6">Áreas de Interesse</h3>
                <div className="flex flex-wrap gap-3">
                  {lead.types?.map(t => (
                    <span key={t} className="inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black bg-white/[0.03] text-white uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                      {t}
                    </span>
                  ))}
                  {lead.subtypes?.map(st => (
                    <span key={st} className="inline-flex items-center px-4 py-2 rounded-xl text-[10px] font-black bg-white/[0.03] text-white uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="bg-[#111111] border border-neutral-800 rounded-[2.5rem] p-10 shadow-2xl">
          <h2 className="text-xl font-black text-white mb-10 flex items-center gap-3">
            <Activity className="w-6 h-6 text-neutral-500" />
            Histórico
          </h2>
          
          <div className="flow-root">
            <ul role="list" className="-mb-10">
              {lead.history?.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-10">
                    {eventIdx !== (lead.history.length - 1) ? (
                      <span className="absolute left-5 top-5 -ml-px h-full w-[1px] bg-neutral-800/50" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-5">
                      <div>
                        <span className="h-10 w-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center ring-8 ring-[#111111]">
                          <Activity className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-2">
                        <div>
                          <p className="text-sm text-neutral-300 font-medium">
                            {event.type === 'form_submission' ? 'Preencheu formulário ' : 'Interação '}
                            <span className="font-black text-white">
                              {event.form_id || 'Desconhecido'}
                            </span>
                          </p>
                          {event.metadata && (
                            <div className="mt-4 text-[10px] text-neutral-500 bg-black/40 p-4 rounded-2xl border border-neutral-800/50 overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-800">
                              <pre className="whitespace-pre-wrap font-mono leading-relaxed">{JSON.stringify(event.metadata, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                        <div className="whitespace-nowrap text-right text-[9px] font-black text-neutral-600 uppercase tracking-widest pt-1">
                          {format(new Date(event.created_at), "d 'de' MMM", { locale: ptBR })}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
