export default{
	state:{
		//控制菜单展开和闭合
		isCollapse:false,
		//初始数据
		tablist:[{
			path: '/home',
			label: '首页',
			icon: 'home',	
			}	
		],
		//面包屑和tags要和菜单点击的一样,此对象用来存储菜单的相关信息
		currentMenu:{}
	},
	mutations:{
		// 菜单闭合
		menuCollapse(state){
			state.isCollapse=!state.isCollapse
		},	
		//点击aside菜单，改变state的tablist
		changeMenu(state,val){
			// console.log(val);
			if(val.path!=='/home'){
				state.currentMenu=val
				//判断点击菜单传来的val数据在state的tablist item存在不
				const result=state.tablist.findIndex(item=>item.path === val.path)
				if(result === -1){
					state.tablist.push(val)
				}
				}else{
					state.currentMenu={}
				}
		},
		//关闭点击标签删除数据
		deleteTag(state,val){
			const result=state.tablist.findIndex(item=>item.label === val.label)
			state.tablist.splice(result,1)
			
		}
		
	}
	
}