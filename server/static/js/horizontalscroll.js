/*
Used sources:
https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
https://www.youtube.com/watch?v=C9EWifQ5xqA
*/

// puts the container span in variable
var slide = document.querySelector(".xContainer");
// var vor mouse down default set to false
var isDown = false;
// var to calculate where x is
var startX;

var scrollLeft;

slide.addEventListener("mousedown", function(event){
    // when mous is down set isDown ton true
    isDown = true;
    // add the transition class to the parent
    slide.classList.add("active");
    // checks what the pageX value is of browser
    startX = event.pageX - slide.offsetLeft;
    scrollLeft = slide.scrollLeft;
});

slide.addEventListener("mouseleave", function(){
    // when mouse leaves set mouse down to false
    isDown = false;
    // remove the transition/scale class
    slide.classList.remove("active");
});

// if mousebutton is up stop moving
slide.addEventListener("mouseup", function(){
    // when mouse leaves set mouse down to false
    isDown = false;
    // remove the transition/scale class
    slide.classList.remove("active");
});

slide.addEventListener("mousemove", function(event){

    // mouse is down stop function
    if(!isDown){
        return;
    }

    // prevents images being dragged and text being selected
    event.preventDefault(); 

    // stores where x is on mouse move
    var x = event.pageX - slide.offsetLeft;

    // tracks where x is on movement 
    var movement = x - startX;
    

    slide.scrollLeft = scrollLeft - movement;


});