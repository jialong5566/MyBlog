var dbutil = require("./DBUtil");

function insertBlog(title, content, tags, views, ctime, utime, success) {
    var insertSql = "insert into blog (`title`, `content`, `tags`, `views`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title, content, tags, views, ctime, utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryBlogByPage(page, pageSize, success) {
    var insertSql = "select * from blog order by id desc limit ?, ?;";
    var params = [page * pageSize, pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryBlogCount(success){
    var querySql = "select count(1) from blog"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [], function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryBlogById(bid,success){
    var querySql = "select * from blog where id = ?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [bid], function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
}
function addViews(id, success) {
    var querySql = "update blog set views = views + 1 where id = ?;";
    var params = [id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryHotBlog(size,success){
    var querySql = "select * from blog order by views desc limit ?"
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, [size], function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
}
module.exports.queryHotBlog = queryHotBlog
module.exports.addViews = addViews
module.exports.queryBlogCount = queryBlogCount
module.exports.queryBlogByPage =queryBlogByPage
module.exports.insertBlog= insertBlog
module.exports.queryBlogById = queryBlogById