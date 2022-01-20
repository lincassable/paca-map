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

function getColor(operateur) {
  switch (operateur) {
    case "L'INCASSABLE":
      return "#FDEA18";
    case "LA CONSIGNE DE PROVENCE":
      return "#f3d4dc";
    default:
      return "#F6DAAB";
  }
}

L.geoJSON(lincassable, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 0.3,
      fill: true,
      fillColor: getColor("L'INCASSABLE"),
      fillOpacity: 0.4
    };
  }
})
  .bindPopup((layer) => {
    return "L'INCASSABLE'";
  })
  .addTo(map);

L.geoJSON(laconsignedeprovence, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: true,
      fillColor: getColor("LA CONSIGNE DE PROVENCE"),
      fillOpacity: 0.4
    };
  }
})
  .bindPopup((layer) => {
    return "LA CONSIGNE DE PROVENCE";
  })
  .addTo(map);

L.geoJSON(zonegrise, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: true,
      fillColor: getColor(null),
      fillOpacity: 0.4
    };
  }
})
  .bindPopup((layer) => {
    return "LA CONSIGNE DE PROVENCE x L'INCASSABLE";
  })
  .addTo(map);
