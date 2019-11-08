// pages/comment/comment.js
const db=wx.cloud.database();//创建数据库
Page({
  /**
   * 页面的初始数据
   */
   data: {
   content:"",//用户评论的内容,
   score:0 ,  //分数
   id:0,//当前电影id
   detail:{},//云函数返回的结果
   images:[],//选中的图片列表
   fileIds:[],//上传成功后文件fileID
  },
  submit:function(){
    // *发表评论
    // 1上传多张图片
    // 1.1创建数据库对象db头部
    // 1.2在data中添加属性finIDs:[]头下
    // 1.3显示数据加载的提示框
    wx.showLoading({
      title: '发表评论',
    })
    // 1.4创建数组添加promise对象
    var rows=[];//放promise对象
    // 4.5创建循环遍历 选中的图片-图片在imgages中
    if(this.data.images.length==0){
      wx.showToast({
        title:'请选择图片',
      });
      return;
    }
    for (var i = 0; i < this.data.images.length; i++) {  //6点击上传一张图片                                
      //7创建promise对象完成图片上传操作将promise对象保存在 数组中
      console.log(i) 
      rows.push(new Promise((resolve, reject) => {  //末尾添加
      // 8获取当前要上传图片名称
      var item=this.data.images[i];
      // 9获取图片名称的后缀.jpg .png .gif 正则表达式/\.\w+$/.exec('a.jpg')=>[.jpg]
      var su=/\.\w+$/.exec(item)[0];
      // 10.创建新的文件名  时间+随机数+后缀
      var newFile=new Date().getTime();//时间
          newFile+=Math.floor(Math.random()*999);//随机数
          newFile+=su;//后缀
      // 11上传指定图片
      wx.cloud.uploadFile({
        cloudPath:newFile,
        filePath:item,
        success:(res)=>{
          // 12将上传成功的fileID保存数组
          var fid=res.fileID;//图片路径
          this.data.fileIds.push(fid);
          resolve();//promise执行成功就解析
          // 13调用解析方法
        }
      })
      // 12上传成功的fineID保存数组
      // 13调用解析方法
      }));//Promise end 
    }
    //for end
   // 2将图片finId,评论，分数保存
  // 14等待所有promise执行完
  // 15向云数据库添加一条记录
  Promise.all(rows).then(res=>{
  // 16在云开发控制面板中添加集合commen1906
  // 17获取分数，
  var s=this.data.score;
  // 18留言
    var m = this.data.content;
  // 19获取上传到云存储的fineID'
    var fids = this.data.fileIds;
  // 20向集合coment1906添加一条记录
  db
  .collection("comment1906")//云集合
  .add({
    data:{
      content:m,
      score:s,
      fileIds:fids
    }
    })
  .then(res=>{
    wx.hideLoading();
    wx.showToast({
      title:'评论成功',
    })
  })
  .catch(err=>{
    console.log(err);
  });
  // 21添加成功隐藏加载提示框
  //22 显示提示框评论成功
  })
  },
  selectImg:function(){
 // *选中多张图片,并且预览
  //1 选中多张图片
  wx.chooseImage({
    count: 9, //3指定数量9张
     // 2指定图片类型 来源
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: (res => {  // 4选中成功
  // 5在data添加属性images:[]在*第一步
  // 6将结果返回保存images
  var list=res.tempFilePaths;
    this.setData({
      images:list
    })
  // 7在模板中显示图片 
    })
  })
  },
  onScoreChange:function(event){
    // 功能：参数
    // 1添加参数event
    // 2获取event.detail输入分数内容保存score
    this.setData({
      score:event.detail
    })
  },
  onContentChange:function(event){
    // 1添加参数event
    // 2获取event.detail输入内容保存conten中
    this.setData({
      content:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数id
      var id=options.id;
      // 将参数id保存data中
      this.setData({
        id:id
      })
      console.log(id);
      // 3调用loadMore
      this.loadMore();
  },
  loadMore:function(){
    // 组件创建成功后调用云函数显示当前电影的详细信息
    // 1获取电影id
      var id=this.data.id;
      console.log(id);
    // 2显示加载数据提示框...旋转小动画
     wx.showLoading({
       title:'数据加载中...',//数据加载中提示
     })
    // 3调用云函数findDetail1906参数id
    wx.cloud.callFunction({
      name:"findDetaul1906",
      data:{id:id}
    }).then(res=>{
      console.log(res.result);
        // 4获取云函数返回的结果
        var obj=JSON.parse(res.result);
        // 5 添加属性detail'
        // 保存data detail
        this.setData({
          detail:obj
        })
        // 6隐藏加载提示框
        wx.hideLoading();
    }).catch(err=>{
      console.log(err);
    })
   
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