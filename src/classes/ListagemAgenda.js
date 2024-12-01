import { DateTime } from 'luxon';

class ListagemAgenda {
    imprimir(ListaPacientes, pacientes) {
        const colunas = `${`Data`.padEnd(12)} ${`H.Ini`.padEnd(7)} ${`H.Fim`.padEnd(7)} ${`Tempo`.padEnd(7)} ${`Nome`.padEnd(20)} ${`Dt.Nasc.`.padStart(5)}`;
        const separator = `-`.padEnd(68, '-');

        let conteudo = '';
        conteudo += `${separator}\n${colunas}\n${separator}`;

        ListaPacientes.sort((a, b) => a.dataConsulta.localeCompare(b.dataConsulta))
            .forEach(dados => {

                function formatarHora(num) {
                    let horas = Math.floor(num / 100);
                    let minutos = num % 100;
                    return DateTime.fromObject({ hour: horas, minute: minutos });
                };

                let diferen = formatarHora(dados.horaFinal).diff(formatarHora(dados.horaInicial), 'minutes');

                let tempoHoras = Math.floor(diferen.minutes / 60);
                let tempoMinutos = diferen.minutes % 60;

                function buscar(cpf) {
                    const paciente = pacientes.find(p => p.cpf === cpf);
                    return {
                        nome: paciente.nome,
                        data: paciente.dataNascimento
                    };
                };

                const formatar = [
                    dados.dataConsulta.padEnd(12),
                    `${formatarHora(dados.horaInicial).toFormat('HH:mm')}`.padEnd(7),
                    `${formatarHora(dados.horaFinal).toFormat('HH:mm')}`.padEnd(7),
                    `${`${tempoHoras}`.padStart(2, '0')}:${`${tempoMinutos}`.padStart(2, '0')}`.padEnd(7),
                    `${buscar(dados.cpf).nome}`.padEnd(20),
                    `${buscar(dados.cpf).data}`.padEnd(5)
                ]
                let [DATA, HINI, HFIM, TEMPO, NOME, DTNASC] = formatar;

                conteudo += `\n${DATA} ${HINI} ${HFIM} ${TEMPO} ${NOME} ${DTNASC}`;
            });
        conteudo += '\n' + separator;
        return conteudo;
    }
}

export default ListagemAgenda;