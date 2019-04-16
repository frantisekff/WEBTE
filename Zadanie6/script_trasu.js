var places;
function initMap() {
    var markerArray = [];

    // Instantiate a directions service.
    var directionsService = new google.maps.DirectionsService;

    // Create a map and center it on Manhattan.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 48.151882, lng: 17.073036}
    });

    /*===========================================================================*/

    // Create the search box and link it to the UI element.
    var input = document.getElementById('start');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    /*map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });*/


    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    /*searchBox.addListener('places_changed', function() {
         places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }



    });*/

    /*======================================================================*/




    // Create a renderer for directions and bind it to the map.
    var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

    // Instantiate an info window to hold step text.
    var stepDisplay = new google.maps.InfoWindow;

    // Display the route between the initial start and end selections.
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
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
                '<b>' + response.routes[0].legs[i].distance.text + '</b>';
            directionsDisplay.setDirections(response);
            //showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
