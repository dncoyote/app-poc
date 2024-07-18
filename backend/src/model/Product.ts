// export interface Product {
//     ProductID?: number; // ? indicates optional field, typically for auto-incremented primary keys
//     Price: number;
//     ProductName: string;
//   }
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db'; // Import your Sequelize instance

interface ProductAttributes {
  ProductID?: number;
  Price: number;
  ProductName: string;
}

// Optional fields for creating a product
interface ProductCreationAttributes extends Optional<ProductAttributes, 'ProductID'> {}

// Extend the Sequelize Model class
class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public ProductID!: number; // Non-null assertion since it might be optional initially but will be defined by Sequelize
  public Price!: number;
  public ProductName!: string;
}

// Initialize the model with the schema and options
Product.init(
  {
    ProductID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Products',
    timestamps: false, // Assuming your table doesn't have createdAt and updatedAt fields
  }
);

export default Product;
