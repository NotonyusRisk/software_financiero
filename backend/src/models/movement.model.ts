// Importaciones necesarias de Sequelize y el modelo User
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

// Definición de los atributos del movimiento financiero
interface MovementAttributes {
  id: number; // Identificador único del movimiento
  user_id: number; // ID del usuario asociado
  type: 'ingreso' | 'egreso'; // Tipo de movimiento: ingreso o egreso
  amount: number; // Monto del movimiento
  description: string; // Descripción del movimiento
  date: Date; // Fecha del movimiento
  created_at?: Date; // Fecha de creación
}

// Permite que el campo 'id' sea opcional al crear un movimiento
interface MovementCreationAttributes extends Optional<MovementAttributes, 'id'> {}

// Definición de la clase Movement que extiende de Model de Sequelize
export class Movement extends Model<MovementAttributes, MovementCreationAttributes> implements MovementAttributes {
  public id!: number; // ID único
  public user_id!: number; // ID del usuario
  public type!: 'ingreso' | 'egreso'; // Tipo de movimiento
  public amount!: number; // Monto
  public description!: string; // Descripción
  public date!: Date; // Fecha
  public readonly created_at!: Date; // Fecha de creación (solo lectura)
}

// Inicialización del modelo Movement con sus campos y opciones
Movement.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, // ID autoincremental
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // Relación con usuario
    type: { type: DataTypes.ENUM('ingreso', 'egreso'), allowNull: false }, // Tipo de movimiento
    amount: { type: DataTypes.FLOAT, allowNull: false }, // Monto
    description: { type: DataTypes.TEXT }, // Descripción
    date: { type: DataTypes.DATEONLY, allowNull: false }, // Fecha
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Fecha de creación
  },
  {
    sequelize, // Instancia de conexión
    modelName: 'Movement', // Nombre del modelo
    tableName: 'movements', // Nombre de la tabla
    timestamps: false // No usar timestamps automáticos
  }
);

// Relación: un movimiento pertenece a un usuario
Movement.belongsTo(User, { foreignKey: 'user_id' });
// Relación: un usuario puede tener muchos movimientos
User.hasMany(Movement, { foreignKey: 'user_id' });
