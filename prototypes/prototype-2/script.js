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


//onload function
$(document).ready(function() {

  //check if we've visited before
  if (localStorage.visited != "true") {

    //if we haven't, mark that we have now
    localStorage.visited = "true";

    //if we haven't, create a blank chartData and save it

    let chartData = {
      people: [

      ],
      tasks: [{
        name: "",
        repeat: "",
        people: [],
      }]
    }

    localStorage.chartData = JSON.stringify(chartData);
  }

  //load chartData
  chartData = JSON.parse(localStorage.chartData);

  //if we have already pressed let's go, skip the welcome screen
  if (localStorage.ready == "true") {
    console.log("Already pressed button!");
    //remove welcome screen
    $("#welcome").remove();
    //and close the settings window
    //  $('#settings').removeClass('opensettings');
  }

  $("#loadtime").remove();

});


//function for the "Let's Go" button on the welcome page
function ready() {

  //add a class to trigger css animation
  $('#welcome').addClass('ready');
  localStorage.ready = "true";
  console.log("Ready button pressed!");
  console.log(chartData)
}

//open the settings window
function settings() {

  //clear the content to start fresh
  $('#person-list').empty();
  //maybe for future? It was deleting the headings...
  //$('#tasks-list').empty();

  for (let i = 0; i < chartData.people.length; i++) {
    $("#person-list").append(`<h2 id="person${i}" class="settings-editable" contenteditable="true">${chartData.people[i]}</h2>`)
  }

  /*
   *
   *     I N S E R T   T A S K   B U I L D E R   H E R E
   *
   */

  $('#settings').addClass('opensettings');


}


function addPerson() {
  //add the item to html
  $("#person-list").append(`<h2 id="person${chartData.people.length}" class="settings-editable" contenteditable="true">Name</h2>`)
  //add a placeholder to the array
  chartData.people.push("placeholder");
}

function removePerson() {
  //remove from html and array
  $('#person-list').children().last().remove();
  chartData.people.pop();
}

function savePeople() {
  let peopleNum = chartData.people.length; //to fix infinite loop
  for (let i = 0; i < peopleNum; i++) {
    console.log($(`#person${i}`).html()); //for debug
    chartData.people[i] = $(`#person${i}`).html(); //set array to textbox value
  }
  $('#settings').append('<div class="alert alert-success alert-dismissible fade in show" role="alert"><strong>Success!</strong> It totally worked!<button type="button" class="close" onclick="$(\'.alert\').remove()" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
}

//save the settings to the localStorage and close the menu.
function saveSettings() {
  $('#settings').removeClass('opensettings');
}
