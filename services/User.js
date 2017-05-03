/**
 * Created by cqb32_000 on 2015-12-16.
 */
var client = require("../database/database");

module.exports = {

    /**
     *
     * @param tel
     * @param openid
     * @param callback
     * @param scope
     */
    saveUser: function(tel, openid, callback, scope){
        if(tel==undefined){
            callback.call(scope, {msg: '数据有误'});
            return false
        }
        console.log('tel:'+tel, 'openid:'+openid)
        var TEST_TABLE = 'user';

        client.query(
            'SELECT * FROM '+TEST_TABLE+ ' where openid = ?',
            [openid],
            function(err, result) {
                console.log('err 1:',err)
                console.log('result 1:',result)
                console.log('result 1:',result.length)
                if (err) {
                    callback.call(scope, {success: false});
                }
                else {
                    // result = JSON.parse(result);

                    if(result.length===0){
                        data = {
                            openid: openid,
                            tel : tel
                        };
                        client.query(
                            'INSERT INTO '+TEST_TABLE+ ' SET ?', data ,function (err,result) {
                                if (err) {
                                    console.log('插入数据库失败:',err)
                                    callback.call(scope, {success: false});
                                }
                                else {
                                    console.log('插入数据库成功:',result)
                                    callback.call(scope, {success: true});
                                }
                            }
                        )
                    }
                    else {
                        callback.call(scope, {binded: true});
                    }
                }
            }
        );

    },



    adminSaveData: function(data, callback, scope){
        data = JSON.parse(data)

        console.log(data)


        var TEST_TABLE = 'score';
        var status ;
        for(var o in data){
            console.log(o);
            console.log(data[o]);
            client.query('INSERT INTO '+TEST_TABLE+' SET ?', data[o], function(err, result) {
                if (err) {
                    status = 'error'
                    return false
                }
                else {
                    status = 'success'
                    // console.log('插入结果',result)
                }
            })
        }
        if(status = 'success'){
            console.log('成功')
            callback.call(scope, {success: true});
        }
        else {
            console.log('失败')
            callback.call(scope, {success: false});
        }
    }

};