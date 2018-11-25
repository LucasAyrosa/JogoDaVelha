$(function() {
    $('select').formSelect();
    $("#nomeJogador1").focus();
    carregaTabuleiro();
});

$("#btnIniciarJogo").click(function () {
    obterInformacoes();
    iniciarJogo();
});

$("#btnReiniciarJogo").click(function () {
    iniciarJogo();
});

$("#btnVoltarMenu").click(function () {
    $("#informacoes").show();
    $("#mostrador").hide();
    $("#tabuleiro").hide();
    $("#botoesFimJogo").hide();
    $("#nomeJogador1").focus();
});

$("#cbxDoisJogadores").click(function() {
    this.checked ? ($("#divDoisJogadores").show(400), computador = false) : ($("#divDoisJogadores").hide(400), computador = true);
});

let jogador1 = new Object();
let jogador2 = new Object();
let vez = new Object();
let fimDeJogo;
let ganhador;
let computador = true;