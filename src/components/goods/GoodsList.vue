<template>
    <div class="goods-list">
        <!-- 使用后台接口时，key应该是item.id -->
        <!-- <router-link class="goods-item" v-for="(item, index) in goodslist" :key="index"
         :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_num}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 
            在网页中有两种跳转方式：
            方式一：使用<a>标签 标签跳转
            方式二：使用window.location.href的相识，叫做编程式导航 -JS代码
        -->
        <div class="goods-item" v-for="(item, index) in goodslist" :key="index"
            @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="goods-info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_num}}件</span>
                </p>
            </div>
        </div> 

        
        <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
export default{
    data(){
        //
        return {
            pageIndex:1,//默认第一页
            goodslist:[],//存放商品列表的数组
        }
        
    },
    created() {
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //this.$http.get('getGoods.json/'+this.pageIndex).then(result =>{
            this.$http.get('getGoods.json').then(result =>{
                if(result.body.status == 0){
                    this.goodslist = this.goodslist.concat(result.body.data);
                }
            });
        },
        getmore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用JS的形式进行导航
            //通过router的实例方法：router.push()
            /**
             * 注意. this.$route:路由参数对象，所有路由中的参数，params query 都属于它
             *      this.$router:路由导航对象，使用他可以方便的使用JS代码，
             *      实现路由的前进、后退、跳转到新的URL地址
             */
            console.log(this)
            //this.$router.push("/home/goodsinfo/"+id) // 最简单的
            //this.$router.push({path:'/home/goodsinfo/' + id }) //传递对象
            this.$router.push({ name:"goodsinfo",params:{ id }}) //传递命名路由
            //path 不能和params一起使用，因为使用path时，params会被忽略
        }
    }
}    
</script>
<style lang="scss" scoped>
.goods-list{
    /* 以下样式的作用：
    让两列布局的都浮动在左右两边，如果只有一列的话，浮动在左边；
    */
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:3px 0px;
        padding: 2px;
        /* 解决两列内容高度不一样时，高度低的下面留白问题
            以下样式，可以让，内容充满，浮动到两端，没有留白问题
         */
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        min-height:220px;

        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .goods-info {
             background-color: #eee;
             
             p{
                 margin:0;
                 padding:5px;
             }
            .price{
                .now{
                    color: red;
                    font-weight:bold;
                    font-size:16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left:10px; 
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;

            }
        }
    }
}
</style>