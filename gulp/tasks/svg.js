module.exports = function() {
	$.gulp.task('svg', function() {
		return $.gulp.src('./src/static/img/svg/*.svg')
			.pipe($.glp.svgmin({
				js2svg: {
					pretty: true
				}
			}))
			.pipe($.glp.cheerio({
				run: function($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: { xmlMode: true }
			}))
			.pipe($.glp.replace('&gt;', '>'))
			.pipe($.glp.svgSprite({
				mode: {
					symbol: {
						sprite: 'sprite.svg'
					}
				}
			}))
			.pipe($.gulp.dest('./dist/static/i/svg/'));
	});
};