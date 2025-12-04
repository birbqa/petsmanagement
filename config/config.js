import dotenv from 'dotenv';

dotenv.config();

export let config = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    },
    app: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    }
}