import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/auth.ts",
    "auth-client": "src/auth-client.ts",
    types: "src/types.ts",
  },
  format: ["esm"],
  target: "node22",
  bundle: true,
  external: ["@blak/db", "@blak/utils"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
})
