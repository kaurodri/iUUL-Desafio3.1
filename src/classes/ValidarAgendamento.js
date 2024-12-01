import { DateTime } from 'luxon';

class ValidarAgendamento {
    validarAgendamento(cpf, dataConsulta, horaInicial, horaFinal, agendamentos, pacienteService) {
        const pacienteExistente = pacienteService.verificarCPFExistente(cpf);
        if (!pacienteExistente) {
            return {
                verificar: false,
                mensagem: `Paciente Não Encontrado no Sistema`
            };
        }

        const formatoData = 'dd/MM/yyyy';
        const dataConsultaObj = DateTime.fromFormat(dataConsulta, formatoData);
        if (!dataConsultaObj.isValid) {
            return {
                verificar: false,
                mensagem: 'Formato de data inválido. Use o formato DD/MM/AAAA'
            };
        }

        const horaInicialObj = DateTime.fromFormat(horaInicial, 'HHmm');
        const horaFinalObj = DateTime.fromFormat(horaFinal, 'HHmm');
        if (!horaInicialObj.isValid || !horaFinalObj.isValid) {
            return {
                verificar: false,
                mensagem: 'Formato de hora inválido. Use o formato HHMM'
            };
        }

        if (horaFinalObj <= horaInicialObj) {
            return {
                verificar: false,
                mensagem: 'A hora final deve ser posterior à hora inicial'
            };
        }

        const agora = DateTime.now();
        if (dataConsultaObj < agora || (dataConsultaObj.equals(agora) && horaInicialObj <= agora)) {
            return {
                verificar: false,
                mensagem: 'A consulta deve ser agendada para um momento futuro'
            };
        }

        const agendamentoExistente = agendamentos.some(agendamento =>
            agendamento.cpf === cpf && DateTime.fromFormat(agendamento.dataConsulta, formatoData) >= agora
        );
        if (agendamentoExistente) {
            return {
                verificar: false,
                mensagem: 'O paciente já possui um agendamento futuro'
            };
        }

        return {
            verificar: true,
            mensagem: 'Agendamento Válido'
        };
    }

    validarCancelamento(cpf, dataConsulta, horaInicial, agendamentos) {
        const agendamento = agendamentos.find(agendamento =>
            agendamento.cpf === cpf &&
            agendamento.dataConsulta === dataConsulta &&
            agendamento.horaInicial === horaInicial
        );

        if (!agendamento) {
            return {
                verificar: false,
                mensagem: 'Agendamento Não Encontrado para cancelamento'
            };
        }

        const dataConsultaObj = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
        const horaInicialObj = DateTime.fromFormat(horaInicial, 'HHmm');
        const agora = DateTime.now();

        if (dataConsultaObj < agora || (dataConsultaObj.equals(agora) && horaInicialObj <= agora)) {
            return {
                verificar: false,
                mensagem: 'O agendamento não pode ser cancelado, pois já passou.'
            };
        }

        return {
            verificar: true,
            mensagem: 'Cancelamento Realizado'
        };
    }
}

export { ValidarAgendamento };