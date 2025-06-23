import readBalatroFile from "#src/util/file-util.js";
import fs from "fs";

const outputFormat = process.argv.at(2) ?? "json";

["profile"].forEach(target => {
    const data = readBalatroFile(`./data/${target}.jkr`, outputFormat);
    fs.writeFileSync(`./data/${target}.${outputFormat}`, data);
    console.log(`Written ${target}.${outputFormat}.`)
});