const dummyPgConfig = {
  // placeholder since there is no pg locally
  host: '',
  database: '',
  user: '',
  password: ''
};
const prodDbConnection = process.env.DATABASE_URL || dummyPgConfig;

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/stories.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './db/seeds' }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './db/stories-testing.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './db/seeds' }
  },
  production: {
    client: 'postgresql',
    connection: prodDbConnection,
    migrations: {
      directory: './db/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
