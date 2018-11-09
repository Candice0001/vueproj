<template>
    <div>
        <!-- 轮播图区域 -->
        <mt-swipe :auto="4000">
            <!-- 在组件中是v-for 必须指定key -->
            <!-- 将来谁使用轮播图组件，谁向我们传递lunbotuList -->
            <mt-swipe-item v-for="item in lunbotulist" :key="item.url">
                <img :src="item.img" alt="" srcset="" :class="{'full':isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
    <!-- 
        为什么商品评论中的轮播图那么丑？
        1. 首页中的图片，它的宽和高都使用了100%
        2. 在商品详情页面中，轮播图的图片，如果也使用100%的话不好看，所以应设置高度100%,宽度自适应
        3. 经过分析原因：分歧点 宽度是100%还是自适应？
        4. 既然两个轮播图，其他方面都是没有冲突的，只是 宽度的问题， 那么可以定义一个属性，
        让轮播图的使用者，手动设置

    -->
</template>
<script>
export default{
    props:["lunbotulist","isfull"]
}  
</script>
<style lang="scss" scoped>
   .mint-swipe {
        height: 200px;
        width: 100%;
        .mint-swipe-item {
            text-align: center;
            &:nth-child(1) {
                background-color: red;
            }
            &:nth-child(1) {
                background-color: yellow;
            }
            &:nth-child(1) {
                background-color: blue;
            }
            img {
                /*width: 100%;*/
                height: 100%;
            }

        }
    } 
    .full{
        width: 100%; 
    }
</style>