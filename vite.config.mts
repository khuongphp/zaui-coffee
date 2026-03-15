import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import ZaloMiniApp from "zmp-vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [tsconfigPaths(), react(), ZaloMiniApp()],
    resolve: {
      alias: {
        utils: path.resolve(__dirname, "src/utils"),
        pages: path.resolve(__dirname, "src/pages"),
        components: path.resolve(__dirname, "src/components"),
        state: path.resolve(__dirname, "src/state.ts"),
        types: path.resolve(__dirname, "src/types"),
        hooks: path.resolve(__dirname, "src/hooks.ts"),
        static: path.resolve(__dirname, "src/static"),
      },
    },
  });
};
