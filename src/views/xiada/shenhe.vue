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
            </el-row>
            <!-- 渲染数据 -->
            <el-table :data="userList" style="width: 100%" stripe border>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="college" label="学院名称"></el-table-column>
                <el-table-column prop="secondaryIndicators" label="二级指标"></el-table-column>
                <el-table-column prop="tertiaryIndicators" label="三级指标"></el-table-column>
                <el-table-column prop="taskVolume" label="任务量"></el-table-column>
                <el-table-column prop="state" label="审核状态"></el-table-column>
                <el-table-column label="操作" width="120px">
                    <template slot-scope="scope">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" plain>主要按钮</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        
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
            value :"",
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
            options:[{
					value: '审核通过',
					label: '审核未通过',
				}, {
					value: '审核未通过',
					label: '审核未通过',
				}],

        }
    },
    created() {
        this.getUserList();
    },
    methods: {
        // 获取后端表单数据
        getUserList() {
            axios.get("/selectTaskTable").then((response) => {
                console.log(response.data)
                this.userList = response.data;
            }
            )
        },
        //查找用户信息
        searchUser() {
            this.userList.splice(0, this.userList.length)
            axios.get("/searchCollegeCourse", {
                params: {
                    Course: this.input1,
                    department: this.$store.state.message
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
