import VerificarDadosPaciente from '../../classes/VerificarDadosPaciente.js';
import PacienteNovo from '../Paciente.js';

class Paciente {
    constructor() {
        this.pacientes = [];
    }

    cadastrarPaciente(cpf, nome, dataNascimento) {
        const verificando = new VerificarDadosPaciente();

        const CPF = verificando.validarCPF(cpf);
        const NOME = verificando.validarNome(nome);
        const NASCIMENTO = verificando.validarDataNascimento(dataNascimento);

        if(CPF.verificar && NOME.verificar && NASCIMENTO.verificar) {
            PacienteNovo.of(cpf, nome, dataNascimento);
            return {
                verificar: true,
                mensagem: 'Paciente cadastrado com sucesso'
            };
        } else {
            let mensagemERRO = !CPF.verificar ? CPF.mensagem : !NOME.verificar ? NOME.mensagem : !NASCIMENTO.verificar ? NASCIMENTO.mensagem : 'CPF Já Cadastrado';
            return {
                verificar: false,
                mensagem: `Erro ao cadastrar o paciente [${mensagemERRO}]`
            };
        }
    }

    async listarPacientes() {
        const pacientes = await PacienteNovo.findAll();
        return pacientes;
    }
}

export default Paciente;