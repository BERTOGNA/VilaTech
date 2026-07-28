import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService, type Resource, type Booking } from '../services/bookingService';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { Calendar as CalendarIcon, Clock, Users, Sparkles, MapPin, Volume2, Video, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedType, setSelectedType] = useState<'posicao' | 'sala' | 'auditorio'>('posicao');
  const [selectedResourceId, setSelectedResourceId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [notes, setNotes] = useState<string>('');
  
  const [bookingsForDate, setBookingsForDate] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Load resources
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await bookingService.getResources();
        setResources(data);
        // Set first resource of selected type as default
        const typed = data.filter(r => r.type === selectedType);
        if (typed.length > 0) {
          setSelectedResourceId(typed[0].id);
        }
      } catch (error) {
        console.error('Error loading resources:', error);
        toast.error('Erro ao carregar os espaços disponíveis.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedType]);

  // Load bookings for the selected resource and date to check availability
  useEffect(() => {
    if (!selectedResourceId || !selectedDate) return;

    async function loadBookings() {
      try {
        const data = await bookingService.getBookings({
          date: selectedDate,
          resourceId: selectedResourceId
        });
        setBookingsForDate(data.filter(b => b.status !== 'cancelled'));
      } catch (error) {
        console.error('Error loading bookings for availability:', error);
      }
    }
    loadBookings();
  }, [selectedResourceId, selectedDate]);

  // Handle Type Tab Change
  const handleTypeChange = (type: 'posicao' | 'sala' | 'auditorio') => {
    setSelectedType(type);
    const typed = resources.filter(r => r.type === type);
    if (typed.length > 0) {
      setSelectedResourceId(typed[0].id);
    } else {
      setSelectedResourceId('');
    }
  };

  // Check if a time range conflicts with existing bookings
  const isTimeSlotBooked = (start: string, end: string): boolean => {
    return bookingsForDate.some(b => {
      return start < b.endTime && end > b.startTime;
    });
  };

  // Submit Reservation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Você precisa estar logado para realizar uma reserva.');
      navigate('/admin/login', { state: { from: '/reservas' } });
      return;
    }

    if (!selectedResourceId) {
      toast.error('Por favor, selecione um espaço.');
      return;
    }

    if (startTime >= endTime) {
      toast.error('O horário de término deve ser posterior ao horário de início.');
      return;
    }

    // Check collision
    if (isTimeSlotBooked(startTime, endTime)) {
      toast.error('Conflito de Horário: Este período já está reservado para o espaço selecionado.');
      return;
    }

    try {
      setSubmitting(true);
      await bookingService.createBooking({
        resourceId: selectedResourceId,
        date: selectedDate,
        startTime,
        endTime,
        notes
      });

      toast.success(
        selectedType === 'posicao'
          ? 'Reserva confirmada com sucesso!'
          : 'Solicitação enviada! Aguardando aprovação administrativa.'
      );
      
      // Reset form or navigate
      setNotes('');
      navigate('/reservas/minhas');
    } catch (error: any) {
      console.error('Error creating booking:', error);
      const msg = error.response?.data?.message || 'Erro ao realizar o agendamento.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Render Seats Layout for Coworking Desks
  const renderDeskLayout = () => {
    const desks = resources.filter(r => r.type === 'posicao');
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-6">
        {desks.map((desk) => {
          // Check if desk is booked for any portion of the selected day
          // For desks, let's say they book the desk for the selected start/end times
          const isBooked = bookingsForDate.some(b => 
            b.resourceId === desk.id && 
            b.status !== 'cancelled' && 
            startTime < b.endTime && 
            endTime > b.startTime
          );

          const isSelected = selectedResourceId === desk.id;

          return (
            <button
              key={desk.id}
              type="button"
              disabled={isBooked}
              onClick={() => setSelectedResourceId(desk.id)}
              className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${
                isBooked
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed opacity-50'
                  : isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.03]'
                    : 'bg-void-black/60 border-white/10 hover:border-cyan-500/40 text-white/70 hover:text-white hover:scale-[1.02]'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                <Users className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-white/60'}`} />
              </div>
              <span className="text-xs font-semibold">{desk.name}</span>
              <span className="text-[10px] text-white/40">
                {isBooked ? 'Ocupado' : 'Disponível'}
              </span>
              
              {/* LED glow on select */}
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-pulse pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const selectedResourceObj = resources.find(r => r.id === selectedResourceId);

  return (
    <div className="min-h-screen bg-void-black text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <SEO 
        title="Reservar Espaço — Vila Tech Hub" 
        description="Agende estações de coworking, salas de reunião com suporte a videochamada e nosso auditório completo de tecnologia." 
      />
      <TopNavigation variant="coworking" />

      {/* Main Container */}
      <main className="flex-grow pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Banner Section */}
        <div className="relative mb-12 rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-r from-void-black to-slate-900/50 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
          
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Sistema de Agendamento
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Reserve seu espaço na <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">Vila Tech</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              Trabalhe na nossa estrutura premium de coworking, faça suas reuniões corporativas ou organize eventos no nosso auditório de ponta.
            </p>
          </div>
          
          {user && (
            <div className="mt-8 flex">
              <Link 
                to="/reservas/minhas" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                Minhas Reservas
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </Link>
            </div>
          )}
        </div>

        {/* Tab Seletor */}
        <div className="flex border-b border-white/10 gap-2 mb-8 overflow-x-auto pb-1">
          {[
            { id: 'posicao', label: 'Estação de Coworking', icon: Users },
            { id: 'sala', label: 'Salas de Reunião', icon: Video },
            { id: 'auditorio', label: 'Auditório Principal', icon: Volume2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = selectedType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTypeChange(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap ${
                  active
                    ? 'border-cyan-400 text-cyan-400'
                    : 'border-transparent text-white/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Loading Screen */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Resource Picker */}
            <div className="lg:col-span-2 space-y-6">
              {/* Coworking Grid */}
              {selectedType === 'posicao' ? (
                <div className="bg-void-black/40 border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Escolha seu Assento</h2>
                      <p className="text-xs text-white/40">Selecione uma estação disponível no mapa abaixo.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1.5 text-white/60">
                        <span className="w-2.5 h-2.5 rounded bg-white/20 border border-white/10" />
                        Disponível
                      </span>
                      <span className="flex items-center gap-1.5 text-white/60">
                        <span className="w-2.5 h-2.5 rounded bg-cyan-500/30 border border-cyan-400" />
                        Selecionado
                      </span>
                      <span className="flex items-center gap-1.5 text-white/60">
                        <span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500/30" />
                        Reservado
                      </span>
                    </div>
                  </div>
                  {renderDeskLayout()}
                </div>
              ) : (
                /* Rooms & Auditorium List */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resources
                    .filter(r => r.type === selectedType)
                    .map((resource) => {
                      const isSelected = selectedResourceId === resource.id;
                      return (
                        <button
                          key={resource.id}
                          onClick={() => setSelectedResourceId(resource.id)}
                          className={`text-left p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-64 relative overflow-hidden group ${
                            isSelected
                              ? 'bg-indigo-950/20 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] scale-[1.01]'
                              : 'bg-void-black/60 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-white/70 border border-white/10">
                                <Users className="w-3 h-3 text-cyan-400" />
                                Até {resource.capacity} pessoas
                              </span>
                              {resource.pricePerHour && (
                                <span className="text-sm font-semibold text-cyan-400">
                                  R$ {resource.pricePerHour}/h
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                              {resource.name}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {resource.amenities.slice(0, 3).map((a, i) => (
                                <span key={i} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-md">
                                  {a}
                                </span>
                              ))}
                              {resource.amenities.length > 3 && (
                                <span className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-md">
                                  +{resource.amenities.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-white/5">
                            <span className="text-xs text-white/40 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> Vila Tech Hub
                            </span>
                            <span className={`text-xs font-semibold ${isSelected ? 'text-cyan-400' : 'text-white/60'}`}>
                              {isSelected ? 'Selecionado' : 'Selecionar'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                </div>
              )}

              {/* Resource Info Detail */}
              {selectedResourceObj && (
                <div className="bg-void-black/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Sobre o Espaço
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-white/60 mb-2 font-semibold">Nome do Espaço</p>
                      <p className="text-white/90 text-base">{selectedResourceObj.name}</p>
                    </div>
                    <div>
                      <p className="text-white/60 mb-2 font-semibold">Capacidade</p>
                      <p className="text-white/90 text-base">{selectedResourceObj.capacity} pessoa(s)</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-white/60 mb-2 font-semibold">Estrutura Inclusa (Amenities)</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedResourceObj.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-white/80 bg-white/5 p-2.5 rounded-xl border border-white/5">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="text-xs">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Reservation Settings Form */}
            <div className="bg-void-black/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md h-fit">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-cyan-400" />
                Dados do Agendamento
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Data da Reserva
                  </label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-void-black/80 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 text-sm outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Time range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Horário Entrada
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                      <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-void-black/80 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all appearance-none"
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 8).map(hour => (
                          <option key={hour} value={`${String(hour).padStart(2, '0')}:00`}>
                            {String(hour).padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                      Horário Saída
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 w-4 h-4 text-white/40" />
                      <select
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full bg-void-black/80 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition-all appearance-none"
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 9).map(hour => (
                          <option key={hour} value={`${String(hour).padStart(2, '0')}:00`}>
                            {String(hour).padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Observações (Opcional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Alguma necessidade especial para seu agendamento?"
                    rows={3}
                    className="w-full bg-void-black/80 border border-white/10 hover:border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-4 text-white placeholder-white/30 text-sm outline-none transition-all resize-none"
                  />
                </div>

                {/* Conflict Alert */}
                {isTimeSlotBooked(startTime, endTime) && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex gap-3 text-xs">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <div>
                      <span className="font-bold">Horário Indisponível</span>
                      <p className="mt-1">Já existe um agendamento conflitante para este espaço no horário selecionado.</p>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                {!user ? (
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center space-y-4">
                    <p className="text-xs text-white/60">
                      Você precisa estar conectado à sua conta para confirmar agendamentos.
                    </p>
                    <Link
                      to="/admin/login"
                      state={{ from: '/reservas' }}
                      className="w-full block text-center py-3 rounded-xl bg-cyan-500 text-void-black font-semibold hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 text-sm"
                    >
                      Fazer Login
                    </Link>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting || isTimeSlotBooked(startTime, endTime)}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-void-black font-bold text-sm rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-void-black border-t-transparent" />
                    ) : (
                      <>
                        Confirmar Agendamento
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
