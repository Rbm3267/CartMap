// Initialize the map
const map = L.map('map').setView([0, 0], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Get user location and center map
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    map.setView([latitude, longitude], 13);

    // Fetch and display roads with maxspeed <= 35 mph
    const query = `[out:json];way["maxspeed"~"^[0-3][0-5]$"](around:5000, ${latitude}, ${longitude});out geom;`;
    fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            data.elements.forEach((way) => {
                const coordinates = way.geometry.map(point => [point.lat, point.lon]);
                L.polyline(coordinates, { color: 'green' }).addTo(map);
            });
        })
        .catch(err => console.error('Error fetching road data:', err));
});

// Plan routes using the Mapbox API (replace with your Mapbox token)
const mapboxToken = 'your-mapbox-access-token';
// Implement route planning logic if needed.
