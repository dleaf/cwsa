// Use the left and right arrow keys to navigate.
//

var section_x;        // Global variable for X coordinate of a section
var section_width;    // Global variable for section width
var currently_animating = false;  // Global flag. We don't want to do anything
                                  // If we're already animating.

$(document).ready(function() {

  $("a[href=#top]").parent().remove();
  $("#menu").remove();

  $("#section_container").append($(".section")).
    css({overflow: "hidden", position: "relative", height: "300px"});

  section_x = $(".section:first").position().left;
  section_width = $(".section:first").width();
  
  $(".section").css({position: "absolute", width: section_width});

  $(".section:not(:first)").hide();

  $(document).keypress(function(keyEvent) {
    if (keyEvent.keyCode == 37) {
      advance_previous();
    }
    else if (keyEvent.keyCode == 39) {
      advance_next();
    }
  });
});

function advance_previous()
{
  if (currently_animating) { return; }
  var visible_section = $(".section:visible");
  var previous_section = visible_section.prev();
  if (previous_section.length == 0) return;

  currently_animating = true;
  previous_section.show().animate({left: section_x});
  visible_section.animate({left: $("#section_container").width(), opacity: 0}, function() {
    $(this).css({opacity: 100}).hide();
    currently_animating = false;
  });
}

function advance_next()
{
  if (currently_animating) { return; }
  var visible_section = $(".section:visible");
  var next_section = visible_section.next();
  if (next_section.length == 0) return;

  currently_animating = true;
  next_section.css({left: visible_section.width()}).show();
  visible_section.animate({left: 0-$("#section_container").width(), opacity: 0}, function() {
    $(this).css({opacity: 100}).hide();
    currently_animating = false;
  });
  next_section.animate({left: section_x});
}
