import { v4 } from 'uuid'

// 创建 uuid v4
function uuidv4() {
  return v4() as string
}

export { uuidv4 }
