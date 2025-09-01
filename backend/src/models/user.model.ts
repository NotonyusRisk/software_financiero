// Importaciones necesarias de Sequelize
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Definición de los atributos que tendrá el modelo User
interface UserAttributes {
  id: number; // Identificador único del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  password_hash: string; // Contraseña encriptada
  created_at?: Date; // Fecha de creación del usuario
}

// Permite que el campo 'id' sea opcional al crear un usuario
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definición de la clase User que extiende de Model de Sequelize
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number; // Identificador único
  public name!: string; // Nombre
  public email!: string; // Email
  public password_hash!: string; // Contraseña encriptada
  public readonly created_at!: Date; // Fecha de creación (solo lectura)
}

// Inicialización del modelo User con sus campos y opciones
User.init(
  {
    id: {
      type: DataTypes.INTEGER, // Tipo entero
      primaryKey: true,        // Clave primaria
      autoIncrement: true      // Autoincremental
    },
    name: {
      type: DataTypes.STRING,  // Tipo string
      allowNull: false         // No permite nulos
    },
    email: {
      type: DataTypes.STRING,  // Tipo string
      unique: true,            // Debe ser único
      allowNull: false         // No permite nulos
    },
    password_hash: {
      type: DataTypes.STRING,  // Tipo string
      allowNull: false         // No permite nulos
    },
    created_at: {
      type: DataTypes.DATE,    // Fecha de creación
      defaultValue: DataTypes.NOW // Valor por defecto: ahora
    }
  },
  {
    sequelize,                // Instancia de conexión
    modelName: 'User',        // Nombre del modelo
    tableName: 'users',       // Nombre de la tabla en la base de datos
    timestamps: false         // No usar timestamps automáticos
  }
);
