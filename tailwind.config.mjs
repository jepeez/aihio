/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'signal-blue': '#0299e1',
                'signal-green': '#0aff68',
                'hw-black': '#050505',
                'noise-red': '#ff3333',
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
