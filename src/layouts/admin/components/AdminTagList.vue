<template>
  <!-- 左边：标签导航栏 -->
  <div
    class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white transition-all duration-300 shadow"
    :style="{ left: menuStore.menuWidth }"
  >
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      @tab-change="tabChange"
      style="min-width: 10px"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/admin/index'"
      >
      </el-tab-pane>
    </el-tabs>

    <!-- 右侧下拉菜单 -->
    <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
      <el-dropdown @command="handleCloseTab">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="h-[44px]"></div>
</template>

<script setup>
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router'
import { setTabList, getTabList } from '@/composables/cookie'
import { useTabList } from '@/composables/useTagList'

const { menuStore, activeTab, tabList, tabChange, removeTab, handleCloseTab } = useTabList()

// 在路由切换前被调用
onBeforeRouteUpdate((to, from) => {
  // 设置被激活的 Tab 标签
  activeTab.value = to.path
  // 添加 Tab 标签页
  addTab({
    title: to.meta.title,
    path: to.path,
  })
})

// 添加 Tab 标签页
function addTab(tab) {
  // 标签是否不存在
  let isTabNotExisted =
    tabList.value.findIndex((item) => item.path == tab.path) == -1
  // 如果不存在
  if (isTabNotExisted) {
    // 添加标签
    tabList.value.push(tab)
  }
  // 存储 tabList 到 cookie 中
  setTabList(tabList.value)
}

function initTabList() {
  // 从 cookie 中获取缓存起来的标签导航栏数据
  let tabs = getTabList()
  // 若不为空，则赋值
  if (tabs) {
    tabList.value = tabs
  }
}

// 初始化标签导航栏
initTabList()
</script>

<style>
.el-tabs__item {
  font-size: 12px;
  border: 1px solid #d8dce5 !important;
  border-radius: 3px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  margin-left: 0.1rem !important;
  margin-right: 0.1rem !important;
}

.el-tabs__item.is-active {
  background-color: var(--el-color-primary) !important;
  color: #fff;
}

.el-tabs__item.is-active::before {
  content: '';
  background-color: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 4px;
}

.el-tabs {
  height: 32px;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
  border: 0;
  background: #fff;
}

.el-tabs--card > .el-tabs__header {
  border: 0;
}

.el-tabs__nav-prev,
.el-tabs__nav-next {
  line-height: 35px;
}

.is-disabled {
  cursor: not-allowed;
  color: #d1d5db;
}
</style>
