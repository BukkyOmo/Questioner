import express from 'express';

// Bootstrap express
import expressConfig from './config/express';

const port = process.env.PORT || 8282;
const app = express();
expressConfig(app);

app.listen(port);
console.info(`Application started on port ${port}`);

export default app;
