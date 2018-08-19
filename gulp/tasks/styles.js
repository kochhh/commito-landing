module.exports = function() {
	$.gulp.task('styles:dev', function() {
		return $.gulp.src('./src/static/sass/main.scss')
			.pipe($.glp.sourcemaps.init())
			.pipe($.glp.sass())
			.on('error', $.glp.notify.onError(function (error) {
				return {
					title: 'SASS',
					message: error.message
				};
			}))
			.pipe($.glp.sourcemaps.write())
			.pipe($.glp.autoprefixer({
				browsers: [
					">0.25%",
					"not op_mini all"
				]
			}))
			.pipe($.gulp.dest('./dist/static/css/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('styles:build', function() {
		return $.gulp.src('./src/static/sass/main.scss')
			.pipe($.glp.sass())
			.pipe($.glp.autoprefixer({
				browsers: [
					">0.25%",
					"not op_mini all"
				]
			}))
			.pipe($.gulp.dest('./dist/static/css/'))
			.pipe($.glp.cssnano())
			.pipe($.glp.rename('main.min.css'))
			.pipe($.gulp.dest('./dist/static/css/'))
	});
};