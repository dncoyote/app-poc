import Statement from '../model/Statement';

// Create a new statement
export const createStatement = async (
  category: string,
  type: 'SALARY' | 'CREDIT' | 'DEBIT',
  amount: number,
  description: string,
  date: Date
) => {
  try {
    const newStatement = await Statement.create({ 
      Category: category, 
      Type: type, 
      Amount: amount, 
      Description: description, 
      Date: date 
    });
    return newStatement;
  } catch (error) {
    console.error('Error creating statement:', error);
    throw new Error('Error creating statement');
  }
};

// Delete a statement by ID
export const deleteStatement = async (id: string) => {
  try {
    const statement = await Statement.findByPk(id);
    if (!statement) {
      throw new Error('Statement not found');
    }

    await statement.destroy();
  } catch (error) {
    console.error('Error deleting statement:', error);
    throw new Error('Error deleting statement');
  }
};

// Update a statement by ID
export const updateStatement = async (
  id: string, 
  category: string, 
  type: 'SALARY' | 'CREDIT' | 'DEBIT', 
  amount: number, 
  description: string, 
  date: Date
) => {
  try {
    const statement = await Statement.findByPk(id);
    if (!statement) {
      throw new Error('Statement not found');
    }

    statement.Category = category;
    statement.Type = type;
    statement.Amount = amount;
    statement.Description = description;
    statement.Date = date;
    await statement.save();
  } catch (error) {
    console.error('Error updating statement:', error);
    throw new Error('Error updating statement');
  }
};

// Get a statement by ID
export const getStatementById = async (id: string) => {
  try {
    const statement = await Statement.findByPk(id);
    if (!statement) {
      throw new Error('Statement not found');
    }
    return statement;
  } catch (error) {
    console.error('Error getting statement by id:', error);
    throw new Error('Error getting statement by id');
  }
};

// Get all statements
export const getAllStatements = async () => {
  try {
    const statements = await Statement.findAll();
    return statements;
  } catch (error) {
    console.error('Error getting statements:', error);
    throw new Error('Error getting statements');
  }
};
