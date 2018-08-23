global.$ = {
  path: {
    task: require('./gulp/config/tasks.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  fs: require('fs'),
  browserSync: require('browser-sync').create(),
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
  $.gulp.parallel('styles:build', 'pug', 'libsjs:build', 'js:build', 'js:copy', 'svg', 'img:build', 'fonts', 'svg:copy')
));

$.gulp.task('default', $.gulp.series(
  // 'dev',
  'build',
  $.gulp.parallel(
    'watch',
    'serve'
  )
));

// Favicons config

var realFavicon = require('gulp-real-favicon');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
$.gulp.task('generate-favicon', function(done) {
	realFavicon.generateFavicon({
		masterPicture: 'src/static/img/general/master_favicon.svg',
		dest: 'src/static/img/general/favicon',
		iconsPath: '/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '18%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'whiteSilhouette',
				backgroundColor: '#2b5797',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: false,
						medium: true,
						big: false,
						rectangle: false
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: FAVICON_DATA_FILE
	}, function() {
		done();
	});
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
$.gulp.task('inject-favicon-markups', function() {
	return $.gulp.src([ 'dist/*.html' ])
		.pipe(realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
		.pipe($.gulp.dest('dist'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
$.gulp.task('check-for-favicon-update', function(done) {
	var currentVersion = JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).version;
	realFavicon.checkForUpdates(currentVersion, function(err) {
		if (err) {
			throw err;
		}
	});
});