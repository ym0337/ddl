<template>
  <div class="home">
    <el-container style="height: auto; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="hs" class="el-menu-vertical-demo" @select="select">
          <el-menu-item v-for="item in secens" :index="item.value.toString()" :key="item.value">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.label}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-row :gutter="5">
            <el-col :span="3">
              <div class="grid-content bg-purple">pt</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['pt']" style="text-align: center;">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">逆袭</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['nx']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作6</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz6']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作7</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz7']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">合作8</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['hz8']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合6</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh6']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合7</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh7']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
              </ul>
            </el-col>
            <el-col :span="3">
              <div class="grid-content bg-purple">联合8</div>
              <ul class="rolesStyle">
                <li v-for="i in roles['lh8']">
                  <el-tooltip class="item" effect="dark" :content="'角色: ' + i.name" placement="bottom-start">
                    <el-button>{{ i.parentName }}</el-button>
                  </el-tooltip>
                </li>
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
      // this.$socket.on("send", msg => console.log(msg));
      this.getDdl({ scene: 'hs' })
    },
    methods: {
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