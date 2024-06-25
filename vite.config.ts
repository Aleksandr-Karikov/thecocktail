import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
        port: Number(process.env.PORT) ?? 3000,
        host: process.env.HOST ?? true,
        // for WSL2 on windows
        watch: {
            usePolling: true,
        },
    },
});
