<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getCategoriesApi } from '#/api/Material';

interface Category {
  id: string;
  name: string;
  description: string;
  creationTime: string;
}

// 定义表格列
const gridOptions = ref<VxeGridProps<Category>>({
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'name', title: '名称' },
    { field: 'description', title: '描述', showOverflow: true },
    {
      field: 'creationTime',
      title: '创建时间',
      formatter: ({ cellValue }) =>
        dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss'),
    },
  ],
  data: [] as Category[], // 初始数据为空
  pagerConfig: {
    enabled: false,
  },
  sortConfig: {
    multiple: true,
  },
});

// 定义表格事件
const gridEvents = {
  cellClick: ({ row }: { row: Category }) => {
    message.info(`点击了分类: ${row.name}`);
  },
};

// 使用 useVbenVxeGrid 创建表格实例
const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: gridOptions.value, // 表格配置
  gridEvents, // 表格事件
});

// 获取分类数据
async function fetchCategories() {
  try {
    const response = await getCategoriesApi();
    gridApi.setGridOptions({ data: response.data }); // 使用 gridApi.setGridOptions 更新表格数据
  } catch {
    message.error('获取分类数据失败');
  }
}

// 在组件挂载时获取数据
onMounted(() => {
  fetchCategories();
});

// 控制表格边框和斑马纹
const showBorder = ref(false);
const showStripe = ref(false);

function changeBorder() {
  showBorder.value = !showBorder.value;
  gridApi.setGridOptions({
    border: showBorder.value,
  });
}

function changeStripe() {
  showStripe.value = !showStripe.value;
  gridApi.setGridOptions({
    stripe: showStripe.value,
  });
}

function changeLoading() {
  gridApi.setLoading(true);
  setTimeout(() => {
    gridApi.setLoading(false);
  }, 2000);
}
</script>

<template>
  <Page description="分类管理页面，展示所有分类数据。" title="分类管理">
    <template #extra>
      <DocButton path="/components/common-ui/vben-vxe-table" />
      <!-- 确保正确使用 DocButton 组件 -->
    </template>
    <Grid table-title="分类列表" table-title-help="提示">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="changeBorder">
          {{ showBorder ? '隐藏' : '显示' }}边框
        </Button>
        <Button class="mr-2" type="primary" @click="changeLoading">
          显示loading
        </Button>
        <Button type="primary" @click="changeStripe">
          {{ showStripe ? '隐藏' : '显示' }}斑马纹
        </Button>
      </template>
    </Grid>
  </Page>
</template>
