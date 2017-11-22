/* how chart data is structured

chartData {
  people: [
    "people",
    "names",
  ]
  tasks: [{
      name: "string",
      repeat: "daily, daysofweek, onceweekly, everyday"
      people: ["people", "involved"]
    },
    {
      name: "string",
      repeat: "daily, daysofweek, onceweekly, everyday"
      people: ["people", "involved"]
    }
  ]
}
*/

"use strict";
//delcare variables
let chartData;

//declare functions

// a function that saves people to array.
function savePeople() {
    let peopleNum = chartData.people.length; //to fix infinite loop
    for (let i = 0; i < peopleNum; i++) {
      console.log($(`#person-${i}-form`).val()); //for debug
      chartData.people[i] = $(`#person-${i}-form`).val(); //set array to textbox value
    }
  
          $("#settings").append(
      '<div class="alert alert-success alert-dismissible fade in show" style="width: 300px; position: fixed; top: 10px; right:10px" role="alert"><strong>Success!</strong> It totally worked!<button type="button" class="close" data-dismiss="alert">&times;</button></button></div>'
    );
    window.setTimeout(function() {
      $(".alert")
        .fadeTo(500, 0)
        .slideUp(500, function() {
          $(this).remove();
        });
    }, 4000);
}

//open the settings window
function settings() {
  //clear the content to start fresh
  $("#person-list").empty();
  $('#tasks-list').empty();

  for (let i = 0; i < chartData.people.length; i++) {
        //clone and add the item to html
    let id = 'person-' + i;
    let clone = $("#template-person").clone();
    clone.children().attr("id","person-form-template")
    clone.removeClass("template");
    clone.attr('id', id);
    
    clone.appendTo("#person-list");
    
    $("#person-form-template").children('input').attr("id", id + "-form" );
    $("#person-form-template").children('input').val(chartData.people[i]);
    $("#person-form-template").children('label').attr("for", id + "-form" );
    $("#person-form-template").attr("id", "");
    
    document.getElementById(id + "-form").focus();
    
  }

  /*
   *
   *     I N S E R T   T A S K   B U I L D E R   H E R E
   *
   */

  $("#settings").addClass("opensettings");
}


//onload function
$(document).ready(function() {
  //check if we've visited before
  if (localStorage.visited != "true") {
    //if we haven't, mark that we have now
    localStorage.visited = "true";

    //if we haven't, create a blank chartData and save it

    let chartData = {
      people: [],
      tasks: [
        {
          name: "",
          repeat: "",
          people: []
        }
      ]
    };

    localStorage.chartData = JSON.stringify(chartData);
  }

  //load chartData
  chartData = JSON.parse(localStorage.chartData);

  //function for the "Let's Go" button on the welcome page
  document.getElementById("splashButton").onclick = function() {
    //add a class to trigger css animation
    $("#welcome").addClass("ready");
    localStorage.ready = "true";
    console.log("Ready button pressed!");
    console.log(chartData);
  };

  //if we have already pressed let's go, skip the welcome screen
  if (localStorage.ready == "true") {
    console.log("Already pressed button!");
    //remove welcome screen
    $("#welcome").remove();
    //and close the settings window
    $('#settings').removeClass('opensettings');
  }

  //function to add person
  document.getElementById("addPerson").onclick = function() {
    //clone and add the item to html
    let id = 'person-' + chartData.people.length;
    let clone = $("#template-person").clone();
    clone.children().attr("id","person-form-template")
    clone.removeClass("template");
    clone.attr('id', id);
    
    clone.appendTo("#person-list");
    
    $("#person-form-template").children('input').attr("id", id + "-form" );
    $("#person-form-template").children('label').attr("for", id + "-form" );
    $("#person-form-template").attr("id", "");
    
    document.getElementById(id + "-form").focus();

    //add a placeholder to the array
    chartData.people.push("placeholder");
  };

  document.getElementById("removePerson").onclick = function() {
    //remove from html and array
    $("#person-list")
      .children()
      .last()
      .remove();
    chartData.people.pop();
  };

  document.getElementById("savePeople").onclick = function() {
    savePeople();
    }
    


  document.getElementById("addTask").onclick = function() {
    //clone and add the item to html
    let clone = $("#template-task").clone();
    clone.removeClass("template");
    clone.appendTo("#tasks-list");

    //add a placeholder to the array
    chartData.tasks.push("placeholder");
  };
  document.getElementById("removeTask").onclick = function() {
        $("#tasks-list")
      .children()
      .last()
      .remove();
    chartData.tasks.pop();
  };
  document.getElementById("saveTasks").onclick = function() {};

  //save the settings to the localStorage and close the menu.
  document.getElementById("updateSettings").onclick = function() {
    
    savePeople();
    localStorage.chartData = JSON.stringify(chartData);
    
    $("#settings").removeClass("opensettings");
  };

  $("#loadtime").remove();
});


