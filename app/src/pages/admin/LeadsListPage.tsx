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
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'em contato': return 'bg-yellow-100 text-yellow-800';
      case 'convertido': return 'bg-green-100 text-green-800';
      case 'perdido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie os contatos captados pelo site e campanhas.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input 
              type="text" 
              placeholder="Buscar leads..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-black focus:border-black"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-6">Nome / Email</th>
                <th scope="col" className="px-3 py-3.5 text-left font-semibold text-gray-900">Telefone</th>
                <th scope="col" className="px-3 py-3.5 text-left font-semibold text-gray-900">Interesses</th>
                <th scope="col" className="px-3 py-3.5 text-left font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left font-semibold text-gray-900">Data</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">Carregando leads...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">Nenhum lead encontrado.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-4 pr-3 sm:pl-6">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-gray-500">{lead.email}</div>
                    </td>
                    <td className="px-3 py-4 text-gray-500">{lead.phone || '-'}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.types.map((t, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-500">
                      {lead.created_at ? format(new Date(lead.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                    </td>
                    <td className="py-4 pl-3 pr-4 sm:pr-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/leads/${lead.id}`} className="text-gray-400 hover:text-gray-900 transition-colors" title="Ver Detalhes">
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button className="text-gray-400 hover:text-gray-900 transition-colors" title="Editar">
                          <Edit className="w-5 h-5" />
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
