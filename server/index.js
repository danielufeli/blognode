import express from 'express';
import 'airbnb-browser-shims';
import routes from './routes/routes';

const app = express();

routes(app);

const port = process.env.PORT || 3000;
console.log(`Server Running on port ${port}`);
const server = app.listen(port);
export default server;
