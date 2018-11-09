<template>
    <div class="photoinfo-container">
        <h3>{{photoinfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间：{{photoinfo.add_time}}</span>
            <span>点击：{{photoinfo.click}}次</span>

            <hr>

            <!-- 缩略图 
                vue提供有缩略图插件 ：
                class="preview-img"不能修改
                @click="$preview.open(index, list)" :报错，不起作用
            -->
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" 
                height="100" >
                  

            <div class="content" >{{photoinfo.content}}</div>

            <!-- 评论子组件 -->
            <cmt-box :id="id"></cmt-box>
        </p>
    </div>
</template>
<script>
//导入评论子组件
import comment from '../subcomp/Comment.vue'


 export default{
     data(){
         return{
             id:this.$route.params.id,//从路由中获取的id
             photoinfo:{}, //图片详情
             list:[]
         }
     },
     created() {
         this.getPhotoInfo();
         this.getThumbs();
     },
     methods:{
         getPhotoInfo(){
             //实际： this.$http.get('photoinfo.json/'+this.id).then(res =>{
            this.$http.get('photoinfo.json').then(res =>{
                if(res.body.status === 0){
                        this.photoinfo = res.body.data;
                    }
            });
         },
         getThumbs(){
             //this.$http.get('photos.json/'+this.id).then(res =>{
            this.$http.get('photos.json').then(res =>{
                if(res.body.status === 0){
                    //循环每个图片，不全图片的宽和高
                    res.body.data.forEach(item => {
                        item.w=600;
                        item.h=400
                    });
                    //把数据保存到list中
                        this.list = res.body.data;
                    }
            });
         }
     },
     components:{
         'cmt-box':comment //注册评论子组件
     }
 }   
</script>
<style lang="scss" scoped>
 .photoinfo-container{
     padding: 3px;
    
     h3 {
         color:#26A2FF;
         font-size:15px;
         text-align:center;
         margin:15px 0;
     }
     .subtitle{
         display: flex;
         justify-content: space-between;
         font-size: 13px;
     }
     .content{
         font-size: 13px;
         line-height: 20px;
     }
 }   
</style>