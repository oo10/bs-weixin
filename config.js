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
    subscribe: "=￣ω￣= \n" +
    "欢迎您关注 yqw 的公众号!\n\n" +
    "您可以回复相应的内容进入功能~\n" +
    "2:查询<a href='http://cet.yangqiwang.cn'>四六级</a>成绩~\n"+
    "3:绑定学号~\n"+
    "4:系统后台~\n",
    hello: "=￣ω￣= 您好!"
};

exports.EXCEPTURLS = ["/*"];

