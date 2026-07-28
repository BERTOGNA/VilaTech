import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService, type Booking } from '../services/bookingService';
import TopNavigation from '../components/TopNavigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { Calendar, Clock, MapPin, Trash2, XCircle, ArrowLeft, RefreshCw, CheckCircle, Clock3 } from 'lucide-react';
import { toast } from 'sonner';

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // If not logged in, redirect to login page
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Você precisa fazer login para acessar essa página.');
      navigate('/admin/login', { state: { from: '/reservas/minhas' } });
    }
  }, [user, authLoading, navigate]);

  const loadMyBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching my bookings:', error);
      toast.error('Erro ao carregar seu histórico de reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadMyBookings();
    }
  }, [user]);

  const handleCancelBooking = async (id: string) => {
    if (!window.confirm('Tem certeza de que deseja cancelar esta reserva?')) return;

    try {
      await bookingService.updateBookingStatus(id, 'cancelled');
      toast.success('Reserva cancelada com sucesso.');
      // Refresh list
      loadMyBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Erro ao cancelar a reserva.');
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" />
            Confirmado
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock3 className="w-3.5 h-3.5" />
            Pendente
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Cancelado
          </span>
        );
      default:
        return null;
    }
  };

  // Split into active and past/cancelled
  const activeBookings = bookings.filter(b => b.status !== 'cancelled' && new Date(`${b.date}T${b.endTime}`) >= new Date());
  const pastBookings = bookings.filter(b => b.status === 'cancelled' || new Date(`${b.date}T${b.endTime}`) < new Date());

  return (
    <div className="min-h-screen bg-void-black text-white flex flex-col font-sans">
      <SEO title="Minhas Reservas — Vila Tech Hub" description="Gerencie suas reservas de coworking, salas de reunião e auditório no Vila Tech Hub." />
      <TopNavigation variant="coworking" />

      <main className="flex-grow pt-28 pb-20 px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Navigation back */}
        <div className="mb-8">
          <Link to="/reservas" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            Voltar para agendamento
          </Link>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold">Minhas Reservas</h1>
            <p className="text-white/40 text-sm mt-1">Veja seus agendamentos ativos e histórico de solicitações.</p>
          </div>
          <button 
            onClick={loadMyBookings}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm transition-all self-start sm:self-auto"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            Atualizar
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-16 bg-void-black/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Nenhuma reserva encontrada</h3>
            <p className="text-white/40 text-sm max-w-md mx-auto mb-6">
              Você ainda não realizou nenhum agendamento de espaço no Vila Tech Hub.
            </p>
            <Link to="/reservas" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-void-black font-semibold transition-all duration-300">
              Fazer minha primeira reserva
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Active Bookings */}
            <div>
              <h2 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Agendamentos Ativos
              </h2>
              
              {activeBookings.length === 0 ? (
                <p className="text-white/40 text-sm italic">Nenhuma reserva ativa para o futuro.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-void-black/60 border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                            {booking.resourceType === 'posicao' ? 'Coworking' : booking.resourceType === 'sala' ? 'Sala Reunião' : 'Auditório'}
                          </span>
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {booking.resourceName}
                          </h3>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="space-y-2.5 text-sm text-white/70 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white/40" />
                          <span>{booking.date.split('-').reverse().join('/')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-white/40" />
                          <span>{booking.startTime} às {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/40" />
                          <span>Vila Tech Hub — Andar 1</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="text-xs text-white/40 bg-white/5 p-3 rounded-xl border border-white/5 mb-6">
                          <span className="font-semibold block mb-0.5">Notas:</span>
                          {booking.notes}
                        </div>
                      )}

                      <div className="pt-4 border-t border-white/5 flex justify-end">
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10 hover:border-red-500 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Cancelar Reserva
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past or Cancelled Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white/50 mb-4">Histórico de Reservas</h2>
                <div className="space-y-3">
                  {pastBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-void-black/20 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white/60 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 hidden sm:block">
                          <Calendar className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">{booking.resourceName}</h4>
                          <span className="text-xs text-white/40 block mt-0.5">
                            {booking.date.split('-').reverse().join('/')} | {booking.startTime} - {booking.endTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <span className="text-xs text-white/30 capitalize">
                          {booking.resourceType}
                        </span>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
