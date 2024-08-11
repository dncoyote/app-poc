import { Request, Response } from 'express';
import * as statementService from '../service/statementService';

// Create a new statement
export const createStatement = async (req: Request, res: Response) => {
  const { category, type, amount, description, date } = req.body;

  if (!category || !type || !amount || !description || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newStatement = await statementService.createStatement(category, type, amount, description, date);
    res.status(201).json(newStatement);
  } catch (error) {
    console.error('Error creating statement:', error);
    res.status(500).json({ message: 'Error creating statement' });
  }
};

// Delete a statement by ID
export const deleteStatement = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await statementService.deleteStatement(id);
    res.status(200).json({ message: 'Statement deleted successfully' });
  } catch (error) {
    console.error('Error deleting statement:', error);
    res.status(500).json({ message: 'Error deleting statement' });
  }
};

// Update a statement by ID
export const updateStatement = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category, type, amount, description, date } = req.body;

  if (!category || !type || !amount || !description || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await statementService.updateStatement(id, category, type, amount, description, date);
    res.status(200).json({ message: 'Statement updated successfully' });
  } catch (error) {
    console.error('Error updating statement:', error);
    res.status(500).json({ message: 'Error updating statement' });
  }
};

// Get a statement by ID
export const getStatementById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const statement = await statementService.getStatementById(id);
    res.status(200).json(statement);
  } catch (error) {
    console.error('Error getting statement by id:', error);
    res.status(500).json({ message: 'Error getting statement by id' });
  }
};

// Get all statements
export const getAllStatements = async (req: Request, res: Response) => {
  try {
    const statements = await statementService.getAllStatements();
    res.status(200).json(statements);
  } catch (error) {
    console.error('Error getting statements:', error);
    res.status(500).json({ message: 'Error getting statements' });
  }
};
