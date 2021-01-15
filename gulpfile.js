//导入模块
let {src,dest,watch} = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let imagemin = require('gulp-imagemin');
let htmlmin = require('gulp-htmlmin');


//发布任务
//coty 首页
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
//css
function fnSass(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
//js
function fnJS(){
    return src('./src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
//html
function fnHTML(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'));
}
//img
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
//监听
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/sass/*.scss',fnSass);
    watch('./src/js/*.js',fnJS);
    watch('./src/pages/*.html',fnHTML);
}
//三、导出模块
exports.copyIndex = fnCopyIndex;
exports.sass = fnSass;
exports.js = fnJS;
exports.html = fnHTML;
exports.img = fnImg;
exports.default = fnWatch;