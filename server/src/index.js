import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve server root directory and try to load .env from several common locations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, "..");
const envRootPath = path.join(serverRoot, ".env");
const envSrcPath = path.join(__dirname, ".env");

let envPath;
if (fs.existsSync(envRootPath)) {
  envPath = envRootPath;
} else if (fs.existsSync(envSrcPath)) {
  envPath = envSrcPath;
}

if (envPath) {
  dotenv.config({ path: envPath });
  console.log(`Loaded env from ${envPath}`);
} else {
  dotenv.config(); // fallback to default behavior
  console.warn(
    "No .env file found in server root or server/src; relying on process env variables."
  );
}
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}
bootstrap();
