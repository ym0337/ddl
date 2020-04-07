<template>
    <div class="loginStyle">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
   
            <el-form-item>
              <el-button type="primary" @click="signIn">登录</el-button>
              <el-button @click="signUp">注册</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>
<script>
    import {sign,login} from "@/api/api.js";
    import {localStore} from '@/util/localStore.js'
    export default {
      data() {
        return {
          form: {
            name: 'baozi',
          }
        }
      },
      created(){
        console.log(123);
        localStore.clear();
      },
      methods: {
          // 登录
        signIn() {
            if(!this.form.name)return this.$message.error("用户名不能为空");
            login(this.form).then(res =>{
                // console.log(res)
                if(!res.data.isExist){
                    console.log(res.data.msg)
                    return this.$message.error(res.data.msg);
                }else{
                    localStore.set("custom-id",res.data.info.userId)
                    localStore.set("custom-name",res.data.info.name)
                    this.$router.push('/myself')
                }               
            })
        },
        // 注册
        signUp(){
            sign(this.form).then(res =>{
                // console.log(res)
                return this.$message.success(res.data.msg || "后端报错");
            })
        }
      }
    }
  </script>
  <style lang="scss">
      .loginStyle{
        width:600px;
        margin: 150px auto;
      }
  </style>