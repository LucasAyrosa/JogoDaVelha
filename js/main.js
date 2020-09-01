const game = {
    board: ['', '', '', '', '', '', '', '', ''],

    simbols: {
        pieces: ['X', 'O'],
        turn: 0,
        change: function () {
            this.turn = (this.turn === 0 ? 1 : 0)
        }
    },

    player: [],
    computer: {
        enable: true,
        choosePlay: function () {

            // game.makePlay();
        }
    },

    container: null,
    panel: null,

    gameOver: false,

    winnerSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init: function (containerElement, panelElement) {
        this.container = containerElement;
        this.panel = panelElement;
    },

    makePlay: function (position) {
        if (this.gameOver) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.pieces[this.simbols.turn];
            this.draw();
            let winnerSequencesIndex = this.checkWinnerSequences(this.simbols.pieces[this.simbols.turn]);
            if (winnerSequencesIndex >= 0 || !(this.board.some(e => e === ''))) {
                this.gameIsOver(winnerSequencesIndex);
            } else {
                this.simbols.change();
                this.panel.innerHTML = `${this.player[this.simbols.turn]}, é sua vez!`;
                if (this.computer.enable) this.computer.choosePlay();
            }
            return true;
        } else {
            M.toast({ html: 'Local já preenchido. Escolha outro quadrado.', classes: 'rounded' });
            return false
        }
    },

    checkWinnerSequences: function (simbol) {
        for (i in this.winnerSequences) {
            if (this.board[this.winnerSequences[i][0]] == simbol &&
                this.board[this.winnerSequences[i][1]] == simbol &&
                this.board[this.winnerSequences[i][2]] == simbol) {
                console.log('Winner sequence INDEX: ' + i)
                return i
            }
        };
        return -1;
    },

    gameIsOver: function (winner) {
        this.gameOver = true;
        if (winner === -1) this.write('Ninguem ganhou a partida');
        else this.write(`O ganhador é ${this.player[this.simbols.turn]} (${this.simbols.pieces[this.simbols.turn]})`)
        $("#botoesFimJogo").show();
    },

    start: function () {
        this.simbols.turn = 0;
        this.board.fill('');
        this.draw();
        this.gameOver = false;
        this.player = [document.getElementById('nomeJogador1').value, this.computer.enable ? 'Computador' : document.getElementById('nomeJogador2').value];
        this.write(`${this.player[this.simbols.turn]}, é sua vez!`);
    },

    draw: function () {
        let content = '';
        for (i in this.board) {
            content += `<div onclick="game.makePlay('${i}')">${this.board[i]}</div>`;
        };
        this.container.innerHTML = content;
    },

    write: function (text) {
        this.panel.innerHTML = text;
    }
}

$(function () {
    $('select').formSelect();
    $("#nomeJogador1").focus();
    game.init(document.getElementById('game-board'), document.getElementById('mostrador'));
});

$("#btnIniciarJogo").click(function () {
    $('#informacoes').hide();
    $('#mostrador').show();
    $("#game-board").show();
    game.start();
});

$("#btnReiniciarJogo").click(function () {
    $("#botoesFimJogo").hide();
    game.start();
});

$("#btnVoltarMenu").click(function () {
    $("#informacoes").show();
    $("#mostrador").hide();
    $("#game-board").hide();
    $("#botoesFimJogo").hide();
    $("#nomeJogador1").focus();
});

$("#cbxDoisJogadores").click(function () {
    this.checked ? ($("#divDoisJogadores").show(400), game.computer.enable = false) : ($("#divDoisJogadores").hide(400), game.computer.enable = true);
});