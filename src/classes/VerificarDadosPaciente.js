import { DateTime } from 'luxon';

class VerificarDadosPaciente {
    validarCPF(CPF) {
        if (CPF.length !== 11 || /^(\d)\1{10}$/.test(CPF)) {
            return {
                verificar: false,
                mensagem: 'Formato de CPF Inválido'
            };
        };
    
        function calcularDigitoVerificador(CPF, multiplicadores) {
            let soma = 0;
            for (let i = 0; i < CPF.length; i++) {
                soma += parseInt(CPF[i]) * multiplicadores[i];
            }
            let resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
    
        const tabela = {
            multiplicadoresJ : [10, 9, 8, 7, 6, 5, 4, 3, 2],
            multiplicadoresK : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
        };
    
        const primeiroDV = calcularDigitoVerificador(CPF.slice(0, 9), tabela.multiplicadoresJ);
        const segundoDV = calcularDigitoVerificador(CPF.slice(0, 10), tabela.multiplicadoresK);

        let verificar = CPF[9] == primeiroDV && CPF[10] == segundoDV;

        return {
            verificar: verificar,
            mensagem: verificar ? 'CPF Válido' : 'CPF Inválido'
        };
    };

    validarNome(nome) {
        let verificar = nome.length >= 5;
        return {
            verificar: verificar,
            mensagem: verificar ? 'Nome Válido' : 'O nome deve ter pelo menos 5 caracteres'
        };
    }

    validarDataNascimento(dataNascimento) {
        const formato = 'dd/MM/yyyy';
        const dataNascimentoObj = DateTime.fromFormat(dataNascimento, formato);

        if (!dataNascimentoObj.isValid) {
            return {
                verificar: false,
                mensagem: 'Formatação de Data Inválida'
            };
        }

        const hoje = DateTime.now();
        const idade = hoje.diff(dataNascimentoObj, 'years').years;
        const mesAtual = hoje.month;
        const diaAtual = hoje.day;
        const mesNascimento = dataNascimentoObj.month;
        const diaNascimento = dataNascimentoObj.day;

        let verificar = idade < 13 || (idade === 13 && (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)));
        return {
            verificar: !verificar,
            mensagem: verificar ? 'Idade Insuficiente' : 'Idade Suficiente'
        };
    }
}

export default VerificarDadosPaciente;