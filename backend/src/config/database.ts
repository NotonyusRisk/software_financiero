import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_URL || '', {
  dialect: 'postgres',
  logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado a la base de datos');
  } catch (err) {
    console.error('🔴 Error conectando a la DB:', err);
  }
};
