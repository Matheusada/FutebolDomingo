let confirmacoes = [];

document.getElementById('confirmacao-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataConfirmacao = new Date(document.getElementById('data-confirmacao').value);
    const mensagemMulta = document.getElementById('mensagem-multa');

    const agora = new Date();
    const sextaLimite = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - agora.getDay() + 5, 11, 0); // Sexta-feira 11h

    let multa = 0;
    let mensagem = "";

    if (dataConfirmacao > sextaLimite) {
        const diaConfirmacao = dataConfirmacao.getDay();

        if (diaConfirmacao === 5 && dataConfirmacao.getHours() >= 11) {
            multa = 5;
        } else if (diaConfirmacao === 6) {
            multa = 10;
        } else if (diaConfirmacao === 0) {
            multa = 20;
        }

        mensagem = `Confirmação tardia! Multa de R$${multa.toFixed(2)} será aplicada.`;
    } else {
        mensagem = `Confirmação realizada dentro do prazo. Sem multa.`;
    }

    mensagemMulta.textContent = `${nome}, ${mensagem}`;

    confirmacoes.push({
        nome: nome,
        data: dataConfirmacao.toLocaleString('pt-BR'),
        multa: multa
    });

    document.getElementById('confirmacao-form').reset();
});

// Função para baixar confirmações como arquivo .txt
document.getElementById('download-btn').addEventListener('click', function() {
    if (confirmacoes.length === 0) {
        alert("Nenhuma confirmação disponível para download.");
        return;
    }

    let conteudo = "Confirmações CMBH 2024\n\n";
    confirmacoes.forEach((conf) => {
        conteudo += `Nome: ${conf.nome}\n`;
        conteudo += `Data de Confirmação: ${conf.data}\n`;
        conteudo += `Multa: R$${conf.multa.toFixed(2)}\n`;
        conteudo += "---------------------------------\n";
    });

    const blob = new Blob([conteudo], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "confirmacoes_CMBH_2024.txt";
    link.click();
});
