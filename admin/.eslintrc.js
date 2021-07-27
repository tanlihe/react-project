/*
 * @Descripttion:
 * @version:
 * @Author: Tang
 * @Date: 2021-06-20 12:48:58
 * @LastEditors: Tang
 * @LastEditTime: 2021-07-04 23:16:06
 */
module.exports = {
  // 指定脚本的运行环境，一个环境定义了一组预定义的全局变量
  env: {
    browser: true, //浏览器环境中的全局变量
    es6: true, //启用除了modules以外的所有ES6特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
    node: true, //Node.js 全局变量和 Node.js 作用域
  },
  extends: [
    'eslint:recommended', //所有在规则页面被标记为“✔️”的规则将会默认开启
    'plugin:react/recommended',
  ],
  // "extends": "airbnb",
  // 设置全局变量
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // 指定解析器
  parser: 'babel-eslint', //兼容ES处于实验性阶段的语法，如类属性用”=“赋值，需安装eslint和babel-eslint
  // 指定解析器选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // 第三方插件
  plugins: ['react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // console在生产模式不生效
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // debugger在生产模式不生效
    quotes: [2, 'single'], // 强制使用单引号
    semi: [2, 'always'], // 强制使用分号结尾
    'space-before-function-paren': [0, 'always'], // 不强制函数前面加上空格，.prettierrc 貌似没用关于这个的自动格式化，避免冲突
    eqeqeq: 2, // 使用全等
    'react/prop-types': 'off', // 已经定义了组件props的type，没有使用prop-types，因此eslint报错
    indent: ['error', 2, { SwitchCase: 1 }], // 相同的缩进 2,
    'no-case-declarations': 0,
    'react/display-name': 'off',
    'no-prototype-builtins': 'off',
  },
};
