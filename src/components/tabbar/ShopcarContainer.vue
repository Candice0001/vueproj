<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!-- 商品列表区域 -->
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" 
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.img_url" alt="">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                               <!-- 
                                   如何从购物车获取商品数量？？？
                                   1.循环购物车吧商品的id,count存储到一个对象中
                                   {id:count} ==> {1:2} id为1的商品的购买数量为2
                                -->
                                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 因为是a连接，所以要阻止默认行为 
                                    id：是便于删除store中的数据，i是为了删除goodslist中的数据
                                -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除 </a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计(不含运费)</p>
                        <p>已勾选商品 {{ $store.getters.getGoodsCountAndAmount.count }} 件，总价 
                            <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span> </p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
        <p>{{ $store.getters.getGoodsSelected }}</p>
    </div>
</template>
<script>
   import numbox from '../subcomp/Shopcar_numbox.vue'
   export default{
       data(){
           return {
               goodslist:[], //购物车商品列表
           }
       },
       created() {
           this.getGoodsList()
       },
       methods:{
           getGoodsList(){
               //1. 获取stroe中的所有商品id
               var idArr = []
               this.$store.state.car.forEach(item => {
                   idArr.push(item.id)
               })
               //如果购物车没有商品，不需要请求数据接口
               if( idArr.length <= 0){
                   return;
               }
               //获取购物车商品列表 , 接口，购物车商品id
               this.$http.get('carlist.json').then( result =>{
                   if(result.body.status === 0){
                       this.goodslist = result.body.data;
                       //这里获取的数量没有意义，商品的实际数量存储在localStorage中
                   }
               })

           },
           remove(id,index){
               //点击删除， id：是便于删除store中的数据，index是为了删除goodslist中的数据
                this.goodslist.splice(index,1);
                this.$store.commit('removeFromCar',id)
           },
           selectedChanged(id,value){
               //每点击switch,把switch的状态同步到store中
            //    console.log(id+"----"+value)
               this.$store.commit('updateGoodsSelected',{ id:id, selected:value})
           }
       },
       components:{
           numbox
       }
   } 
</script>
<style lang="scss" scoped>
  .shopcar-container{
      background-color: #eee;
      overflow: hidden;
      .goods-list{
          .mui-card-content-inner{
              display: flex;
              align-items: center;
          }

          img {
              width: 60px;
              height: 60px;
          }
          h1{
              font-size: 13px;
          }
          .info {
              display: flex;
              flex-direction: column;
              justify-content:space-between ;

              .price {
                  color: red;
                  font-weight:bold;
              }
          }
      }
      .jiesuan{
        display: flex; 
        justify-content:space-between ; 
        align-items: center;
        
        .red {
            color: red;
            font-size:16px;
        }
      }
  }  
</style>