import { useState, useEffect } from 'react';
import { bookingService, type Booking } from '../../services/bookingService';
import { Calendar, Clock, User, Check, X, Trash2, Filter, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      const data = await bookingService.getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching admin bookings:', error);
      toast.error('Erro ao buscar lista de reservas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBookings();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await bookingService.updateBookingStatus(id, 'confirmed');
      toast.success('Reserva confirmada com sucesso.');
      loadAllBookings();
    } catch (error) {
      console.error('Error approving booking:', error);
      toast.error('Erro ao aprovar a reserva.');
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('Deseja realmente rejeitar/cancelar esta reserva?')) return;

    try {
      await bookingService.updateBookingStatus(id, 'cancelled');
      toast.success('Reserva cancelada com sucesso.');
      loadAllBookings();
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error('Erro ao rejeitar a reserva.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza de que deseja EXCLUIR permanentemente esta reserva?')) return;

    try {
      await bookingService.deleteBooking(id);
      toast.success('Reserva excluída com sucesso.');
      loadAllBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Erro ao excluir a reserva.');
    }
  };

  // Stats calculation
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  // Filtered list
  const filteredBookings = bookings.filter(b => {
    const matchesType = filterType === 'all' || b.resourceType === filterType;
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesDate = !filterDate || b.date === filterDate;
    return matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wider text-white uppercase">Gestão de Reservas</h1>
          <p className="text-neutral-500 text-sm mt-1">Acompanhe, aprove e gerencie os agendamentos do coworking, salas de reunião e auditório.</p>
        </div>
        <button 
          onClick={loadAllBookings}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
          Atualizar Lista
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111111] border border-neutral-800/60 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl" />
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-black">Total Reservado</p>
          <p className="text-3xl font-black text-white mt-2">{totalBookings}</p>
        </div>

        <div className="bg-[#111111] border border-neutral-800/60 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl" />
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-black">Pendentes</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-3xl font-black text-amber-400">{pendingCount}</p>
            {pendingCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
          </div>
        </div>

        <div className="bg-[#111111] border border-neutral-800/60 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-black">Confirmados</p>
          <p className="text-3xl font-black text-emerald-400 mt-2">{confirmedCount}</p>
        </div>

        <div className="bg-[#111111] border border-neutral-800/60 p-6 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl" />
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-black">Cancelados</p>
          <p className="text-3xl font-black text-red-500 mt-2">{cancelledCount}</p>
        </div>
      </div>

      {/* Filter and Content Card */}
      <div className="bg-[#111111] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Filters Header */}
        <div className="p-6 md:p-8 border-b border-neutral-800 bg-neutral-900/30 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-xs uppercase tracking-widest text-neutral-400">Filtros</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            {/* Resource Type */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-black/40 border border-neutral-800 text-neutral-300 text-xs px-4 py-2.5 rounded-xl outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="all">Todos os tipos</option>
              <option value="posicao">Coworking (Mesa)</option>
              <option value="sala">Salas de Reunião</option>
              <option value="auditorio">Auditório</option>
            </select>

            {/* Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-black/40 border border-neutral-800 text-neutral-300 text-xs px-4 py-2.5 rounded-xl outline-none focus:border-cyan-500 transition-colors cursor-pointer"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option>
              <option value="cancelled">Cancelado</option>
            </select>

            {/* Date */}
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="bg-black/40 border border-neutral-800 text-neutral-300 text-xs px-4 py-2 rounded-xl outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Bookings Table / List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 px-8 text-neutral-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-20 text-white" />
            <p className="font-bold text-sm uppercase tracking-widest text-neutral-400">Nenhuma reserva encontrada</p>
            <p className="text-xs text-neutral-600 mt-1">Experimente alterar os filtros aplicados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] text-neutral-500 uppercase tracking-widest font-black bg-neutral-900/10">
                  <th className="py-5 px-6">Espaço / Recurso</th>
                  <th className="py-5 px-6">Usuário</th>
                  <th className="py-5 px-6">Data / Horário</th>
                  <th className="py-5 px-6">Notas</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/50">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/[0.01] transition-colors group">
                    {/* Resource Column */}
                    <td className="py-5 px-6">
                      <div className="font-bold text-white text-sm">{booking.resourceName}</div>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                        {booking.resourceType === 'posicao' ? 'Coworking' : booking.resourceType === 'sala' ? 'Sala Reunião' : 'Auditório'}
                      </span>
                    </td>

                    {/* User Column */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-neutral-400 text-xs border border-neutral-800">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs">{booking.userName}</div>
                          <div className="text-[10px] text-neutral-500 mt-0.5">{booking.userEmail}</div>
                        </div>
                      </div>
                    </td>

                    {/* Date/Time Column */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {booking.date.split('-').reverse().join('/')}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </td>

                    {/* Notes Column */}
                    <td className="py-5 px-6 max-w-xs truncate text-xs text-neutral-400">
                      {booking.notes ? (
                        <span title={booking.notes}>{booking.notes}</span>
                      ) : (
                        <span className="text-neutral-600 italic">Sem notas</span>
                      )}
                    </td>

                    {/* Status Column */}
                    <td className="py-5 px-6">
                      {booking.status === 'confirmed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Confirmado
                        </span>
                      ) : booking.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                          Pendente
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">
                          Cancelado
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(booking.id)}
                            title="Aprovar Agendamento"
                            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 transition-all"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button
                            onClick={() => handleReject(booking.id)}
                            title="Recusar/Cancelar Agendamento"
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          title="Excluir Registro"
                          className="p-2 rounded-xl bg-neutral-950 hover:bg-rose-500/10 text-neutral-600 hover:text-rose-400 border border-neutral-900 hover:border-rose-500/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
