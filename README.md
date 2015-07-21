#Projekt 4: Website Optimization - Front End Nanodegree - Udacity.com.
###The project was made based on: https://github.com/udacity/frontend-nanodegree-mobile-portfolio.

This project is one of six projects to be performed during the course **Front End Nanodegree by Udacity.com**. This course prepares the student to a level of **Front End (junior) Developer.**
***
The project consists of two parts - **pizza website** and **portfolio website**.
The folder structure for the project 4:

```
|-- project4-fen-udacity
    |-- README.md
    |-- pizza
    |   |-- source
    |       |-- gulpfile.js
    |       |-- package.json
    |       |-- pizza.html
    |       |-- css
    |       |   |-- bootstrap-grid.css
    |       |   |-- style.css
    |       |-- dist                            // folder of the final portfolio project
    |       |   |-- pizza.html                  <-- to run, open this file in the browser.
    |       |   |-- css
    |       |   |   |-- styles.min.css
    |       |   |-- images
    |       |   |   |-- pizza-small.png
    |       |   |   |-- pizza.png
    |       |   |   |-- pizzeria.jpg
    |       |   |-- js
    |       |       |-- main.min.js
    |       |-- images
    |       |   |-- pizza-small.png
    |       |   |-- pizza.png
    |       |   |-- pizzeria.jpg
    |       |-- js
    |           |-- main.js
    |-- portfolio
        |-- source
            |-- gulpfile.js
            |-- index.html
            |-- package.json
            |-- project-2048.html
            |-- project-mobile.html
            |-- project-webperf.html
            |-- css
            |   |-- print.css
            |   |-- style.css
            |-- dist                            // folder of the final portfolio project
            |   |-- index.html                  <-- to run, open this file in the browser.
            |   |-- project-2048.html
            |   |-- project-mobile.html
            |   |-- project-webperf.html
            |   |-- css
            |   |   |-- bundle.min.css
            |   |-- img
            |   |   |-- cam_be_like.jpg
            |   |   |-- mobilewebdev.jpg
            |   |   |-- pizzeria.jpg
            |   |   |-- profilepic.jpg
            |   |-- js
            |       |-- perfmatters.min.js
            |-- img
            |   |-- 2048.png
            |   |-- cam_be_like.jpg
            |   |-- mobilewebdev.jpg
            |   |-- pizzeria.jpg
            |   |-- profilepic.jpg
            |-- js
                |-- perfmatters.js
```

##First Part (Portfolio).
####Task: 
1. Student identifies and performs optimizations to achieve a PageSpeed score above 90 on index.html.

####Done:

- Added media="print" attr. to link tag of print.css (index.html)
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

####Instruction for launching and runing Portfolio Website:
1. Go to **portfolio/dist/** folder.
2. Open the **index.html** file with your browser.



##Second Part (Order Pizza Website).
####Task: 
1. Student identifies and performs optimizatiions ensuring a consistent frame rate at 60fps when scrolling in pizza.html.
2. Time to resize pizzas in less than 5 ms in pizza.html shown in the browser console.

####Done:
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

###Instruction for launching and runing Pizza Website:
1. Go to **pizza/dist/** folder.
2. Open the **pizza.html** file with your browser (must be moder browser, chrome or firefox)

***

####In addition, for both parts of the project:
1. Add comments to the files projects.
2. Add Readme file.