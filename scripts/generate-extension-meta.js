import fs from "node:fs/promises";
import path from "node:path";

const EXTENSION_TYPE = process.env.EXTENSION_TYPE || "all";

const EXTENSION_TYPES = {
  all: ["anime", "manga"],
  anime: ["anime"],
  manga: ["manga"],
};

function getZipDownloadUrl(type, dir) {
  return `https://raw.githubusercontent.com/redoyyy/tsukimichi-extensions/main/extensions/${type}/${dir}.zip`;
}

async function loadManifests(type) {
  const baseDir = path.join(
    process.cwd(),
    "packages",
    "core",
    "src",
    "extensions",
    type
  );

  const dirs = await fs.readdir(baseDir);
  const manifests = [];

  for (const dir of dirs) {
    const manifestPath = path.join(baseDir, dir, "manifest.json");

    try {
      const data = await fs.readFile(manifestPath, "utf-8");
      const baseData = JSON.parse(data);

      baseData.downloadUrl = getZipDownloadUrl(type, dir);

      manifests.push(baseData);
    } catch (_error) {
      // ignore
    }
  }

  return manifests;
}

async function main() {
  try {
    const types = EXTENSION_TYPES[EXTENSION_TYPE];

    for (const type of types) {
      const manifests = await loadManifests(type);

      const outputPath = path.join(process.cwd(), `${type}.json`);

      await fs.writeFile(outputPath, JSON.stringify(manifests, null, 2));
      console.log(`${type}.json generated`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
