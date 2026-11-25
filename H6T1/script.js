let map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let cities = [
    {
        name: "Helsinki",
        coordinates: [60.1699, 24.9384]
    },
    {
        name: "Porvoo",
        coordinates: [60.3920, 25.6650]
    },
    {
        name: "Nurmes",
        coordinates: [63.5420, 29.1330]
    },
    {
        name: "Tampere",
        coordinates: [61.4981, 23.7608]
    },
    {
        name: "Kotka",
        coordinates: [60.4664, 26.9458]
    }
];

let markers = [];

cities.forEach(city => {
    let marker = L.marker(city.coordinates).addTo(map);

    marker.bindPopup(city.name);

    markers.push(marker);
});

map.setView([64.5, 26.0], 5);