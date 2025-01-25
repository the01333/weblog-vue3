import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLogoStore = defineStore('logo', () => {
  const logoPath = ref('')

  const setLogoPath = (path) => {
    logoPath.value = path
  }

  return { logoPath, setLogoPath }
})