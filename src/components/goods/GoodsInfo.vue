<template>
    <div class="goodsinfo-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swipper :lunbotulist="lunbotu" isfull="false"></swipper>
					</div>
				</div>
			</div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{ goodsinfo.title }}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                        </p>
                        <p>
                            购买数量：<numbox @getCount="getSelectedCount"
                                :max="goodsinfo.stock_quantty"></numbox>
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                        </p>
                        <!-- 
                            分析如何实现加入购物车时，拿到 选择的数量？？？？
                            1. 经过分析 按钮属于goodsinfo 数量属于numbox子组件
                            2. 涉及到了父子组件嵌套，无法直接在goodsinfo页面拿到值，涉及到了父子组件传值
                            3. 使用事件调用机制： 父向子传递方法，子调用这个方法，同时把数据当做参与
                                传递给方法
                         -->
					</div>
				</div>
			</div>
        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号：{{ goodsinfo.goods_no }}</p>
                        <p>库存情况：{{ goodsinfo.stock_quantty }}件</p>
                        <p>上架时间：{{ goodsinfo.add_time }}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
    //导入轮播图组件
    import swipper from '../subcomp/Swipper.vue'
    import numbox from '../subcomp/GoodsInfo_numbox.vue'
  export default{
      data(){
          return {
              id:this.$route.params.id, //将路由参数中的 id 挂载到data，方便调用
              lunbotu:[], //轮播图数据
              goodsinfo:{}, //获取到的商品的信息
              ballFlag:false,//控制小球隐藏和显示
              SelectedCount:1, //保存用户选中的商品数量，默认为1
            }
      },
      created() {
          this.getLunbotu()
          this.getGoodsInfo()
      },
      methods:{
          //可以和首页的轮播图公用一个组件 ，抽离
          getLunbotu(){
              //this.$http.get('lunbo.json'+this.id).then(result =>{
                this.$http.get('lunbo.json').then(result => {
                  if(result.body.status === 0){
                      this.lunbotu = result.body.data
                      console.log(this.lunbotu)
                  }
              })
          },
          getGoodsInfo(){
              //获取商品信息
              this.$http.get('goodsinfo.json').then(result =>{
                  if(result.body.status === 0){
                      console.log(result.body.data[0])
                    this.goodsinfo = result.body.data[0]
                  }
              })
          },
          goDesc(id){
              //跳转到图文介绍页面
              //使用编程式导航
              this.$router.push({ name:'goodsdesc',params:{id}})
          },
          goComment(id){
              //跳转到评论页面
              this.$router.push({ name:'goodscomment',params:{id}})
          },
          addToShopCar(){
              //添加到购物车
              this.ballFlag = !this.ballFlag
              //拼接出car数组对象
              var goodsObj = { 
                  id:this.id, 
                  count:this.SelectedCount, 
                  price:this.goodsinfo.sell_price, 
                  selected:true
                };
                //调用store中的mutations来吧商品加入到购物车
                this.$store.commit('addToCar',goodsObj)

          },
          beforeEnter(el){
              el.style.transform="translate(0,0)"
          },
          enter(el,done){
              el.offsetWidth;

              /** ！！！小球动画优化思路：
               *  和滚动条 分辨率有关，
               *   所以不能把位置坐标写死， 
               * 解题思路：先得到徽标的横纵坐标，在得到小球的横纵坐标，然后 x,y分别求差，
               * 就是需要移动的距离
               * 
               * 获取坐标位置 domobject.getBoundingClientRect()
               */
              //获取小球的位置
              const ballPosition = this.$refs.ball.getBoundingClientRect()
              //获取徽标的位置 ，使用DOM获取位置
              const badgePosition =document.getElementById("badge").getBoundingClientRect()
              const xDist = badgePosition.left - ballPosition.left;
              const yDist = badgePosition.top - ballPosition.top;


              el.style.transform=`translate(${xDist}px,${yDist}px)`;
              el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)"
              done()
          },
          afterEnter(el){
              this.ballFlag = !this.ballFlag
          },
          getSelectedCount(count){
              //当子组件把选中的值传递给父组件时，把值保存到SelectedCount中
            this.SelectedCount = count;
            console.log("父组件拿到的numbox:"+this.SelectedCount)
          },
      },
      components:{
          swipper,
          numbox
      }
  }  
</script>
<style lang="scss" scoped>
   .goodsinfo-container{
       background-color: #eee;
       overflow: hidden;
       .now_price{
           color: red;
           font-size:16px;
           font-weight: bold;
       }
   }
   .mui-card-footer{
       display: block;
       button{
           margin:15px 0;
       }
   } 
   .ball{
       width: 15px;
       height: 15px;
       border-radius:50%;
       background-color: red;
       position: absolute;
       z-index: 99;
       top: 390px;
       left: 144px;
   }

</style>