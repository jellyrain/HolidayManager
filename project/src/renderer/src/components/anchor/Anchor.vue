<script setup lang="ts">
import { AliwangwangOutlined } from '@vicons/antd'
import Meun from './Meun.vue'
</script>

<template>
  <div class="anchor">
    <div class="title">
      <AliwangwangOutlined class="favicon" />
      <p>假期调度平台</p>
    </div>
    <Meun />
  </div>
</template>

<style scoped>
.anchor {
  width: 250px;
  height: 680px;
  padding: 10px 20px;
  background-color: #f1f3f5;
  z-index: 99;
}

.title {
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.favicon {
  width: 45px;
  height: 45px;
  color: #343a40;
  border-radius: 50%;
  margin: 20px 0;
}

.title p {
  font-size: 25px;
  color: #343a40;
}
</style>
