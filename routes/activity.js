/**
 * Created by cqb32_000 on 2015-12-12.
 */

var WeiXinUtil = require("../weixin/Util");

module.exports = {
    /**
     * 绑定手机号码
     */
    "/bindTel\.html": function(){
        var url = "http://" + this.req.headers["host"] + this.req.originalUrl;
        console.log(888)
        WeiXinUtil.getJsSDKSignature(url, function(config){
            console.log('test3')
            this.forward("bindTel", config);
            console.log('test4')

        }, this);
    }
};