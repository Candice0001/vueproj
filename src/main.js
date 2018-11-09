// main.js 是我们项目的入口文件
import Vue from 'vue'
//1.1 导入路由
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)



//设置请求的根路径
Vue.http.options.root ="src/json"
//导入格式化时间插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    // cnpm i moment -S
    return moment(dataStr).format(pattern)
})
//全局设置emulateJson
Vue.http.options.emulateJSON=true;

//导入mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入app根组件、
import app from './app.vue'

//按需导入 min-ui中的组件
// import { Header,Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
// // 实现懒加载 mint-ui
// Vue.use(Lazyload);
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//安装图片预览插件 cnpm i vue2-preview -S

// import VuePreview from 'vue2-preview'
// Vue.use(VuePreview)

// 1.3 导入自己的js 路由模块
import router from './router.js'

//配置使用vuex
//1.1 执行cnpm i vuex -S
//1.2 导包
import Vuex from 'vuex'
//1.3 注册vuex到vue
Vue.use(Vuex)
//1.4 new Vuex.Store({})实例
//每次刚进入网站，肯定会调用main.js，在刚调用时，先从本地存储中，把购物车的数据取出来
var car = JSON.parse(localStorage.getItem('car')  || '[]')
var store = new Vuex.Store({
    //在vuex中所有的方法的第一个参数都是state
    state:{
        //类同组件中的data
        //访问store中的数据使用 this.$store.state.**
        car:car,//将 购物车中的数据，用car数组存储；商品对象{id:商品id,count:购买数量，price:商品单价，selected:是否选中该商品}

    },
    mutations:{
        //组件中的methods
        //！！！ 注意，如果要操作state中的数据，只能调用mutations提供的方法，不推荐直接操作state中的数据
        //在mutations的函数最多只能接受两个参数
        //参数1：state 参数2:传递过来的参数
        //子组件调用 this.$store.commit('方法名')  类似 this.$emit('父组件中的方法名')
        addToCar(state,goodsinfo){
            //点击加入到购物车，把商品信息保存到car中
            /**
             * 分析：
             * 1.如果购物车中有该商品，更新数量，如果没有，把商品数据push到car中
             */
            var flag = false

            state.car.some(item => {
                /**
                 * some()方法： 1. 用于检测数组中的元素是否满足指定条件
                 *              2. 会依次执行检测数组的每个元素：
                 *                  2.1 若有一个元素满足条件，则表达式返回 true,剩余元素不会在执行检测
                 *                  2.2 若没有满足条件的元素，则返回 false
                 * some()不会对空数组进行检测
                 * some()不会改变原始数组
                 * 
                 * forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
                 * forEach() 不会对空数组进行回调
                 */
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            if( !flag ){ //购物车中没有该商品
                state.car.push(goodsinfo)
            }

            //当更新car之后，把car存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品数量
            state.car.some(item =>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //更新本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            //根据id,从store中的购物车删除对应的那条商品数据
            state.car.some((item,i) =>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true
                }
            })
            //更新本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item =>{
                if(item.id == info.id){
                    item.selected = info.selected
                    return true
                }
            })
            //更新本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },

    },
    getters:{
       //注意，这里只负责获取数据，不能实现修改数据
        // 若修改数据，请去找mutations
         //和过滤器类似，不修改数据，只是对数据进行包装
         //和 计算属性 类似
        getAllCount(state){
            var c = 0;
            state.car.forEach( item =>{
                c += item.count
            });
            return c //返回总数量
        },
        getGoodsCount(state){
            var obj = {}
            state.car.forEach(item =>{
                obj[item.id] = item.count
            })
            return obj
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选结算的数量
                amount:0 //勾选结算的商品总价
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.count * item.price
                }
            })
            return o
        }

    }
})
var vm = new Vue({
    el:'#app',
    render: c => c(app),
    router,
    store //把store挂载到vue上
})
console.log("OK")

/**
 * 
 * 制作首页app组件
 * 1. 完成 Header 区域，使用mint-ui的 header组件
 * 2. 制作底部的Tabbar区域，使用Mui的Tabbar组件
 * 3. 要在中间区域放置一个 router-view来展示路由匹配到的组件
 * 
 * 1. 改造Tabbar为路由 router-link
 * 2. 设置路由高亮
 * 3. 点击tabbar 中的路由连接，展示对应的路由组件
 * 
 * 制作首页轮播图
 * 1.加载首页轮播图数据
 * 2.获取数据 cnpm i vue-resource -S
 */