/**
 * Created by cqb32_000 on 2015/7/31.
 */
exports.DB = {

};

exports.WX = {
    TOKEN: "123456",
    APPID: "wx443d641d153d7bbe",
    APPSECRET: "9c3fafeef82d9b3b30a47c57c4ce7f0e",
    PAGE_ACCESS_TOKEN_URL: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code",
    PAGE_CODE_URL: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
    JS_SDK_TICKET_FILE: "/conf/JsSDKTicket",
    JS_SDK_TICKET_URL: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi"
};

exports.MGS = {
    subscribe: "=￣ω￣= 欢迎您关注 yqw 的公众号!",
    hello: "=￣ω￣= 您好!"
};

exports.EXCEPTURLS = ["/*"];

