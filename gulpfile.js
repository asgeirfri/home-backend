var gulp        = require('gulp'),
	pug         = require('gulp-pug'),
	less        = require('gulp-less'),
	minifyCSS   = require('gulp-csso'),
	livereload  = require('gulp-livereload'),
	jshint      = require('gulp-jshint');

var jsFiles = [
	'*.js',
	'server/**/*.js'
];

gulp.task('html', function(){
	return gulp.src('views/*.pug')
	.pipe(livereload());
});

gulp.task('css', function(){
	return gulp.src('less/*.less')
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(gulp.dest('public/style'))
	.pipe(livereload());
});

gulp.task('lint', function(){
	return gulp.src(jsFiles)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('less/*.less', ['css']);
	gulp.watch('views/*.pug', ['html']);
	gulp.watch([jsFiles], ['lint']);
});