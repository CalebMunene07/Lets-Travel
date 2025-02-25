

fetch("https://lets-travel-x4bn.onrender.com/reservation")
   .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.error("Error fetching reservations:", error));


const spans = document.querySelectorAll('.booking__nav span');

spans.forEach((span) => {
  span.addEventListener('click', () => {
    // Remove the active class from all spans
    spans.forEach((s) => s.classList.remove('active'));
    
    // Add the active class to the clicked span
    span.classList.add('active');
  });
});


/* Time*/
function displayTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var meridiem = "AM";
    
    //Default is AM

    if(hours >= 12){
        hours=hours;
       var meridiem="PM";
    }

    if(minutes < 10){
        minutes = "0"+ minutes;
    }
    
if(seconds < 10){
    seconds ="0"+seconds
}

document.getElementById("hours").innerHTML=hours;
document.getElementById("minutes").innerHTML=minutes;
document.getElementById("seconds").innerHTML= seconds;
document.getElementById("meridiem").innerHTML=meridiem;
}
setInterval(displayTime,1000);

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
