<template>
  <div class="about">
    <h1>我的委托</h1>
    <el-button size="small" @click="addRole('add')">添加</el-button>
    <el-table ref="ddlTable" :data="tableData" style="width: 100%" stripe border>
      <el-table-column label="角色" prop="name" width="120">
      </el-table-column>
      <el-table-column :label="item.label" v-for="item in secens" :key="item.value" :prop="item.value">
        <template slot-scope="scope">
          <span>{{scope.row[item.value] | nameFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="formMsg" :visible.sync="dialogFormVisible" width="330px" :close-on-click-modal="false">
      <addForm ref="childForm" @closeDlg="closeDlg" />
    </el-dialog>
  </div>
</template>
<script>
  import { getUserInfo, deleteGongjurenInfo } from '@/api/api.js'
  import addForm from '@/components/addForm.vue'
  // 引入委托名称对应关系表
  import distList from '../../public/config/dist.js'
  export default {
    components: { addForm },
    data() {
      return {
        formMsg: '添加',
        dialogFormVisible: false,
        tableData: [{
          name: '工具人1号',
          pt: '',
          nx: '',
          hz6: '',
          hz7: '',
          hz8: '',
          lh6: '',
          lh7: '',
          lh8: ''
        }],
        secens: [
          {
            label: "pt",
            value: "pt"
          }, {
            label: "逆袭",
            value: "nx"
          }, {
            label: "合作6",
            value: "hz6"
          }, {
            label: "合作7",
            value: "hz7"
          }, {
            label: "合作8",
            value: "hz8"
          }, {
            label: "联合6",
            value: "lh6"
          }, {
            label: "联合7",
            value: "lh7"
          }, {
            label: "联合8",
            value: "lh8"
          }
        ],
      }
    },
    created() {
      this.getInfo();
    },
    methods: {
      getInfo() {
        this.tableData = [];
        getUserInfo().then(res => {
          // console.log(res.data)
          // let result = res.data
          
          if(!res.data)return console.log("无数据")
          res.data.list.forEach(v => {
            let list = v.scene.split(',')

            let _temp = {
              name: v.name,
              pt: '',
              nx: '',
              hz6: '',
              hz7: '',
              hz8: '',
              lh6: '',
              lh7: '',
              lh8: ''
            };
            list.forEach(i => {
              if (!i) return;
              let _item = i.split('-');
              _temp[_item[1]] = _temp[_item[1]] + "," + _item[0]
            })
            this.tableData.push(_temp)
            this.$nextTick(()=>{
              this.$refs.ddlTable.doLayout();
            })
          })
        })
      },
      handleDelete(row) {
        // console.log(row);
        this.$confirm(`删除 ${row.name} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteGongjurenInfo({ name: row.name }).then(res => {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
            this.getInfo();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleClick(row) {
        // console.log(row);
        this.addRole('modify', row.name);
      },
      addRole(type, name) {
        this.dialogFormVisible = true;
        if (type == 'add') {
          this.$nextTick(() => { this.$refs.childForm.onAdd() })
        } else if (type == 'modify') {
          this.$nextTick(() => { this.$refs.childForm.getUserInfo(name) })
        }
      },
      closeDlg(val) {
        this.dialogFormVisible = false;
        val && this.getInfo()
      },

    },

    filters: {
      nameFormat(name) {
        if (!name) return "";
        let _name = name.substring(1);
        return _name.replace(new RegExp('hs', 'g'), '火山')
          .replace(new RegExp('sw', 'g'), '守卫')
          .replace(new RegExp('mw', 'g'), '迷雾')
          .replace(new RegExp('kyl', 'g'), '卡伊伦')
          .replace(new RegExp('tf', 'g'), '台风')
          .replace(new RegExp('k', 'g'), 'K博士')
          .replace(new RegExp('gln', 'g'), '格拉诺')
          .replace(new RegExp('sftl', 'g'), '海龙')
          .replace(new RegExp('sx', 'g'), '狮蝎')
          .replace(new RegExp('dzj', 'g'), '主教')
          .replace(new RegExp('ddls', 'g'), '螺丝')

        // return(changeName(_name));

        function changeName(name) {
          // return function(){
          let a = distList.chaoxue.map(i => {
            if (name.indexOf(i.key) > -1) {
              return name.replace(new RegExp(i.key, 'g'), i.value)
            }
          })
          return a
          // }
        }
      }
    }
  }
</script>