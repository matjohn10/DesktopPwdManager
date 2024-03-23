import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const assets = ["images"];
const copyPlugins = new CopyWebpackPlugin({
  patterns: assets.map((asset) => ({
    from: path.resolve(__dirname, "src", asset),
    to: path.resolve(__dirname, ".webpack/renderer", asset),
  })),
});

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  copyPlugins,
];
