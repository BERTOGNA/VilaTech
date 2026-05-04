import { useEffect, useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { 
  MoreHorizontal, Mail, Phone, Plus, Settings, Trash2, 
  ChevronRight, GripVertical, Check, X, Search,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Stage {
  id: string;
  name: string;
  color: string;
  order: number;
}

interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  pipeline_id: string;
  stage_id: string;
  types: string[];
  created_at?: any;
}

const COLORS = [
  { name: 'Azul', value: 'blue' },
  { name: 'Verde', value: 'green' },
  { name: 'Amarelo', value: 'yellow' },
  { name: 'Laranja', value: 'orange' },
  { name: 'Vermelho', value: 'red' },
  { name: 'Roxo', value: 'purple' },
  { name: 'Cinza', value: 'gray' },
];

const PipelinesPage = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [activePipeline, setActivePipeline] = useState<Pipeline | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pipelineForm, setPipelineForm] = useState<{ id?: string, name: string, stages: Stage[] }>({
    name: '',
    stages: []
  });

  const fetchData = async () => {
    try {
      const [pipelinesRes, leadsRes] = await Promise.all([
        api.get('/pipelines'),
        api.get('/leads')
      ]);

      const fetchedPipelines = pipelinesRes.data.items || [];
      setPipelines(fetchedPipelines);
      
      if (fetchedPipelines.length > 0) {
        // Se já tínhamos um ativo, tenta manter ele. Senão pega o primeiro.
        const prevActiveId = activePipeline?.id;
        const nextActive = prevActiveId 
          ? fetchedPipelines.find((p: Pipeline) => p.id === prevActiveId) || fetchedPipelines[0]
          : fetchedPipelines[0];
        setActivePipeline(nextActive);
      }
      setLeads(leadsRes.data.items || []);
    } catch (error) {
      console.error('Error fetching data for pipelines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Atualização Otimista na UI
    const updatedLeads = [...leads];
    const leadIndex = updatedLeads.findIndex(l => l.id === draggableId);
    if (leadIndex === -1) return;

    const oldStageId = updatedLeads[leadIndex].stage_id;
    updatedLeads[leadIndex].stage_id = destination.droppableId;
    setLeads(updatedLeads);

    try {
      await api.patch(`/leads/${draggableId}/stage`, {
        pipeline_id: activePipeline?.id,
        stage_id: destination.droppableId
      });
    } catch (error) {
      console.error('Failed to update lead stage:', error);
      // Reverter se der erro
      const revertedLeads = [...leads];
      const revIndex = revertedLeads.findIndex(l => l.id === draggableId);
      revertedLeads[revIndex].stage_id = oldStageId;
      setLeads(revertedLeads);
      alert('Erro ao mover o lead. Tente novamente.');
    }
  };

  const handleCreatePipeline = () => {
    setIsEditing(false);
    setPipelineForm({
      name: '',
      stages: [
        { id: 'novo', name: 'Novo', color: 'blue', order: 0 },
        { id: 'negociacao', name: 'Negociação', color: 'orange', order: 1 },
        { id: 'ganho', name: 'Ganho', color: 'green', order: 2 }
      ]
    });
    setShowConfigModal(true);
  };

  const handleEditPipeline = () => {
    if (!activePipeline) return;
    setIsEditing(true);
    setPipelineForm({
      id: activePipeline.id,
      name: activePipeline.name,
      stages: [...activePipeline.stages].sort((a, b) => a.order - b.order)
    });
    setShowConfigModal(true);
  };

  const handleSavePipeline = async () => {
    if (!pipelineForm.name.trim()) return alert('Nome do funil é obrigatório.');
    if (pipelineForm.stages.length === 0) return alert('O funil deve ter pelo menos um estágio.');

    try {
      if (isEditing && pipelineForm.id) {
        await api.patch(`/pipelines/${pipelineForm.id}`, pipelineForm);
      } else {
        await api.post('/pipelines', pipelineForm);
      }
      setShowConfigModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving pipeline:', error);
      alert('Erro ao salvar o funil.');
    }
  };

  const handleDeletePipeline = async () => {
    if (!activePipeline || activePipeline.id === 'default') return;
    if (!window.confirm('Tem certeza que deseja excluir este funil? Todos os leads permanecerão cadastrados, mas perderão o vínculo com este funil.')) return;

    try {
      await api.delete(`/pipelines/${activePipeline.id}`);
      setActivePipeline(pipelines.find(p => p.id !== activePipeline.id) || null);
      fetchData();
    } catch (error) {
      console.error('Error deleting pipeline:', error);
      alert('Erro ao excluir o funil.');
    }
  };

  const handleAddStage = () => {
    const id = `stage-${Date.now()}`;
    const newStage: Stage = {
      id,
      name: 'Novo Estágio',
      color: 'blue',
      order: pipelineForm.stages.length
    };
    setPipelineForm(prev => ({ ...prev, stages: [...prev.stages, newStage] }));
  };

  const handleRemoveStage = (id: string) => {
    setPipelineForm(prev => ({ ...prev, stages: prev.stages.filter(s => s.id !== id) }));
  };

  const handleStageChange = (id: string, field: keyof Stage, value: any) => {
    setPipelineForm(prev => ({
      ...prev,
      stages: prev.stages.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const matchSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [leads, searchTerm]);

  if (loading) return <div className="py-20 text-center text-gray-500">Carregando CRM...</div>;

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header com Switcher de Funis e Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative inline-block text-left group">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    {activePipeline?.name || 'Selecione um Funil'}
                </h1>
                <div className="relative">
                    <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                    {/* Switcher Dropdown */}
                    <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none hidden group-hover:block z-50">
                        <div className="py-1">
                            {pipelines.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setActivePipeline(p)}
                                    className={`flex items-center w-full px-4 py-3 text-sm transition-colors ${activePipeline?.id === p.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {p.name}
                                    {activePipeline?.id === p.id && <Check className="ml-auto w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                        <div className="py-1">
                            <button
                                onClick={handleCreatePipeline}
                                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Plus className="mr-3 w-4 h-4" />
                                Novo Funil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-gray-400 font-medium">Gestão de pipelines e leads em tempo real.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar lead..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-black/5 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleEditPipeline}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2 text-sm font-semibold"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Configurar etapas</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {!activePipeline ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Nenhum funil ativo</h3>
              <p className="text-gray-500 text-sm mt-1 max-w-xs text-center">Crie seu primeiro funil de vendas para começar a organizar seus leads.</p>
              <button 
                onClick={handleCreatePipeline}
                className="mt-6 px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:scale-105 transition-transform"
              >
                Criar Novo Funil
              </button>
          </div>
      ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex-1 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-gray-200">
              <div className="flex gap-6 min-w-max h-[calc(100vh-280px)]">
                {activePipeline.stages.sort((a, b) => a.order - b.order).map((stage: Stage) => {
                  const stageLeads = filteredLeads.filter(l => l.stage_id === stage.id);
                  const columnColor = {
                    blue: 'bg-blue-600',
                    green: 'bg-emerald-500',
                    yellow: 'bg-amber-400',
                    orange: 'bg-orange-500',
                    red: 'bg-rose-500',
                    purple: 'bg-violet-600',
                    gray: 'bg-slate-400',
                  }[stage.color] || 'bg-blue-600';

                  const columnBg = {
                    blue: 'bg-blue-50/50',
                    green: 'bg-emerald-50/50',
                    yellow: 'bg-amber-50/50',
                    orange: 'bg-orange-50/50',
                    red: 'bg-rose-50/50',
                    purple: 'bg-violet-50/50',
                    gray: 'bg-slate-50/50',
                  }[stage.color] || 'bg-blue-50/50';

                  return (
                    <div key={stage.id} className={`w-80 flex flex-col ${columnBg} rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden`}>
                      <div className="p-4 flex justify-between items-center group/stage">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${columnColor} shadow-md`} />
                          <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-widest">{stage.name}</h3>
                          <span className="bg-white/80 backdrop-blur-sm text-gray-500 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-sm">
                            {stageLeads.length}
                          </span>
                        </div>
                        <button className="text-gray-300 hover:text-gray-600 transition-colors opacity-0 group-hover/stage:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      <Droppable droppableId={stage.id}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`flex-1 p-3 space-y-4 overflow-y-auto transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-white/40' : ''}`}
                          >
                            {stageLeads.length === 0 && !snapshot.isDraggingOver && (
                                <div className="h-full flex flex-col items-center justify-center pt-8 opacity-20 filter grayscale">
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                    <span className="text-[10px] font-bold mt-2 uppercase tracking-tighter">Arraste para cá</span>
                                </div>
                            )}

                            {stageLeads.map((lead: Lead, index: number) => (
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-white p-5 rounded-2xl border ${snapshot.isDragging ? 'border-primary shadow-2xl scale-105 z-50' : 'border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]'} hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] hover:border-gray-200 transition-all duration-300 group`}
                                  >
                                    <div className="flex justify-between items-start mb-3">
                                      <Link 
                                        to={`/admin/leads/${lead.id}`} 
                                        className="font-black text-gray-900 text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1"
                                      >
                                        {lead.name}
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                                      </Link>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center text-[11px] font-bold text-gray-400 gap-2">
                                        <Mail className="w-3 h-3" />
                                        <span className="truncate">{lead.email}</span>
                                      </div>
                                      {lead.phone && (
                                        <div className="flex items-center text-[11px] font-bold text-gray-400 gap-2">
                                          <Phone className="w-3 h-3" />
                                          <span>{lead.phone}</span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex -space-x-1">
                                            {lead.types?.slice(0, 2).map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[9px] font-bold border border-gray-100 uppercase tracking-tighter">
                                                    {t}
                                                </span>
                                            ))}
                                            {lead.types && lead.types.length > 2 && (
                                                <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[9px] font-bold border border-gray-100">
                                                    +{lead.types.length - 2}
                                                </span>
                                            )}
                                        </div>
                                        {lead.created_at && (
                                            <span className="text-[10px] font-medium text-gray-300">
                                                {format(new Date(lead.created_at), 'dd MMM', { locale: ptBR })}
                                            </span>
                                        )}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </div>
          </DragDropContext>
      )}

      {/* Modal de Configuração do Funil */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  {isEditing ? 'Configurar Funil' : 'Novo Funil de Vendas'}
                </h2>
                <p className="text-gray-400 text-sm font-medium">Personalize etapas e fluxo de trabalho.</p>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="p-2 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-8">
              {/* Nome do Funil */}
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Nome do Funil</label>
                <input
                  type="text"
                  placeholder="Ex: Vendas Diretas, Pós-Venda..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300"
                  value={pipelineForm.name}
                  onChange={(e) => setPipelineForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Estágios */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Estágios do Kanban</label>
                  <button 
                    onClick={handleAddStage}
                    className="flex items-center gap-1.5 text-blue-600 font-black text-[10px] uppercase hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    Adicionar Estágio
                  </button>
                </div>
                
                <div className="space-y-3">
                  {pipelineForm.stages.map((stage) => (
                    <div key={stage.id} className="group relative flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all">
                      <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-8">
                           <input
                            type="text"
                            placeholder="Nome do estágio"
                            className="w-full px-3 py-2 text-sm font-bold text-gray-900 border-none bg-transparent outline-none focus:ring-0"
                            value={stage.name}
                            onChange={(e) => handleStageChange(stage.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="col-span-4 flex items-center gap-2">
                           <select 
                            className="flex-1 py-1.5 px-2 text-[10px] font-black uppercase rounded-lg bg-gray-50 border-none outline-none focus:ring-0"
                            value={stage.color}
                            onChange={(e) => handleStageChange(stage.id, 'color', e.target.value)}
                           >
                            {COLORS.map(c => (
                                <option key={c.value} value={c.value}>{c.name}</option>
                            ))}
                           </select>
                           <button 
                             onClick={() => handleRemoveStage(stage.id)}
                             className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 flex flex-col md:flex-row gap-4">
              {isEditing && activePipeline?.id !== 'default' && (
                  <button 
                    onClick={handleDeletePipeline}
                    className="px-6 py-4 border border-red-100 text-red-500 rounded-2xl text-sm font-black hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir Funil
                  </button>
              )}
              <div className="flex-1 flex gap-3 md:justify-end">
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 md:flex-none px-8 py-4 bg-white border border-gray-200 text-gray-500 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSavePipeline}
                  className="flex-1 md:flex-none px-12 py-4 bg-black text-white rounded-2xl text-sm font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  {isEditing ? 'Salvar Pipeline' : 'Criar Pipeline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PipelinesPage;
