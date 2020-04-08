<template>
  <div id="app">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-row>
          <el-col :span=6>
            <router-link to="/login">登录</router-link>
          </el-col>
          <el-col :span=6>
            <router-link to="/home">叠叠乐</router-link>
          </el-col>
          <el-col :span=6>
            <router-link to="/myself" v-show="userName">我的委托</router-link>
          </el-col>
          <el-col :span=6>
            <span>{{userName}}</span>
          </el-col>
        </el-row>       
      </el-header>
    </el-container>
    <router-view />
  </div>
</template>

<script>
  import {localStore} from '@/util/localStore.js'
  export default {
    data(){
      return {
        userName:""
      }
    },
    watch:{
      $route(newVal){
        this.userName = localStore.get("custom-name") || ""
      }
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }

    .el-aside {
      color: #333;
    }

  }
</style>