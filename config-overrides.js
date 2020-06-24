const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path')


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A',
            '@text-color': '#464e5f',
            '@text-color-secondary': '#80808f'
        },
    }),

    addDecoratorsLegacy(),

    addWebpackAlias({
        "@": path.resolve(__dirname, 'src')
    }),
);