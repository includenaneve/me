module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true,
      "legacyDecorators": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    // 文档地址
    // ESLint Document Link  https://cn.eslint.org/docs/rules/
    // ESLint-React Document Link https://github.com/yannickcr/eslint-plugin-react
    // 强制使用单引号
    "quotes": [ "error", "single"],
    // 使用2个空格作缩进
    "indent": [ "warn", 2],
    // 禁止出现未使用过的变量
    "no-unused-vars": 0,
    // 要求或禁止使用分号代替
    "semi": [0, "never"],
    // 强制在圆括号内使用一致的空格
    "space-in-parens": [ 2, "never" ],
    // 强制模板字符串中空格的使用
    "template-curly-spacing": [ 2, "never" ],
    // 禁止或强制在括号内使用空格
    "array-bracket-spacing": [ 2, "always" ],
    // 强制在花括号中使用一致的空格
    "object-curly-spacing": [ 2, "always" ],
    // 禁止或强制在计算属性中使用空格
    "computed-property-spacing": [ 2, "never" ],
    // 不允许多个空行
    "no-multiple-empty-lines": [ 2, { "max": 1, "maxEOF": 0, "maxBOF": 0 } ],
    // 禁止定义前使用 functions这个参数表示该规则是否要检测函数的声明
    "no-use-before-define": [ 2, { "functions": false } ],
    // 如果一个变量不会被重新赋值，最好使用const进行声明。
    "prefer-const": 1,
    // 禁止在 case 或 default 子句中出现词法声明
    "no-case-declarations": [ 1 ],
    // 禁止在 return 语句中使用赋值语句
    "no-return-assign": [ 1 ],
    // 禁止对 function 的参数进行重新赋值
    "no-param-reassign": [ 2 ],
    // 禁止变量声明与外层作用域的变量同名
    "no-shadow": [ 2 ],
    // 强制使用骆驼拼写法命名约定
    "camelcase": [ 0 ],
    // 禁止使用console方法
    "no-console": [0, { allow: ["warn", "error"] }],
    "no-underscore-dangle" : [0, "always"],
    // 强制ES5+的React组件写成class形式。Enforce ES5 or ES6 class for React Components
    "react/prefer-es6-class": 0,
    // 限制jsx语法出现的文件名。Restrict file extensions that may contain JSX
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // 在JSX属性和表达式中强制或禁止花括号内的空格
    "react/jsx-curly-spacing": [ 2, "never" ],
    // 防止JSX中使用的变量被错误地标记为未使用
    "react/jsx-uses-vars": [2],
    // 防止在键中使用Array索引
    // "react/no-array-index-key": [ 1 ],
    // 允许使用tab做缩进(VSCode做了tab对应2个空格。这里写不写无所谓，还是用2空格缩进的)
    // "no-tabs": "off",
    // proptypes没有写的props报警告
    // "react/prop-types": [ 1 ],
    // 强制类方法使用 this (class-methods-use-this)
    // "class-methods-use-this": [ 1 ],
  }
};