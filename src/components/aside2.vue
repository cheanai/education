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
                <el-menu-item :class="'el-icon-' + item2.icon" @click="clickMenu(item2)" :index="item2.path + ''">{{
                    item2.label }}
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
                    path: '/index1/home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {

                    path: '/index1/shenhe',
                    label: '下达指标审核',
                    icon: 's-custom',
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

  