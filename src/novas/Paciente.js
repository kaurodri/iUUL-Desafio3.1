import { Model } from "sequelize";
import Result from "./result.js";

class PacienteNovo extends Model {
    
    static of(cpf, nome, dataNascimento) {
        const errors = [];

        return errors.length == 0
            ? Result.success(PacienteNovo.build({ cpf, nome, dataNascimento }))
            : Result.failure(errors);
    }
}

export default PacienteNovo;
