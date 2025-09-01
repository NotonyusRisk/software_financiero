// Importa la instancia de conexión y todos los modelos para registrarlos en Sequelize
import { sequelize } from '../config/database';
import './user.model'; // Modelo de usuario
import './movement.model'; // Modelo de movimientos financieros
import './goal.model'; // Modelo de metas
import './budget.model'; // Modelo de presupuestos

// Función para sincronizar los modelos con la base de datos
export const syncModels = async () => {
  try {
    // Sincroniza los modelos con la base de datos (crea o actualiza tablas)
    await sequelize.sync({ alter: true }); // o { force: false } para recrear
    console.log('🟢 Modelos sincronizados con la base de datos');
  } catch (error) {
    // Manejo de errores en la sincronización
    console.error('🔴 Error al sincronizar modelos:', error);
  }
};
