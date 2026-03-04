import { config } from "dotenv";
import { resolve } from "node:path";

const cwd = process.cwd();
config({ path: resolve(cwd, ".env") });
config({ path: resolve(cwd, "..", ".env") });
