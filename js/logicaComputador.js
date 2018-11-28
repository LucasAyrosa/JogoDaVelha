function jogadaComputador() {
    let jogada;

    // verifica tentativa de vitoria
    jogada = escolheJogada(jogador2.peca);
    if (jogada) {
        fazJogada(jogada);
        return;
    }
    // impedir jogador de ganhar
    jogada = escolheJogada(jogador1.peca);
    if (jogada) {
        fazJogada(jogada);
        return;
    }
    //jogada aleatoria
    jogada = jogadaAleatoria();
    if (jogada) {
        fazJogada(jogada);
        return;
    }
}

function escolheJogada(peca) {
    // pega valores no tabuleiro
    const a1 = $("#a1").html();
    const a2 = $("#a2").html();
    const a3 = $("#a3").html();

    const b1 = $("#b1").html();
    const b2 = $("#b2").html();
    const b3 = $("#b3").html();

    const c1 = $("#c1").html();
    const c2 = $("#c2").html();
    const c3 = $("#c3").html();

    if (b2 == peca) {
        if (b2 == b1 && !b3) {
            return 'b3';
        } else if (b2 == b3 && !b1) {
            return 'b1';
        } else if (b2 == a2 && !c2) {
            return 'c2';
        } else if (b2 == c2 && !a2) {
            return 'a2';
        } else if (b2 == a1 && !c3) {
            return 'c3';
        } else if (b2 == c3 && !a1) {
            return 'a1';
        } else if (b2 == a3 && !c1) {
            return 'c1';
        } else if (b2 == c1 && !a3) {
            return 'a3';
        }
    }
    if ((!b2) && 
            (
                (b1 == peca && b3 == peca) ||
                (a2 == peca && c2 == peca) ||
                (a1 == peca && c3 == peca) ||
                (a3 == peca && c1 == peca)
            )
        ) 
    {
        return 'b2';
    }
    if (a1 == peca) {
        if (a1 == a2 && !a3) {
            return 'a3';
        } else if (a1 == a3 && !a2) {
            return 'a2';
        } else if (a1 == b1 && !c1) {
            return 'c1';
        } else if (a1 == c1 && !b1) {
            return 'b1';
        }
    }
    if ((!a1) &&
            (
                (a2 == peca && a3 == peca) ||
                (b1 == peca && c1 == peca)
            )
        )
    {
        return 'a1';
    }
    if (c3 == peca) {
        if (c3 == b3 && !a3) {
            return 'a3';
        } else if (c3 == a3 && !b3) {
            return 'b3';
        } else if (c3 == c2 && !c1) {
            return 'c1';
        } else if (c3 == c1 && !c2) {
            return 'c2';
        }
    }
    if ((!c3) &&
            (
            )
        )
    {
        return 'c3';
    }
}

function jogadaAleatoria() {
    const quadros = $(".quadros")
    let jogadasPossiveis = [];
    for (let i = 0; i < quadros.length; i++) {
        if (!$(quadros[i]).html()) {
            jogadasPossiveis.push(quadros[i].id);
        }
    }
    return jogadasPossiveis[valorAleatorio(0, jogadasPossiveis.length - 1)];
}

function fazJogada(jogada) {
    $(`#${jogada}`).click();
}