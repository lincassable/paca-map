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

L.geoJSON(departements, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: !!feature.properties.color,
      fillColor: feature.properties.color,
      fillOpacity: 0.6
    };
  }
}).addTo(map);

// L.geoJSON(communes, {
//   style: function (feature) {
//     return { color: "#3388ff", weight: 0.5, fill: false };
//   }
// })
//   .bindPopup(function (layer) {
//     return layer.feature.properties.nom;
//   })
//   .addTo(map);

L.geoJSON(marseilleProvence, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(paysAubagne, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(paysMartigues, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(paysSalonnais, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(paysIstres, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(arles, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(paysdAix, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: false,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);

L.geoJSON(vaucluse, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: false,
      fillColor: "#FDEA18",
      fillOpacity: 0.6
    };
  }
}).addTo(map);
