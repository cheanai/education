<template>
	<div>
		<el-tag
		  v-for="(item,index) in tags"
		  :key="item.path"
		  :closable="item.path !== '/home'"
		  :effect="$route.path===item.path ?'dark':'plain'"
		  @click="changeMenu(item)"
		  @close="handleClose(item,index)">
		  {{item.label}}
		</el-tag>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},computed:{
			...mapState({
				tags:state=>state.tabs.tablist
				
			})
			
		},
		methods:{
			...mapMutations({
				close:'deleteTag'
				
			}),
			//点击菜单切换
			changeMenu(item){
				this.$router.push(item.path)
			},
			//菜单关闭
			handleClose(item ,index){
				const length=this.tags.length-1
				this.close(item)
				if(item.path!==this.$route.path){
					return
				}
				if(index===length){
					this.$router.push({
						path:this.tags[index-1].path
					})
				}else{
					this.$router.push({
						path:this.tags[index].path
					})
				}
			}
		}
	}

</script>

<style>
	
		.el-tag{
			margin-right: 15px;
			cursor: pointer;
		}
	
</style> 