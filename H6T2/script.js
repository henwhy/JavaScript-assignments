let favoriteCities = [
    {
        name: "Helsinki",
        latitude: 60.1699,
        longitude: 24.9384
    },
    {
        name: "Porvoo",
        latitude: 60.3920,
        longitude: 25.6650
    },
    {
        name: "Nurmes",
        latitude: 63.5420,
        longitude: 29.1330
    },
    {
        name: "Tampere",
        latitude: 61.4981,
        longitude: 23.7608
    },
    {
        name: "Kotka",
        latitude: 60.4664,
        longitude: 26.9458
    }
];

let places = localStorage.getItem("places");

if (places === null) {
    places = favoriteCities;

    localStorage.setItem("places", JSON.stringify(places));

} else {
    places = JSON.parse(places);
}

let map = L.map('map');

map.setView([64.5, 26.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markerLayer = L.layerGroup().addTo(map);

function showPlaces() {

    markerLayer.clearLayers();

    places.forEach(place => {

        let marker = L.marker([
            place.latitude,
            place.longitude
        ]);

        marker.bindPopup(place.name);

        marker.addTo(markerLayer);
    });
}

showPlaces();

document.getElementById("placeForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let latitude = parseFloat(document.getElementById("latitude").value);
    let longitude = parseFloat(document.getElementById("longitude").value);

    if (
        name === "" ||
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
    ) {
        alert("Please enter a valid name and coordinates.");
        return;
    }

    let newPlace = {
        name: name,
        latitude: latitude,
        longitude: longitude
    };

    places.push(newPlace);

    localStorage.setItem("places", JSON.stringify(places));

    showPlaces();

    document.getElementById("placeForm").reset();
});