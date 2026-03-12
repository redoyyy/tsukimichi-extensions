import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    minify: true,
    dts: {
        entry: "src/index.ts",
        resolve: true,
    },
    splitting: false,
    sourcemap: false,
    clean: true,
    outDir: "dist",
    target: "es2020",
    external: ["electron"],
});
