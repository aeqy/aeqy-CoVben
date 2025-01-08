import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts'; // 引入主布局组件

const routes: RouteRecordRaw[] = [
  // 主要的分类管理路由
  {
    component: BasicLayout,
    meta: {
      icon: 'ant-design:appstore-add-outlined', // 可自定义的图标
      title: '分类管理', // 页面标题
      keepAlive: true, // 保持页面状态
      order: 999, // 排序
    },
    name: 'Categories', // 路由名称
    path: '/categories', // 路由路径
    children: [
      {
        path: 'list', // 子路由路径
        name: 'CategoryList', // 子路由名称
        component: () => import('#/views/Materials/categories/index.vue'), // 懒加载分类列表页面组件
        meta: {
          title: '分类列表', // 页面标题
          icon: 'ant-design:appstore-outlined', // 图标
          // authority: ['admin']  // 权限控制，可根据需求添加
        },
      },
    ],
  },

  // 其他路由配置（可以根据需要添加）
];

export default routes;
