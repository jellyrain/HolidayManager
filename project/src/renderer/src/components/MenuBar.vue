<script setup lang="ts">
import { useNotification } from 'naive-ui'
import { CloseOutlined, MinusOutlined, BorderOutlined } from '@vicons/antd'
const { close, minimum } = window.api as {
  close: () => void
  minimum: () => void
  maximum: () => void
}

const notification = useNotification()
const notificationFunc = () => {
  notification.info({
    content: '提示',
    meta: '页面现在没做响应式所以不支持全屏',
    duration: 2000,
    keepAliveOnHover: true
  })
}
</script>

<template>
  <div class="menu">
    <button class="btn yellow" @click="minimum"><MinusOutlined /></button>
    <button class="btn green" @click="notificationFunc"><BorderOutlined /></button>
    <button class="btn red" @click="close"><CloseOutlined /></button>
  </div>
</template>

<style scoped>
.menu {
  width: 100vw;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 91%;
  background-color: #f1f3f5;
  -webkit-app-region: drag;
  z-index: 99;
}

.btn {
  width: 15px;
  height: 15px;
  margin-right: 20px;
  position: relative;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  z-index: 100;
}
</style>
