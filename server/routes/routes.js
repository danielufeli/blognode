import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import home from './home';
import auth from './auth';
import posts from './posts';
import swaggerSpec from '../config/swagger';

export default (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/', home);
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/posts', posts);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
