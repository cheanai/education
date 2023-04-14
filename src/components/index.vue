<template>
	<div id="app">
		<el-container style="height: 100%;">
			<!-- 左侧边栏 -->
		  <el-aside width="auto">
				<Aside></Aside>
		  </el-aside>
		  <el-container>
			  <!-- 头部 -->
		    <el-header>
				<Header></Header>
			</el-header>
			<!-- 主体部分 -->
		    <el-main>
				<Tag></Tag>
				<router-view></router-view>
			</el-main>
		  </el-container>
		</el-container>	
	</div>
</template>

<script>
	import Aside from './aside.vue'
	import Header from './header.vue'
	import Tag from './tag.vue'
	export default {
	  name: 'home',
	  components:{
		  Header,Aside,Tag
	  }
	  
	}
</script>
<style lang="less" scoped>
	body{
		margin: 0;
		padding: 0;
	}
	.el-header{
		background-color: #828282;
		margin-bottom:15px
	}
	.el-aside{
		height:1024px
	}
	.el-main{
		padding-top: 0;
	}
	

</style>
