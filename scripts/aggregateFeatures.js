var fs = require("fs");

const marseille = JSON.parse(
  fs.readFileSync("data/AMP/territoires/MARSEILLE-PROVENCE.json")
);

const istres = JSON.parse(
  fs.readFileSync("data/AMP/territoires/ISTRES OUEST PROVENCE.json")
);

const aubagne = JSON.parse(
  fs.readFileSync("data/AMP/territoires/PAYS D'AUBAGNE ET DE L'ÉTOILE.json")
);

const martigues = JSON.parse(
  fs.readFileSync("data/AMP/territoires/PAYS DE MARTIGUES.json")
);

const salon = JSON.parse(
  fs.readFileSync("data/AMP/territoires/PAYS SALONAIS.json")
);

const aix = JSON.parse(fs.readFileSync("data/AMP/communes/PAYS D'AIX.json"));

const vaucluse = JSON.parse(fs.readFileSync("data/vaucluse.json"));

const departementsPaca = JSON.parse(
  fs.readFileSync("data/departements-paca.json")
);

const arles = JSON.parse(fs.readFileSync("data/arles.json"));

function aggregateFeatures() {
  const geojson = {
    type: "FeatureCollection",
    features: []
  };

  geojson.features.push({
    type: "Feature",
    geometry: marseille.geometries[0],
    properties: {
      nom: "Marseille-Provence",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: salon.geometries[0],
    properties: {
      nom: "Pays Salonnais",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: aubagne.geometries[0],
    properties: {
      nom: "Pays d'Aubagne et de l'Étoile",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: istres.geometries[0],
    properties: {
      nom: "Istres Ouest Provence",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: martigues.geometries[0],
    properties: {
      nom: "Pays de Martigues",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: martigues.geometries[0],
    properties: {
      nom: "Pays de Martigues",
      operateur: "L'INCASSABLE"
    }
  });

  geojson.features.push({
    type: "Feature",
    geometry: arles.geometries[0],
    properties: {
      nom: "Arles",
      operateur: "L'INCASSABLE"
    }
  });

  for (const feature of aix.features) {
    geojson.features.push({
      type: "Feature",
      geometry: feature.geometry,
      properties: {
        nom: feature.properties.nom
      }
    });
  }

  for (const feature of vaucluse.features) {
    geojson.features.push({
      type: "Feature",
      geometry: feature.geometry,
      properties: {
        nom: feature.properties.nom
      }
    });
  }

  for (const feature of departementsPaca.features) {
    if (!["13", "84"].includes(feature.properties.code))
      geojson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          ...(feature.properties.code != "05"
            ? { operateur: "LA CONSIGNE DE PROVENCE" }
            : { operateur: null })
        }
      });
  }

  fs.writeFileSync("data/paca-consigne.json", JSON.stringify(geojson));
  fs.writeFileSync(
    "js/paca-consigne.js",
    `var pacaConsigne = ${JSON.stringify(geojson)}`
  );
}

aggregateFeatures();
