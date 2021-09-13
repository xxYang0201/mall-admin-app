<template>
  <div class="firstForm">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item ref="title" label="商品标题" prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择你的商品类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select
          v-model="form.c_items"
          mode="multiple"
          placeholder="请选择你的商品子类目"
        >
          <a-select-option v-for="c in categoryitems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="tags" label="商品标签" >
        <a-select mode="tags" style="width: 100%">
          <a-select-option value="包邮最晚次日达">
            包邮最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item class="primary" :wrapperCol={span:24}>
        <a-button type="primary" @click="next"> 下一页 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/category';

export default {
  props: ['form', 'current'],
  data() {
    return {
      categoryList: {},
      categoryitems: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      rules: {
        title: [
          { required: true, message: '请输入商品标题', trigger: 'change' },
        ],
        category: [
          { required: true, message: '请输入商品类目', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    api.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(c) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === c) {
          this.categoryitems = this.categoryList[i].c_items;
        }
      }
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less">
.firstForm {
  .primary {
    text-align: center;
  }
}
</style>
