import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/templates/*.ts"],
    
  format: ["esm"],
  target: "node22",
  bundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
})
