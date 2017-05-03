/**
 * Created by qingbiao on 2015-12-16.
 */

//  redis 部分

// var redis = require("redis");
// var client = redis.createClient(6379,'127.0.0.1');
//
// client.on("error", function(err){
//     console.log("Redis Error: " + err);
// });
//
// client.on('ready',function(err){
//     console.log('Redis ready...');
// });
//
// module.exports = client;


var mysql = require('mysql');

var TEST_DATABASE = 'grade';
var TEST_TABLE = 'score';

//创建连接
var client = mysql.createConnection({
    user: 'root',
    password: '',
});

client.connect();
client.query("use " + TEST_DATABASE);


// client.query(
//     'SELECT * FROM '+TEST_TABLE,
//     function selectCb(err, results, fields) {
//         if (err) {
//             throw err;
//         }
//
//         if(results)
//         console.log(results)
//         {
//             for(var i = 0; i < results.length; i++)
//             {
//                 console.log(results[i]);
//             }
//         }
//         client.end();
//     }
// );



// for(var o in data.data){
//     console.log(o);
//     console.log(data.data[o]);
//     client.query('INSERT INTO score SET ?', data.data[o], function(err, result) {
//         // Neat!
//         if (err) {
//             throw err;
//         }
//         else {
//             console.log(result)
//         }
//     })
// }






module.exports = client;
