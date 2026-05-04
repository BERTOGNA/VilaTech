import { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Search, 
  Calendar, 
  X, 
  AlertCircle,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Minus,
  Phone,
  Users as UsersIcon,
  Mail,
  FileText
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  leadId: string | null;
  leadName: string;
  priority: 'high' | 'medium' | 'low';
  category: 'call' | 'meeting' | 'email' | 'other';
}

interface Lead {
    id: string;
    name: string;
    email?: string;
}

const CATEGORIES = [
    { id: 'call', label: 'Ligação', icon: Phone },
    { id: 'meeting', label: 'Reunião', icon: UsersIcon },
    { id: 'email', label: 'E-mail', icon: Mail },
    { id: 'other', label: 'Outro', icon: FileText },
];

const PRIORITIES = [
    { id: 'high', label: 'Alta', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', icon: ArrowUp },
    { id: 'medium', label: 'Média', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', icon: Minus },
    { id: 'low', label: 'Baixa', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', icon: ArrowDown },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadSearch, setLeadSearch] = useState('');
  const [taskForm, setTaskForm] = useState({
      title: '',
      description: '',
      dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      leadId: '',
      priority: 'medium' as 'high' | 'medium' | 'low',
      category: 'other' as 'call' | 'meeting' | 'email' | 'other'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  useEffect(() => {
    if (isModalOpen) {
        fetchLeads();
    }
  }, [isModalOpen]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' ? '/tasks' : `/tasks?status=${filter}`;
      const response = await api.get(url);
      setTasks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
      try {
          const response = await api.get('/leads');
          setLeads(response.data.items || []);
      } catch (error) {
          console.error('Error fetching leads:', error);
      }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      await api.patch(`/tasks/${task.id}`, { status: newStatus });
      setTasks(tasks.map((t: Task) => t.id === task.id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEdit = (task: Task) => {
      setEditingTaskId(task.id);
      setTaskForm({
          title: task.title,
          description: task.description || '',
          dueDate: format(new Date(task.dueDate), "yyyy-MM-dd'T'HH:mm"),
          leadId: task.leadId || '',
          priority: task.priority || 'medium',
          category: task.category || 'other'
      });
      setLeadSearch(task.leadName || '');
      setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
      if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
      
      try {
          await api.delete(`/tasks/${id}`);
          setTasks(tasks.filter(t => t.id !== id));
      } catch (error) {
          console.error('Error deleting task:', error);
          alert('Erro ao excluir tarefa.');
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      try {
          const selectedLead = leads.find(l => l.id === taskForm.leadId);
          const payload = {
              ...taskForm,
              leadName: selectedLead ? selectedLead.name : (taskForm.leadId ? leadSearch : '')
          };

          if (editingTaskId) {
              await api.patch(`/tasks/${editingTaskId}`, payload);
          } else {
              await api.post('/tasks', payload);
          }

          setIsModalOpen(false);
          resetForm();
          fetchTasks();
      } catch (err: any) {
          setError('Erro ao salvar tarefa. Verifique os campos.');
          console.error(err);
      } finally {
          setIsSubmitting(false);
      }
  };

  const resetForm = () => {
    setEditingTaskId(null);
    setTaskForm({
        title: '',
        description: '',
        dueDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        leadId: '',
        priority: 'medium',
        category: 'other'
    });
    setLeadSearch('');
    setError('');
  };

  const filteredTasks = useMemo(() => {
      return tasks.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.leadName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, searchTerm]);

  const filteredLeads = useMemo(() => {
      if (!leadSearch) return [];
      return leads.filter(l => 
        l.name.toLowerCase().includes(leadSearch.toLowerCase())
      ).slice(0, 5);
  }, [leads, leadSearch]);

  const getPriorityInfo = (id: string) => PRIORITIES.find(p => p.id === id) || PRIORITIES[1];
  const getCategoryInfo = (id: string) => CATEGORIES.find(c => c.id === id) || CATEGORIES[3];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Minhas Tarefas</h1>
          <p className="text-neutral-500 mt-2 font-medium">Gerencie seus compromissos e lembretes de leads.</p>
        </div>
        <button 
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-xl shadow-neutral-200"
        >
          <Plus className="w-5 h-5" />
          Nova Tarefa
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-100 bg-neutral-50/50 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex bg-neutral-100 p-1 rounded-xl">
            {(['all', 'pending', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === f 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendentes' : 'Concluídas'}
              </button>
            ))}
          </div>
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-900 transition-colors" />
            <input
              type="text"
              placeholder="Buscar tarefas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:border-neutral-900 w-full md:w-80 transition-all font-medium"
            />
          </div>
        </div>

        <div className="divide-y divide-neutral-100">
          {loading ? (
            <div className="p-20 text-center">
                <div className="w-10 h-10 border-4 border-neutral-900/10 border-t-neutral-900 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-500 font-medium">Carregando tarefas...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-20 text-center">
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-neutral-300">
                    <CheckSquare className="w-8 h-8" />
                </div>
                <p className="text-neutral-500 font-bold text-lg">Nenhuma tarefa encontrada.</p>
                <p className="text-neutral-400 text-sm mt-1">Que tal criar uma nova agora?</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const priority = getPriorityInfo(task.priority);
              const category = getCategoryInfo(task.category);
              return (
                <div key={task.id} className="p-6 hover:bg-neutral-50/50 transition-all flex items-start gap-6 group relative">
                  <button 
                    onClick={() => toggleTaskStatus(task)}
                    className={`mt-1 transition-all transform active:scale-90 ${task.status === 'completed' ? 'text-green-500' : 'text-neutral-200 hover:text-neutral-900'}`}
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <Circle className="w-8 h-8 border-2 border-current rounded-full" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className={`p-2 rounded-xl bg-white border border-neutral-100 shadow-sm text-neutral-500`}>
                            <category.icon className="w-4 h-4" />
                        </div>
                      <h3 className={`font-bold text-lg text-neutral-900 truncate tracking-tight ${task.status === 'completed' ? 'line-through text-neutral-400 opacity-60' : ''}`}>
                        {task.title}
                      </h3>
                      <div className="flex gap-2">
                        {task.leadName && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-neutral-100 text-neutral-600 border border-neutral-200">
                            {task.leadName}
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${priority.bg} ${priority.color} ${priority.border}`}>
                          <priority.icon className="w-2.5 h-2.5" />
                          {priority.label}
                        </span>
                      </div>
                    </div>
                    {task.description && (
                      <p className={`text-sm text-neutral-500 mb-4 line-clamp-2 leading-relaxed ${task.status === 'completed' ? 'opacity-50' : ''}`}>{task.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <div className="flex items-center gap-2 text-neutral-400">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(task.dueDate), "dd 'de' MMMM", { locale: ptBR })}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${
                        new Date(task.dueDate) < new Date() && task.status === 'pending' 
                          ? 'text-red-500' 
                          : 'text-neutral-400'
                      }`}>
                        <Clock className="w-4 h-4" />
                        <span>{format(new Date(task.dueDate), "HH:mm")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(task)}
                        className="p-3 rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-all active:scale-90"
                        title="Editar"
                      >
                          <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(task.id)}
                        className="p-3 rounded-xl bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all active:scale-90"
                        title="Excluir"
                      >
                          <Trash2 className="w-4 h-4" />
                      </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* New/Edit Task Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
                  <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-neutral-50 to-white">
                      <div>
                          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">{editingTaskId ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                          <p className="text-neutral-500 text-sm font-medium mt-1">Configure os detalhes do seu compromisso.</p>
                      </div>
                      <button 
                        onClick={() => { setIsModalOpen(false); resetForm(); }}
                        className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-all active:scale-95"
                      >
                          <X className="w-6 h-6" />
                      </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      {error && (
                          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold">
                              <AlertCircle className="w-5 h-5 flex-shrink-0" />
                              <span>{error}</span>
                          </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-black text-neutral-700 ml-1">Assunto da Tarefa</label>
                              <input 
                                required
                                type="text" 
                                className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:bg-white focus:border-neutral-900 transition-all font-medium"
                                placeholder="Ex: Ligar para retorno de contrato"
                                value={taskForm.title}
                                onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                              />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-black text-neutral-700 ml-1">Prioridade</label>
                            <div className="flex gap-2">
                                {PRIORITIES.map(p => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setTaskForm({...taskForm, priority: p.id as any})}
                                        className={`flex-1 flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                                            taskForm.priority === p.id 
                                            ? `${p.bg} ${p.color} ${p.border} scale-105 shadow-sm` 
                                            : 'bg-neutral-50 border-neutral-100 text-neutral-400 opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <p.icon className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                                    </button>
                                ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-black text-neutral-700 ml-1">Categoria</label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map(c => (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => setTaskForm({...taskForm, category: c.id as any})}
                                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                                            taskForm.category === c.id 
                                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-lg' 
                                            : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:text-neutral-900 border-neutral-200'
                                        }`}
                                    >
                                        <c.icon className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-wider">{c.label}</span>
                                    </button>
                                ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-black text-neutral-700 ml-1">Data e Hora</label>
                            <input 
                                required
                                type="datetime-local" 
                                className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:bg-white focus:border-neutral-900 transition-all font-medium"
                                value={taskForm.dueDate}
                                onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})}
                            />
                          </div>
                          
                          <div className="space-y-2 relative">
                            <label className="text-sm font-black text-neutral-700 ml-1">Lead Relacionado</label>
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                <input 
                                    type="text"
                                    className="w-full pl-11 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:bg-white focus:border-neutral-900 transition-all font-medium"
                                    placeholder="Buscar lead por nome..."
                                    value={leadSearch}
                                    onChange={e => {
                                        setLeadSearch(e.target.value);
                                        if (!e.target.value) setTaskForm({...taskForm, leadId: ''});
                                    }}
                                />
                                {filteredLeads.length > 0 && (
                                    <div className="absolute z-10 w-full mt-2 bg-white border border-neutral-100 rounded-2xl shadow-xl overflow-hidden animate-in slide-in-from-top-2">
                                        {filteredLeads.map(lead => (
                                            <button
                                                key={lead.id}
                                                type="button"
                                                onClick={() => {
                                                    setTaskForm({...taskForm, leadId: lead.id});
                                                    setLeadSearch(lead.name);
                                                }}
                                                className="w-full flex flex-col items-start px-5 py-3 hover:bg-neutral-50 transition-colors text-left"
                                            >
                                                <span className="font-bold text-neutral-900 text-sm">{lead.name}</span>
                                                {lead.email && <span className="text-xs text-neutral-400">{lead.email}</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                          </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-sm font-black text-neutral-700 ml-1">Notas Adicionais</label>
                          <textarea 
                            className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-neutral-900/5 focus:bg-white focus:border-neutral-900 transition-all font-medium min-h-[100px] resize-none"
                            placeholder="Descreva detalhes importantes aqui..."
                            value={taskForm.description}
                            onChange={e => setTaskForm({...taskForm, description: e.target.value})}
                          />
                      </div>

                      <div className="pt-4 flex gap-4">
                          <button 
                            type="button"
                            onClick={() => { setIsModalOpen(false); resetForm(); }}
                            className="flex-1 py-4 bg-neutral-100 text-neutral-500 rounded-2xl font-bold hover:bg-neutral-200 transition-all active:scale-[0.98]"
                          >
                            Cancelar
                          </button>
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-lg shadow-neutral-200 disabled:opacity-70"
                          >
                            {isSubmitting ? 'Salvando...' : editingTaskId ? 'Salvar Alterações' : 'Criar Tarefa'}
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

// Custom CheckSquare helper
const CheckSquare = ({className}: {className?: string}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
)

export default TasksPage;
