<script setup lang="ts">
import {
  AppstoreAddOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  CarryOutOutlined,
  AuditOutlined
} from '@vicons/antd'
import router from '../../router'

const routerPush = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div>
    <ul class="meun">
      <li @click="routerPush('/cockpit')">
        <AppstoreAddOutlined class="icon" />
        <p class="text">假期驾驶舱</p>
      </li>
      <li @click="routerPush('/personnel')">
        <SolutionOutlined class="icon" />
        <p class="text">人员管理</p>
      </li>
      <li @click="routerPush('/holiday')">
        <ScheduleOutlined class="icon" />
        <p class="text">假期配置</p>
      </li>
      <li @click="routerPush('/leaveTime')">
        <CarryOutOutlined class="icon" />
        <p class="text">休假配置</p>
      </li>
      <li @click="routerPush('/overTime')">
        <AuditOutlined class="icon" />
        <p class="text">加班配置</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.meun {
  width: 100%;
  margin-top: 10px;
  list-style-type: none;
  color: #343a40;
}

.meun li {
  display: flex;
  margin-bottom: 10px;
  padding: 10px 30px;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.meun li:hover,
.active {
  color: #37b24d;
  background-color: #d4ebe0;
}

.icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.text {
  font-size: 16px;
  /* color: #adb5bd; */
  text-decoration: none;
}
</style>
