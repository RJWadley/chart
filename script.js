"use strict";

$(document).ready(function() {

  if (localStorage.visited == "true") {
    $('#reload').remove();
    $('.welcome-content').append(`<button class="btn btn-primary" onclick="ready();">Let's Go!</button>`);
  } else {
    localStorage.visited = "true";
  }
  //onload function
  console.log("loaded!");
  //if we have already loaded, skip the welcome screen
  if (localStorage.ready == "true") {
    console.log("Already pressed ready!");
    $("#welcome").remove();
    //and close the settings
    $('#settings').removeClass('opensettings');
  } else {
    //if we haven't loaded, initialize localStorage
    var blankData = {
      people: [],
      jobsDaily: [],
      jobsWeekly: [],
      jobsStatic: [],
    };

    localStorage.chartData = JSON.stringify(blankData);


    /*old backup
    localStorage.people = JSON.stringify(blank);
    localStorage.jobsDaily = JSON.stringify(blank);
    localStorage.jobsWeekly = JSON.stringify(blank);
    localStorage.jobsStatic = JSON.stringify(blank);*/

  }
  //remove the fullscreen white loader
  $("#loadtime").remove();


});

function ready() {

  //function for the "Let's Go" button on the welcome page
  $('#welcome').addClass('ready');
  localStorage.ready = "true";
  console.log("Ready button pressed!");


}

//getting variables from localStorage for settings

var chartData = JSON.parse(localStorage.chartData)

var people = chartData.people;
var jobsDaily = chartData.jobsDaily;
var jobsWeekly = chartData.jobsWeekly;
var jobsStatic = chartData.jobsStatic;

function settings() {

  //clear everything and reload
  $('#person-list').empty();
  $('#daily-list').empty();
  $('#weekly-list').empty();
  $('#static-list').empty();

  for (let i = 0; i < people.length; i++) {
    $("#person-list").append(`<h2 id="person${i}" class="settings-editable" contenteditable="true">${people[i]}</h2>`)
  }
  for (let i = 0; i < jobsDaily.length; i++) {
    $("#daily-list").append(`<h2 id="daily${i}" class="settings-editable" contenteditable="true">${jobsDaily[i]}</h2>`)
  }
  for (let i = 0; i < jobsWeekly.length; i++) {
    $("#weekly-list").append(`<h2 id="weekly${i}" class="settings-editable" contenteditable="true">${jobsWeekly[i]}</h2>`)
  }
  for (let i = 0; i < jobsStatic.length; i++) {
    $("#static-list").append(`<h2 id="static${i}" class="settings-editable" contenteditable="true">${jobsStatic[i]}</h2>`)
  }

  $('#settings').addClass('opensettings');

}


// begin a whole bunch of add and delete functions
function addPerson() {
  //add the item to html
  $("#person-list").append(`<h2 id="person${people.length}" class="settings-editable" contenteditable="true">Name</h2>`)
  //add a placeholder to the array
  people.push("placeholder");
}

function removePerson() {
  //remove from html and array
  $('#person-list').children().last().remove();
  people.pop();
}

function addDaily() {
  $("#daily-list").append(`<h2 id="daily${jobsDaily.length}" class="settings-editable" contenteditable="true">Job</h2>`)
  jobsDaily.push("placeholder");
}

function removeDaily() {
  $('#daily-list').children().last().remove();
  jobsDaily.pop();
}

function addWeekly() {
  $("#weekly-list").append(`<h2 id="weekly${jobsWeekly.length}" class="settings-editable" contenteditable="true">Job</h2>`)
  jobsWeekly.push("placeholder");
}

function removeWeekly() {
  $('#weekly-list').children().last().remove();
  jobsWeekly.pop();
}

function addStatic() {
  $("#static-list").append(`<h2 id="static${jobsStatic.length}" class="settings-editable" contenteditable="true">Job</h2>`)
  jobsStatic.push("placeholder");
}

function removeStatic() {
  $('#static-list').children().last().remove();
  jobsStatic.pop();
}
//end a whole bunch of add and delete functions


//save the settings
function saveSettings() {
  let peopleNum = people.length; //to fix infinite loop
  for (let i = 0; i < peopleNum; i++) {
    console.log($(`#person${i}`).html()); //for debug
    people[i] = $(`#person${i}`).html(); //set array to textbox value
  }

  let dailyNum = jobsDaily.length;
  for (let i = 0; i < dailyNum; i++) {
    console.log($(`#daily${i}`).html());
    jobsDaily[i] = $(`#daily${i}`).html();
  }

  let weeklyNum = jobsWeekly.length;
  for (let i = 0; i < weeklyNum; i++) {
    console.log($(`#weekly${i}`).html());
    jobsWeekly[i] = $(`#weekly${i}`).html();
  }

  let staticNum = jobsStatic.length;
  for (let i = 0; i < staticNum; i++) {
    console.log($(`#static${i}`).html());
    jobsStatic[i] = $(`#static${i}`).html();
  }

  localStorage.chartData = JSON.stringify(createChartData());

  $('#settings').removeClass('opensettings');
}

function createChartData() {
  //this function turns our arrays into an object
  let output = {
    people: [],
    jobsDaily: [],
    jobsWeekly: [],
    jobsStatic: [],
  };

  output.people = people;
  output.jobsDaily = jobsDaily;
  output.jobsWeekly = jobsWeekly;
  output.jobsStatic = jobsStatic;

  return output;

}
