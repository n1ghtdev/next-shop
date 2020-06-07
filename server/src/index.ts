import { app } from './app';

const port = process.env.PORT || 8080;

app
  .listen(port, () => {
    console.info(`Server running on port ${port}`);
  })
  .on('error', (error: Error) => {
    console.error(error.message);
  });
