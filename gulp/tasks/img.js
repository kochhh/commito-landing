module.exports = function() {
	$.gulp.task('img:dev', function() {
		return $.gulp.src('./src/static/img/**/*.{png,jpg,gif}')
			.pipe($.gulp.dest('./dist/static/i/'));
	});

	$.gulp.task('img:build', function() {
		return $.gulp.src('./src/static/img/**/*.{png,jpg,gif}')
			// .pipe($.glp.tinypng('w71WLdY6M9c3uXJSRrOvbLOB541xiZEM'))
			.pipe($.gulp.dest('./dist/static/i/'));
	});

	$.gulp.task('svg:copy', function() {
		return $.gulp.src('./src/static/img/general/**/*.svg')
			.pipe($.gulp.dest('./dist/static/i/general/'));
	});
};