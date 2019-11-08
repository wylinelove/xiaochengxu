// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 1引入request-promise库
  const rp=require("request-promise");

// 云函数入口函数
exports.main = async (event, context) => {
 //  2创建变量url豆瓣网址
  var url = ` http://api.douban.com/v2/movie/subject/${event.id}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
//  3发送请求返回结果
  return rp(url).then(res=>{
    return res;
  }).catch(err=>{
    console.log(err);
  })
}