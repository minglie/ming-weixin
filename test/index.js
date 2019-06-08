
const Weixin = require('../src/weixin/Weixin.js');



weixin=new Weixin({AppID:"wx6f52a9b8148f8b5b",AppSecret: '0986828d56b29b9c7cc1885c373c0df3'});



async function aa() {

    console.log(await weixin.token)


};





/**
 * 个人主要信息
 */
if(0)
weixin.jscode2session("071oUL3j0HKSvo1dHI3j0spP3j0oUL3Z").then(d=>console.log(d.data))

aa()