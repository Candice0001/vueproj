<template>
    <!-- 
        问题时，我们不知道什么时候可以拿到max的值，但是总会拿到max的真正值
        可以使用属性监听watch，来监听父组件传递过来的max值
     -->

    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" 
            @change="countChange" ref="numbox"/>
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
         countChange(){
             //console.log(this.$refs.numbox.value);
             this.$emit('getCount',parseInt(this.$refs.numbox.value))
         }
     },
     props:['max'],
     watch:{
         //属性监听
         'max':function(newVal,oldVal){
            mui('.mui-numbox').numbox().setOption('max',newVal); 
         }
     }
 }
</script>
<style lang="scss" scoped>
    
</style>
