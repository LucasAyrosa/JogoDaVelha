// obtem informacoes preenchidas no formulario no menu do jogo
function obterInformacoes() {
    jogador1.nome = $("#nomeJogador1").val();
    jogador1.peca = $("#pecaJogador1").val();
    jogador2.nome = computador ? 'Computador' : $("#nomeJogador2").val();
    jogador2.peca = jogador1.peca == "X" ? "O" : "X";
}

function iniciarJogo() {
    $("#informacoes").hide();
    $("#mostrador").show();
    $("#tabuleiro").show();
    $("#botoesFimJogo").hide();
    // zerar conteudo dos quadros
    $(".quadros").html("");
    vez = jogador1;
    fimDeJogo = false;
    ganhador = '';
    atualizaMostrador();
}

function atualizaMostrador(){
    if (fimDeJogo) {
        $("#mostrador").html(`${ganhador || 'Ninguém'} ganhou o jogo!`);
    } else {
        $("#mostrador").html(`${vez.nome}, é sua vez de jogar.`);
    }
}

function carregaTabuleiro() {
    $(".quadros").click(function(){
        if (fimDeJogo) return;
        // se o quadro clicado não estiver preenchido
        if (!$(this).html()) {
            $(this).html(vez.peca);
            verificaVencedor();
            vez = (vez == jogador1) ? jogador2 : jogador1;
            atualizaMostrador();
            if (!fimDeJogo && computador && vez == jogador2) {
                jogadaComputador();
            }
        } else {
            M.toast({html: 'Local já preenchido. Escolha outro quadrado.', classes: 'rounded'});
        }
   });
}

function valorAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}