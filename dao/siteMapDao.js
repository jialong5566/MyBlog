var dbutil = require("./DBUtil");

function queryAllBlog(success) {
    var querySql = "select * from blog order by id desc;"

    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,[],function (err,res) {
        if(err==null){
            success(res)
        }else {
            throw new Error(err)
        }

    })
    connection.end();

}
module.exports.queryAllBlog=queryAllBlog