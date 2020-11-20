const koa = require("koa");
const koaRouter = require("koa-router");
const app = new koa();
const router = new koaRouter();
const {rootData} = require("./rootData");
router.get("/",ctx=>{
    ctx.body = "hello world"  + rootData.length;
});
router.get("/api/topics",ctx=>{
    console.log(ctx);
    //ctx.response.data = "{name:'开课吧'}"
    ctx.body = "{name:'开课吧'}";
});
app.use(router.routes());
app.listen(3000);
