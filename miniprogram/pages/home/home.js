// pages/home/home.js
Page({
  
  data: {
 list:[]//查询电影列表
  },
  jumpComment:function(event){
    //  1添加参数event事件对象
    // 2依据event获取自定义属性id
    var id= event.target.dataset.id;
    console.log(id);
    // 3跳转pages/comment/comment参数id
    var url="/pages/comment/comment?id="+id
    wx.navigateTo({
      url:url,
    })

  },
  loadMore:function(){
  //  当组件创建成功调用云函数1
  // 获取云函数返回的结果，并显示
  // start://参数  0 10 20 30
  // 1调用云函数
  wx.cloud.callFunction({
    name:"movielist1906",//云函数名称
    data:{start:this.data.list.length}//参数47
  })
  .then(res=>{
    var rows=JSON.parse(res.result);
    rows=this.data.list.concat(rows.subjects);
    // console.log(rows.subjects);//ok
    this.setData({
      list:rows
    })
  })
  .catch(err=>{
    console.log(err);//err
  })
  // 2传递start
  // 3获取云函数返回结果并保存list
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(123);
    this.loadMore();
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