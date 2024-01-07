import { app } from './server/Server';



try {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
} catch (error) {
  console.error(`Error starting server: ${error}`);
}