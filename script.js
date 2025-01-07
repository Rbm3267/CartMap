// Initialize the map
const map = L.map('map').setView([0, 0], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Add custom golf cart icon
const golfCartIcon = L.icon({
    iconUrl: 'assets/golf-cart-icon.png', // Path to your golf cart icon image
    iconSize: [32, 32],  // Adjust the size as needed
    iconAnchor: [16, 32], // Anchor point (set to bottom center)
    popupAnchor: [0, -32]  // Optional: to adjust the popup's position
});

// Get user location and center map
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    // Center the map on user's location
    map.setView([latitude, longitude], 13);

    // Add a custom marker at the user's location
    L.marker([latitude, longitude], { icon: golfCartIcon }).addTo(map)
        .bindPopup('You are here!');

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

// Optional: You can also add a "Locate Me" button to allow the user to click and center the map on their location again.
L.control.locate().addTo(map);

// Plan routes using the Mapbox API (replace with your Mapbox token)
const mapboxToken = 'pk.eyJ1IjoicmJtMzI2NyIsImEiOiJjbTVteW85cXowNW8wMnJvaHY2dGl6OGZyIn0.9qYTleoqnFfq-bze0LT2kA';
// Implement route planning logic if needed.
