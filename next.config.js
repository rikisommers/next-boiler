/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: 'custom',
  },
}

const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
