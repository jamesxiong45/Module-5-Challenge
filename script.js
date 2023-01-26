// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(updateTime);

// This function checks to see if the current time is before, during, 
// or after the timeblock and changes the class accordingly, so that 
// the colors of the timeblocks change.

function timeBlock() {
  $(".block").each(function () {
    var blockTime = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("h:mm:ss")); 

    $(this).removeClass("past present future");
    if (blockTime < currentHour) {
      $(this).addClass("past");
    } else if (blockTime > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }

  });
}


// This function updates the current date and timeblock for the current 
// hour,so you can save it onto your local storage.
function updateTime() {

  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss"),500);

  timeBlock();

  $(".block").each(function () {
    var blockId = $(this).attr("id");
    
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });
}



function handleFormSubmit(event) {
  
  var hourId = $(this).parent().attr("id");
  
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}

  $(".saveBtn").on("click", handleFormSubmit);
