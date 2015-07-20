##Project 4 - Website Optimization - Front End Nanodegree - Udacity.
###First Part - Optimization of 'Portfolio Website' - index.html.
The performance optimizations I used:
- Added media="print" attr. to link tag of print.css
- In line style.css.
- Compressed pizzeria.jpg
- Compressed profilepic.jpg
- I used imageOptim (mac) to optimize all fotos.
- In line perfmatters.js script at the bottom of the page.
- Moved all scripts to the bottom of the index page.
- I also used this gulp tasks:
	- gulp-minify-css
	- gulp-concat-css
	- gulp-image-optimization
	- gulp-minify-html
	- gulp-rename
	- gulp-gm
	- gulp-html-replace
	- gulp-purifycss
	- gulp-inline-sourc
- I used Optimize CSS Delivery trick, to load Open Sans font delivered by google:
~~~js
<script>
    var cb = function() {
       	var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'http://fonts.googleapis.com/css?family=Open+Sans:400,700';
        var h = document.getElementsByTagName('head')[0];
        h.parentNode.insertBefore(l, h);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
              webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(cb);
        else window.addEventListener('load', cb);
</script>
~~~

###Scond Part - Performance Optimization the 'Pizza Website'.
- Refactor the addEventListener on load to do less work.
- Add some utility variables.
- Moved outside the loop the scrollTop check position.
- Reduce initial number of moving pizzas.
- Reduce some of the styles.
- Added to .mover class attr. will-change: transform.
- Moved document.querySelectorAll('.mover') outside of updatePositions, just query once and reuse it.
- Udapted the photos and used imageOptim (mac) to optimize them.
- Delete basicleft from .mover and do calculation in updatePositions through translate3D
- Changed a little bit the html structure.
- Use requestAnimationFrame with translate3D in updatePositions function.

- Refactored the changePizzaSizes function.
- Removed the determineDx function - it was useless.

