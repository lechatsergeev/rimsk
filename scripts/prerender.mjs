import { build } from "esbuild";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const tempDir = path.join(root, ".tmp-prerender");
const routes = ["/", "/horeca", "/retail"];

await rm(tempDir, { recursive: true, force: true });
await mkdir(tempDir, { recursive: true });

const outfile = path.join(tempDir, "ssg-entry.cjs");

await build({
  entryPoints: [path.join(root, "src/ssg-entry.tsx")],
  outfile,
  bundle: true,
  format: "cjs",
  platform: "node",
  target: "node20",
  alias: {
    "@": path.join(root, "src"),
  },
  loader: {
    ".glb": "file",
    ".woff2": "file",
    ".css": "empty",
  },
  jsx: "automatic",
  define: {
    "import.meta.env.BASE_URL": JSON.stringify("/rimsk/"),
  },
});

const { render } = require(outfile);
const template = await readFile(path.join(distDir, "index.html"), "utf8");

function injectHtml(html) {
  return template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

for (const route of routes) {
  const html = injectHtml(render(route));
  const outputPath =
    route === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, route.slice(1), "index.html");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}
