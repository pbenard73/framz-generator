module.exports = data => `
{
  "name": "${data.name}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "framz": "git+https://github.com/pbenard73/framz.git",
    ${data.react === true ? `"@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "framz": "git+https://github.com/pbenard73/framz.git",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.3",
    "reactizy": "2.0.5"` : ''}
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    ${data.react === true ? `"clean-webpack-plugin": "^3.0.0",
    "node-sass": "^4.14.1",`: ''}
    "webpack-node-externals": "^2.5.2",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "babel-loader": "^8.1.0",
    "webpack-cli": "^3.3.12",
    "webpack-node-externals": "^2.5.2"
  },  
  "scripts": {
    ${data.react === true ? `"start": "react-scripts start",
    "build": "react-scripts build",` : ``}  
    "server:build": "./node_modules/webpack/bin/webpack.js --config webpack.config.js",
    "test": "jest",
    "eject": "react-scripts eject",
    "lint": "node_modules/eslint/bin/eslint.js --fix src/**/* srv/**/*",
    "run": "node dist/index.js"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "babel": {
    "plugins": [
      "@babel/plugin-proposal-class-properties"
    ],
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
}`
