const koa = require("koa");
const koaRouter = require("koa-router");
const app = new koa();
const router = new koaRouter();
const {rootData} = require("./rootData");
const {usersData} = require("./userData");
router.get("/",ctx=>{
    ctx.body = "Hello CNode";
});
router.get("/api/topics",ctx=>{
    let {page="1",tab="all",limit="20"} = ctx.query;
    let nowData = [];
    page = Number(page);
    limit = Number(limit);
    switch (tab) {
        case "all":
            nowData = [...rootData];
            break;
        case "good":
            nowData = rootData.filter(item=>item.good);    
        default:
            nowData = rootData.filter(item=>(item.tab === tab));
    }
    let start = (page-1)*limit;
    let end = (page)*limit;
    nowData = nowData.filter((item,index)=>(index>=start&&index<end));
    ctx.body = {
        "success": true,
        data: nowData 
    }
});
router.get("/api/topic/:id",ctx=>{
    let {id} = ctx.params;
    let nowData = rootData.filter(item=>item.id===id)[0];
    if(nowData){
        ctx.body = {
            "success": true,
            data: nowData 
        }
    } else {
        ctx.body = {
            "success": false
        }
    }
});
router.get("/api/user/:loginname",ctx=>{
    let {loginname} = ctx.params;
    let recent_topics = rootData.filter(item=>{
        return item.author.loginname === loginname;
    });
    let recent_replies = rootData.filter(item=>{
        return item.replies.findIndex(item=>item.author.loginname === loginname) > -1;
    });
    let nowData = usersData.filter(item=>item.loginname === loginname)[0];
    if(nowData){
        nowData = {
            ...nowData,
            recent_topics:recent_topics.slice(0,10),
            recent_replies:recent_replies.slice(0,10)
        }
        ctx.body = {
            "success": true,
            data: nowData
        }
    } else {
        ctx.body = {
            "success": false 
        }
    }
});
app.use(router.routes());
app.listen(8080);
