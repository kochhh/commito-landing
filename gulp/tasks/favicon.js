module.exports = function() {
  var FAVICON_DATA_FILE = 'faviconData.json';

  $.gulp.task('generate-favicon', function(done) {
    $.realFavicon.generateFavicon({
      masterPicture: 'src/static/img/general/master_favicon.svg',
      dest: 'src/static/img/general/favicon',
      iconsPath: './static/i/general/favicon/',
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

  $.gulp.task('inject-favicon-markups', function() {
    return $.gulp.src([ 'dist/*.html' ])
      .pipe($.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
      .pipe($.gulp.dest('dist'));
  });

  // $.gulp.task('check-for-favicon-update', function(done) {
  //   var currentVersion = JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).version;
  //   $.realFavicon.checkForUpdates(currentVersion, function(err) {
  //     if (err) {
  //       throw err;
  //     }
  //   });
  // });
};