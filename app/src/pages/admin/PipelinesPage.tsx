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

  if (loading) return <div className="py-20 text-center text-neutral-500 font-bold">Carregando CRM...</div>;

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500">
      {/* Header com Switcher de Funis e Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative inline-block text-left group">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-white tracking-tight">
                    {activePipeline?.name || 'Selecione um Funil'}
                </h1>
                <div className="relative">
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10">
                        <MoreHorizontal className="w-5 h-5 text-neutral-500" />
                    </button>
                    {/* Switcher Dropdown */}
                    <div className="absolute left-0 mt-2 w-64 rounded-[2rem] shadow-2xl bg-[#111111] border border-neutral-800 divide-y divide-neutral-800 focus:outline-none hidden group-hover:block z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="py-2">
                            {pipelines.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setActivePipeline(p)}
                                    className={`flex items-center w-full px-5 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activePipeline?.id === p.id ? 'bg-white text-black' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}
                                >
                                    {p.name}
                                    {activePipeline?.id === p.id && <Check className="ml-auto w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                        <div className="py-2">
                            <button
                                onClick={handleCreatePipeline}
                                className="flex items-center w-full px-5 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                            >
                                <Plus className="mr-3 w-4 h-4" />
                                Novo Funil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm text-neutral-500 font-medium mt-1">Gestão de pipelines e leads em tempo real.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Buscar lead..."
              className="w-full pl-11 pr-4 py-3 bg-black/20 border border-neutral-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all text-white placeholder:text-neutral-700 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleEditPipeline}
            className="p-3 bg-[#111111] border border-neutral-800 text-neutral-400 rounded-2xl hover:bg-neutral-800 hover:text-white transition-all shadow-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Configurar</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {!activePipeline ? (
          <div className="flex-1 flex flex-col items-center justify-center py-24 bg-[#111111] rounded-[2.5rem] border border-neutral-800 shadow-2xl">
              <div className="w-20 h-20 bg-neutral-800 rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-white/5">
                  <Plus className="w-10 h-10 text-neutral-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Nenhum funil ativo</h3>
              <p className="text-neutral-500 text-sm mt-2 max-w-xs text-center font-medium">Crie seu primeiro funil de vendas para começar a organizar seus leads de forma profissional.</p>
              <button 
                onClick={handleCreatePipeline}
                className="mt-10 px-10 py-4 bg-white text-black rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-2xl active:scale-95"
              >
                Criar Novo Funil
              </button>
          </div>
      ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex-1 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              <div className="flex gap-8 min-w-max h-[calc(100vh-280px)]">
                {activePipeline.stages.sort((a, b) => a.order - b.order).map((stage: Stage) => {
                  const stageLeads = filteredLeads.filter(l => l.stage_id === stage.id);
                  const columnColor = {
                    blue: 'bg-blue-500',
                    green: 'bg-emerald-500',
                    yellow: 'bg-amber-400',
                    orange: 'bg-orange-500',
                    red: 'bg-rose-500',
                    purple: 'bg-violet-500',
                    gray: 'bg-neutral-500',
                  }[stage.color] || 'bg-blue-500';

                  const columnBorder = {
                    blue: 'border-blue-500/20',
                    green: 'border-emerald-500/20',
                    yellow: 'border-amber-400/20',
                    orange: 'border-orange-500/20',
                    red: 'border-rose-500/20',
                    purple: 'border-violet-500/20',
                    gray: 'border-neutral-500/20',
                  }[stage.color] || 'border-blue-500/20';

                  return (
                    <div key={stage.id} className={`w-80 flex flex-col bg-[#111111] rounded-[2rem] border ${columnBorder} shadow-2xl overflow-hidden`}>
                      <div className="p-5 flex justify-between items-center group/stage border-b border-neutral-800/50 bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${columnColor} shadow-[0_0_10px_rgba(255,255,255,0.1)]`} />
                          <h3 className="font-black text-white text-xs uppercase tracking-widest">{stage.name}</h3>
                          <span className="bg-neutral-800 text-neutral-400 px-2.5 py-1 rounded-lg text-[10px] font-black border border-white/5">
                            {stageLeads.length}
                          </span>
                        </div>
                        <button className="text-neutral-600 hover:text-white transition-colors opacity-0 group-hover/stage:opacity-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>

                      <Droppable droppableId={stage.id}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`flex-1 p-4 space-y-5 overflow-y-auto transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-white/[0.03]' : ''}`}
                          >
                            {stageLeads.length === 0 && !snapshot.isDraggingOver && (
                                <div className="h-full flex flex-col items-center justify-center pt-8 opacity-10">
                                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                    <span className="text-[10px] font-bold mt-3 uppercase tracking-widest">Vazio</span>
                                </div>
                            )}

                            {stageLeads.map((lead: Lead, index: number) => (
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-black/40 p-5 rounded-2xl border ${snapshot.isDragging ? 'border-white bg-neutral-900 shadow-2xl scale-105 z-50' : 'border-neutral-800 shadow-xl'} hover:shadow-2xl hover:border-neutral-700 transition-all duration-300 group`}
                                  >
                                    <div className="flex justify-between items-start mb-4">
                                      <Link 
                                        to={`/admin/leads/${lead.id}`} 
                                        className="font-black text-white text-sm group-hover:text-blue-400 transition-colors flex items-center gap-1"
                                      >
                                        {lead.name}
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                                      </Link>
                                    </div>
                                    
                                    <div className="space-y-2.5">
                                      <div className="flex items-center text-[11px] font-bold text-neutral-500 gap-2">
                                        <Mail className="w-3 h-3" />
                                        <span className="truncate">{lead.email}</span>
                                      </div>
                                      {lead.phone && (
                                        <div className="flex items-center text-[11px] font-bold text-neutral-500 gap-2">
                                          <Phone className="w-3 h-3" />
                                          <span>{lead.phone}</span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="mt-5 pt-5 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex -space-x-1">
                                            {lead.types?.slice(0, 2).map((t, idx) => (
                                                <span key={idx} className="px-2 py-0.5 bg-neutral-800 text-neutral-400 rounded-md text-[9px] font-bold border border-white/5 uppercase tracking-tighter">
                                                    {t}
                                                </span>
                                            ))}
                                            {lead.types && lead.types.length > 2 && (
                                                <span className="px-2 py-0.5 bg-neutral-800 text-neutral-500 rounded-md text-[9px] font-bold border border-white/5">
                                                    +{lead.types.length - 2}
                                                </span>
                                            )}
                                        </div>
                                        {lead.created_at && (
                                            <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-widest">
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-[#111111] rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/30">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {isEditing ? 'Configurar Funil' : 'Novo Funil de Vendas'}
                </h2>
                <p className="text-neutral-500 text-sm font-medium mt-1">Personalize etapas e fluxo de trabalho.</p>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500 hover:text-white transition-all active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto space-y-10">
              {/* Nome do Funil */}
              <div className="space-y-4">
                <label className="text-xs font-black text-neutral-600 uppercase tracking-widest px-1">Nome do Funil</label>
                <input
                  type="text"
                  placeholder="Ex: Vendas Diretas, Pós-Venda..."
                  className="w-full px-6 py-4 bg-black/40 border border-neutral-800 rounded-2xl text-lg font-bold focus:ring-2 focus:ring-white/10 focus:border-white/20 outline-none transition-all placeholder:text-neutral-800 text-white"
                  value={pipelineForm.name}
                  onChange={(e) => setPipelineForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              {/* Estágios */}
              <div className="space-y-6">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-neutral-600 uppercase tracking-widest">Estágios do Kanban</label>
                  <button 
                    onClick={handleAddStage}
                    className="flex items-center gap-1.5 text-white font-black text-[10px] uppercase tracking-widest hover:underline"
                  >
                    <Plus className="w-3 h-3" />
                    Adicionar Estágio
                  </button>
                </div>
                
                <div className="space-y-4">
                  {pipelineForm.stages.map((stage) => (
                    <div key={stage.id} className="group relative flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-neutral-800 shadow-xl hover:border-neutral-700 transition-all">
                      <div className="text-neutral-700 cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-8">
                           <input
                            type="text"
                            placeholder="Nome do estágio"
                            className="w-full px-3 py-2 text-sm font-bold text-white border-none bg-transparent outline-none focus:ring-0"
                            value={stage.name}
                            onChange={(e) => handleStageChange(stage.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="col-span-4 flex items-center gap-3">
                           <select 
                            className="flex-1 py-2 px-3 text-[10px] font-black uppercase rounded-xl bg-neutral-800 text-neutral-400 border-none outline-none focus:ring-0 appearance-none cursor-pointer hover:text-white transition-colors"
                            value={stage.color}
                            onChange={(e) => handleStageChange(stage.id, 'color', e.target.value)}
                           >
                            {COLORS.map(c => (
                                <option key={c.value} value={c.value}>{c.name}</option>
                            ))}
                           </select>
                           <button 
                             onClick={() => handleRemoveStage(stage.id)}
                             className="p-2 text-neutral-700 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
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

            <div className="p-8 border-t border-neutral-800 flex flex-col md:flex-row gap-4 bg-white/[0.02]">
              {isEditing && activePipeline?.id !== 'default' && (
                  <button 
                    onClick={handleDeletePipeline}
                    className="px-6 py-4 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </button>
              )}
              <div className="flex-1 flex gap-4 md:justify-end">
                <button 
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 md:flex-none px-10 py-4 bg-neutral-800 text-neutral-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-700 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSavePipeline}
                  className="flex-1 md:flex-none px-12 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-200 active:scale-95 transition-all shadow-2xl"
                >
                  {isEditing ? 'Salvar' : 'Criar'}
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
