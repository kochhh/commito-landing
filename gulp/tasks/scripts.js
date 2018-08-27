module.exports = function() {
	$.gulp.task('libsjs:dev', function() {
		return $.gulp.src([
				'./node_modules/jquery/dist/jquery.js',
				'./node_modules/popper.js/dist/umd/popper.js',
				'./node_modules/bootstrap/js/dist/util.js',
        './node_modules/bootstrap/js/dist/dropdown.js',
				'./node_modules/bootstrap/js/dist/tab.js',
				// './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
				'./node_modules/svg4everybody/dist/svg4everybody.js',
				'./node_modules/flickity/dist/flickity.pkgd.js',
				'./node_modules/headroom.js/dist/headroom.js',
				'./node_modules/headroom.js/dist/jQuery.headroom.js'
			])
			.pipe($.glp.concat('libs.js'))
			.pipe($.gulp.dest('./dist/static/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('libsjs:build', function() {
		return $.gulp.src([
				'./node_modules/jquery/dist/jquery.min.js',
				'./node_modules/popper.js/dist/umd/popper.js',
				'./node_modules/bootstrap/js/dist/util.js',
        './node_modules/bootstrap/js/dist/dropdown.js',
				'./node_modules/bootstrap/js/dist/tab.js',
				// './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
				'./node_modules/svg4everybody/dist/svg4everybody.min.js',
				'./node_modules/flickity/dist/flickity.pkgd.min.js',
				'./node_modules/headroom.js/dist/headroom.js',
				'./node_modules/headroom.js/dist/jQuery.headroom.min.js'
			])
			.pipe($.glp.concat('libs.min.js'))
			.pipe($.glp.uglifyjs())
			.pipe($.gulp.dest('./dist/static/js/'));
	});

	$.gulp.task('js:dev', function() {
		return $.gulp.src('./src/static/js/main.js')
			.pipe($.gulp.dest('./dist/static/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});

	$.gulp.task('js:build', function() {
		return $.gulp.src('./src/static/js/main.js')
			.pipe($.gulp.dest('./dist/static/js/'))
			.pipe($.glp.uglifyjs())
			.pipe($.glp.rename('main.min.js'))
			.pipe($.gulp.dest('./dist/static/js/'));
	});

	$.gulp.task('js:copy', function() {
		return $.gulp.src([
				'./src/static/js/*.js',
				'!./src/static/js/main.js'
			])
			.pipe($.gulp.dest('./dist/static/js/'))
			.pipe($.browserSync.reload({
				stream: true
			}));
	});
};