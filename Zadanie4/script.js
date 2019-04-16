var i = 0;
var interval;
var myObj;
var j;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj =
            JSON.parse(this.responseText);


        for (j = 0; j < myObj.photos.length; j++) {

            var img = new Image();
            img.setAttribute("src", myObj.photos[j].src2);
            img.setAttribute("class", "obraz hover-shadow cursor");
            img.setAttribute("alt", myObj.photos[j].description);
            img.setAttribute("onclick", "show(" + j + ")");


            img.setAttribute("width", "20%");
            document.getElementById("img-container").appendChild(img);

        }
    }
};

xmlhttp.open("GET", "data.json", true);
xmlhttp.send();


function show(i) {
    temp = i;
    document.getElementById("bg_screen").src = myObj.photos[temp].src;
    document.getElementById("album").style.visibility = "visible";
    document.getElementById("describ_img").innerHTML = myObj.photos[temp].title + " : " + myObj.photos[temp].description;
}


function next_img() {
    var count_photos = myObj.photos.length;

    if (count_photos - 1 == i) {
        i = 0;
    } else {
        i++;
    }

    console.log(i);
    document.getElementById("bg_screen").src = myObj.photos[i].src;
    document.getElementById("describ_img").innerHTML = myObj.photos[i].title + " : " + myObj.photos[i].description;
}

function prew_img() {
    var count_photos = myObj.photos.length;
    if (0 > i - 1) {
        i = count_photos - 1;
    } else {
        i--;
    }
    console.log(i);
    document.getElementById("bg_screen").src = myObj.photos[i].src;
    document.getElementById("describ_img").innerHTML = myObj.photos[i].title + " : " + myObj.photos[i].description;


}

function play() {
    interval = setInterval(next_img, 3000);
}

function pause() {
    clearInterval(interval);
}

function cancel() {
    document.getElementById("album").style.visibility = "hidden";
}