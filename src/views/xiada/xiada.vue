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
			<el-table :data="userList" style="width: 100% " stripe border max-height="600">
				<el-table-column prop="id" label="ID" width="40px"></el-table-column>
				<el-table-column prop="college" label="学院名称"></el-table-column>
				<el-table-column prop="collegeSchoolLevelElectiveCourse" label="学院校级选修课程"></el-table-column>
				<el-table-column prop="teachingProjectApplication" label="教学项目申报" width="60px"></el-table-column>
				<el-table-column prop="teachingProjectAchievement" label="教学项目获得" width="60px"></el-table-column>
				<el-table-column prop="labConstruction" label="实验室建设" width="60px"></el-table-column>
				<el-table-column prop="practiceBaseConstruction" label="实践基地建设" width="60px"></el-table-column>
				<el-table-column prop="teachingEffectiveness" label="教学效果"></el-table-column>
				<el-table-column prop="teachingCompetition" label="教学竞赛" width="60px"></el-table-column>
				<el-table-column prop="graduationPassRate" label="毕业生四级就业率"></el-table-column>
				<el-table-column prop="certificatePass" label="职业证书通过率"></el-table-column>
				<el-table-column prop="provinceAward" label="省级以上获奖"></el-table-column>
				<el-table-column prop="studentPublication" label="学生论文发表"></el-table-column>
				<el-table-column prop="leadershipClassObservation" label="领导听课"></el-table-column>
				<el-table-column prop="professorTeaching" label="教授授课"></el-table-column>
				<el-table-column prop="assessmentReform" label="考试考核改革" width="60px"></el-table-column>
				<el-table-column prop="professionalCertification" label="专业认证"></el-table-column>
				<el-table-column prop="scheduleChange" label="调课率"></el-table-column>
				<el-table-column prop="eventCompetition" label="活动竞赛"></el-table-column>
				<el-table-column prop="planImplementation" label="国际化发展规划"></el-table-column>
				<el-table-column prop="date" label="年限"></el-table-column>
				<el-table-column prop="state" label="审核状态"></el-table-column>

			</el-table>
		</el-card>
		<!-- 添加对话框 -->
		<el-dialog title="添加" :visible.sync="addDialogVisible" width="60%" @close="resetForm">
			<!-- 内容主题区域 -->
			<el-form :model="addForm" :rules="addFormRules" label-width="100px" ref="addFormRef">
				<el-form-item prop="college" label="二级学院">
					<el-select v-model="addForm.college" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="secondaryIndicators" label="二级指标">
					<el-select v-model="addForm.secondaryIndicators" placeholder="请选择" @change="selectTertiaryIndicators">
						<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="tertiaryIndicators" label="三级指标">
					<el-select v-model="addForm.tertiaryIndicators" placeholder="请选择">
						<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="date" label="下达年限">
					<el-date-picker v-model="addForm.date" align="right" type="year" placeholder="选择年">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="taskVolume" label="任务量">
					<el-input v-model="addForm.taskVolume"></el-input>
				</el-form-item>

			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="add">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import axios from '@/request/index';
