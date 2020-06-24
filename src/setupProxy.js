const proxy = require('http-proxy-middleware');

let apiPrefix = '';
if (process.env.NODE_ENV === "development") {
    apiPrefix = 'dev-';
}
const setProxy = (api, app, prefix = apiPrefix) => {
    app.use(
        '/' + api,
        proxy({
            target: 'https://' + prefix + api + '.sounmate.com',
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return path.replace('/' + api, '');
            },
        }),
    );
};

module.exports = function (app) {
    console.log('注册开发api代理服务');
    setProxy('identity-api', app);
    // setProxy('content-api', app);
    // setProxy('chat-api', app);
    // setProxy('marketing-api', app);
    // setProxy('payment-api', app);
    // setProxy('ordering-api', app);
    // setProxy('remind-api', app);
    // setProxy('member-api', app);
};
