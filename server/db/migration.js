import db from './index';
import { createQueries, dropQueries } from './queries';

const {
  userTable, postTable,
} = createQueries;

const createTables = async () => {
  try {
    const user = await db.query(userTable);
    console.log(user);
    const post = await db.query(postTable);
    console.log(post);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async () => {
  try {
    const user = await db.query(dropQueries.userTable);
    console.log(user);
    const post = await db.query(dropQueries.postTable);
    console.log(post);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createTables,
  dropTables,
};
require('make-runnable');
