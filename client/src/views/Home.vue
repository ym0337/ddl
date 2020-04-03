<template>
  <div>
    <!-- <el-input />
    <el-button @click="onLogin">登录</el-button> -->
    <el-button type='primary' @click="openDlg('add')">新增</el-button>
    <el-dialog :title="formMsg" :visible.sync="dialogFormVisible" width="330px">
      <addForm/>
    </el-dialog>
  </div>
</template>

<script>
import { login, getMyList } from "@/api/api.js";
import addForm from '@/components/addForm.vue'
export default {
  data() {
    return {
      formMsg:"新增",
      dialogFormVisible:false,
    };
  },
  components:{addForm},
  mounted() {
    this.$socket.emit("login", '客户端');
    this.$socket.on("send", msg=>console.log(msg));
  },
  methods: {
    onLogin() {
      login({ name: "jjcc" }).then(res => getMyList());
    },
    openDlg(type){
      this.dialogFormVisible = true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
