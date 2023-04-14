<template>
	<div class="header-main">
		<div class="header-left">
			<!-- 按钮 -->
			<el-button icon="el-icon-menu" size="mini" @click="menuCollapse"></el-button>
			<!-- 面包屑导航 -->
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="header-right">
			<!-- 图像和下拉菜单 -->
			<el-dropdown>
			  <span>
			    <img :src="accessImg" alt="">
			  </span>
			  <el-dropdown-menu>
			    <el-dropdown-item>个人中心</el-dropdown-item>
			    <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>		
		</div>
		
		
	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				accessImg:require('../assets/images/user-default.png')
			}
		},
		methods:{
			...mapMutations(['menuCollapse']),
			// 退出
			loginOut(){
				// 清除本地存储
				localStorage.removeItem('userId'),
				localStorage.removeItem('password')
				// 跳转到login页面
				this.$router.push('/login')
			}
			
		},
		computed:{
			...mapState({
				tags:state=>state.tabs.tablist
			})
		}
	}
</script>

<style lang="less" scoped>
	.header-main{
		display: flex;
		height: 100%;
		justify-content: space-between;
		align-items: center;
		
	}
	.header-left{
		display: flex;
		justify-content: center;
		align-items: center;
		.el-button{
			margin-right: 20px;
		}	
		
	}
	.header-right{
		img{
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
		
	}
	
</style>