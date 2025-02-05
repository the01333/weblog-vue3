import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import Admin from '@/layouts/admin/admin.vue'
import AdminArticleList from '@/pages/admin/article-list.vue'
import AdminCategoryList from '@/pages/admin/category-list.vue'
import AdminTagList from '@/pages/admin/tag-list.vue'
import AdminBlogSetting from '@/pages/admin/blog-settings.vue'
import ArchiveList from "@/pages/frontend/archive-list.vue"
import CategoryList from "@/pages/frontend/category-list.vue"
import CategoryArticleList from "@/pages/frontend/category-article-list.vue"
import TagList from '@/pages/frontend/tag-list.vue'

// 统一在这里声明所有路由
const routes = [
    {
        path: '/',
        component: Index,
        meta: {
            title: 'Weblog 首页',
        },
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: 'Weblog 登录页',
        },
    },
    {
        path: '/archive/list',
        component: ArchiveList,
        meta: {
            title: 'Weblog 归档页'
        }
    },
    {
        path: '/category/list',
        component: CategoryList,
        meta: {
            title: 'Weblog 分类页'
        }
    },
    {
        path: '/category/article/list',
        component: CategoryArticleList,
        meta: {
            title: 'Weblog 分类文章页'
        }
    },
    {
        path: '/tag/list',
        component: TagList,
        meta: {
            title: 'Weblog 标签列表页'
        }
    },
    {
        path: '/admin', // 后台首页
        component: Admin, // 对应 admin.vue 布局文件
        // 使用到 admin.vue 布局的，都需要放置在其子路由下面
        children: [
            {
                path: '/admin/index',
                component: AdminIndex,
                meta: {
                    title: '仪表盘',
                },
            },
            {
                path: '/admin/article/list',
                component: AdminArticleList,
                meta: {
                    title: '文章管理',
                },
            },
            {
                path: '/admin/category/list',
                component: AdminCategoryList,
                meta: {
                    title: '分类管理',
                },
            },
            {
                path: '/admin/tag/list',
                component: AdminTagList,
                meta: {
                    title: '标签管理',
                },
            },
            {
                path: '/admin/blog/setting',
                component: AdminBlogSetting,
                meta: {
                    title: '博客设置',
                },
            },
        ],
    },
]

// 创建路由
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    routes: routes,
})

export default router
