// Importaciones necesarias de Sequelize y el modelo User
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

// Definición de los atributos de la meta (Goal)
interface GoalAttributes {
  id: number; // Identificador único de la meta
  user_id: number; // ID del usuario asociado
  name: string; // Nombre de la meta
  target_amount: number; // Monto objetivo
  current_amount: number; // Monto acumulado actual
  deadline: Date; // Fecha límite para cumplir la meta
  created_at?: Date; // Fecha de creación
}

// Permite que el campo 'id' sea opcional al crear una meta
interface GoalCreationAttributes extends Optional<GoalAttributes, 'id'> {}

// Definición de la clase Goal que extiende de Model de Sequelize
export class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
  public id!: number; // ID único
  public user_id!: number; // ID del usuario
  public name!: string; // Nombre de la meta
  public target_amount!: number; // Monto objetivo
  public current_amount!: number; // Monto acumulado
  public deadline!: Date; // Fecha límite
  public readonly created_at!: Date; // Fecha de creación (solo lectura)
}

// Inicialización del modelo Goal con sus campos y opciones
Goal.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID autoincremental
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // Relación con usuario
    name: { type: DataTypes.STRING, allowNull: false }, // Nombre de la meta
    target_amount: { type: DataTypes.FLOAT, allowNull: false }, // Monto objetivo
    current_amount: { type: DataTypes.FLOAT, defaultValue: 0 }, // Monto acumulado
    deadline: { type: DataTypes.DATEONLY }, // Fecha límite
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Fecha de creación
  },
  {
    sequelize, // Instancia de conexión
    modelName: 'Goal', // Nombre del modelo
    tableName: 'goals', // Nombre de la tabla
    timestamps: false // No usar timestamps automáticos
  }
);

// Relación: una meta pertenece a un usuario
Goal.belongsTo(User, { foreignKey: 'user_id' });
// Relación: un usuario puede tener muchas metas
User.hasMany(Goal, { foreignKey: 'user_id' });
