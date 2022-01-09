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

const aix = JSON.parse(fs.readFileSync("data/AMP/territoires/PAYS D'AIX.json"));

const departements = JSON.parse(fs.readFileSync("data/departements.json"));

const franceCommunes = JSON.parse(
  fs.readFileSync("data/communes-20190101.json")
);

const occitanieGeoJson = JSON.parse(fs.readFileSync("data/occitanie.geojson"));

function aggregateFeatures() {
  const pacaCommunesGeoJson = {
    type: "FeatureCollection",
    features: []
  };

  const pacaDepartementGeoJson = {
    type: "FeatureCollection",
    features: []
  };

  const ampTerritoiresGeoJson = {
    type: "FeatureCollection",
    features: []
  };

  const rhoneAlpesDepartementsGeoJson = {
    type: "FeatureCollection",
    features: []
  };

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: marseille.geometries[0],
    properties: {
      nom: "Marseille-Provence"
    }
  });

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: salon.geometries[0],
    properties: {
      nom: "Pays Salonnais"
    }
  });

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: aubagne.geometries[0],
    properties: {
      nom: "Pays d'Aubagne et de l'Étoile"
    }
  });

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: istres.geometries[0],
    properties: {
      nom: "Istres Ouest Provence"
    }
  });

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: martigues.geometries[0],
    properties: {
      nom: "Pays de Martigues"
    }
  });

  ampTerritoiresGeoJson.features.push({
    type: "Feature",
    geometry: aix.geometries[0],
    properties: {
      nom: "Aix"
    }
  });

  for (const feature of departements.features) {
    if (["13", "84"].includes(feature.properties.code)) {
      pacaDepartementGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom
        }
      });
    }

    if (["83", "04", "06"].includes(feature.properties.code)) {
      pacaDepartementGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom
        }
      });
    }

    if (["07", "26"].includes(feature.properties.code)) {
      rhoneAlpesDepartementsGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          operateur: "MBSR"
        }
      });
    }

    if (["69", "42", "01"].includes(feature.properties.code)) {
      rhoneAlpesDepartementsGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          operateur: "REBOOTEILLE"
        }
      });
    }

    if (["38", "73", "74"].includes(feature.properties.code)) {
      rhoneAlpesDepartementsGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          operateur: "ALPES CONSIGNE"
        }
      });
    }
  }

  for (const feature of franceCommunes.features) {
    if (
      feature.properties.insee.startsWith("13") ||
      feature.properties.insee.startsWith("84")
    ) {
      pacaCommunesGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          operateur: "L'INCASSABLE"
        }
      });
    }
    if (
      feature.properties.insee.startsWith("83") ||
      feature.properties.insee.startsWith("04") ||
      feature.properties.insee.startsWith("06")
    ) {
      pacaCommunesGeoJson.features.push({
        type: "Feature",
        geometry: feature.geometry,
        properties: {
          nom: feature.properties.nom,
          operateur: "LA CONSIGNE DE PROVENCE"
        }
      });
    }
  }
  fs.writeFileSync(
    "js/paca-communes.js",
    `var pacaCommunes = ${JSON.stringify(pacaCommunesGeoJson)}`
  );
  fs.writeFileSync(
    "js/paca-departements.js",
    `var pacaDepartements = ${JSON.stringify(pacaDepartementGeoJson)}`
  );
  fs.writeFileSync(
    "js/amp-territoires.js",
    `var ampTerritoires = ${JSON.stringify(ampTerritoiresGeoJson)}`
  );
  fs.writeFileSync(
    "js/rhone-alpes-departements.js",
    `var rhoneAlpesDepartements = ${JSON.stringify(
      rhoneAlpesDepartementsGeoJson
    )}`
  );

  fs.writeFileSync(
    "js/occitanie.js",
    `var occitanie = ${JSON.stringify(occitanieGeoJson)}`
  );
}

aggregateFeatures();
