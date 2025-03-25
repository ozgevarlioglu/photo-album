module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:vue/vue3-recommended", // Vue 3 için önerilen stiller
    "eslint:recommended",
    "plugin:prettier/recommended", // Prettier ile birlikte çalışır
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Buraya kendi kurallarınızı ekleyebilirsiniz
  },
};
