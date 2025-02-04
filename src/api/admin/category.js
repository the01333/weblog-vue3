import axios from '@/axios'

export function getCategoryPageList(data) {
  return axios.post('/admin/category/list', data)
}

export function addCategory(data) {
  return axios.post('/admin/category/add', data)
}

export function deleteCategory(id) {
  return axios.post('/admin/category/delete', { id })
}

// 获取分类 select 数据
export function getCategorySelectList() {
  return axios.post('/admin/category/select/list')
}
