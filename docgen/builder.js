/* eslint-disable no-console */

import metalsmith from 'metalsmith';
import redirect from 'metalsmith-redirect';
import redirects from './redirects';
import config from './config';

export default function builder({ clean = true, middlewares }, cb) {
  console.time('metalsmith build');
  // default source directory is join(__dirname, 'src');
  // https://github.com/metalsmith/metalsmith#sourcepath
  metalsmith(__dirname)
    .metadata(config)
    .clean(clean)
    .destination(config.docsDist)
    .use(middlewares)
    .use(redirect(redirects))
    .build(err => {
      console.timeEnd('metalsmith build');
      cb(err);
    });
}
