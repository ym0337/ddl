<template>
  <div class="home">
    <!-- <el-input />
    <el-button @click="onLogin">登录</el-button> -->
    <!-- <el-button @click="onDown">下载</el-button> -->
    <!-- <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button type='primary' @click="openDlg('add')" size="small" plain>新增</el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
    </el-container> -->

    <el-container style="height: auto; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="2" class="el-menu-vertical-demo" @select="select">
          <el-menu-item v-for="item in secens" :index="item.value.toString()" :key="item.value">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <!-- <el-table :data="tableData" height="auto" border style="width: 100%">
            <el-table-column prop="pt" label="pt"></el-table-column>
            <el-table-column prop="nx" label="逆袭"></el-table-column>
            <el-table-column prop="hz6" label="合作6"></el-table-column>
            <el-table-column prop="hz7" label="合作7"></el-table-column>
            <el-table-column prop="hz8" label="合作8"></el-table-column>
            <el-table-column prop="lh6" label="联合6"></el-table-column>
            <el-table-column prop="lh7" label="联合7"></el-table-column>
            <el-table-column prop="lh8" label="联合8"></el-table-column>
          </el-table> -->
          <el-row :gutter="5">
            <el-col :span="3">
              <div class="grid-content bg-purple">pt</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['pt']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">逆袭</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['nx']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作6</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz6']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作7</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz7']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作8</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz8']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合6</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh6']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合7</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh7']">{{ i.parentName }}</li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合8</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh8']">{{ i.parentName }}</li>
              </ul>
            </el-col>
          </el-row>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import { login, ddleList, download } from "@/api/api.js";
  export default {
    data() {
      return {
        roles: {},
        roleKey: "hs",
        secens: [
          {
            label: "火山巢穴",
            value: 'hs'
          }, {
            label: "守卫者巢穴",
            value: 'sw'
          }, {
            label: "迷雾巢穴",
            value: 'mw'
          }, {
            label: "卡伊伦巢穴",
            value: 'kyl'
          }, {
            label: "台风金巢穴",
            value: 'tf'
          }, {
            label: "K博士巢穴",
            value: 'k'
          }, {
            label: "格拉诺巢穴",
            value: 'gln'
          }, {
            label: "萨芬特拉巢穴",
            value: 'sftl'
          }, {
            label: "狮蝎巢穴",
            value: 'sx'
          }, {
            label: "大主教巢穴",
            value: 'dzj'
          }, {
            label: "代达罗斯巢穴",
            value: 'ddls'
          },
        ],
        tableData: [{
          pt: "mak",
          nx: "jj",
          hz6: "dd",
          hz7: "asd",
          hz8: "fs",
          lh6: "ws",
          lh7: "aqqw",
          lh8: "fa",
        }, {
          pt: "",
          nx: "",
          hz6: "",
          hz7: "",
          hz8: "",
          lh6: "",
          lh7: "",
          lh8: "",
        }, {
          pt: "mak",
          nx: "jj",
          hz6: "dd",
          hz7: "asd",
          hz8: "fs",
          lh6: "ws",
          lh7: "aqqw",
          lh8: "fa",
        }, {
          pt: "mak",
          nx: "jj",
          hz6: "dd",
          hz7: "asd",
          hz8: "fs",
          lh6: "ws",
          lh7: "aqqw",
          lh8: "fa",
        },]
      };
    },
    mounted() {
      this.$socket.emit("login", '客户端');
      this.$socket.on("send", msg => console.log(msg));
    },
    methods: {
      onLogin() {
        login({ name: "jjcc" }).then(res => getMyList());
      },
      select(key, keyPath) {
        console.log(key, keyPath);
        this.roleKey = key;
        this.getDdl({ scene: key })
      },
      getDdl(params) {
        ddleList(params).then(res => {
          console.log(res.data[params.scene].data)
          this.roles = res.data[params.scene].data;
        })
      },
      onDown() {
        download()
      }

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home {
    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .bg-purple {
      background: #d3dce6;
    }

    .bg-pink {
      background: #a350da;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      line-height: 36px;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

    .rolesStyle {
      overflow: auto;
      list-style: none;

      li {
        line-height: 30px;
      }
    }
  }
</style>