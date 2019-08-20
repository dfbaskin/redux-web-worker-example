import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import cleaner from "rollup-plugin-cleaner";
import htmlTemplate from "./plugins/update-html";
import postcss from "rollup-plugin-postcss";
import postcssSass from "@csstools/postcss-sass";

export default {
  input: "src/app-one/app-one.tsx",
  plugins: [
    cleaner({
      targets: ["./build/"]
    }),
    resolve(),
    commonjs({
      namedExports: {
        react: [
          "createContext",
          "useContext",
          "useState",
          "useEffect",
          "useRef"
        ]
      }
    }),
    typescript({
      objectHashIgnoreUnknownHack: false,
      clean: true
    }),
    postcss({
      plugins: [postcssSass()]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    copy({
      targets: [
        { src: "src/app-one/app-one.html", dest: "build" },
        { src: "src/public/**/*", dest: "build" }
      ]
    }),
    htmlTemplate({
      template: "src/app-one/app-one.html",
      target: "build/app-one.html"
    })
  ],
  output: {
    dir: "build",
    entryFileNames: "[name].[hash].js",
    format: "esm"
  }
};
