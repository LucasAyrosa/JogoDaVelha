const game = {
    board: ['', '', '', '', '', '', '', '', ''],
    noMoves: function () {
        return !(this.board.some(e => e === ''))
    },

    simbols: {
        pieces: ['X', 'O'],
        player: [],
        turn: 0,
        change: function () {
            this.turn = (this.turn === 0 ? 1 : 0)
        }
    },

    computer: {
        enable: true,
        choosePlay: function () {
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < game.board.length; i++) {
                if (game.board[i] === '') {
                    game.board[i] = game.simbols.pieces[1];
                    let score = minimax(game.board, 0, false);
                    game.board[i] = '';
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            game.makePlay(move);
        }
    },

    online: {
        enable: false,
        yourTurn: -1
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
        if (this.online.enable && this.online.yourTurn !== this.simbols.turn) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.pieces[this.simbols.turn];
            this.draw();
            let winnerSequencesIndex = this.checkWinnerSequences(this.simbols.pieces[this.simbols.turn]);
            if (winnerSequencesIndex >= 0 || this.noMoves()) {
                this.gameIsOver(winnerSequencesIndex);
            } else {
                this.simbols.change();
                this.panel.innerHTML = `${this.player[this.simbols.turn]}, é sua vez!`;
                if (this.computer.enable && this.simbols.turn === 1) this.computer.choosePlay();
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
                return 1
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

function minimax(board, depth, isMaximazing) {
    const scores = {
        'O': 1,
        'X': -1,
        'tie': 0
    };
    let result = game.checkWinnerSequences(game.simbols.pieces[0]) == 1 ? 'X'
        : game.checkWinnerSequences(game.simbols.pieces[1]) == 1 ? 'O'
            : game.noMoves() ? 'tie' : null;
    if (result !== null) {
        return scores[result];
    }
    if (isMaximazing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = game.simbols.pieces[1];
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                if (score > bestScore) bestScore = score;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = game.simbols.pieces[0];
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                if (score < bestScore) bestScore = score;
            }
        }
        return bestScore
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