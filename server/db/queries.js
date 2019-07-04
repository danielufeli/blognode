const createQueries = {
  userTable: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mobileno VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(100),
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isadmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
  )`,
  postTable: `CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    descriptions TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    images VARCHAR(100) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  postTable: 'DROP TABLE IF EXISTS posts CASCADE',
};
const hashPassword = '$2a$10$Pei8CV/I0Z3BMFVJuJClaePYmvc.tKnaGK3xFXKJoTTjul84exLfe';
const seedQueries = {
  userTable: `INSERT INTO
  users(firstname, lastname, email, mobileno, address, isadmin, password)
  VALUES('Daniel', 'Ufeli', 'admin@wayfarer.com', '08082205956', '26 fagbeyiro street alakuko', true, '${hashPassword}'),
  ('James', 'Oniola', 'user1@wayfarer.com', '08105334020', '26 fagbeyiro street alakuko', false, '${hashPassword}'),
  ('Olanrewaju', 'Julius', 'user2@wayfarer.com', '08037265917', '26 fagbeyiro street alakuko', false, '${hashPassword}')
  `,
};

module.exports = {
  createQueries,
  dropQueries,
  seedQueries,
};
