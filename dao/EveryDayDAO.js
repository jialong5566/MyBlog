var dbutil = require("./DBUtil");
function insertEveryDay(content,ctime,success) {
    var insertSql = "insert into every_day (`content`,`ctime`) values (?,?)";
    var params = [content,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (err,res) {
        if(err==null){
            success(res)
        }else {
            throw new Error(err)
        }

    })
    connection.end();
}
function queryEveryDay(success) {
    var querySql = "select * from every_day order by id desc limit 1;";
    var params = []
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (err,res) {
        if(err==null){
            success(res)
        }else {
            throw new Error(err)
        }

    })
    connection.end();
}
module.exports.insertEveryDay=insertEveryDay
module.exports.queryEveryDay = queryEveryDay;
