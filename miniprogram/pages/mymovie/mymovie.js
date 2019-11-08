// pages/mymovie/mymovie.js
const db=wx.cloud.database();//9*创建数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
   content:"",//留言内容
   images:[],//选中图片-1张就写对象
  //  fileIds:[],//2*上传成功后文件fileID
  },
  submit:function(){
    // 功能：上传一张指定图片images，将图片filedId保存
    // 功能二：将留言/finleID添加云数据库
    // 1显示加载提示框
wx.showLoading({
  title: '评论中....',
})
// +判断看用户有没有选
console.log(this.data.images.length);
// 107
    // 2选中文件文件名
   if(this.data.images.length==0){
     wx.showLoading({
       title: '请选择图片',
     })
     return;//停止程序运行
   }
  var item=this.data.images;  //文件
    // 3使用正则表达式获取文件名后缀.jpg png
   var su=/\.\w+$/.exec(item)[0];
    // 4创建文件名 时间 +随机数+后缀
    var newFile=new Date().getTime();
        newFile=Math.floor(Math.random()*999);
        newFile+=su;
        console.log(newFile);
        // 565.png
      // 5上传图片
    wx.cloud.uploadFile({
       cloudPath:newFile,
       filePath:item,
       success:(res)=>{
         console.log(res.fileID);
        //  cloud://web1906-haha-w8otz.7765-web1906-haha-w8otz-1300467130/565.png
        var fileId=res.fileID;
        // 获取评论内容
        var m=this.data.content;
        // 集合**头部const 
        // 10添加数据库
        db.collection("mymovie")//集合
        .add({  //添加
          data:{ //数据
            fileId:fileId,//路径
            content:m//内容
          }
        })
        .then(res=>{
          wx.hideLoading();//隐藏
          console.log(res)
          wx.showLoading({
            title: '发表成功',
          })
        })
        .catch(err=>{console.log(err)})
       }
    })
    
  },
onContentChange:function(event){
  // 双向绑定
  // 1添加参数event
  // 2获取event.detail保存content
  this.setData({
    content:event.detail
  })
},
selectImg:function(){
  // 1获取用户选中图片并且保存images:[]
  // 1显示一张图片
 wx.showLoading({
   title: '图片上传中...',
 })
  // 2选择一张图片  
  wx.chooseImage({
      count:1,
        // 3类型
      sizeType:["original","compressed"],
  // 4来源
      sourceType:["album","camera"],
      success:(res)=>{
        var file=res.tempFilePaths[0];
        this.setData({
          images: file// 6将当前图片保存对象中
        })
        // 7隐藏
        wx.hideLoading();//隐藏
      }
  })
  //
},
//  向集合comment1906添加一条记录
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})