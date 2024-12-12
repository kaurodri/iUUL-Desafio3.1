import dotenv from 'dotenv';
dotenv.config();

const configDatabase = {
    database: 'consultorio',
    username: 'postgres',
    password: process.env.SENHA_POSTGRE,
    host: 'localhost',
    dialect: 'postgres'
}

export default configDatabase;
