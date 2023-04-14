<template>
	<div>
		<!-- 教学管理-完成专业认证相关工作 -->
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>教学质量</el-breadcrumb-item>
			<el-breadcrumb-item>完成专业认证相关工作</el-breadcrumb-item>
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
				<el-table-column prop="collageId" label="学院编号"></el-table-column>
				<el-table-column prop="collageName" label="学院名称"></el-table-column>
				<el-table-column prop="type" label="专业类型"></el-table-column>
				<el-table-column prop="identificationDate" label="认定时间"></el-table-column>
				<el-table-column prop="works" label="完成的相关工作"></el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.collageId)"></el-button>
						<!-- 删除按钮 -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.collageId)">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 添加对话框 -->
		<el-dialog title="添加" :visible.sync="addDialogVisible" width="60%" @close="resetForm">
			<!-- 内容主题区域 -->
			<el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addFormRef">
				<el-form-item label="学院编号" prop="collageId">
					<el-input v-model="addForm.collageId"></el-input>
				</el-form-item>
				<el-form-item label="学院名称" prop="collageName">
					<el-input v-model="addForm.collageName"></el-input>
				</el-form-item>
				<el-form-item label="专业类型" prop="type">
					<el-select v-model="addForm.type" placeholder="请选择职业资格类型">
						<el-option label="计算机" value="计算机"></el-option>
						<el-option label="财务" value="财务"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="认定时间" prop="identificationDate">
					<el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
						placeholder="选择认定时间" v-model="addForm.identificationDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="完成的相关工作" prop="works">
					<el-input v-model="addForm.works"></el-input>
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
					<el-form-item label="学院编号" prop="collageId">
					<el-input v-model="editForm.collageId"></el-input>
				</el-form-item>
				<el-form-item label="学院名称" prop="collageName">
					<el-input v-model="editForm.collageName"></el-input>
				</el-form-item>
				<el-form-item label="专业类型" prop="type">
					<el-select v-model="editForm.type" placeholder="请选择职业资格类型">
						<el-option label="计算机" value="计算机"></el-option>
						<el-option label="财务" value="财务"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="认定时间" prop="identificationDate">
					<el-date-picker @change="getSTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
						placeholder="选择认定时间" v-model="editForm.identificationDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="完成的相关工作" prop="works">
					<el-input v-model="editForm.works"></el-input>
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
				works:[
            { required: true, message: '请输入完成的相关工作', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '完成的相关工作的长度是至少1个字符',
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
				collageId: '',
				collageName: '',
				type: '',
				identificationDate: '',
				works: ''
			},
			//用户对话框数据验证规则
			addFormRules: {
				collageId: [
					{ required: true, message: '请输入学院编号', trigger: 'blur' },
					{
						min: 6,
						max: 6,
						message: '学院编号的长度是6个字符',
						trigger: 'blur'
					}
				],
				collageNamename: [
					{ required: true, message: '请输入学院名称', trigger: 'blur' },
					{
						min: 2,
						max: 20,
						message: '学院名称的长度至少是2个字符',
						trigger: 'blur'
					}
				],
			}

		}
	},
	created() {
		this.getUserList();
	},
	methods: {
		// 获取后端表单数据
		async getUserList() {
			const res = await this.$http.get('http://localhost:8090/user/select')
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
				this.userList.push(this.addForm)
				//关闭对话框
				this.addDialogVisible = false
				const res =await this.$http.get('http://localhost:8090/user/insert',{params:{obj:this.addForm}})
				//清空这次记录和规则防止下次直接出现
				this.addForm = {}
			})
		},
		//添加表单后的重置
    resetForm(){
      this.addForm={}
      this.$refs.addFormRef.clearValidate()
      // this.$refs.addFormRef.resetFields()

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
			// console.log(confimeResult)
			//删除的业务   
			const index = this.userList.findIndex(value => value.collageId === searchId)
			this.userList.splice(index, 1)
			const res=await this.$http.delete('http://localhost:8090/user/delete',{params:{id:searchId}})
		},
		//查找用户信息
		async searchUser() {
                    this.userList.splice(0, this.userList.length)
                    const res= await this.$http.get('http://localhost:8090/user/getById',{params:{id:this.input1}})
                    this.userList.push(res.data)
		},
		//查找完后在重新渲染
		reGet(){
			this.getUserList()

		},
		// 展示编辑用户的对话款
		async showEditDialog(searchId) {
			//修改对话框显示为true
			this.editDialogVisible = true
			this.userList.findIndex((value, index) => {
				if (value.collageId == searchId) {
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
		 const res =await this.$http.get('http://localhost:8090/user/update',{params:{obj:this.editForm}})
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
