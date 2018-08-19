module.exports = function() {
	$.gulp.task('styles-legacy:dev', function() {
		return $.gulp.src('./src/static/sass/legacy.scss')
			.pipe($.glp.sass())
			.pipe($.gulp.dest('./dist/static/css/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('styles-legacy:build', function() {
		return $.gulp.src('./src/static/sass/legacy.scss')
			.pipe($.glp.sass())
			.pipe($.glp.stripCssComments({
				preserve: false
			}))
			.pipe($.glp.csso())
			.pipe($.glp.rename('legacy.min.css'))
			.pipe($.gulp.dest('./dist/static/css/'))
	});
};