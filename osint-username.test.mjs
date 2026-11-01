import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const core = fs.readFileSync(path.join(dir, "osint-username.core.js"), "utf8");
const ctx = { URL };
vm.createContext(ctx);
vm.runInContext(core + "\nthis.normalizeUsername=normalizeUsername;this.pathUser=pathUser;", ctx);

const { normalizeUsername, pathUser } = ctx;

const cases = [
  ["https://www.linkedin.com/in/ankitkrsah/", "ankitkrsah"],
  ["linkedin.com/in/ankitkrsah", "ankitkrsah"],
  ["@octocat", "octocat"],
  ["octocat", "octocat"],
  ["https://github.com/octocat", "octocat"],
  ["https://x.com/someuser", "someuser"],
  ["https://www.reddit.com/user/spezz", "spezz"],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = normalizeUsername(input);
  if (got !== expected) {
    console.error(`normalizeUsername(${JSON.stringify(input)}) => ${JSON.stringify(got)}, expected ${JSON.stringify(expected)}`);
    failed++;
  }
}
if (pathUser("ankitkrsah") !== "ankitkrsah") {
  console.error("pathUser failed for simple handle");
  failed++;
}
if (failed) process.exit(1);
console.log(`osint-username: ${cases.length + 1} assertions passed`);
