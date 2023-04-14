<!-- 教学管理-承办活动和竞赛 -->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>教学管理</el-breadcrumb-item>
      <el-breadcrumb-item>承办活动和竞赛</el-breadcrumb-item>
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
        <el-table-column prop="facultyId" label="学院编号"></el-table-column>
        <el-table-column prop="facultyName" label="学院名称"></el-table-column>
        <el-table-column prop="teacherId" label="用户号码"></el-table-column>
        <el-table-column prop="teacherName" label="用户名称"></el-table-column>
        <el-table-column prop="teachActivityId" label="教学活动编号"></el-table-column>
        <el-table-column prop="teachActivityName" label="教学活动名称"></el-table-column>
        <el-table-column prop="teachActivityType" label="教学活动类型"></el-table-column>
        <el-table-column prop="teachActivityTime" label="教学活动时间"></el-table-column>
        <el-table-column prop="examPlaceId" label="考试试场编号"></el-table-column>
        <el-table-column prop="examPlaceName" label="考试试场名称"></el-table-column>
         <el-table-column prop="examinationRank" label="考试等级/类型"></el-table-column>
        <el-table-column prop="examinationTime" label="考试时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.teacherId)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.teacherId)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="60%" >
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addFormRef">
        <el-form-item label="学院编号" prop="facultyId">
          <el-input v-model="addForm.facultyId"></el-input>
        </el-form-item>
        <el-form-item label="学院名称" prop="facultyName">
          <el-input v-model="addForm.facultyName"></el-input>
        </el-form-item>
        <el-form-item label="用户号码" prop="teacherId">
          <el-input v-model="addForm.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="teacherName">
          <el-input v-model="addForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教学活动编号" prop="teachActivityId">
          <el-input v-model="addForm.teachActivityId"></el-input>
        </el-form-item>
        <el-form-item label="教学活动名称" prop="teachActivityName">
          <el-input v-model="addForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教学活动类型" prop="teachActivityType">
          <el-select v-model="addForm.teachActivityType" placeholder="请选择教学活动类型">
            <el-option label="蓝桥杯" value="蓝桥杯"></el-option>
            <el-option label="软考" value="软考"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教学活动时间" prop="teachActivityTime">
          <el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm" type="date"
            placeholder="选择教学活动时间" v-model="addForm.teachActivityTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="考试试场编号" prop="examPlaceId">
          <el-input v-model="addForm.examPlaceId"></el-input>
        </el-form-item>
        <el-form-item label="考试试场名称" prop="examPlaceName">
          <el-input v-model="addForm.examPlaceName"></el-input>
        </el-form-item>
        <el-form-item label="考试等级/类型" prop="examinationRank">
          <el-select v-model="addForm.examinationRank" placeholder="请选择考试等级/类型">
            <el-option label="一级" value="一级"></el-option>
            <el-option label="二级" value="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" prop="examinationTime">
          <el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd hh:mm" type="date"
            placeholder="选择考试时间" v-model="addForm.examinationTime" style="width: 100%;"></el-date-picker>
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
      <el-form :model="editForm" :rules="addFormRules" label-width="100px" ref="editFormRef">
        <el-form-item label="学院编号" prop="facultyId">
          <el-input v-model="editForm.facultyId"></el-input>
        </el-form-item>
        <el-form-item label="学院名称" prop="facultyName">
          <el-input v-model="editForm.facultyName"></el-input>
        </el-form-item>
        <el-form-item label="用户号码" prop="teacherId">
          <el-input v-model="editForm.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="teacherName">
          <el-input v-model="editForm.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教学活动编号" prop="teachActivityId">
          <el-input v-model="editForm.teachActivityId"></el-input>
        </el-form-item>
        <el-form-item label="教学活动名称" prop="teachActivityName">
          <el-input v-model="editForm.teachActivityName"></el-input>
        </el-form-item>
        <el-form-item label="教学活动类型" prop="teachActivityType">
          <el-select v-model="editForm.teachActivityType" placeholder="请选择教学活动类型">
            <el-option label="蓝桥杯" value="蓝桥杯"></el-option>
            <el-option label="软考" value="软考"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教学活动时间" prop="teachActivityTime">
          <el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
            placeholder="选择教学活动时间" v-model="editForm.teachActivityTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="考试试场编号" prop="examPlaceId">
          <el-input v-model="editForm.examPlaceId"></el-input>
        </el-form-item>
        <el-form-item label="考试试场名称" prop="examPlaceName">
          <el-input v-model="editForm.examPlaceName"></el-input>
        </el-form-item>
        <el-form-item label="考试等级/类型" prop="examinationRank">
          <el-select v-model="editForm.examinationRank" placeholder="请选择考试等级/类型">
            <el-option label="一级" value="一级"></el-option>
            <el-option label="二级" value="二级"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试时间" prop="examinationTime">
          <el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
            placeholder="选择考试时间" v-model="editForm.examinationTime" style="width: 100%;"></el-date-picker>
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
      //接口传参
      /* queryInfo: {
         // 当前的页数
         pagenum: 1,
         // 当前每页显示多少条数据
         pagesize: 5
     }, */
      //获取当前用户信息用于编辑
      editForm: {},
      //编辑规则
      editFormRules: {
      },
      //控制添加用户对话框的显示和隐藏
      addDialogVisible: false,
      //控制修改用户对话框的显示和隐藏
      editDialogVisible: false,
      //添加用户对话框表单数据
      addForm: {
        facultyId: '',
        facultyName: '',
        teacherId: '',
        teacherName: '',
        teachActivityId: '',
        teachActivityName: '',
        teachActivityType: '',
        teachActivityTime: '',
        examPlaceId: '',
        examPlaceName: '',
        examinationRank: '',
        examinationTime: ''
      },
      //用户对话框数据验证规则
      addFormRules: {
        facultyId: [
          { required: true, message: '请输入学院编号', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '学院编号的长度是2-20个字符',
            trigger: 'blur'
          }
        ],
        teacherId: [
          { required: true, message: '请输入用户编号', trigger: 'blur' },
          {
            min: 2,
            max: 20,
            message: '用户编号的长度至少是2个字符',
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
    // 获取后端表单数据
    async getUserList() {
      const res = await this.$http.get('http://localhost/user')
      // console.log(res)
      if (res.status != 200)
        return this.$message.error('获取用户列表失败!')
      //获取成功保存在数组里面
      this.userList = res.data.dateList

    },
    //点击确定 添加新用户
    add() {
      this.$refs.addFormRef.validate(async valid => {
        //校验未通过直接返回
        if (!valid)return
        //  校验通过
        this.userList.push(this.addForm)
        //关闭对话框
        this.addDialogVisible = false
        //清空这次记录和规则防止下次直接出现
        this.addForm = {}
      })
    },
    getSTime(val) {
      this.addForm.time = val;
      // console.log(val);
    },
    //根据id删除对应的用户信息
    async removeUserById(searchId) {
      // console.log(searchId)
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
      // console.log(confimeResult)
      //删除的业务   
      const index = this.userList.findIndex(value => value.teacherId === searchId)
      this.userList.splice(index, 1)
    },
    //查找用户信息
    searchUser() {
			const index = this.userList.findIndex(value => value.teacherId === this.input1)
			if (index >= 0) {
				let obj = this.userList[index]
				this.userList.splice(index)
				this.userList.splice(0, index)
				// console.log(obj)
				this.userList.push(obj)
			} else
				this.$message.warning('不存在用户')


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
      this.$refs.editFormRef.validate(() => {
        //修改表单的验证规则通过
        // console.log(this.editForm)
        this.editDialogVisible = false

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
