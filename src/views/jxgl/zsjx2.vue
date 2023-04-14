<template>
  <div>
    <!-- 教学管理-考核考试方法改革 -->
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>重视教学2</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 输入框 layout 分栏布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input1" clearable @clear="reGet">
            <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加</el-button>
        </el-col>
      </el-row>
      <!-- 渲染数据 -->
      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column prop="teacherId" label="教师编号"></el-table-column>
        <el-table-column prop="teacherName" label="教师名称"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="collageName" label="学院名称"></el-table-column>
        <el-table-column prop="teacherPosition" label="教师职位"></el-table-column>
        <el-table-column prop="studentIdentity" label="学生身份"></el-table-column>
        <el-table-column prop="courseId" label="课程编号"></el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>    
        <el-table-column prop="lecturesNumber" label="授课次数"></el-table-column>   
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.teacherId)">
            </el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.teacherId)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="60%" @close="resetForm">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addFormRef" >
        <el-form-item prop="teacherId" label="教师编号">
          <el-input v-model="addForm.teacherId"></el-input>
        </el-form-item>
        <el-form-item prop="teacherName" label="教师名称">
          <el-input v-model="addForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-select v-model="addForm.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="collageName" label="学院名称">
          <el-select v-model="addForm.collageName" placeholder="学院名称">
            <el-option label="计算机学院" value="计算机学院"></el-option>
            <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="教师职位" prop="teacherPosition">
          <el-select v-model="addForm.teacherPosition" placeholder="请选择教师职位">
            <el-option label="教授" value="教授"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="studentIdentity" label="学生身份">
          <el-input v-model="addForm.studentIdentity"></el-input>
        </el-form-item>
        <el-form-item prop="courseId" label="课程编号">
          <el-input v-model="addForm.courseId"></el-input>
        </el-form-item>
        <el-form-item prop="courseName" label="课程名称">
            <el-input v-model="addForm.courseName"></el-input>
        </el-form-item>
              <el-form-item prop="lecturesNumber" label="授课次数">
          <el-input v-model="addForm.lecturesNumber"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="50%">
    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
      <el-form-item prop="teacherId" label="教师编号">
          <el-input v-model="editForm.teacherId"></el-input>
        </el-form-item>
        <el-form-item prop="teacherName" label="教师名称">
          <el-input v-model="editForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-select v-model="editForm.gender" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="collageName" label="学院名称">
          <el-select v-model="editForm.collageName" placeholder="学院名称">
            <el-option label="计算机学院" value="计算机学院"></el-option>
            <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="教师职位" prop="teacherPosition">
          <el-select v-model="addForm.teacherPosition" placeholder="请选择教师职位">
            <el-option label="教授" value="教授"></el-option>
            <el-option label="副教授" value="副教授"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="studentIdentity" label="学生身份">
          <el-input v-model="editForm.studentIdentity"></el-input>
        </el-form-item>
        <el-form-item prop="courseId" label="课程编号">
          <el-input v-model="editForm.courseId"></el-input>
        </el-form-item>
        <el-form-item prop="courseName" label="课程名称">
            <el-input v-model="editForm.courseName"></el-input>
        </el-form-item>
              <el-form-item prop="lecturesNumber" label="授课次数">
          <el-input v-model="editForm.lecturesNumber"></el-input>
        </el-form-item>
    </el-form>
       
     
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {
      input1: '',
      //保存后端传来的数据
      userList: [],
      //获取当前用户信息用于编辑
      editForm: {},
      //编辑规则
      editFormRules: {
        courseId:[
            { required: true, message: '请输入课程编号', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '学院编号的长度是至少1个字符',
            trigger: 'blur'
          }

        ]
      },
      //控制添加用户对话框的显示和隐藏
      addDialogVisible: false,
      //控制修改用户对话框的显示和隐藏
      editDialogVisible: false,
      //添加用户对话框表单数据
      addForm: {
        teacherId: '',
        teacherName:'',
        gender:'',
        collageName: '',
        teacherPosition: '',
        studentIdentity: '',
        lecturesNumber: '',
       courseId: '',
       courseName: ''


      },
      //用户对话框数据验证规则
      addFormRules: {
        teacherId: [
          { required: true, message: '请输入学院编号', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '学院编号的长度是至少2个字符',
            trigger: 'blur'
          }
        ]
      }

    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    //获取后端表单数据
    async getUserList() { 
      const res = await this.$http.get('http://localhost:8094/user/select')
      // console.log(res)
      if (res.status != 200)
        return this.$message.error('获取用户列表失败!')
      //获取成功保存在数组里面
      this.userList = res.data
    },
    //点击确定 添加新用户
    add() {
      this.$refs.addFormRef.validate(async valid => {
        //校验未通过直接返回
        if (!valid) return
        //  校验通过
        this.userList.push(JSON.parse(JSON.stringify(this.addForm)))
        // this.userList.push(this.addForm)
        //关闭对话框
        this.addDialogVisible = false 
		const res =await this.$http.get('http://localhost:8094/user/insert',{params:{obj:this.addForm}})
		//清空这次记录和规则防止下次直接出现
		this.addForm = {}
      })
    },
    //添加表单后的重置
    resetForm(){
      // this.addForm={}
      // this.$refs.addFormRef.clearValidate()
      this.$refs.addFormRef.resetFields()

    },
    getSTime(val) {
      this.addForm.time = val;
      // console.log(val);
    },
    //根据id删除对应的用户信息
    async removeUserById(searchId) {
      //弹框询问用户是否删除数据
      const confimeResult = await this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(
        err => err
      )
      //如果用户确认删除返回值为confim,如果用户取消了删除返回值为cancel
      // console.log(confimeResult);
      if (confimeResult != "confirm") {
        return this.$message.info("已经取消删除")
      }
      //删除的业务 
      const index = this.userList.findIndex(value => value.teacherId === searchId)
      this.userList.splice(index, 1)
	  const res=await this.$http.delete('http://localhost:8094/user/delete',{params:{id:searchId}})
    },
    //查找用户信息
    async searchUser() {
    	this.userList.splice(0, this.userList.length)
    	const res= await this.$http.get('http://localhost:8094/user/getById',{params:{id:this.input1}})
    	this.userList.push(res.data)
    },
    //查找完后在重新渲染
    reGet() {
      this.getUserList()

    },
    // 展示编辑用户的对话款
    async showEditDialog(searchId) {
      //修改对话框显示为true
      this.editDialogVisible = true
      this.userList.findIndex((value, index) => {
        if (value.teacherId == searchId) {
          this.editForm = this.userList[index]
        }
      })
    },
    //监听修改用户对话框确定事件
    editUserInfo() {
      this.$refs.editFormRef.validate( async valid => {
        //校验未通过直接返回
        if (!valid) return
         //修改表单的验证规则通过,发起请求
        //关闭对话框
         this.editDialogVisible = false
		 const res =await this.$http.get('http://localhost:8094/user/update',{params:{obj:this.editForm}})
		 
         this.$message.success("更新用户成功")
      })
    }

  },
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin: 15px 15px
}

.el-table {
  margin: 15px;
}

.el-pagination {
  margin: 15px;

}
</style>
