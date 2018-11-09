<template>
    <div class="app-container">
        <!-- 顶部 header -->
        <mt-header fixed title="我的vue项目">
            <!-- 返回按钮 
                <router-link to="/" slot="left"> 返回根路径
            -->
            <span to="/" slot="left" @click="goback" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <!-- 中间的路由 router-view -->
        <transition mode="out-in">
                <router-view></router-view>
        </transition>
        
        <!-- 底部 tabbar -->
        <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item1" to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item1" to="/member">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item1" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                        <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
                    </span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item1" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>

    </div>
</template>
<script>
export default{
    data(){
        return{
            flag:false //控制返回按钮的显示隐藏
        }
    },
    created() {
        //刚进来时没有触发路由的改变
        this.flag = this.$route.path === '/home' ? false:true
    },
    methods:{
        goback(){
            //点击后退
            this.$router.go(-1);
        }
    },
    watch:{
        //监听url
        '$route.path':function(newVal){
            if(newVal === '/home'){
                this.flag = false; //首页时，隐藏返回按钮
            }else{
                this.flag = true;
            }
        }
    }
} 
</script>
<style lang="scss" scoped>
    .mt-header{
        z-index: 99;
    }
  .app-container{
     padding-top: 40px;
     padding-bottom: 50px;
     overflow-x: hidden;
    }   
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
        /* overflow-x: hidden;
        position: absolute; */
    }
    
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute; 
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
    /* 改类名，解决photoslist组件中引入mui的js后，tabbar无法切换的问题 */
    .mui-bar-tab .mui-tab-item1{
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
    }
    .mui-bar-tab .mui-tab-item1.mui-active {
        color: #007aff;
    }
    .mui-bar-tab .mui-tab-item1 .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
    } 

    .mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    /*.mui-tab-item1 end */
 
</style>