<!--
 * @作者: Edwin Yeung
 * @Date: 2020-03-26 13:13:50
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-04-06 12:00:50
 * @描述: 
 -->
<template>
  <div class="suggest">
    <van-nav-bar title="意见反馈" left-arrow left-text="返回" @click-left="$router.go(-1)" />
    <van-form @submit="onSubmit">
      <div class="suggest-title">(必选)请选择你想反馈的问题点</div>
      <van-cell-group>
        <van-radio-group required v-model="result">
          <van-field v-for="(item,idx) in list" :key="item" > 
            <template #input>
              <van-radio :name="item"  @click="radioClick(idx)" >
                  {{item}}
              </van-radio>
            </template>
          </van-field>
        </van-radio-group>
      </van-cell-group>

      <!-- <van-cell-group>
        <van-field name="checkboxGroup">
          <template #input>
            <van-checkbox v-model="checkboxGroup" name="1">复选框1</van-checkbox>
          </template>
        </van-field>
        <van-field name="checkboxGroup">
          <template #input>
            <van-checkbox v-model="checkboxGroup" name="2">复选框2</van-checkbox>
          </template>
        </van-field>
      </van-cell-group> -->

      <div class="suggest-title">请补充详细问题和意见</div>
      <!-- 建议 -->
      <van-field
        v-model="description"
        name="description"
        rows="4"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="请输入不少于10个字的描述"
        show-word-limit
      />
      <div class="suggest-title"></div>
      <div style="margin: 16px;">
        <van-button round block type="info" :disabled="!(result && description.length>=10)" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        " 功能异常：功能故障或不可用",
        " 产品建议：用的不爽，我有建议",
        " 其他问题"
      ],
      result: '',
      descType:'',
      description: "",
      checkboxGroup: []
    };
  },
  methods: {
      radioClick(idx){
          this.descType=idx
        //   this.result.desc=item
          console.log('result: %s , 索引: %s ', this.result,idx);

      },
      //写入建议到数据库
    onSubmit(values) {
        let postdata={
            userid:this.$store.state.userid,
            type:this.descType,
            description:this.description
        }
        console.log('$stroe.state.userid :', this.$store.state.userid);
        this.$http
        .post('/api/user/addsuggestion',postdata,{})
        .then(reponse=>{
           this.$notify({type:"success",message:"提交成功，多谢您的建议！"});
          //跳转到上一页
          this.$router.go(-1);

        })

      console.log("description :", this.description);
      console.log('descType :', this.descType);

    }
  },
  created(){
      console.log('this.descType : %s , desc: %s ', this.descType,this.description);
      console.log('descType||description  :', this.descType||this.description );
  }
};
</script>

<style score>
.van-nav-bar__title {
  color: #000;
}
.suggest-title {
  /* margin:10px; */
  padding: 20px 0 10px 10px;
  color: #888;
  font-size: 14px;
  background-color: #eee;
}
</style>