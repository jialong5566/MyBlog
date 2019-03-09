
var respUtil = require("../util/RespUtil");
var siteMapDao = require("../dao/siteMapDao");

var path = new Map();
function  queryAllBlog(request,response) {
    siteMapDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog)
module.exports.path = path