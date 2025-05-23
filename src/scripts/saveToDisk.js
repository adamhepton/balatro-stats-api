import readBalatroFile from "#src/util/file-util.js";
import fs from "fs";

["profile"].forEach(target => {
    const json = readBalatroFile(`./data/${target}.jkr`, "json");
    fs.writeFileSync(`./data/${target}.json`, json);
    console.log(`Written ${target}.json.`)
});