<template>
   <a-form
    name="custom-validation"
    ref="formRef"
    :model="ruleForm"
    :rules="rules"
  >
    <a-form-item has-feedback label="Password" name="email">
      <a-input v-model:value="ruleForm.email" autocomplete="off" />
    </a-form-item>
    <a-form-item has-feedback label="Confirm" name="pass">
      <a-input v-model:value="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm">提交</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const email = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback('邮箱输入不正确');
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        pass: '',
        email: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        email: [{ validator: email, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return alert('submit!');
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
