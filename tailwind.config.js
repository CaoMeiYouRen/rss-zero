/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{vue,js,ts}',
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './app.vue',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#165DFF',
                secondary: '#7B61FF',
                success: '#00B42A',
                warning: '#FF7D00',
                danger: '#F53F3F',
                light: '#F2F3F5',
                dark: '#1D2129',
            },
            boxShadow: {
                custom: '0 4px 12px rgba(0, 0, 0, 0.05)',
                'custom-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
            },
            transitionProperty: {
                height: 'height',
                spacing: 'margin, padding',
            },
        },
    },
    plugins: [],
}
