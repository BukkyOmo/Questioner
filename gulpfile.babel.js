import gulp from 'gulp';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import babelCompiler from 'babel-core/register';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();

const paths = {
	js: ['./**/*.js', '!dist/**', '!node_modules/**', '!test/**', '!coverage/**', '!log/**'],
	files: ['./package.json', './.gitignore'],
	tests: {
		integration: './test/integration/**/*.js',
		unit: './test/unit/**/*.js'
	},
	build: 'dist'
};

const opt = {
	dir: './coverage',
	reporters: ['lcov', 'json', 'text', 'text-summary', 'clover'],
	reportOpts: { dir: './coverage' },
};

gulp.task('help', plugins.taskListing);

gulp.task('clean', () => del(['dist/**', '!dist']));

gulp.task('copy', () => gulp.src(paths.files)
	.pipe(plugins.newer(paths.build))
	.pipe(gulp.dest(paths.build)));

gulp.task('babel', () => gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
	.pipe(plugins.newer(paths.build))
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.babel())
	.pipe(plugins.sourcemaps.write('.', {
		includeContent: false,
		sourceRoot(file) {
			return path.relative(file.path, __dirname);
		}
	}))
	.pipe(gulp.dest(paths.build)));

gulp.task('nodemon', ['copy', 'babel'], () => plugins.nodemon({
	script: path.join(paths.build, 'index.js'),
	ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
	tasks: ['copy', 'babel']
})
	.on('restart', () => console.log('>> node restart')));

gulp.task('test', () => {
	process.env.NODE_ENV = 'test';

	gulp.src(['dist/app/**.*js'])
		.pipe(plugins.plumber())
		.pipe(plugins.istanbul())
		.pipe(plugins.istanbul.hookRequire())
		.on('finish', () => gulp.src('./test/**/*.js')
			.pipe(plugins.mocha({
				timeout: 999999,
				reporter: 'spec',
				ui: 'bdd',
				recursive: true,
				compilers: {
					js: babelCompiler
				}
			}))
			.pipe(plugins.istanbul.writeReports(opt))
			.pipe(plugins.istanbul.enforceThresholds({ thresholds: { global: 10 } }))
			.on('end', () => console.log('>>Finished Running Tests'))
			.pipe(plugins.exit()));
});

gulp.task('serve', ['clean'], () => runSequence('nodemon'));

gulp.task('default', ['clean'], () => {
	runSequence(['copy', 'babel']);
});
