import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'framer': ['framer-motion'],
          'icons': ['lucide-react'],
          'admin': [
            './src/admin/AdminDashboard',
            './src/admin/AdminInquiriesPage',
            './src/admin/AdminSchoolsPage',
            './src/admin/AdminLayout',
            './src/admin/AdminLoginPage',
          ],
        },
      },
    },
  },
});
