<template>
    <div>
        <!-- 轮播图区域 -->

        <!-- <mt-swipe :auto="4000"> -->
            <!-- 在组件中是v-for 必须指定key -->
            <!-- <mt-swipe-item v-for="item in lunbotulist" :key="item.url">
                <img :src="item.img" alt="" srcset="">
            </mt-swipe-item>
        </mt-swipe> -->
        
        <!-- 使用轮播图组件 -->
        <swipper :lunbotulist="lunbotulist" :isfull="true"></swipper>
        <!-- 九宫格 到六宫格的改造 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <span class="mui-icon mui-icon-home"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <!-- <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span> -->
                    <img src="../../images/muwu.jpg" alt="">
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <!-- <span class="mui-icon mui-icon-search"></span> -->
                    <img src="../../images/logo.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>
        </ul>

        <!-- <h3>HomeContainer 组件</h3> -->
    </div>
</template>
<script>
    import { Toast } from 'mint-ui'
    import swipper from '../subcomp/Swipper.vue'
    //导入json文件
    // import data from '../../json/lunbo.json'
    export default {
        data() {
            return {
                lunbotulist: [] //保存轮播图的数据
            }
        },
        created() {
            this.getLunbotu()
        },
        methods: {
            getLunbotu() {//获取轮播图数据
                this.$http.get('lunbo.json').then(result => {
                    console.log(result.body);
                    if (result.body.status === 0) {
                        this.lunbotulist = result.body.data;
                        Toast("加载成功")
                    } else {
                        Toast("加载轮播图失败。。。")
                    }
                })
            }
        },
        components:{
            swipper
        }
    }

</script>
<style lang="scss" scoped>
    
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;

        img {
            width: 38px;
            height: 38px;
        }
        .mui-media-body {
            font-size: 14px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>