import { mapState } from 'vuex'
export default {
	name: 'user',
	data() {
		return {
			input1: '',
			//保存后端传来的数据
			userList: [],
			options: [{
				value: '文学与传播学院',
				label: '文学与传播学院',
			},
			{
				value: '数学与统计学院',
				label: '数学与统计学院',
			},
			{
				value: '物理与电子工程学院',
				label: '物理与电子工程学院',
			},
			{
				value: '化学与化工学院',
				label: '化学与化工学院',
			},
			{
				value: '资源环境与历史文化学院',
				label: '资源环境与历史文化学院',
			},
			{
				value: '外国语学院',
				label: '外国语学院',
			},
			{
				value: '马克思主义学院',
				label: '马克思主义学院',
			},
			{
				value: '计算机学院',
				label: '计算机学院',
			},
			{
				value: '体育学院',
				label: '体育学院',
			},
			{
				value: '美术学院',
				label: '美术学院',
			},
			{
				value: '于右任书法学院',
				label: '于右任书法学院',
			},
			{
				value: '音乐学院',
				label: '音乐学院',
			},
			{
				value: '教育科学学院',
				label: '教育科学学院',
			},
			{
				value: '经济与管理学院',
				label: '经济与管理学院',
			},
			{
				value: '设计学院',
				label: '设计学院',
			},
			{
				value: '职业技术学院',
				label: '职业技术学院',
			},],
			options1: [
				{
					value: '教学任务',
					label: '教学任务',
				},
				{
					value: '教学项目',
					label: '教学项目',
				},
				{
					value: '教学基本建设',
					label: '教学基本建设',
				},
				{
					value: '教学质量',
					label: '教学质量',
				},
				{
					value: '教学管理',
					label: '教学管理',
				},
				{
					value: '国际交流合作',
					label: '国际交流合作',
				},
			],
			options2: [],
			value: '',
			editForm: {},
			//编辑规则
			editFormRules: {
			},
			//控制添加用户对话框的显示和隐藏
			addDialogVisible: false,
			//添加用户对话框表单数据
			addForm: {
				college: "",
				secondaryIndicators: "",
				tertiaryIndicators: "",
				date: new Date(),
				taskVolume: ""

			},
			//用户对话框数据验证规则
			addFormRules: {


			}

		}
	},
	created() {
		this.getUserList();
	},
	methods: {
		// 获取后端表单数据
		getUserList() {
			axios.get("/selectTargetAssessment").then((response) => {
				console.log(response.data)
				this.userList = response.data;
			}
			)
		},
		selectTertiaryIndicators() {
			console.log(this.addForm.secondaryIndicators)
			if (this.addForm.secondaryIndicators == "教学任务") {
				this.options2 = [{
					value: '学院校级选修课程',
					label: '学院校级选修课程',
				}]
			} else if (this.addForm.secondaryIndicators == "教学项目") {
				this.options2 = [{
					value: '教学项目申报',
					label: '教学项目申报',
				}, {
					value: '教学项目获得',
					label: '教学项目获得',
				}]
			} else if (this.addForm.secondaryIndicators == "教学基本建设") {
				this.options2 = [{
					value: '实验室建设',
					label: '实验室建设',
				}, {
					value: '实践基地建设',
					label: '实践基地建设',
				}]
			} else if (this.addForm.secondaryIndicators == "教学质量") {
				this.options2 = [{
					value: '教学效果',
					label: '教学效果',
				}, {
					value: '教学竞赛',
					label: '教学竞赛',
				}, {
					value: '毕业生四级就业率',
					label: '毕业生四级就业率',
				}, {
					value: '职业证书通过率',
					label: '职业证书通过率',
				}, {
					value: '省级以上获奖',
					label: '省级以上获奖',
				}, {
					value: '学生论文发表',
					label: '学生论文发表',
				}]
			} else if (this.addForm.secondaryIndicators == "教学管理") {
				this.options2 = [{
					value: '领导听课',
					label: '领导听课',
				}, {
					value: '教授授课',
					label: '教授授课',
				}, {
					value: '考试考核改革',
					label: '考试考核改革',
				}, {
					value: '专业认证',
					label: '专业认证',
				}, {
					value: '调课率',
					label: '调课率',
				}, {
					value: '活动竞赛',
					label: '活动竞赛',
				}]
			} else {
				this.options2 = [{
					value: '国际化发展规划',
					label: '国际化发展规划',
				}]
			}
		},
		//点击确定 添加新用户
		add() {
			this.$refs.addFormRef.validate(async valid => {
				//校验未通过直接返回
				if (!valid) return
				//  校验通过
				//关闭对话框
				this.addDialogVisible = false
				axios.get("/insertTargetAssessment", {
					params: {
						college: this.addForm.college,
						secondaryIndicators: this.addForm.secondaryIndicators,
						tertiaryIndicators: this.addForm.tertiaryIndicators,
						date: this.addForm.date.getFullYear().toString(),
						taskVolume: this.addForm.taskVolume
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
		//查找用户信息
		searchUser() {
			this.userList.splice(0, this.userList.length)
			axios.get("/searchTargetAssessment", {
				params: {
					college: this.input1,
				}
			}).then((res) => {
				this.userList = res.data;
			});

		},
		//查找完后在重新渲染
		reGet() {
			this.getUserList()

		},

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
