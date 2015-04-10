var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

function initialize() {	
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	
    var options = {
        zoom: 5,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("mapa"), options);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("trajeto-texto"));

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(pontoPadrao);

            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                    "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                        $("#txtEnderecoPartida").val(results[0].formatted_address);
                                }
            });
        });
    }
    exibirRotas();
}

function exibirRotas() {
    var enderecoPartida = "Brasília - DF, Brasil";
    var enderecoChegada = "Ilhabela - SP, Brasil";

    var request = {
            origin: enderecoPartida,
            destination: enderecoChegada,
            waypoints: [
                {location: 'Santos - SP, Brasil'}, 
                {location: 'Salvador - BA, Brasil'},
                {location: 'Búzios - RJ, Brasil'}],
            travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
            }
    });
}

initialize();
