import readBalatroFile from "#src/util/file-util.js";
import fs from "fs";

["profile"].forEach(target => {
    const json = readBalatroFile(`#data/${target}.jkr`, "json");
    fs.writeFileSync(`game-files/${target}.json`, json);
});