import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta se está em ambiente de produção no GitHub Pages
const isGithubPages = process.env.DEPLOY_TARGET === 'GH_PAGES'

export default defineConfig({
  base: isGithubPages ? '/AV2ProgramacaoWeb/':'/',
  plugins: [react()],
})