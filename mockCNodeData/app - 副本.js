const fs = require("fs");
const {rootData} = require("./data");
let data2 = [...rootData];   
const d = (n)=>{
    return n < 10?"0"+n:""+n;
};    
const setData = ()=>{
    let days = 86400000;
    let date = new Date(Date.now() - Math.random()*days*Math.random()*100);
    return {
        time: `${date.getFullYear()}-${d(date.getMonth()+1)}-${d(date.getDate())}T${d(date.getHours())}:${d(date.getMinutes())}:${d(date.getSeconds())}.${date.getMilliseconds()}Z`,
        date: date
    }
};    
const setData2 = (date)=>{
    let days = 86400000;
    let date2 = new Date(date.getTime() +  Math.random()*10*days);
    return {
        time: `${date2.getFullYear()}-${d(date2.getMonth()+1)}-${d(date2.getDate())}T${d(date2.getHours())}:${d(date2.getMinutes())}:${d(date2.getSeconds())}.${date2.getMilliseconds()}Z`,
        date: date2
    }
};
const users = [
    {
        "loginname": "zhanzhenzhen",
        "avatar_url": "https://avatars3.githubusercontent.com/u/731796?v=4&s=120"
    },{
        "loginname": "lellansin",
        "avatar_url": "https://avatars2.githubusercontent.com/u/2081487?v=4&s=120"
    },{
        "loginname": "kingapple",
        "avatar_url": "https://avatars.githubusercontent.com/u/6572403?v=2&s=120"
    },{
        "loginname": "kingapple",
        "avatar_url": "https://avatars.githubusercontent.com/u/6572403?v=2&s=120"
    },{
        "loginname": "CarlosRen",
        "avatar_url": "https://avatars0.githubusercontent.com/u/6012322?v=4&s=120"
    }
];
const replies = [
    `<div class=\"markdown-text\">
        <h2>年轻人不讲武德</h2>
        <p>看我闪电五连鞭</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>楼主的这篇文章值得我来个赞</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>正常水一水楼</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>冒个泡，证明我来过</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>也就这样子了</p>
    </div>`,
    `<div class=\"markdown-text\">
        <h2>深度好文呀</h2>
        <p>加油楼主</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>世间万物就是这个样子，你看看我，我看看你</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>是个好问题</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>这个问题我也遇到过</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>呵呵</p>
    </div>`,
    `<div class=\"markdown-text\">
        <p>来呀来呀商业互捧啊</p>
    </div>`
];    
for(let i = 0; i < 50; i++){
    let newData = rootData.map((item,index)=>{
        item = {...item};
        item.title += `复制（${i}）`;
        item.top = false;
        item.good = (Math.random()-0.7) > 0?true:false;
        item.id += "0"+i+index;
        item.author = users[Math.floor(Math.random()*users.length)];
        return item;
    });
    data2 = data2.concat(newData);
}    
data2 = data2.map(item=>{
    item.author = users[parseInt(Math.random()*users.length)];
    item.create_at = setData();
    item.replies = [];
    
    for(let i = 0; i < parseInt(Math.random()*30); i ++){
        item.replies.push({
            author:users[parseInt(Math.random()*users.length)],
            content: replies[parseInt(Math.random()*replies.length)],
            create_at: setData2(item.create_at.date)
        })
    }
    item.replies = item.replies.sort((n1,n2)=>{
        return n1.create_at.date.getTime() - n2.create_at.date.getTime() 
    }); 
    item.replies.forEach(re => {
        re.create_at =  re.create_at.time;
    });
    item.create_at = item.create_at.time;
    item.reply_count = item.replies.length;
    return item;
});
console.log(data2.length);
fs.writeFile("rootData.js",`
const rootData = ${JSON.stringify(data2)};
exports.rootData = rootData;
`,()=>{
    console.log("完成");
})
