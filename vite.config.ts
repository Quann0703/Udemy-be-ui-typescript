import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { basename } from "path";
import crypto from "crypto";

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
      modules: {
        // generateScopedName: '[name]_[local]_[hash:base64:5]',// Custom format css module
        generateScopedName: (name, filename, css) => {
          const fullName = basename(filename);
          const componentName = fullName.split(".module.scss")[0];
          // Generate hash
          const hash = crypto
            .createHash("md5")
            .update(css)
            .digest("base64")
            .substring(0, 5);

          return `${componentName}_${name}__${hash}`;
        },
      },
    },
    base: env.VITE_ROUTER_BASE_URL || "/",
    define: {
      "process.env": env,
    },
  });
};
