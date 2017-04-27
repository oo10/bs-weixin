/**
 * Created by qingbiao on 2015-12-20.
 */

var WXConfig = require("../config");

var fs = require("fs"),
    FileUtil = require("./FileUtil"),
    HttpsUtil = require("./HttpsUtil"),
    url = require("url"),
    http = require("http");
var iconv = require('iconv-lite');


module.exports = {
    /**
     * 处理msgXML
     * @param xml
     * @param callback
     * @param scope
     */
    acceptMessage: function(xml, callback, scope){
        var xml2json = require("simple-xml2json");
        var json     = xml2json.parser( xml );
        var msgObj = json.xml;

        console.log(msgObj);
        if(msgObj.msgtype === "event"){
            if(msgObj.event === "unsubscribe"){
                console.log("取消关注");
                callback.call(scope, this.createResTextMsg(msgObj, ""));
            }
            if(msgObj.event === "subscribe"){
                callback.call(scope, this.createResTextMsg(msgObj, WXConfig.MGS.subscribe));
            }
        }

        //文本消息
        if(msgObj.msgtype === "text"){
            
            msgObj.content = msgObj.content.toString();

            if(msgObj.content == "1") {

                callback.call(scope, this.createResTextMsg(msgObj, WXConfig.MGS.hello));

            }

            else if(msgObj.content == "2") {

                callback.call(scope, this.createResNewsMsg(msgObj));

            }

            else if (msgObj.content.substring(0,3) == "普通话"){

                var _this = this,
                    obj = msgObj.content.split(' '),
                    name = encodeURI(obj[1]),
                    num = obj[2]

                console.log('name:'+name,'num:'+num)

                if(obj[1]==undefined || name=='' || num==''){
                    callback.call(scope, _this.createResTextMsg(msgObj,'请按照格式，回复普通话 姓名 身份证号查询成绩哦~'));
                    return false;
                }

                http.get("http://yangqiwang.cn/api-putonghua/?name="+name+"&num="+num, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf-8');
                    res.on('data', function (body) {
                        var body2 = JSON.parse(body)
                        var con = ''
                        console.log('BODY:', body2.data)
                        if(!!body2.data){
                            function allpro(obj){
                                var title = '🈵 普通话成绩查询结果： \n\n'
                                var value =''
                                for(var key in obj){
                                    //只遍历对象自身的属性，而不包含继承于原型链上的属性。
                                    if (obj.hasOwnProperty(key) === true){
                                        if(key=='出生日期：'){
                                            value+=' \n'
                                        }
                                        else if(key=='照片：'){
                                            value+=key+'<a href="'+obj[key]+'">点击查看</a> \n'
                                        }
                                        else{
                                            value+=key+''+obj[key]+' \n'
                                        }
                                    }
                                }
                                con=title+value+'\n<a href="http://cet.yangqiwang.cn">查看更多</a>'
                                return con;
                            }
                            callback.call(scope, _this.createResTextMsg(msgObj, allpro(body2.data)));
                        }
                        else {
                            callback.call(scope, _this.createResTextMsg(msgObj, '-。- ' + body2.msg));
                        }
                    });
                }).on('error', function(e) {
                    console.log("Got error: " + e.message);
                }).end();

            }


            else if (msgObj.content.substring(0,3) == "四六级"){

                var _this = this,
                    obj = msgObj.content.split(' '),
                    name = encodeURI(obj[1]),
                    num = obj[2]

                console.log('name:'+name,'num:'+num)

                if(obj[1]==undefined){
                    callback.call(scope, _this.createResTextMsg(msgObj,'请按照格式，回复四六级 姓名 学号查询成绩哦~'));
                    return false;
                }

                http.get("http://yangqiwang.cn/api-cet/?name="+name+"&num="+num, function(res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf-8');
                    res.on('data', function (body) {
                        var body2 = JSON.parse(body)
                        console.log('BODY:', body2)
                        if(!!body2.message){
                            console.log('BODY:', body2.message)
                            callback.call(scope, _this.createResTextMsg(msgObj, '-。- ' + body2.message));
                        }
                        else {
                            function allpro(obj,obj2){
                                var title = '🈵 四六级成绩查询结果： \n\n'
                                var value =''
                                var values1 = '';
                                var values2 = '';
                                var con = '';
                                var trans = '';
                                for(var key in obj){
                                    //只遍历对象自身的属性，而不包含继承于原型链上的属性。
                                    if (obj.hasOwnProperty(key) === true){
                                        if(key==='totleScore') {
                                            if(obj[key]>=425){
                                                con = '\n太棒了,祝贺你~'
                                            }
                                            else{
                                                con = '\n只差一点了,加油吧~'
                                            }
                                            trans = '总分'
                                            values1+=trans+'：'+obj[key]+'分 \n'

                                        }
                                        if(key==='tlScore') {
                                            trans = '听力'
                                            values1+=trans+'：'+obj[key]+'分 \n'
                                        }
                                        if(key==='ydScore') {
                                            trans = '阅读'
                                            values1+=trans+'：'+obj[key]+'分 \n'
                                        }
                                        if(key==='xzpyScore') {
                                            trans = '写作'
                                            values1+=trans+'：'+obj[key]+'分 \n'
                                        }
                                    }
                                }
                                for(var key in obj2){
                                    if (obj2.hasOwnProperty(key) === true){
                                        if(key==='name') trans = '姓名'
                                        if(key==='num') trans = '准考证号'
                                        if(key==='school') trans = '学校'
                                        if(key==='type') trans = '类型'
                                        if(key==='time') trans = '时间'

                                        values2+=trans+'：'+obj2[key]+' \n'
                                        console.log('va2',values2)
                                    }
                                }
                                con+='\n<a href="http://cet.yangqiwang.cn">查看更多</a>'
                                value+=title
                                value+=values2 + '\n'
                                value+=values1
                                value+=con

                                return value;
                            }
                            callback.call(scope, _this.createResTextMsg(msgObj, allpro(body2.score,body2.result)));
                        }
                    });
                }).on('error', function(e) {
                    console.log("Got error: " + e.message);
                }).end();

            }

            else{
                callback.call(scope, this.createResTextMsg(msgObj, '-。- 您发送的是：'+msgObj.content));
            }
        }

        //图片消息
        if(msgObj.msgtype === "image"){
            callback.call(scope, this.createResTextMsg(msgObj, '您发送了一张图片：<a href=\"'+msgObj.picurl+'\"> 浏览</a>'));
        }


        //音频消息
        if(msgObj.msgtype === "voice"){
            callback.call(scope, this.createResTextMsg(msgObj, '您发送了一条语音，然而我并听不懂=￣ω￣='));
        }

        //推送消息
        if(msgObj.msgtype === "event"){
            if(msgObj.eventkey === 'wx_001' ){
                callback.call(scope, this.createResNewsMsg(msgObj));
            }
            else{
                callback.call(scope, this.createResTextMsg(msgObj, '改功能正在开发中，别急=￣ω￣='));
            }
        }


    },

    /**
     *
     * @param msg
     * @param content
     */
    createResTextMsg: function(msg, content){
        var res = {};
        res.ToUserName = msg.fromusername;
        res.FromUserName  = msg.tousername;
        res.CreateTime = new Date().getTime();
        res.MsgType = 'text';
        res.Content = content;

        return this.JS2XML(res);
    },

    /**
     *
     * @param msg
     * @param content
     */
    createResNewsMsg: function(msg, content){
        var res = {};
        res.ToUserName = msg.fromusername;
        res.FromUserName  = msg.tousername;
        res.CreateTime = new Date().getTime();
        res.MsgType = 'news';
        res.title = '四六级成绩查询网页版';
        res.description = '或直接回复四六级 姓名 学号即可~';
        res.picurl = 'https://img.alicdn.com/imgextra/i1/1876943437/TB2uW0qlCFjpuFjSszhXXaBuVXa_!!1876943437.jpg';
        res.url = 'http://cet.yangqiwang.cn';

        return this.news2xml(res);
    },

    /**
     *
     * @param json
     * @returns {string}
     * @constructor
     */
    JS2XML: function(json){
        var xml = ["<xml>"];
        xml.push(this._js2xml(json));
        xml.push("</xml>");

        return xml.join("");
    },

    /**
     *
     * @param json
     * @returns {string}
     * @private
     */
    _js2xml: function(json){
        var xml = [];
        for(var i in json){
            if(typeof json[i] === 'string') {
                xml.push('<' + i + '><![CDATA[' + json[i] + ']]></' + i + '>');
            }else if(typeof json[i] === 'number'){
                xml.push('<' + i + '>' + json[i] + '</' + i + '>');
            }else if(typeof json[i] === 'object'){
                xml.push('<'+i+'>' + this._js2xml(json[i] + '</'+i+'>'));
            }
        }

        return xml.join("");
    },

    news2xml: function (json) {
        var xml =
        '<xml>'+
        '<ToUserName><![CDATA['+json.ToUserName+']]></ToUserName>'+
        '<FromUserName><![CDATA['+json.FromUserName+']]></FromUserName>'+
        '<CreateTime>'+json.CreateTime+'</CreateTime>'+
        '<MsgType><![CDATA['+json.MsgType+']]></MsgType>'+
        '<ArticleCount>1</ArticleCount>'+
        '<Articles>'+
        '<item>'+
        '<Title><![CDATA['+json.title+']]></Title>'+
        '<Description><![CDATA['+json.description+']]></Description>'+
        '<PicUrl><![CDATA['+json.picurl+']]></PicUrl>'+
        '<Url><![CDATA['+json.url+']]></Url>'+
        '</item>'+
        '</Articles>'+
        '</xml>'

        return xml;
    }
};