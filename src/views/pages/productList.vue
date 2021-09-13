<template>
  <div class="productList">
    <div class="searchList">
      <Search @submit="searchSubmit" :data="categoryList" />
    </div>
          <a-button class="addBtn">
            <router-link :to="{name:'ProductAdd'}">新增商品</router-link>
            </a-button>
    <div class="productTable">
      <ProductTable
        :data="tableData"
        :pagination="page"
        @changePage="changePage"
        @editClick ="editClick"
        @delClick ="delClick"
      />
    </div>
  </div>
</template>

<script>
import Search from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import api from '@/api/product';
import cateApi from '@/api/category';

export default {
  data() {
    return {
      categoryList: [],
      categoryObj: {},
      tableData: [],
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        total: 1,
        showSizeChanger: true,
      },
    };
  },
  components: {
    Search,
    ProductTable,
  },
  async created() {
    await cateApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    editClick(e) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: e.id,
        },
      });
    },
    delClick(e) {
      this.$confirm({
        title: '确认删除',
        content: `你确定要删除${e.title}这件商品吗？`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          api.delProduct({
            id: e.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      console.log(e);
    },
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pagesize,
        ...this.searchForm,
      })
        .then((res) => {
          this.tableData = res.data.map((item) => ({

            ...item,
            categoryName: this.categoryObj[item.category] ? this.categoryObj[item.category].name : '',
          }));
          this.page.total = res.total;
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
  },
};
</script>

<style lang="less" scoped>
.productList{
  position: relative;
  .searchList {
  padding: 10px 30px;
}
.addBtn{
  position: absolute;
  top: 15px;
  right: 30px;
}
}

</style>
