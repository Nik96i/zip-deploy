import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
    sourcemap: false,
    compact: true
  },
  perf: true,
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    terser({ format: { ecma: 2020 }, compress: { passes: 3 }, sourceMap: false })
  ]
};
