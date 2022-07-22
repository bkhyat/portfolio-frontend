const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1DA57A',
                            '@theme': 'light',
                            'card-head-padding': '8px',
                            '@divider-vertical-gutter': '4px',
                            '@card-inner-head-padding': '6px',
                            '@card-padding-base': '12px'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};