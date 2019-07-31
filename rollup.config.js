import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";

export default [
  {
    input: "src/app-one/app-one.tsx",
    plugins: [
      typescript(),
      commonjs(),
      resolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      copy({
        targets: [
          { src: "src/app-one/app-one.html", dest: "build" },
          { src: "src/public/**/*", dest: "build" }
        ]
      })
    ],
    output: {
      file: "build/app-one.js",
      format: "esm"
    }
  },
  {
    input: "src/app-two/app-two.tsx",
    plugins: [
      typescript(),
      commonjs(),
      resolve(),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      }),
      copy({
        targets: [{ src: "src/app-two/app-two.html", dest: "build" }]
      })
    ],
    output: {
      file: "build/app-two.js",
      format: "esm"
    }
  }
];
