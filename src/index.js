import Paciente from './novas/classes/Paciente.js';
import db from './config/sequelize.js';
import promptSync from 'prompt-sync';

const entrada = promptSync({ sigint: true });

await db.iniciar();
await db.sequelize.sync().then(() => {
    console.log('conectado com o banco de dados.');
});

const cadastro = new Paciente();
//const consulta = new Agendamento(cadastro);

const menus = [
    {
        chave: 'MenuPrincipal',
        mensagem: `${`-`.padEnd(25, '-')}\nMenu Principal\n1-Cadastro de pacientes\n2-Agenda\n3-Fim\n${`-`.padEnd(12, '-')}`
    },
    {
        chave: 'MenuCadastroPacientes',
        mensagem: `${`-`.padEnd(25, '-')}\nMenu do Cadastro de Pacientes\n1-Cadastrar novo paciente\n2-Excluir paciente\n3-Listar pacientes (ordenado por CPF)\n4-Listar pacientes (ordenado por nome)\n5-Voltar p/ menu principal\n${`-`.padEnd(12, '-')}`
    },
    {
        chave: 'MenuAgenda',
        mensagem: `${`-`.padEnd(25, '-')}\nAgenda\n1-Agendar consulta\n2-Cancelar agendamento\n3-Listar agenda\n4-Voltar p/ menu principal\n${`-`.padEnd(12, '-')}`
    }
];

//Legenda (tela):
// 0 -> Menu Principal
// 1 -> Menu do Cadastro de Pacientes
// 2 -> Menu da Agenda
// 3 -> Cadastrar novo paciente
// 4 -> Excluir paciente
// 5 -> Listar pacientes (ordenado por CPF)
// 6 -> Listar pacientes (ordenado por nome)
// 7 -> Agendar Consulta
// 8 -> Cancelar Agendamento
// 10 -> Listar Agenda

function obterMenu(tela, escolha) {
    if (tela === 0 && escolha === 1) return 1;
    if (tela === 0 && escolha === 2) return 2;
    if (tela === 0 && escolha === 3) return 9;
    if (tela === 1 && escolha === 1) return 3;
    if (tela === 1 && escolha === 2) return 4;
    if (tela === 1 && escolha === 3) return 5;
    if (tela === 1 && escolha === 4) return 6;
    if (tela === 1 && escolha === 5) return 0;
    if (tela === 2 && escolha === 1) return 7;
    if (tela === 2 && escolha === 2) return 8;
    if (tela === 2 && escolha === 3) return 10;
    if (tela === 2 && escolha === 4) return 0;
}

let tela = 0;
while (true) {
    if (tela == 3) {
        let cpf = entrada(`CPF: `);
        let nome = entrada(`Nome: `);
        let data = entrada(`Data de nascimento: `);

        let conteudo = `\n${cadastro.cadastrarPaciente(cpf, nome, data).mensagem}.\n`;
        console.log(conteudo);
        
        let adicionar = entrada(`Adicionar outro paciente? [ s / n ]: `);

        switch (adicionar) {
            case 's':
                tela = 3;
                break;
            case 'n':
                let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
                tela = (final === 's') ? 0 : 9;
                break;
        }

    } else if (tela == 4) {
        let cpf = entrada(`CPF: `);
        //let imprimir = cadastro.excluirPaciente(cpf, consulta.listarAgendamentos()).mensagem;
        console.log(imprimir);

        let adicionar = entrada(`Excluir outro paciente? [ s / n ]: `);

        switch (adicionar) {
            case 's':
                tela = 4;
                break;
            case 'n':
                let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
                tela = (final === 's') ? 0 : 9;
                break;
        }

    } else if (tela == 5 || tela == 6) {

        //let imprimir = (tela == 5) ? cadastro.listarPacientes().porCPF : cadastro.listarPacientes().porNome;

        const listarPacientes = async () => {
            let imprimir = await cadastro.listarPacientes();
            console.log(imprimir);

            let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
            tela = (final == 's') ? 0 : 9;
        };
        listarPacientes();

    } else if (tela == 7) {
        let cpf = entrada(`CPF: `);
        let ver = cadastro.verificarCPFExistente(cpf);
        let gg = (ver == true) ? 'Paciente encontrado!' : 'Erro: paciente não cadastrado';
        console.log(`\n${gg}\n`);

        if (ver) {
            let dataConsulta = entrada(`Data da consulta: `);
            let horaInicial = entrada(`Hora inicial: `);
            let horaFinal = entrada(`Hora final: `);

            //let imprimir = consulta.realizarAgendamento(cpf, dataConsulta, horaInicial, horaFinal).mensagem;
            console.log(`\n${imprimir}\n`);
        }

        let adicionar = entrada(`Agendar outra consulta? [ s / n ]: `);

        switch (adicionar) {
            case 's':
                tela = 7;
                break;
            case 'n':
                let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
                tela = (final === 's') ? 0 : 9;
                break;
        }
    } else if (tela == 8) {

        let cpf = entrada(`CPF: `);
        let ver = cadastro.verificarCPFExistente(cpf);
        let gg = (ver == true) ? 'Paciente encontrado!' : 'Erro: paciente não cadastrado';
        console.log(`\n${gg}\n`);

        if (ver) {
            let dataConsulta = entrada(`Data da consulta: `);
            let horaInicial = entrada(`Hora inicial: `);

            //let imprimir = consulta.cancelarAgendamento(cpf, dataConsulta, horaInicial).mensagem;
            console.log(`\n${imprimir}\n`);
        }

        let adicionar = entrada(`Cancelar outro agendamento? [ s / n ]: `);

        switch (adicionar) {
            case 's':
                tela = 8;
                break;
            case 'n':
                let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
                tela = (final === 's') ? 0 : 9;
                break;
        }

    } else if (tela == 10) {
        
        //let imprimir = consulta.listarAgenda(cadastro.dadosPacientes());
        console.log(imprimir);

        let final = entrada(`Voltar pro Menu Principal? [ s / n ]: `);
        tela = (final == 's') ? 0 : 9;

    } else if (tela == 9) {
        break;

    } else {
        let menuAtual = menus[tela].mensagem;
        console.log(menuAtual);
        let escolha = Number(entrada(`Sua escolha: `));
        tela = obterMenu(tela, escolha);
        console.log('');
    }
};