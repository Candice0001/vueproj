<template>
    <div class="newsinfo-container">
        <h3 class="title">{{newsinfo.tilte}}</h3>
        <p class="subtitle">
            <span>{{newsinfo.add_time}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论区域 -->
        <comment-box :id="this.id"></comment-box>

    </div>
</template>
<script>
    import Comment from '../subcomp/Comment.vue'

export default{
    data(){
        return{
            id:this.$route.params.id, //将Url中传递过来的id值，挂载到data上，方便调用
            newsinfo:{}
        }
    },
    created() {
        this.getNewsInfo()
    },
    components:{
        "comment-box":Comment
    },
    methods:{
        getNewsInfo(){
            //实际的ajax请求应带上id
            //this.$http.get('newsinfo.json'+this.id).then(result =>{
            this.$http.get('newsinfo.json').then(result =>{
                if(result.body.status ===0){
                    this.newsinfo = result.body.data;
                    console.log(this.newsinfo)
                }else{
                    console.log("获取新闻详情失败")
                }
            })
        }
    }
}
</script>
<style lang="scss" >
  .newsinfo-container{
      padding: 0 4px;
      .title{
          font-size: 16px;
          text-align:center;
          margin:15px 0;
          color:red;
      }
      .subtitle{
          font-size: 12px;
          color: #226aff;
            /*两端对齐*/
            display: flex;
            justify-content: space-between;
      }
      .content{
          img{
            width: 100%; /*需要把scoped去掉，图片内容才能全部显示*/
          }
          
      }

  }  
</style>