var blogDao = require("../dao/BlogDao");
var tagDao = require("../dao/TagDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var url = require("url");
var path = new Map();

function editBlog(request,response) {
    var params = url.parse(request.url,true).query;
    var tags = params.tags.replace(/ /g,'').replace("，", ",")
    request.on("data",function (data) {
        blogDao.insertBlog(params.title,data.toString(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function (res) {
            response.writeHead(200)
            response.write(respUtil.writeResult("success","添加成功",null))
            response.end()
            var blogId = res.insertId;
            var tagList = tags.split(",");
            tagList.forEach(tagItem=>{
                if(tagItem!==""){
                    queryTag(tagItem,blogId)
                }
            })
        })
    })
}
path.set("/editBlog",editBlog)

function queryBlogByPage(request,response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        result.forEach(item=>{
            item.content = item.content.replace(/<img[\w\W]*">/, "");
            item.content = item.content.replace(/<[\w\W]{1,5}>/g, "");
            item.content = item.content.substring(0, 300);
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogByPage",queryBlogByPage)
function  queryBlogCount(request,response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200)
        response.write(respUtil.writeResult("success", "查询成功", result))
        response.end()
    })
}
path.set("/queryBlogCount",queryBlogCount)
function queryTag(tag,blogId){
    tagDao.queyrTag(tag,function (result) {
        if(result==null||result.length==0){
            insertTag(tag,blogId)
        }else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function (res) {

            })
        }
    })
}
path.set("/queryTag",queryTag)
function insertTag(tag,blogId){
    tagDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        insertTagBlogMapping(result.insertId,blogId);
    })
}
path.set("/insertTag",insertTag)
function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (res) {

    })
}
path.set("/insertTagBlogMapping",insertTagBlogMapping)
function queryBlogById(request,response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200)
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
        blogDao.addViews(parseInt(params.bid),function (res) {})
    })
}
path.set("/queryBlogById",queryBlogById)
function queryHotBlog(request, response) {
    blogDao.queryHotBlog(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryHotBlog", queryHotBlog);
module.exports.path = path