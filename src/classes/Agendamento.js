import { ValidarAgendamento } from './ValidarAgendamento.js';
import ListagemAgenda from './ListagemAgenda.js';

class Agendamento {
    constructor(pacienteService) {
        this.agendamentos = [];
        this.pacienteService = pacienteService;
        this.agendamentoValidator = new ValidarAgendamento();
    }

    realizarAgendamento(cpf, dataConsulta, horaInicial, horaFinal) {
        const resultado = this.agendamentoValidator.validarAgendamento(cpf, dataConsulta, horaInicial, horaFinal, this.agendamentos, this.pacienteService);
        if (!resultado.verificar) {
            return resultado;
        }

        this.agendamentos.push({ cpf, dataConsulta, horaInicial, horaFinal });
        return {
            verificar: true,
            mensagem: 'Agendamento realizado com sucesso.'
        };
    }

    cancelarAgendamento(cpf, dataConsulta, horaInicial) {
        const resultado = this.agendamentoValidator.validarCancelamento(cpf, dataConsulta, horaInicial, this.agendamentos);
        if (!resultado.verificar) {
            return resultado;
        }

        this.agendamentos = this.agendamentos.filter(agendamento =>
            !(agendamento.cpf === cpf && agendamento.dataConsulta === dataConsulta && agendamento.horaInicial === horaInicial)
        );
        return {
            verificar: true,
            mensagem: 'Agendamento cancelado com sucesso.'
        };
    }

    listarAgendamentos() {
        return this.agendamentos;
    }

    listarAgenda(pacientes) {
        const listar = new ListagemAgenda();
        return listar.imprimir(this.agendamentos, pacientes);
    }
}

export default Agendamento;