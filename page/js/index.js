var everyDay = new Vue({
    el:"#every_day",
    data:{
        content:"never say never"
    },
    computed:{
        getContent:function(){
            return this.content
        }
    },
    created(){
        //request data to content
        axios({
            method:"get",
            url:"/queryEveryDay"
        }).then(res=>{
            var content  = res.data.data[0].content
            this.content = content
        }).catch((e)=>{
            console.log(e)
        })
    }
})
var articleList = new Vue({
    el:"#article_list",
    data:{
        page: 1,
        pageSize: 5,
        pageNumList: [],
        count:0,

        articleList:[]
    },
    computed:{
        jumpTo:function(){
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function() {
            return function (page,pageSize) {
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : [];
                var tag = "";
                searcheUrlParams.forEach(function (item) {
                    if (item.split("=")[0] == "tag") {
                        try {
                            tag = item.split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                })
                if(tag==""){
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function(resp) {
                        console.log(resp)
                        articleList.count = resp.data.data[0]['count(1)'];
                        articleList.generatePageTool;
                    });
                }else{
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }



            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});

            if (nowPage + 1 <= Math.ceil(totalCount/pageSize)) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= Math.ceil(totalCount/pageSize)) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            // console.log(result)
            return result;
        }
    },
    created(){
        //request data to article
        this.getPage(this.page, this.pageSize);
    }
})