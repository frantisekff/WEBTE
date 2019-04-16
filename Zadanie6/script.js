
function myMap() {


    var bratislava = {lat: 48.151882, lng: 17.073036};

    var mapOptions = {
        center: new google.maps.LatLng(48.151882, 17.073036),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker_Fei = new google.maps.Marker({position: mapOptions.center});
    marker_Fei.setMap(map);

    var info_Fei = new google.maps.InfoWindow({
        content: "FEI STU Bratislava"
    });
    var position = marker_Fei.position.toString();
    var gps_Fei = new google.maps.InfoWindow({
        content: "GPS suradnice FEI : " + position
    });
    info_Fei.open(map, marker_Fei);

    google.maps.event.addListener(marker_Fei, 'click', function () {
        gps_Fei.open(map, marker_Fei);
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: bratislava,
        radius: 1000,
        type: ['transit_station']
    }, callback);


    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }


    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: bratislava,
            pov: {
                heading: 34,
                pitch: 10
            }
        });
    map.setStreetView(panorama);


    var markerArray = [];

    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService;
    var input = document.getElementById('start');
    var searchBox = new google.maps.places.SearchBox(input);

    // Create a renderer for directions and bind it to the map.
    var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

    // Instantiate an info window to hold step text.
    var stepDisplay = new google.maps.InfoWindow;

    // Display the route between the initial start and end selections.

    // Listen to change events from the start and end lists.
    var onChangeHandler = function() {
        calculateAndDisplayRoute(
            directionsDisplay, directionsService, markerArray, stepDisplay, map);
    };
    document.getElementById('najdi').addEventListener('click', onChangeHandler);
    document.getElementById('mainForm').addEventListener('change', onChangeHandler);




}





function calculateAndDisplayRoute(directionsDisplay, directionsService,
                                  markerArray, stepDisplay, map) {



    // First, remove any existing markers from the map.
    for (var i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin:  document.getElementById('start').value,
        destination:{
            "lat": 48.151882,
            "lng": 17.073036},
        travelMode: document.querySelector('input[name="doprava"]:checked').value
    }, function(response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                "Dlžka trasy je : "+ response.routes[0].legs[i].distance.text ;
            directionsDisplay.setDirections(response);
            //showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
