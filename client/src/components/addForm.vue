<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
     <el-form-item label="即时配送">
    <el-switch v-model="form.delivery"></el-switch>
  </el-form-item>
    <el-form-item label="活动区域">
      <el-cascader placeholder="关键字" :options="options" :props="props" v-model="form.scene" clearable filterable></el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        isAttack: false,
        scene:""
      },
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: "狮子",
          children: [
            {
              value: 2,
              label: "合1",
            },
            {
              value: 7,
              label: "合2",
            },
            {
              value: 12,
              label: "合3",
            }
          ]
        },
        {
          value: 17,
          label: "野猪",
          children: [
            {
              value: 2,
              label: "合1",
            },
            {
              value: 7,
              label: "合2",
            },
            {
              value: 12,
              label: "合3",
            }
          ]
        }
      ],     
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    }
  }
};
</script>

<style></style>
