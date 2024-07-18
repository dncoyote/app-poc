import app from './app';
import { initializeDatabase } from './db';

const port = 5000;

// Initialize database on application startup
initializeDatabase()
  .then(() => {
    console.log('Database initialization complete');

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Exit the process with failure status
  });
