<template>
    <div>
        <!-- 顶部滑动条 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <!--  mui-active 激活类，按需加载类 :class="[]" -->
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active':'' ]" v-for="(item, i) in cates" :key="item.id" @click="getPhotoListBycategory(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>

        </div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    /**
     * 初始化 滑动条时，项目报错了，
     * 移除 webpack 的严格模式
     * cnpm i babel-plugin-transform-remove-strict-mode -D
     * 打开.babelrc 添加
     * "plugins":[["transform-remove-strict-mode"]]
    */
import mui from '../../lib/mui/js/mui.js'



    export default{
        data(){
            return {
                cates:[],//所有分类的数组
                list:[],//图片列表的数据
            }
        },
        mounted(){
            //当组件中的Dom结构被渲染好并放到页面中后，会执行当前钩子函数mounted
            //如果要操作元素，最好在mounted，因为，这里的元素时最新的；
            //初始化滑动组件
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        created() {
            this.getAllCategory();
            //默认进入页面，就主动请求所有的数据
            this.getPhotoListBycategory(0);
        },
        methods:{
            getAllCategory(){
                //获取所有的图片分类；顶部
                this.$http.get('photolisttop.json').then(res =>{
                    if(res.body.status === 0){
                        //接口返回的数据不包括全部，应自己使用unshift添加
                        res.body.data.unshift({title:"全部",id:0})
                        this.cates = res.body.data;
                    }
                })
            },
            getPhotoListBycategory(catId){
                console.log(catId);
                //实际  this.$http.get('photoslist.json'+catId).then(res =>{
                this.$http.get('photoslist.json').then(res =>{
                    if(res.body.status === 0){
                        //接口返回的数据不包括全部，应自己使用unshift添加
                        this.list = res.body.data;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    /*
    * Unable to preventDefault inside passive event listener due to target being treate
    */
    *{
        touch-action: pan-y;
    }
    .photo-list{
        list-style: none;
        margin: 0;
        padding: 0;
        padding-bottom:0; 
        li{
            background-color: #ccc;
            text-align:center;
            margin-bottom:10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img{
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .info{
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color:rgba(0, 0, 0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-boay{
                    font-size: 13px;
                }
            }
        }
    }
    
</style>