import { Request, Response } from 'express';
import * as productService from '../service/productService';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { price, productName } = req.body;

  if (price === undefined || productName === undefined) {
    return res.status(400).json({ message: 'Missing required fields: price and productName' });
  }

  try {
    const newProduct = await productService.createProduct(price, productName);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await productService.deleteProduct(parseInt(id, 10));
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
    await productService.updateProduct(parseInt(id, 10), price, productName);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(parseInt(id, 10));
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product by id:', error);
    res.status(500).json({ message: 'Error getting product by id' });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Error getting products' });
  }
};
