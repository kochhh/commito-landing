global.$ = {
  path: {
    task: require('./gulp/config/tasks.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  fs: require('fs'),
  browserSync: require('browser-sync').create(),
  realFavicon: require('gulp-real-favicon'),
  glp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
  'clean',
  $.gulp.parallel('styles:dev', 'pug', 'libsjs:dev', 'js:dev', 'js:copy', 'svg', 'img:dev', 'fonts', 'svg:copy')
));

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel('styles:build', 'pug', 'libsjs:build', 'js:build', 'js:copy', 'svg', 'img:build', 'fonts', 'svg:copy'),
  'generate-favicon',
  'inject-favicon-markups'
));

$.gulp.task('default', $.gulp.series(
  // 'dev',
  'build',
  $.gulp.parallel(
    'watch',
    'serve'
  )
));