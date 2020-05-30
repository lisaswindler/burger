// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {

$(function() {
  $(".change-eat").on("click", function(event) {
    var id = $(this).data("id");
    var newEat = $(this).data("neweat");

    var newEatenState = {
      devoured: newEat
    };

    // Send the PUT request.
    $.ajax("/api/tacos/" + id, {
      type: "PUT",
      data: newEatenState
    }).then(
      function() {
        console.log("changed devour to", newEat);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newTaco = {
      taco_name: $("#taco").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/tacos", {
      type: "POST",
      data: newTaco
    }).then(
      function() {
        console.log("added new taco");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
});
