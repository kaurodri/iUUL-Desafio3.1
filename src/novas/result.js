/**
 * Classe que representa o resultado de uma operação
 */
class Result {
    /**
     * Resultado em caso de sucesso
     */
    #value;

    /**
     * Lista de erros em caso de fracasso
     */
    #errors;

    constructor(value, errors) {
        this.#value = value;
        this.#errors = errors;
    }

    get isSuccess() {
        return this.#value !== null;
    }

    get isFailure() {
        return this.#errors !== null;
    }

    get value() {
        return this.#value;
    }

    get errors() {
        return this.#errors;
    }

    /**
     * Cria o objeto em caso de sucesso
     *
     * @param {Any} value
     * @returns Objeto Resultado
     */
    static success(value) {
        return new Result(value, null);
    }

    /**
     * Cria o objeto em caso de sucesso
     *
     * @param {Array} errors
     * @returns Objeto Resultado
     */
    static failure(errors) {
        return new Result(null, errors);
    }
}

export default Result;
