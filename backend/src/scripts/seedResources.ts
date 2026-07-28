import { bookingDb } from '../config/bookingDb';
import { Resource } from '../models/bookingTypes';

const initialResources: Omit<Resource, 'id'>[] = [
  // Posições de Coworking (Desks)
  {
    name: 'Mesa de Coworking 01',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 1
  },
  {
    name: 'Mesa de Coworking 02',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 2
  },
  {
    name: 'Mesa de Coworking 03',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 3
  },
  {
    name: 'Mesa de Coworking 04',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 4
  },
  {
    name: 'Mesa de Coworking 05',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 5
  },
  {
    name: 'Mesa de Coworking 06',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 6
  },
  {
    name: 'Mesa de Coworking 07',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 7
  },
  {
    name: 'Mesa de Coworking 08',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 8
  },
  {
    name: 'Mesa de Coworking 09',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 9
  },
  {
    name: 'Mesa de Coworking 10',
    type: 'posicao',
    capacity: 1,
    amenities: ['Tomada Individual', 'Cadeira Ergonômica', 'Wi-Fi de Alta Velocidade'],
    pricePerHour: 10,
    isActive: true,
    order: 10
  },
  // Salas de Reunião
  {
    name: 'Sala de Reunião Alpha',
    type: 'sala',
    capacity: 6,
    amenities: ['Mesa de Reunião', 'TV 55"', 'Quadro Branco de Vidro', 'Climatizada', 'Café & Água'],
    pricePerHour: 50,
    isActive: true,
    order: 11
  },
  {
    name: 'Sala de Reunião Beta',
    type: 'sala',
    capacity: 10,
    amenities: ['Mesa de Reunião Ampla', 'TV 75" com Videochamada', 'Quadro Branco de Vidro', 'Climatizada', 'Café & Água premium'],
    pricePerHour: 80,
    isActive: true,
    order: 12
  },
  // Auditório
  {
    name: 'Auditório Principal',
    type: 'auditorio',
    capacity: 50,
    amenities: ['Projetor Laser 4K', 'Sistema de Som Estéreo', 'Microfones Sem Fio', 'Palco com Púlpito', 'Climatização Inteligente', 'Área de Credenciamento'],
    pricePerHour: 200,
    isActive: true,
    order: 13
  }
];

async function seedResources() {
  console.log('--- Iniciando Semeadura (Seed) de Recursos via bookingDb ---');
  try {
    for (let index = 0; index < initialResources.length; index++) {
      const res = initialResources[index];
      const id = res.type === 'posicao' 
        ? `mesa-${String(index + 1).padStart(2, '0')}`
        : res.type === 'sala'
          ? `sala-${res.name.toLowerCase().split(' ').pop()}`
          : 'auditorio-principal';

      const fullResource: Resource = { id, ...res };
      await bookingDb.saveResource(fullResource);
      console.log(`Resource ${id} seeded.`);
    }
    console.log('Sucesso: Recursos de teste semeados com sucesso!');
  } catch (error) {
    console.error('Erro ao semear recursos:', error);
  } finally {
    process.exit(0);
  }
}

seedResources();
