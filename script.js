// Your Mapbox access token (replace this with your own Mapbox token)
const mapboxToken = 'pk.eyJ1IjoicmJtMzI2NyIsImEiOiJjbTVteW85cXowNW8wMnJvaHY2dGl6OGZyIn0.9qYTleoqnFfq-bze0LT2kA';  // Replace with your Mapbox token

// Initialize the map using Mapbox GL JS
mapboxgl.accessToken = mapboxToken;

const map = new mapboxgl.Map({
    container: 'map', // The ID of the container where the map will be displayed
    style: 'mapbox://styles/mapbox/streets-v11', // Mapbox style (you can customize this)
    center: [0, 0], // Default center (will be updated based on user's location)
    zoom: 13 // Default zoom level
});

// Create a custom marker with the golf cart icon
const golfCartIcon = new mapboxgl.Marker({
    element: document.createElement('div')
})
    .setLngLat([0, 0]) // Default location (will be updated with user's location)
    .addTo(map);

// Set the custom icon for the marker
const iconElement = golfCartIcon.getElement();
iconElement.style.backgroundImage = 'url(assets/golf-cart-icon.png)'; // Path to the custom icon
iconElement.style.backgroundSize = 'contain';
iconElement.style.width = '32px';  // Width of the icon
iconElement.style.height = '32px'; // Height of the icon

// Geolocation: Get user's current position and update map view
navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;

    // Update the map's center to the user's location
    map.setCenter([longitude, latitude]);
    map.setZoom(13);

    // Move the golf cart marker to the user's location
    golfCartIcon.setLngLat([longitude, latitude]);

    // Add a popup to the marker showing the message "You are here!"
    new mapboxgl.Popup()
        .setLngLat([longitude, latitude])
        .setHTML('You are here!')
        .addTo(map);
}, (error) => {
    console.error('Error getting location: ', error);
}, {
    enableHighAccuracy: true, // Optional: Request high accuracy geolocation
    timeout: 10000,           // Optional: Timeout if location is not available
    maximumAge: 0             // Optional: Don't use cached location data
});

// Optional: Add a "Locate Me" button to re-center the map on user's location
const locateButton = document.createElement('button');
locateButton.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-locate';
locateButton.onclick = function() {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.setCenter([longitude, latitude]);
        map.setZoom(13);
        golfCartIcon.setLngLat([longitude, latitude]);
    });
};
map.getContainer().appendChild(locateButton);
