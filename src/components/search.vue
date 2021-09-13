<template>
  <a-form-model layout="inline" :model="searchForm" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item label="搜索关键字：" >
      <a-input v-model="searchForm.searchWord" placeholder="商品名称" allowClear>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目：">
     <a-select placeholder="请选择商品类目" style="width: 150px" @change="handleChange" allowClear>
      <a-select-option v-for="c in data" :key="c.id" :value="c.id">
        {{c.name}}
      </a-select-option>
    </a-select>
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
      >
       搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    handleChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>
<style lang="less" scoped>

</style>
