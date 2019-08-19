import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import htmlTemplate from "./plugins/update-html";
import postcss from "rollup-plugin-postcss";
import postcssSass from "@csstools/postcss-sass";
import OMT from "@surma/rollup-plugin-off-main-thread";

export default {
  input: "src/app-two/app-two.tsx",
  plugins: [
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
    OMT(),
    postcss({
      plugins: [postcssSass()]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    copy({
      targets: [{ src: "src/app-two/app-two.html", dest: "build" }]
    }),
    htmlTemplate({
      template: "src/app-two/app-two.html",
      target: "build/app-two.html"
    })
  ],
  output: {
    dir: "build",
    entryFileNames: "[name].[hash].js",
    format: "amd"
  }
};
