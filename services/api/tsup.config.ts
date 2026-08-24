import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",

  bundle: true,

  external: ["@blak/db", "@blak/auth", "@blak/utils"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
})
