<template>
  <div>
    <!-- 登录表单区域 -->
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_container">
      <h3 class="login_title">登录</h3>
      <!-- 用户名 -->
      <el-form-item prop="userId" label="用户名">
        <el-input v-model="loginForm.userId" placeholder="请输入用户账号"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码">
        <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-checkbox v-model="checked" class="login_remember">记住我</el-checkbox>
      <el-form-item>
        <el-button class="btn" type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "@/request/index";
export default {
  data() {
    return {
      loginForm: {
        userId: "admin",
        password: "123456",
      },
      checked: true,
      loginFormRules: {
        userId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    message() {
      return this.$store.state.message
    }
  },
  methods: {
    login() {
      // 表单验证
      axios.get("/login",{
        params:{
          userName:this.$data.loginForm.userId,
          pwd:this.$data.loginForm.password
        }
      }).then((response)=>{
        
        this.$store.commit('setMessage', response.data.department);
        console.log(response.data.department)
        if(response.data.department=="发展规划处"){
          this.$router.push('/index2')
        }else if(response.data.department=="人事处"){
          console.log(response.data.department)
          this.$router.push('/index1')
        }else{
          this.$router.push('/index')
        }
      })
      
    },
    reset(loginForm) {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style>
.login_container {
  border-radius: 15pX;
  background-clip: padding-box;
  margin: 200px auto;
  width: 350pX;
  padding: 5px 35px 5px 35pX;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 80 25px #cac6c6;
}

.login_title {
  margin: 8px auto 15px auto;
  text-align: center;
}

.login_remember {
  text-align: left;
  margin: 0px 0px 10px 0px;
}
</style>