import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    build: {
        minify: 'terser',
        terserOptions: {
            output: {
                comments: false,
            },
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        sourcemap: true,
    },
    plugins: [
        createHtmlPlugin({
            minify: true,
        }),
    ],
});