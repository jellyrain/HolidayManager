<script setup lang="ts">
import { useNotification } from 'naive-ui'
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
    <button class="btn red" @click="close"></button>
    <button class="btn yellow" @click="minimum"></button>
    <button class="btn green" @click="notificationFunc"></button>
  </div>
</template>

<style scoped>
.menu {
  width: 100vw;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: #f1f3f5;
  -webkit-app-region: drag;
  z-index: 99;
}

.btn {
  width: 15px;
  height: 15px;
  margin-right: 10px;
  position: relative;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  -webkit-app-region: no-drag;
  z-index: 100;
}

.btn i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -43%);
  display: none;
}

.btn::before {
  content: '';
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  z-index: 1;
}

.btn:hover::before {
  display: block;
}

.btn:hover i {
  display: inline-block;
}

.red {
  background-color: rgb(255, 0, 0);
}

.yellow {
  background-color: rgb(255, 255, 0);
}

.green {
  background-color: rgb(0, 255, 0);
}
</style>
