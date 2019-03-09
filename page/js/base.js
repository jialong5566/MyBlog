var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[{text:"Html",link:"#"},{text:"Css",link:"#"},{text:"Java",link:"#"}]
    },
    computed:{
        randomColor:function(){
            function createRandom() {
                return Math.floor(Math.random()*255)
            }
            return function(){
                let red = createRandom();
                let green =createRandom();
                let  blue = createRandom();
                return `rgb(${red},${green},${blue})`
            }

        },
        randomSize:function () {
            return function(){
               return  Math.floor(Math.random()*20+12)+"px"
            }
        }
    },
    created:function(){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        });
    }
})
var newHot  = new Vue({
    el:"#new_hot",
    data:{
        titleList:[{
            link:"#",
            title: "母猪的产后护理"
        },{
            link:"#",
            title: "公猪的产前抑郁"
        }]
    },
    created(){
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            newHot.titleList = resp.data.data.map(item=>{
                return {title:`${item.title}`,link:`blog_detail.html?bid=${item.id}`}
            });

        })
    }
})
var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {name:"jialong",
            date:"2019-03-07",
            comment:"this is a start"}
        ]
    },
    created(){
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (resp) {
            // console.log(resp)
            newComments.commentList = resp.data.data.map(item=>{
                return {name:`${item['user_name']}`,date:item.ctime,comment: item.comment}
            });

        })
    }
})