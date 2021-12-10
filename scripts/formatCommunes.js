var fs = require("fs");

function formatCommunes() {
  const geojson = JSON.parse(fs.readFileSync("data/communes-20190101.json"));
  const pacaCommunesFeatures = geojson.features.filter((feature) => {
    const insee = feature.properties.insee;
    return insee.startsWith("13") || insee.startsWith("84");
  });
  fs.writeFileSync(
    "data/communes-paca.json",
    JSON.stringify({
      type: "FeatureCollection",
      features: pacaCommunesFeatures
    })
  );
}

formatCommunes();
