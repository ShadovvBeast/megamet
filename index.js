import { readFileSync } from 'fs';
import * as Gematria from 'gematria';
class Main {
    filepath;
    map = {};
    constructor(filepath) {
        this.filepath = filepath;
    }

    async main() {
        const g = Gematria.default;
        const words = readFileSync(this.filepath).toString().replace(/[\x30-\x7F]/g, '').split(' ');
        const promises = words.map(async (word, i) => word && this.map[(g(word).toMisparGadol())] ? (this.map[(g(word).toMisparGadol())][word] = i) : this.map[(g(word).toMisparGadol())] = {});
        await Promise.all(promises);
        console.log(this.map);
    }
}

const m = new Main('test.txt');
m.main()