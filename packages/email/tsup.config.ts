import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/templates/*.tsx"],
  format: ["esm"],
  target: "node22",
  bundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  external: ["react", "react-dom", "react-email", "resend"],
})
