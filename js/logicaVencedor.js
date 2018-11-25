function verificaVencedor() {
    const a1 = $("#a1").html();
    const a2 = $("#a2").html();
    const a3 = $("#a3").html();

    const b1 = $("#b1").html();
    const b2 = $("#b2").html();
    const b3 = $("#b3").html();

    const c1 = $("#c1").html();
    const c2 = $("#c2").html();
    const c3 = $("#c3").html();

    if (
            //verifica vencedor na primeira linha e primeira coluna
            ((a1) && 
                (
                    (a1 == a2 && a1 == a3) || 
                    (a1 == b1 && a1 == c1)
                )
            ) ||
            //verifica vencedor na coluna do meio, na linha do meio e nas diagonais
            ((b2) && 
                (
                    (b2 == b1 && b2 == b3) || 
                    (b2 == a2 && b2 == c2) ||
                    (b2 == a1 && b2 == c3) ||
                    (b2 == a3 && b2 == c1)
                )
            ) ||
            //verifica vencedor na ultima linha e ultima coluna
            ((c3) && 
                (
                    (c3 == c2 && c3 == c1) || 
                    (c3 == b3 && c3 == a3)
                )
            )
        )
    {
        fimDeJogo = true;
        ganhador = vez.nome;
        $("#botoesFimJogo").show();
        M.toast({html: 'Fim de jogo!', classes: 'rounded'});
    } else {
        fimDeJogo = true;
        const quadros = $(".quadros");
        for (let i = 0; i < quadros.length; i++) {
            if (!$(quadros[i]).html()) {
                fimDeJogo = false;
                break;
            }
        }
        if (fimDeJogo) {
            $("#botoesFimJogo").show();
            M.toast({html: 'Fim de jogo!', classes: 'rounded'});
        }
    }
}