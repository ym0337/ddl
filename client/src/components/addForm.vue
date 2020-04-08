<template>
  <el-form ref="form" label-width="80px" :model="form" :rules="rules">
    <el-form-item label="角色" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="委托">
      <el-cascader placeholder="关键字" :options="options" :props="props" v-model="form.scene" clearable filterable>
      </el-cascader>
    </el-form-item>
    <!-- <el-form-item label="我是">
      <el-switch v-model="form.delivery" active-text="打手" inactive-text="混子"></el-switch>
    </el-form-item> -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">确定</el-button>
      <el-button @click="closeDlg('form')">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { addItem, getGongjurenInfo } from '@/api/api.js'
  import { localStore } from '@/util/localStore.js'
  export default {
    data() {
      return {
        form: {
          name: "工具人1",
          isAttack: false,
          scene: [],
          parentId: "",
          parentName: ""
        },
        rules: {
          name: [
            { required: true, message: '请输入工具人名字', trigger: 'blur' },
          ]
        },
        props: { multiple: true },
        options: [],
        secens: [
          {
            label: "火山巢穴",
            value: "hs"
          }, {
            label: "守卫者巢穴",
            value: "sw"
          }, {
            label: "迷雾巢穴",
            value: "mw"
          }, {
            label: "卡伊伦巢穴",
            value: "kyl"
          }, {
            label: "台风金巢穴",
            value: "tf"
          }, {
            label: "K博士巢穴",
            value: "k"
          }, {
            label: "格拉诺巢穴",
            value: "gln"
          }, {
            label: "萨芬特拉巢穴",
            value: "sftl"
          }, {
            label: "狮蝎巢穴",
            value: "sx"
          }, {
            label: "大主教巢穴",
            value: "dzj"
          }, {
            label: "代达罗斯巢穴",
            value: "ddls"
          }
        ],
        levels: [
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

        ]
      };
    },
    created() {
      this.options = this.secens.map(item => {
        return {
          value: item.value,
          label: item.label,
          children: this.levels.map(v => {
            return {
              label: v.label,
              value: item.value + "-" + v.value
            }
          })
        }
      })

    },
    methods: {
      onSubmit(formName) {
        // console.log(this.form);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let nScene = this.form.scene.map(v => {
              return v[1]
            }).join(',')
            // console.log(nScene)
            let params = {
              name: this.form.name,
              isAttack: this.form.isAttack,
              scene: nScene,
              parentId: localStore.get('custom-id'),
              parentName: localStore.get('custom-name')
            }
            addItem(params).then(res => {
              // console.log(res)
              this.$emit('closeDlg', false)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      onAdd() {
        this.form = {
          name: "",
          isAttack: false,
          scene: [],
          parentId: localStore.get('custom-id'),
          parentName: localStore.get('custom-name')
        }
      },
      getUserInfo(name) {
        this.form = {
          name: "",
          isAttack: false,
          scene: [],
          parentId: localStore.get('custom-id'),
          parentName: localStore.get('custom-name')
        }
        getGongjurenInfo({ name: name }).then(res => {
          console.log(res.data)
          let result = res.data;
          let _scenes1 = result.scene.split(',');
          let _scenes2 = _scenes1.map(v => {
            return [v.split('-')[0], v]
          })
          this.form = {
            name: result.name,
            isAttack: result.isAttack,
            scene: _scenes2,
            parentId: localStore.get('custom-id'),
            parentName: localStore.get('custom-name')
          }
        })
      },
      closeDlg(formName) {
        this.$refs[formName].resetFields();
        this.$emit('closeDlg', false)
      }
    }
  };
</script>

<style></style>