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

function onEachFeature(feature, layer) {
  var popup = document.createElement("div");
  var title = document.createElement("div");
  var select = document.createElement("select"),
    option0 = document.createElement("option"),
    option1 = document.createElement("option"),
    option2 = document.createElement("option");

  select.addEventListener("change", function () {
    restyleLayer(this.value, this.layer);
  });

  select.layer = layer;

  title.innerHTML = feature.properties.nom;

  option0.value = "Nope";
  option0.selected = feature.properties.operateur == null;
  option0.innerHTML = "null";

  option1.value = "L'INCASSABLE";
  option1.selected = feature.properties.operateur == "L'INCASSABLE";
  option1.innerHTML = "L'INCASSABLE";

  option2.value = "LA CONSIGNE DE PROVENCE";
  option2.selected = feature.properties.operateur == "LA CONSIGNE DE PROVENCE";
  option2.innerHTML = "LA CONSIGNE DE PROVENCE";

  select.appendChild(option0);
  select.appendChild(option1);
  select.appendChild(option2);
  popup.appendChild(title);
  popup.appendChild(select);

  layer.bindPopup(popup);
}

function getColor(operateur) {
  switch (operateur) {
    case "L'INCASSABLE":
      return "#FDEA18";
    case "LA CONSIGNE DE PROVENCE":
      return "#f3d4dc";
    default:
      return "#00000000";
  }
}

function restyleLayer(operateur, layer) {
  layer.feature.properties.operateur = operateur;
  layer.setStyle({ fillColor: getColor(operateur) });
}

L.geoJSON(pacaConsigne, {
  style: function (feature) {
    return {
      color: "#3388ff",
      weight: 1,
      fill: true,
      fillColor: getColor(feature.properties.operateur),
      fillOpacity: 0.6
    };
  },
  onEachFeature
}).addTo(map);
