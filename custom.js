// Tell jquery to call this function when
// the document is loaded
$(document).ready(function() {

  // Remove all the "Back to Top" links and their parent paragraphs
  // since they don't make sense anymore.
  $("a[href=#top]").parent().remove();
  
  // Hide the h2 tags
  $(".section h2").hide();

  // Hide all sections except the first one.
  $(".section:not(:first)").hide();

  // For every click event in an "a" tag in "ul#menu"...
  $("ul#menu a").click(handle_menu_click);

  // Find the first menu item and set it to "active"
  $("ul#menu a:first").addClass("active");

  // Make sure the sections have position set to absolute
  $(".section").css( { position: "absolute" } );

  // If the mouse enters a menu tab, add the hover class.
  $("ul#menu a").bind("mouseenter", function() {
    $(this).addClass("hover");
  });

  // If the mouse exits a menu tab, remove the hover class.
  $("ul#menu a").bind("mouseleave", function() {
    $(this).removeClass("hover");
  });
});


function handle_menu_click(click_event)
{
  // We don't want the link to act normally
  click_event.preventDefault();
  
  // Check to see if we clicked on the already active item.
  // If so, just return and don't do anything.
  if ($(this).hasClass("active")) { return; }

  // Fade out the currently visible section
  $(".section:visible").fadeOut();

  // Grab the anchor in the href of the tag
  // and remove the starting "#"
  var anchor = $(this).attr("href").replace("#", "");

  // Fade in the specified section.
  // We know which section to fade because it has an
  // "a" tag with "name" the same as the menu's anchor
  $(".section a[name=" + anchor + "]").parent().fadeIn();

  // Remove the active class from any
  // menu tab that has it
  $("ul#menu a.active").removeClass("active", 200);

  // And add the active class to this
  // clicked on menu tab
  $(this).addClass("active", 200);

  $(this).blur();
}

