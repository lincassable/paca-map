var fs = require("fs");

function formatCommunes() {
  const geojson = JSON.parse(fs.readFileSync("data/communes-20190101.json"));
  const vaucluseFeatures = geojson.features.filter((feature) => {
    const insee = feature.properties.insee;
    return insee.startsWith("84");
  });
  fs.writeFileSync(
    "data/vaucluse.json",
    JSON.stringify({
      type: "FeatureCollection",
      features: vaucluseFeatures
    })
  );
}

formatCommunes();
