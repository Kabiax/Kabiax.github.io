const b1=document.querySelector("#b1");
const b2=document.querySelector("#b2");
const b3=document.querySelector("#b3");
const b4=document.querySelector("#b4");
const b5=document.querySelector("#b5");
var allpages=document.querySelectorAll(".page");

function hideall(){
    for(let onepage of allpages){ //go through all subtopic pages
        onepage.style.display="none"; //hide it
    }
}

function show(pgno){ //function to show selected page no
hideall();

//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
b1.addEventListener("click", function () {
show(1);
});
b2.addEventListener("click", function () {
show(2);
});
b3.addEventListener("click", function () {
show(3);
});
b4.addEventListener("click", function () {
show(4);
});
b5.addEventListener("click", function () {
show(5);
});
show(1);


setTimeout(
    function(){
        console.log("3s timeout")
    },
300);
