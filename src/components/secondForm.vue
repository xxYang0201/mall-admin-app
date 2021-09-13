<template>
  <div class="secondForm">
       <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="price" label="商品售价" prop="price">
      <a-input v-model="form.price"/>
    </a-form-model-item>
    <a-form-model-item ref="price_off" label="商品折扣价" prop="price_off">
      <a-input v-model="form.price_off"/>
    </a-form-model-item>
    <a-form-model-item ref="inventory" label="商品库存" prop="inventory">
      <a-input v-model="form.inventory"/>
    </a-form-model-item>
    <a-form-model-item ref="unit" label="计量单位" prop="unit">
      <a-input v-model="form.unit"/>
    </a-form-model-item>
     <a-form-model-item label="上传照片" prop="images">
      <div class="clearfix">
    <a-upload
      :action="'https://mallapi.duyiedu.com/upload/images?appkey=' + $store.state.user.appkey"
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      name="avatar"
    >
      <div v-if="fileList.length < 8">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
     <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
    </a-form-model-item>
      <a-form-model-item class="prev" :wrapperCol={span:24}>
        <a-button
        type="primary"
        @click="addClick"
      >
        确认
      </a-button>
      <a-button style="margin-left: 8px" @click="prev">
        上一页
      </a-button>
    </a-form-model-item>
  </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['form', 'current'],
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      rules: {
        price: [
          { required: true, message: '请输入商品价格', trigger: 'change' },
        ],
        price_off: [
          { required: true, message: '请输入商品折扣价', trigger: 'change' },
        ],
        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'change' },
        ],
        unit: [
          { required: true, message: '请输入计量单位', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: index,
        name: `image.png-${index}`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images.filter((item) => item !== url);
      }
    },

    prev() {
      this.$emit('prev', this.form);
    },
    addClick() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('addClick', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less">
.secondForm{
  .prev{
    text-align: center;
  }
}
</style>
