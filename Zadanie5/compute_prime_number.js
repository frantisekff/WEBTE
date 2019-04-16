var pocet=0;
onmessage = function(event){
    var vysledky = rataj(event.data[0], event.data[1]);
    postMessage({messageType: "vypisPola", data: vysledky});
};

function rataj(min,max){
    spocitaj(min,max);

    var vysledky = [];
    var n=min, aktStav=0, konStav=100, krok;
    krok= (100/pocet);

    search: while (n<max) {

        n++;
        for (var i = 2; i <= Math.sqrt(n); i ++)
            if (n % i == 0) continue search;
        vysledky.push(n);
        if(aktStav < konStav ){
            aktStav += krok;
            postMessage({messageType: "zobrazStav", data: aktStav.toFixed(2)});


        }
        if(aktStav>99) {
            postMessage({messageType: "zobrazStav", data: konStav});
        }
    }
    return vysledky;
}


function spocitaj(min, max){
    var n = min;
    search: while (n<max) {
        n++;
        for (var i = 2; i <= Math.sqrt(n); i ++)
            if (n % i == 0) continue search;
        pocet++
    }
}