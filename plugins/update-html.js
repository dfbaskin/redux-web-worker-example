// Original code from
// https://github.com/bengsfort/rollup-plugin-generate-html-template

import { readFile, writeFile, ensureFile } from "fs-extra";
import { dirname, basename, join } from "path";

const name = "html-template";

export default function htmlTemplate(options = {}) {
  const { template, target } = options;
  return {
    name,
    async generateBundle(outputOptions, bundleInfo) {
      const targetDir = outputOptions.dir || dirname(outputOptions.file);
      const bundles = Object.keys(bundleInfo).filter(
        bundle => bundleInfo[bundle].isEntry
      );
      return new Promise(async (resolve, reject) => {
        try {
          if (!target && !template)
            throw new Error(
              "[rollup-plugin-html-template] You did not provide a template or target!"
            );

          // Get the target file name.
          const targetName = basename(target || template);

          // Add the file suffix if it isn't there.
          const targetFile =
            targetName.indexOf(".html") < 0 ? `${targetName}.html` : targetName;

          // Read the file
          const tmpl = await readFile(template, "utf8");

          // Get the </body> index
          const bodyCloseTag = tmpl.lastIndexOf("</body>");

          // Inject the script tags before the body close tag
          const injected = [
            tmpl.slice(0, bodyCloseTag),
            ...bundles.map(b => `<script src="${b}"></script>\n`),
            tmpl.slice(bodyCloseTag, tmpl.length)
          ].join("");

          // write the injected template to a file
          const finalTarget = join(targetDir, targetFile);
          await ensureFile(finalTarget);
          await writeFile(finalTarget, injected);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }
  };
}
