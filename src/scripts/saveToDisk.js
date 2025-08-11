import readBalatroFile from "#src/util/file-util.js";
import fs from "fs";

const outputFormat = process.argv.at(2) ?? "json";
const target = process.argv.at(3) ?? "profile";

export default async function saveToDisk(outputFormat, target) {
    const data = readBalatroFile(`./data/${target}.jkr`, outputFormat);
    fs.writeFileSync(`./data/${target}.${outputFormat}`, data);
    console.log(`Written ${target}.${outputFormat}.`);
}

saveToDisk(outputFormat, target);