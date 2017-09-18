const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const outputPath = path.resolve(appDirectory, "_gh_pages");

let config = require("./webpack.config");
config.entry = {
  "docs": "./docs/docs.scss"
};
config.output = {
  path: outputPath,
  filename: "[name].css"
};

module.exports = config;
