<script setup lang="ts">
import {
  AppstoreAddOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  CarryOutOutlined,
  AuditOutlined,
  SettingOutlined,
  FileSearchOutlined,
  CalendarOutlined,
  CalendarTwotone
} from '@vicons/antd'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h, Component } from 'vue'

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, { size: 20 }, { default: () => h(icon) })
  }
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'Cockpit',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '假期驾驶舱' }
      ),
    key: 'Cockpit',
    icon: renderIcon(AppstoreAddOutlined)
  },
  {
    label: '详细配置',
    key: 'a-wild-sheep-chase',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'Personnel',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '人员管理' }
          ),
        key: 'Personnel',
        icon: renderIcon(SolutionOutlined)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'Holiday',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '假期管理' }
          ),
        key: 'Holiday',
        icon: renderIcon(ScheduleOutlined)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'LeaveTime',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '休假管理' }
          ),
        key: 'LeaveTime',
        icon: renderIcon(CarryOutOutlined)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'OverTime',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '加班管理' }
          ),
        key: 'OverTime',
        icon: renderIcon(AuditOutlined)
      }
    ],
    icon: renderIcon(SettingOutlined)
  },
  {
    label: '记录查看',
    key: 'b-wild-sheep-chase',
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'LeaveTimeLog',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '休假记录' }
          ),
        key: 'LeaveTimeLog',
        icon: renderIcon(CalendarOutlined)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'OverTimeLog',
                params: {
                  lang: 'zh-CN'
                }
              }
            },
            { default: () => '加班记录' }
          ),
        key: 'OverTimeLog',
        icon: renderIcon(CalendarTwotone)
      }
    ],
    icon: renderIcon(FileSearchOutlined)
  }
]
</script>

<template>
  <n-menu class="menu" :root-indent="30" :indent="12" :options="menuOptions" />
</template>

<style scoped>
.menu {
  font-size: 18px;
}
</style>
