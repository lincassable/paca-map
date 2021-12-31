var map = L.map("map").setView([43.406245, 6.069762], 8);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmVub2l0Z3VpZ2FsIiwiYSI6ImNrd3h3dHViZzBndDEydmxjODllOTl5NDYifQ.COrUbOHJe3Xqq_Obm_AxiQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token"
  }
).addTo(map);

L.geoJSON(pacaConsigne, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: true,
      fillColor:
        feature.properties.operateur == "L'INCASSABLE"
          ? "#FDEA18"
          : feature.properties.operateur == "LA CONSIGNE DE PROVENCE"
          ? "#f3d4dc"
          : "#00000000", // transparent
      fillOpacity: 0.6
    };
  }
})
  .bindPopup(function (layer) {
    return layer.feature.properties.nom;
  })
  .addTo(map);
