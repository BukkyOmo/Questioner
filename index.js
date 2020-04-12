import express from 'express';

const port = process.env.PORT || 5000;
const app = express();

// Bootstrap express
import expressConfig from './config/express';
expressConfig(app);

app.listen(port);
console.info('Application started on port ' + port);

export default app;
