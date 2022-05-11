// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const nodeLibs = require("node-libs-browser");

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    resolver: {
        sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
        extraNodeModules: nodeLibs,
    },
};
