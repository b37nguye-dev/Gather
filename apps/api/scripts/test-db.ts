import "./load-env.js";
import sql from "../src/lib/db.js";

async function main(): Promise<void> {
  const result = await sql`SELECT 1 AS ok`;
  console.log("Connected:", result);
  await sql.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Connection failed:", err.message);
  process.exit(1);
});
