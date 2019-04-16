var min, max, worker, ukaz, situacia, vyslednePole;
/*
$( function() {
    $( "#progressbar" ).progressbar({
        value: 37
    });
} );*/

$(document).ready(function(){
    situacia = document.getElementById("stav");
    $("#zobraz").click(function(){
        if($("#min").val().match(/\d/))
            min = $("#min").val();
        else{
            alert("Prosim zadajte cislo");
            return;
        }
        if($("#max").val().match(/\d/))
            max = $("#max").val();
        else{
            alert("Prosim zadajte cislo");
            return;
        }

        if(validation()== false){return};

        compute();
    });
});


function validation() {
    if(min<0 || max <0){
        alert("zadaj kladnu hodnotu");
        return false;
    }
    min = parseInt(min);
    max = parseInt(max);
    if(max<min){
        console.log(max);
        alert("interval minimum je vacsi ako maximum");
        return false;
    }
}



function compute() {
    worker = new Worker('compute_prime_number.js');
    worker.onmessage = spracujMessage;
    worker.onerror = spracujError;
    worker.postMessage([min,max]);

}
function spracujError(error){
    situacia.innerHTML = error.message;
}


function spracujMessage(event){
    var message = event.data;
    if(message.messageType == "vypisPola"){
        vyslednePole = message.data;
        var vysledok = "";
        for (var i = 0; i<vyslednePole.length; i++ ){

            vysledok += vyslednePole[i];
            if(i!= vyslednePole.length-1)
                vysledok+= ", ";
        }
        $('#area').val(vysledok);

    }
    if(message.messageType == "zobrazStav"){
        situacia.innerHTML = message.data + "% hotovo";


    }
}

function stopWorker(){
    worker.terminate();
    worker = undefined;
}