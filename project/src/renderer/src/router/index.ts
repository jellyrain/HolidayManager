import { createRouter, createWebHistory } from 'vue-router'

import Home from '@renderer/views/Home/index.vue'
import Cockpit from '@renderer/views/cockpit/index.vue'
import Personnel from '@renderer/views/Personnel/index.vue'
import Holiday from '@renderer/views/holiday/index.vue'
import LeaveTime from '@renderer/views/leaveTime/index.vue'
import OverTime from '@renderer/views/overTime/index.vue'
import LeaveTimeLog from '@renderer/views/leaveTimeLog/index.vue'
import OverTimeLog from '@renderer/views/OverTimeLog/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cockpit',
      name: 'Cockpit',
      component: Cockpit
    },
    {
      path: '/personnel',
      name: 'Personnel',
      component: Personnel
    },
    {
      path: '/holiday',
      name: 'Holiday',
      component: Holiday
    },
    {
      path: '/leaveTime',
      name: 'LeaveTime',
      component: LeaveTime
    },
    {
      path: '/overTime',
      name: 'OverTime',
      component: OverTime
    },
    {
      path: '/LeaveTimeLog',
      name: 'LeaveTimeLog',
      component: LeaveTimeLog
    },
    {
      path: '/OverTimeLog',
      name: 'OverTimeLog',
      component: OverTimeLog
    }
  ]
})

export default router
