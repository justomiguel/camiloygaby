import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import pg from "pg";

const { Client } = pg;

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvLocal();
  const connectionString =
    process.env.SUPABASE_DB_URL ??
    process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL no está definida");
  }

  const migrationsDir = resolve(process.cwd(), "supabase/migrations");
  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();

  for (const file of files) {
    const sql = readFileSync(resolve(migrationsDir, file), "utf8");
    await client.query(sql);
    console.log(`Migración aplicada: ${file}`);
  }

  await client.end();
  console.log("Todas las migraciones aplicadas correctamente.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
