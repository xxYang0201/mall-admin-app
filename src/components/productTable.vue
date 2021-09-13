<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text,record">
      <a-button @click="editClick(record)">编辑</a-button>
      <a-button @click="delClick(record)">删除</a-button>
    </div>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'categoryName',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    ellipsis: true,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      console.log(page);
      this.$emit('changePage', page);
    },
    editClick(e) {
      this.$emit('editClick', e);
    },
    delClick(e) {
      this.$emit('delClick', e);
    },

  },
  props: ['data', 'pagination'],
};
</script>

<style>
</style>
