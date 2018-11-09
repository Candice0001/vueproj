<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea maxlength="120" placeholder="请输入" v-model="comment"></textarea>
        <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" ::key="item.id"> 
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time}}
                </div>
                <div class="cmt-body">
                        {{item.content}}
                </div>
            </div>
        </div>
        <!-- 
            点击 加载更多评论 
        1. 为加载更多按钮绑定事件 在事件中请求下一页数据，pageIndex+1
        2. 调用获取comments请求
        3. 为了防止新数据覆盖老数据，我们在点击加载更多时，应该让老数据调用数组的concat，拼接新数据；
         -->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
export default{
    data(){
        return {
            comments:[], //评论数据
            pageIndex:1, //默认加载第一页
            comment:""
        }
    },
    created() {
        this.getCommentList()
    },
    methods:{
        getCommentList(){
           //this.$http.get('comments.json/'+this.id+"?pageindex="+this.pageIndex)
           this.$http.get('comments.json')
            .then(result =>{
               if(result.body.status === 0){
                   //this.comments =result.body.data;
                   //数组拼接
                   //每当获取新数据时，不应该清空老数据，应该是老数据拼接新数据
                   this.comments =this.comments.concat(result.body.data);
               }else{
                   Toast("加载评论失败 。。。")
               }
           }); 
        },
        getMore(){
            //加载更多
            this.pageIndex +=1;
            this.getCommentList();
        },
        sendComment(){
            if(this.comment.length === 0){
                return Toast("评论不能为空");
                 
            }else{
                //把评论内容提交给服务器
                //提交成功后，刷新列表，以查看最新的评论
                //实际请求 this.$http.post('comments.json'+this.$route.params.id,{content:this.comment.trim()})
                this.$http.get('comments.json')
                .then(function(result){
                    if(result.body.status === 0){
                        //user_name 可从session中获取
                      var cmt = {user_name:"当前用户",content:this.comment.trim(),add_time:Date.now()} 
                      this.comments.unshift(cmt)
                      this.comment = "" 
                    }else{
                        Toast("失败。。。")
                    }
                })
            }
        }

    },
    props:["id"]
}
</script>
<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size:18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin:5px 0; 
        .cmt-item{
            font-size: 13px;
            .cmt-tilte{
                line-height: 30px;
            }
            .cmt-body{
                line-height: 35px;
                text-indent: 2em;
                background-color: #ccc;
            }
        }
    }
}
</style>