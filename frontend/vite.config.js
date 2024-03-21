import { resolve } from 'path'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config();

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  define : {
    'process.env' : process.env
  },
  server : {
    port : 4173
  },
  preview : {
    
    port : 5173
  }
}) 