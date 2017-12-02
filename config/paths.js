const path = require("path");
const fs = require("fs");

const rootDirectory = fs.realpathSync(process.cwd());
const _resolvePath = relativePath => (path.resolve(rootDirectory, relativePath));

module.exports = {
  appRoot: _resolvePath(""),
  appSrc: _resolvePath("src"),
  appBuild: _resolvePath("build"),
  appPublic: _resolvePath("public"),
  appIndexJs: _resolvePath("src/index.js"),
  appIndexHtml: _resolvePath("public/index.html")
};
