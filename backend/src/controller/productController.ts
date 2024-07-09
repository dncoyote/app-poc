import { Request, Response } from 'express';
import { query } from '../db';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { price, productName } = req.body;

  if (price === undefined || productName === undefined) {
    return res.status(400).json({ message: 'Missing required fields: price and productName' });
  }

  try {
    const result: any = await query(
      'INSERT INTO Products (Price, ProductName) VALUES (?, ?)',
      [price, productName]
    );

    const newProductId = result.insertId;
    res.status(201).json({ ProductID: newProductId, Price: price, ProductName: productName });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await query('DELETE FROM Products WHERE ProductID = ?', [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { price, productName } = req.body;

  if (price === undefined || productName === undefined) {
    return res.status(400).json({ message: 'Missing required fields: price and productName' });
  }

  try {
    await query('UPDATE Products SET Price = ?, ProductName = ? WHERE ProductID = ?', [price, productName, id]);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Get all products
// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const [rows] = await query('SELECT * FROM Products');
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error('Error getting products:', error);
//     res.status(500).json({ message: 'Error getting products' });
//   }
// };
