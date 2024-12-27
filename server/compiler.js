const { exec } = require('child_process');

const compileCode = (code, callback) => {
  exec(`echo "${code}" | node`, (error, stdout, stderr) => {
    if (error) {
      callback(stderr, null);
    } else {
      callback(null, stdout);
    }
  });
};

module.exports = compileCode;