mapboxgl.accessToken = 'pk.eyJ1IjoibWVzaGFjazIzNTAiLCJhIjoiY21heTJ6MDI5MDRlZDJqc2Nkemc5YWVqMyJ9.qbwRM5J2-ukbZ93-Ot2MGA';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [36.817223, -1.286389], // Default to Nairobi
  zoom: 12
});

// Ask for user's location
navigator.geolocation.getCurrentPosition(position => {
  const userLng = position.coords.longitude;
  const userLat = position.coords.latitude;
  
  document.getElementById('latitude').value = userLat;
  document.getElementById('longitude').value = userLng;
  new mapboxgl.Marker()
    .setLngLat([userLng, userLat])
    .addTo(map);

  map.flyTo({ center: [userLng, userLat], zoom: 14 });
}, () => {
  alert("Location access denied. Please enable location for accurate delivery.");
});
