module.exports = function() {
	$.gulp.task('pug', function()  {
		return $.gulp.src('./src/pug/pages/*.pug')
			.pipe($.glp.pug({
				pretty: true
			}))
			.on('error', $.glp.notify.onError(function(error) {
				return {
					title: 'Pug',
					message: error.message
				};
			}))
			.pipe($.gulp.dest('./dist/'))
			.on('end', $.browserSync.reload);
	});
};