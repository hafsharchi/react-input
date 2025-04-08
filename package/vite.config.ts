import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
       lib: {
         entry: resolve(__dirname, 'lib/main.ts'),
         formats: ['es']
       }
})
