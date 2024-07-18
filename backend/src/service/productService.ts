import Product from '../model/Product';

// Create a new product
export const createProduct = async (price: number, productName: string) => {
  try {
    const newProduct = await Product.create({ Price: price, ProductName: productName });
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

// Delete a product by ID
export const deleteProduct = async (id: number) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    await product.destroy();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};

// Update a product by ID
export const updateProduct = async (id: number, price: number, productName: string) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }

    product.Price = price;
    product.ProductName = productName;
    await product.save();
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};

// Get a product by ID
export const getProductById = async (id: number) => {
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error getting product by id:', error);
      throw new Error('Error getting product by id');
    }
  };
  

// Get all products
export const getAllProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw new Error('Error getting products');
  }
};
