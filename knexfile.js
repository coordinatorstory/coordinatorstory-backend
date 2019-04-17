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
      filename: './data/stories.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './data/seeds' }
  },
  testing: {
    client: 'sqlite3',
    // debug: true,
    connection: {
      filename: './data/stories-testing.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: { directory: './data/seeds' }
  },
  production: {
    client: 'postgresql',
    connection: prodDbConnection,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
