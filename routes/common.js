/**
 * Created by cqb32_000 on 2015-12-16.
 */

module.exports = {
    '/bind': function(){
        console.log('common.js /bind')
        var tel = this.get("tel");
        var code = this.get("code");
        var openid = this.req.session.openid;

        console.log(tel, code, openid);

        this.User.saveUser(tel, openid, function(ret){
            console.log(ret);
            this.res.json(ret);
        }, this);
    },



    '/upload': function(){
        console.log('common.js /upload')
        var data = this.get('data')

        this.User.adminSaveData(data,function (ret) {
            console.log(ret);
            this.res.json(ret);
        },this);
    }
};