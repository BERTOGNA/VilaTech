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
      case 'novo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'em contato': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'convertido': return 'bg-green-100 text-green-800 border-green-200';
      case 'perdido': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Carregando detalhes...</div>;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/leads" className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lead.name}</h1>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${getStatusColor(lead.status)}`}>
            {lead.status}
          </span>
        </div>
        <div className="flex gap-3">
          <select 
            value={lead.status} 
            onChange={handleStatusChange}
            disabled={statusUpdating}
            className="border border-gray-300 text-sm rounded-lg px-3 py-2 text-gray-700 focus:ring-black focus:border-black disabled:opacity-50"
          >
            <option value="novo">Novo</option>
            <option value="em contato">Em Contato</option>
            <option value="convertido">Convertido</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Informações do Contato
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4" /> Email
                </dt>
                <dd className="text-sm text-gray-900">{lead.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4" /> Telefone
                </dt>
                <dd className="text-sm text-gray-900">{lead.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4" /> Localização
                </dt>
                <dd className="text-sm text-gray-900">
                  {lead.city || lead.state ? `${lead.city || ''} - ${lead.state || ''}` : '—'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4" /> Tags de Origem
                </dt>
                <dd className="text-sm text-gray-900 flex flex-wrap gap-1 mt-1">
                  {lead.tags?.length > 0 ? lead.tags.map(t => (
                    <span key={t} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {t.replace('form_', '')}
                    </span>
                  )) : '—'}
                </dd>
              </div>
            </div>
            
            {(lead.types?.length > 0 || lead.subtypes?.length > 0) && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Áreas de Interesse</h3>
                <div className="flex flex-wrap gap-2">
                  {lead.types?.map(t => (
                    <span key={t} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 capitalize border border-blue-200">
                      {t}
                    </span>
                  ))}
                  {lead.subtypes?.map(st => (
                    <span key={st} className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium bg-indigo-50 text-indigo-700 capitalize border border-indigo-200">
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Histórico e Interações
          </h2>
          
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {lead.history?.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== (lead.history.length - 1) ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                          <Activity className="h-4 w-4 text-blue-600" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {event.type === 'form_submission' ? 'Preencheu o formulário ' : 'Interação '}
                            <span className="font-medium text-gray-900">
                              {event.form_id || 'Desconhecido'}
                            </span>
                          </p>
                          {event.metadata && (
                            <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                              <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(event.metadata, null, 2)}</pre>
                            </div>
                          )}
                        </div>
                        <div className="whitespace-nowrap text-right text-xs text-gray-500">
                          {format(new Date(event.created_at), "d 'de' MMM, HH:mm", { locale: ptBR })}
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
