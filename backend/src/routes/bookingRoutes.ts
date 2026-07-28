import { Router } from 'express';
import { createBooking, getBookings, getMyBookings, updateBookingStatus, deleteBooking } from '../controllers/BookingController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Todas as rotas de reservas precisam de autenticação
router.use(authMiddleware);

router.post('/', createBooking);
router.get('/', getBookings);
router.get('/my-bookings', getMyBookings);
router.put('/:id/status', updateBookingStatus);
router.delete('/:id', deleteBooking);

export default router;
