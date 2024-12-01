import VerificarDadosPaciente from './VerificarDadosPaciente.js';
import ListagemPaciente from './ListagemPaciente.js';

class Paciente {
    constructor() {
        this.pacientes = [];
    }

    verificarCPFExistente(cpf) {
        return this.pacientes.some(paciente => paciente.cpf === cpf);
    }

    cadastrarPaciente(cpf, nome, dataNascimento) {
        const verificando = new VerificarDadosPaciente();

        const CPF = verificando.validarCPF(cpf);
        const NOME = verificando.validarNome(nome);
        const NASCIMENTO = verificando.validarDataNascimento(dataNascimento);
        const EXISTENTE = this.verificarCPFExistente(cpf);

        if(CPF.verificar && NOME.verificar && NASCIMENTO.verificar && !EXISTENTE) {
            this.pacientes.push({ cpf, nome, dataNascimento });
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

    excluirPaciente(cpf, agendamentos) {
        if (!this.verificarCPFExistente(cpf)) {
            return {
                verificar: false,
                mensagem: 'Erro: paciente não cadastrado'
            };
        }

        const pacienteAgendamentosFuturos = agendamentos.some(agendamento => 
            agendamento.cpf === cpf && DateTime.fromFormat(agendamento.dataConsulta, 'dd/MM/yyyy') > DateTime.now()
        );

        if (pacienteAgendamentosFuturos) {
            return {
                verificar: false,
                mensagem: 'Erro: paciente está agendado.'
            };
        }

        const agendamentosPassados = agendamentos.filter(agendamento => agendamento.cpf === cpf && DateTime.fromFormat(agendamento.dataConsulta, 'dd/MM/yyyy') < DateTime.now());

        agendamentos = agendamentos.filter(agendamento => !agendamentosPassados.includes(agendamento));

        const pacienteIndex = this.pacientes.findIndex(paciente => paciente.cpf === cpf);
        this.pacientes.splice(pacienteIndex, 1);

        return {
            verificar: true,
            mensagem: 'Paciente excluído com sucesso!'
        };
    }

    listarPacientes() {
        const listar = new ListagemPaciente();
        return {
            porNome: listar.imprimirPorNome(this.pacientes),
            porCPF: listar.imprimirPorCPF(this.pacientes)
        };
    }

    dadosPacientes() {
        return this.pacientes;
    }
}

export default Paciente;