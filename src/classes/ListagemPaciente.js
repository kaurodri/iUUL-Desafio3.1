class ListagemPaciente {
    imprimirPorNome(ListaPacientes) {
        const colunas = `${`CPF`.padEnd(12)} ${`Nome`.padEnd(20)} ${`Dt.Nasc.`.padEnd(15)} ${`Idade`.padEnd(5)}`;
        const separator = `-`.padEnd(55, '-');

        let conteudo = '';
        conteudo += `${separator}\n${colunas}\n${separator}`;

        //! ordena os pacientes pelo nome antes de imprimir.
        ListaPacientes.sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach(paciente => {
                const formatar = [
                    paciente.cpf.padEnd(12),
                    paciente.nome.padEnd(20),
                    paciente.dataNascimento.padEnd(15),
                    `${2024 - Number(paciente.dataNascimento.slice(-4))}`.padStart(5),
                ]
                let [CPF, NOME, DATA, IDADE] = formatar;

                conteudo += `\n${CPF} ${NOME} ${DATA} ${IDADE}`;
            });
        conteudo += '\n' + separator;
        return conteudo;
    }

    imprimirPorCPF(ListaPacientes) {
        const colunas = `${`CPF`.padEnd(12)} ${`Nome`.padEnd(20)} ${`Dt.Nasc.`.padEnd(15)} ${`Idade`.padEnd(5)}`;
        const separator = `-`.padEnd(55, '-');

        let conteudo = '';
        conteudo += `${separator}\n${colunas}\n${separator}`;

        //! ordena os pacientes pelo CPF antes de imprimir.
        ListaPacientes.sort((a, b) => a.cpf.localeCompare(b.cpf))
            .forEach(paciente => {
                const formatar = [
                    paciente.cpf.padEnd(12),
                    paciente.nome.padEnd(20),
                    paciente.dataNascimento.padEnd(15),
                    `${2024 - Number(paciente.dataNascimento.slice(-4))}`.padStart(5),
                ]
                let [CPF, NOME, DATA, IDADE] = formatar;

                conteudo += `\n${CPF} ${NOME} ${DATA} ${IDADE}`;
            });
            conteudo += '\n' + separator;
        return conteudo;
    }
}

export default ListagemPaciente;