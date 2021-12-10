var fs = require("fs");

function formatDepartements() {
  const geojson = JSON.parse(fs.readFileSync("data/departements.json"));
  const pacaDepartementsFeatures = geojson.features.filter((feature) => {
    const code = feature.properties.code;
    return ["13", "83", "84", "04", "05", "06"].includes(code);
  });
  fs.writeFileSync(
    "data/departements-paca.json",
    JSON.stringify({
      type: "FeatureCollection",
      features: pacaDepartementsFeatures
    })
  );
}

formatDepartements();
