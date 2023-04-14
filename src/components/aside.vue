<template>
	<el-menu class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
		active-text-color="#FF6A6A" unique-opened>
		<h3>{{ isCollapse ? '考核' : '目标考核管理系统' }}</h3>
		<el-menu-item v-for="item in nochildren" :index="item.path + ''" :key="item.path" @click="clickMenu(item)">
			<i :class="'el-icon-' + item.icon"></i>
			<span slot="title">{{ item.label }}</span>
		</el-menu-item>
		<el-submenu v-for="item in haschildren" :index="item.label + ''" :key="item.label">
			<template slot="title">
				<i :class="'el-icon-' + item.icon"></i>
				<span slot="title">{{ item.label }}</span>
			</template>
			<el-menu-item-group v-for="item2 in item.children" :index="item2.path + ''" :key="item2.path">
				<el-menu-item :class="'el-icon-' + item2.icon" @click="clickMenu(item2)" :index="item2.path + ''">{{ item2.label }}
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>
<script>
// import { mapState } from 'vuex'
export default {
	data() {
		return {
			menu: [
				{
					path: '/home',
					label: '首页',
					icon: 's-home',
					url: 'Home/Home'
				},
				{
					label: '教学任务',
					icon: 'user',
					children: [
						{
							path: '/xjxuk',
							label: '承担校级选修课',
							icon: 's-custom',
						}
					]
				},
				{
					label: '教学项目',
					icon: 's-home',
					children: [
						{
							path: '/xmjs',
							label: '教学项目建设',
							icon: 's-custom',
						},]
				},
				{
					label: '教学基本建设',
					icon: 'user',
					children: [
						{
							path: '/sysgz',
							label: '实验室工作',
							icon: 's-custom',
						},
						{
							path: '/sjjdjs',
							label: '实践基地建设',
							icon: 's-custom',
						}
					]
				},
				{
					label: '教学质量',
					icon: 'user',
					children: [
						{
							path: '/jxxg',
							label: '教学效果',
							icon: 's-custom',
						},
						{
							path: '/ktjx',
							label: '课堂教学',
							icon: 's-custom',
						},
						{
							path: '/sjtgl',
							label: '四级通过率',
							icon: 's-custom',
						},
						{
							path: '/xkjs',
							label: '学科竞赛',
							icon: 's-custom',
						},
						{
							path: '/zyzg',
							label: '职业资格认定',
							icon: 's-custom',
						},
					]
				},
				{
					label: '教学管理',
					icon: 'setting',
					children: [
						{
							path: '/zsjx',
							label: '重视教学',
							icon: 'setting',

						},
							{
							path: '/zsjx2',
							label: '重视教学2',
							icon: 'setting',

						},
						{
							path: '/khfs',
							label: '考核考试方法改革',
							icon: 'setting',

						},
						{
							path: '/zyrz',
							label: '完成专业认证相关工作',
							icon: 'setting',

						},
						{
							path: '/zljk',
							label: '质量监控',
							icon: 's-custom',
						},
						{
							path: '/hdhjs',
							label: '承办活动和竞赛',
							icon: 's-custom',
						},
					]
				},
				{
					label: '国际交流与合作',
					icon: 's-home',
					children: [
						{
							path: '/gjghfz',
							label: '国际化发展规划',
							icon: 's-custom',
						},]
				},
				{
					label: '教学事故',
					icon: 's-home',
					children: [
						{
							path: '/jxsg',
							label: '教学事故',
							icon: 's-custom',
						},]
				}
			]
		}
	},
	methods: {
		//点击菜单进行跳转
		clickMenu(item) {
			this.$router.push(item.path),
			this.$store.commit('changeMenu', item)
		},

	},
	computed: {
		nochildren() {
			return this.menu.filter(item => !item.children)
		},
		haschildren() {
			return this.menu.filter(item => item.children)
		},
		//通过vuex管理菜单的闭合属性
		// ...mapState(["isCollapse"]),
		isCollapse() {
			return this.$store.state.tabs.isCollapse
		}
	}
}

</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

.el-menu {
	height: 100%;
	border: none;

	h3 {
		color: #fff;
		text-align: center;
		line-height: 48px;
	}
}
</style>

  