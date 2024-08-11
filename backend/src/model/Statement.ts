import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; // Import your Sequelize instance

// Define the attributes for the Statement model
interface StatementAttributes {
  id: string; // UUID for the statement
  Category: string;
  Type: 'SALARY' | 'CREDIT' | 'DEBIT'; // Enum for Type field
  Amount: number;
  Description: string;
  Date: Date;
}

// Optional fields for creating a statement (id is generated automatically)
interface StatementCreationAttributes extends Optional<StatementAttributes, 'id'> {}

// Extend the Sequelize Model class
class Statement extends Model<StatementAttributes, StatementCreationAttributes> implements StatementAttributes {
  public id!: string; // UUID will be generated automatically
  public Category!: string;
  public Type!: 'SALARY' | 'CREDIT' | 'DEBIT';
  public Amount!: number;
  public Description!: string;
  public Date!: Date;
}

// Initialize the model with the schema and options
Statement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
      primaryKey: true,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.ENUM('SALARY', 'CREDIT', 'DEBIT'),
      allowNull: false,
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Statements',
    timestamps: false,
  }
);

export default Statement;
