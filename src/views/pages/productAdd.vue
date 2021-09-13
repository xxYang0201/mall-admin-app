<template>
  <div class="proAdd">
    <a-steps :current="current">
      <a-step :title="steps[0].title"> </a-step>
      <a-step :title="steps[1].title"> </a-step>
    </a-steps>
    <div class="form">
      <firstForm v-if="current === 0" :form="form" @next="next" />
      <secondForm
        v-else-if="current === 1"
        :form="form"
        @prev="prev"
        @addClick="addClick"
      />
    </div>
  </div>
</template>

<script>
import firstForm from '@/components/firstForm.vue';
import secondForm from '@/components/secondForm.vue';
import proApi from '@/api/product';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        inventory: 0,
        unit: '',
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  components: {
    firstForm,
    secondForm,
  },
  created() {
    const { id } = this.$router.currentRoute.params;
    if (id) {
      proApi.edit(id).then((res) => {
        this.form = res;
        this.form.c_items = res.c_item;
      });
    }
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    addClick() {
      const { id } = this.$route.params;
      if (id) {
        proApi
          .editProduct(this.form)
          .then(() => {
            this.$message.success('修改成功');
            this.$router.push({
              name: 'ProductList',
            });
          });
      } else {
        proApi.addProduct(this.form).then(() => {
          this.$message.success('添加成功');
          this.$router.push({
            name: 'ProductList',
          });
        });
      }
    },
  },
};
</script>

<style lang="less">
.proAdd {
  width: 60%;
  margin: 40px auto;
  .form {
    margin-top: 100px;
  }
  .steps-action {
    margin-top: 100px;
    .primary {
      width: 120px;
      margin-left: calc(50% - 40px);
    }
    .prev {
      width: 250px;
      margin-left: calc(50% - 125px);
    }
  }
}
</style>
