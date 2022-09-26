const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp");
const imagemin = require("gulp-imagemin");
const rewriteImagePath = require("gulp-rewrite-image-path");
const processhtml = require("gulp-processhtml");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const cleanCss = require("gulp-clean-css");
const fontmin = require("gulp-fontmin");

var globs = {
	html: "project/*.html",
	css: "project/assets/css/*.css",
	img: "project/assets/imgs/**/*",
	js: "project/assets/js/**/*.js",
	fonts: "project/assets/css/webfonts/*",
	bootstrapCss: "project/assets/css/vendors/*",
};

// html
function minifyHTML() {
	return src(globs.html)
		.pipe(rewriteImagePath({ path: "." }))
		.pipe(processhtml())
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
		.pipe(gulp.dest("dist"));
}

// images
function imgMinify() {
	return gulp
		.src(globs.img)
		.pipe(imagemin())
		.pipe(gulp.dest("dist/assets/imgs"));
}

// javascript
function jsMinify() {
	return src(globs.js, { sourcemaps: true })
		.pipe(concat("main.min.js"))
		.pipe(terser())
		.pipe(dest("dist/assets/js", { sourcemaps: "." }));
}

// css
function cssMinify() {
	return src(globs.css)
		.pipe(cleanCss())
		.pipe(concat("style.min.css"))
		.pipe(dest("dist/assets/css"));
}
function bootstrapCssMinify() {
	return src(globs.bootstrapCss).pipe(dest("dist/assets/css/vendors"));
}

// fonts
function fontsMinify() {
	return src(globs.fonts)
		.pipe(fontmin())
		.pipe(gulp.dest("dist/assets/css/webfonts"));
}

exports.html = minifyHTML;
exports.img = imgMinify;
exports.js = jsMinify;
exports.css = cssMinify;
exports.fonts = fontsMinify;
exports.bootstrapCss = bootstrapCssMinify;

//watch task
function watchTask() {
	watch(globs.html, series(minifyHTML));
	watch(globs.img, series(imgMinify));
	watch(globs.js, series(jsMinify));
	watch(globs.css, series(cssMinify));
	watch(globs.css, series(fontsMinify));
	watch(globs.css, series(bootstrapCssMinify));
}
exports.default = series(
	parallel(
		bootstrapCssMinify,
		fontsMinify,
		imgMinify,
		jsMinify,
		cssMinify,
		minifyHTML
	),
	watchTask
);
