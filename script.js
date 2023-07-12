// JavaScript code
$(document).ready(function() {
    // API Key and Client ID
    const API_KEY = "YOUR_API_KEY";
    const CLIENT_ID = "YOUR_CLIENT_ID";
    
    // Load the Google Calendar API
    gapi.load("client:auth2", initClient);
    
    // Initialize the Google Calendar API client
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.events"
      }).then(function() {
        // Add event listener to "Add Event" button
        $("#add-to-calendar").on("click", addToCalendar);
      });
    }
    
    // Function to add the selected date to Google Calendar
    function addToCalendar() {
      const selectedDate = $("#datepicker").datepicker("getDate");
      
      if (selectedDate) {
        const event = {
          summary: "Awesome Tour",
          start: {
            date: selectedDate.toISOString().slice(0, 10)
          },
          end: {
            date: selectedDate.toISOString().slice(0, 10)
          }
        };
        
        gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event
        }).then(function(response) {
          console.log("Event added to Google Calendar:", response);
          alert("Event added to your Google Calendar!");
        }, function(error) {
          console.error("Error adding event to Google Calendar:", error);
          alert("An error occurred while adding the event. Please try again.");
        });
      }
    }
    
    // Initialize the datepicker as an inline calendar
    $("#datepicker").datepicker({
      onSelect: function(dateText, inst) {
        addToCalendar();
      },
      inline: true
    });
  });
  