var isDevHost = process.env.NODE_ENV === "development";
var apiPrefix = isDevHost ? 'dev-' : ''


const hosts = {
    identity_api: `https://${apiPrefix}identity-api.sounmate.com/1`,
    // content_api: `https://${apiPrefix}content-api.sounmate.com/1`,
    // member_api: `https://${apiPrefix}member-api.sounmate.com/1`,
    // payment_api: `https://${apiPrefix}payment-api.sounmate.com/1`,
    // marketing_api: `https://${apiPrefix}marketing-api.sounmate.com/1`,
    // ordering_api: `https://${apiPrefix}ordering-api.sounmate.com/1`,
    // chat_api: `https://${apiPrefix}chat-api.sounmate.com/1`
}
if (isDevHost) {
    //调试模式下使用本地代理以解决跨域问题
    hosts.identity_api = "/identity-api/1";
    // hosts.content_api = "/content-api/1";
    // hosts.member_api = "/member-api/1";
    // hosts.payment_api = "/payment-api/1";
    // hosts.marketing_api = "/marketing-api/1";
    // hosts.ordering_api = "/ordering-api/1",
    // hosts.chat_api = "/chat-api/1"
}

export default hosts