import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_URL || '', {
  dialect: 'postgres',
  logging: false
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado a la base de datos correctamente');
  } catch (error) {
    console.error('🔴 Error al conectar con la base de datos:', error);
  }
};
