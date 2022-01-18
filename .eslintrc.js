module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "linebreak-style": ["error", "unix"],
    "no-console": ["error", { "allow": ["info", "warn", "error"] }],
    "no-unused-vars": ["error", { "vars": "all", "args": "none" }],
    "semi": ["error", "always"]
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "react"
  ]
};
