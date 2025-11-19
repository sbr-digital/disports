import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Fast Refresh otimizado
      fastRefresh: true,
      // Babel runtime otimizado
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    })
  ],
  build: {
    // Minificação agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Otimizações de chunk
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons-vendor': ['lucide-react']
        },
        // Nomes de arquivo com hash para cache
        entryFileNames: 'assets/main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    },
    // Tamanho máximo de chunk
    chunkSizeWarningLimit: 600,
    // Source maps apenas em dev
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Target moderno para browsers atuais
    target: 'es2020',
    // Reportar tamanho comprimido
    reportCompressedSize: true
  },
  // Otimizações de servidor
  server: {
    // Comprime respostas
    compress: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },
  // Pre-bundling de dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    exclude: ['@vercel/analytics', '@vercel/speed-insights']
  }
})