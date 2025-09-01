// Importaciones necesarias de Sequelize y el modelo User
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

// Definición de los atributos del presupuesto
interface BudgetAttributes {
  id: number; // Identificador único del presupuesto
  user_id: number; // ID del usuario asociado
  amount: number; // Monto del presupuesto
  month: number; // Mes del presupuesto
  year: number; // Año del presupuesto
  created_at?: Date; // Fecha de creación
}

// Permite que el campo 'id' sea opcional al crear un presupuesto
interface BudgetCreationAttributes extends Optional<BudgetAttributes, 'id'> {}

// Definición de la clase Budget que extiende de Model de Sequelize
export class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> implements BudgetAttributes {
  public id!: number; // ID único
  public user_id!: number; // ID del usuario
  public amount!: number; // Monto
  public month!: number; // Mes
  public year!: number; // Año
  public readonly created_at!: Date; // Fecha de creación (solo lectura)
}

// Inicialización del modelo Budget con sus campos y opciones
Budget.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, // ID autoincremental
    user_id: { type: DataTypes.INTEGER, allowNull: false }, // Relación con usuario
    amount: { type: DataTypes.FLOAT, allowNull: false }, // Monto
    month: { type: DataTypes.INTEGER, allowNull: false }, // Mes
    year: { type: DataTypes.INTEGER, allowNull: false }, // Año
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // Fecha de creación
  },
  {
    sequelize, // Instancia de conexión
    modelName: 'Budget', // Nombre del modelo
    tableName: 'budgets', // Nombre de la tabla
    timestamps: false // No usar timestamps automáticos
  }
);

// Relación: un presupuesto pertenece a un usuario
Budget.belongsTo(User, { foreignKey: 'user_id' });
// Relación: un usuario puede tener muchos presupuestos
User.hasMany(Budget, { foreignKey: 'user_id' });
