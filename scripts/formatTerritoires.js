var fs = require("fs");
const csv = require("csv-parser");

// group communes of the same territoire in the same GeoJSON
function formatTerritoires() {
  const communesGeoJson = JSON.parse(
    fs.readFileSync("data/communes-20190101.json")
  );
  const AMPcommunes = [];

  const features = {
    "PAYS D'AIX": [],
    "MARSEILLE-PROVENCE": [],
    "PAYS SALONAIS": [],
    "PAYS D'AUBAGNE ET DE L'ÉTOILE": [],
    "ISTRES OUEST PROVENCE": [],
    "PAYS DE MARTIGUES": []
  };

  const arlesFeatures = [];

  fs.createReadStream("data/AMP/codes_postaux_ampm.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => AMPcommunes.push(data))
    .on("end", () => {
      for (const commune of communesGeoJson.features) {
        let isAMP = false;
        for (const communeAMP of AMPcommunes) {
          if (commune.properties.insee === communeAMP.INSEE) {
            features[communeAMP.CT].push(commune);
            isAMP = true;
          }
        }
        if (!isAMP && commune.properties.insee.startsWith("13")) {
          arlesFeatures.push(commune);
        }
      }
      for (const territoire of Object.keys(features)) {
        fs.writeFileSync(
          `data/AMP/communes/${territoire}.json`,
          JSON.stringify({
            type: "FeatureCollection",
            features: features[territoire]
          })
        );
      }
      fs.writeFileSync(
        `data/arles-communes.json`,
        JSON.stringify({
          type: "FeatureCollection",
          features: arlesFeatures
        })
      );
    });
}

formatTerritoires();
