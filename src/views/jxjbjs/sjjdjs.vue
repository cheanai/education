<template>
  <div>教学基本建设-实践基地建设 </div>
</template>
<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>教学任务</el-breadcrumb-item>
			<el-breadcrumb-item>承担校级选修课</el-breadcrumb-item>
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
				<el-table-column prop="id" label="ID"></el-table-column>
				<el-table-column prop="collegeName" label="学院名称"></el-table-column>
				<el-table-column prop="courseName" label="选修课名称"></el-table-column>
				<el-table-column prop="instructorName" label="指导教师"></el-table-column>
				<el-table-column prop="courseCount" label="选修课课时"></el-table-column>
				<el-table-column prop="state" label="审核状态"></el-table-column>
				<el-table-column label="操作" width="120px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
						</el-button>
						<!-- 删除按钮 -->
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 添加对话框 -->
		<el-dialog title="添加" :visible.sync="addDialogVisible" width="60%" @close="resetForm">
			<!-- 内容主题区域 -->
			<el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addFormRef">
				<el-form-item prop="courseName" label="选修课名称">
					<el-input v-model="addForm.courseName"></el-input>
				</el-form-item>
				<el-form-item prop="instructorName" label="指导教师">
					<el-input v-model="addForm.instructorName"></el-input>
				</el-form-item>
				<el-form-item prop="courseCount" label="选修课课时">
					<el-input v-model="addForm.courseCount"></el-input>
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
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
				<el-form-item prop="courseName" label="选修课名称">
					<el-input v-model="editForm.courseName"></el-input>
				</el-form-item>
				<el-form-item prop="instructorName" label="指导教师">
					<el-input v-model="editForm.instructorName"></el-input>
				</el-form-item>
				<el-form-item prop="courseCount" label="选修课课时">
					<el-input v-model="editForm.courseCount"></el-input>
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
import axios from '@/request/index';
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
				id: '',
				collageName: '1',
				courseName: '',
				instructorName: '',
				courseCount: '',
				state: '',


			},
			//用户对话框数据验证规则
			addFormRules: {
				teacherId: [
					{ required: true, message: '请输入学员编号', trigger: 'blur' },
					{
						min: 6,
						max: 6,
						message: '用户名的长度是6个字符',
						trigger: 'blur'
					}
				],
				teacherName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{
						min: 3,
						max: 10,
						message: '用户名的长度在3~10个字符之间',
						trigger: 'blur'
					}
				],
				listenTime: [
					{ required: true, message: '请选择日期和时间', trigger: 'blur' }
				],

			}

		}
	},
	created() {
		this.getUserList();
	},
	methods: {
		// 获取后端表单数据
		getUserList() {
			axios.get("/selectCollegeSchoolLevelElectiveCourse", {
				params: {
					department: '1'
				}
			}).then((response) => {
				console.log(response.data)
				this.userList = response.data;
			}
			)
		},
		//点击确定 添加新用户
		add() {
			this.$refs.addFormRef.validate(async valid => {
				//校验未通过直接返回
				if (!valid) return
				//  校验通过
				//关闭对话框
				this.addDialogVisible = false
				axios.get("/insertCollegeCourse", {
					params: {
						collageName: '1',
						courseName: this.addForm.courseName,
						instructorName: this.addForm.instructorName,
						courseCount: this.addForm.courseCount,
					}
				}).then((response) => {
					console.log(response.data)
					this.getUserList();
					this.addForm = {}
				}
				);

				//清空这次记录和规则防止下次直接出现

			})
		},
		//添加表单后的重置
		resetForm() {
			this.addForm = {}
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
			//删除的业务 
			const index = this.userList.findIndex(value => value.id === searchId)
			this.userList.splice(index, 1)
			axios.get("/deleteCollegeCourse", {
				params: {
					id: searchId
				}
			}).then(this.getUserList)

		},
		//查找用户信息
		searchUser() {
			this.userList.splice(0, this.userList.length)
			axios.get("/searchCollegeCourse", {
				params: {
					Course: this.input1,
					department: "1"
				}
			}).then((res) => {
				this.userList = res.data;
			});

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
				if (value.id == searchId) {
					this.editForm = this.userList[index]
				}
			})
		},
		//监听修改用户对话框确定事件
		editUserInfo() {
			this.$refs.editFormRef.validate(async valid => {
				//校验未通过直接返回
				if (!valid) return
				//修改表单的验证规则通过,发起请求
				//关闭对话框
				this.editDialogVisible = false
				console.log("-------")
				axios.get("/updateCollegeCourse", {
					params: {
						id: this.editForm.id,
						courseName: this.editForm.courseName,
						instructorName: this.editForm.instructorName,
						courseCount: this.editForm.courseCount,
					}
				}).then(this.getUserList)
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
