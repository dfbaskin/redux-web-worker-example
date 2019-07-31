import typescript from "rollup-plugin-typescript";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import cleaner from "rollup-plugin-cleaner";

export default [
  {
    input: "src/app-one/app-one.tsx",
    plugins: [
      cleaner({
        targets: ["./build/"]
      }),
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
      dir: "build",
      entryFileNames: "[name].[hash].js",
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
      dir: "build",
      entryFileNames: "[name].[hash].js",
      format: "esm"
    }
  }
];
