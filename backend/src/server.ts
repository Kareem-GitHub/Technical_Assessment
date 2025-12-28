import 'dotenv/config';
import app from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
