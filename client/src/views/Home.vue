<template>
  <div>
    <el-input />
    <el-button @click="onLogin">登录</el-button>
  </div>
</template>

<script>
import { login, getMyList } from "@/api/api.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$socket.emit("login", '客户端');
    this.$socket.on("send", msg=>console.log(msg));
  },
  methods: {
    onLogin() {
      login({ name: "jjcc" }).then(res => getMyList());
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
