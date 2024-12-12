import { Sequelize } from 'sequelize';
import configDatabase from './database.js';
import ModelPaciente from '../novas/Model.js';
import PacienteNovo from '../novas/Paciente.js';

class Banco {
    #sequelize;

    async iniciar() {
        this.#sequelize = new Sequelize(
            configDatabase.database,
            configDatabase.username,
            configDatabase.password,
            {
                host: configDatabase.host,
                dialect: configDatabase.dialect,
                logging: false,
            }
        );
        
        try {
            await this.#sequelize.authenticate();
        } catch (error) {
            return false;
        }

        ModelPaciente(PacienteNovo, this.#sequelize, Sequelize.DataTypes);

        return true;
    }

    get sequelize() {
        return this.#sequelize;
    }
}

const db = new Banco();

export default db;
