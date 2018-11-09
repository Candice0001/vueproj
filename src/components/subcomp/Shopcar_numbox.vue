<template>
        <!-- 
            问题时，我们不知道什么时候可以拿到max的值，但是总会拿到max的真正值
            可以使用属性监听watch，来监听父组件传递过来的max值
         -->
    
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="initCount" 
                @change="countChange" ref="numbox" readonly/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div> 
        <!-- 
            分析：子组件什么时候把值传递给父组件？
            input的值改变时change，把值传递给父组件
         -->
    </template>
    <script>
    import mui from '../../lib/mui/js/mui.js'   
     export default{
         data(){
             return {}
         },
         mounted() {
             //初始化选择器组件
             mui('.mui-numbox').numbox();
             //console.log(this.max)
         },
         methods:{
             //getCount
             //每当数量值改变时，则立即把最新的数量同步到购物车的store中，覆盖之前的数量值
             countChange(){
                 console.log(this.$refs.numbox.value)
                 this.$store.commit("updateGoodsInfo",{
                     id:this.goodsid,
                     count:this.$refs.numbox.value
                    });
             }
         },
       props:["initCount","goodsid"]
         
     }
    </script>
    <style lang="scss" scoped>
        
    </style>
    