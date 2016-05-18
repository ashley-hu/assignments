// The beginning of the document
$(document).ready(function() {
    //The image is initially hidden. When clickme is clicked, the image will appear and the button will disappear.
$('#image').hide();

  $('#clickme').click(function() {
    $('#image').fadeIn("slow", function(){
      $('#clickme').hide();
    });
  })

$("p").on({
  //When the mouse scrolls over, the background color of the text will change
    mouseenter: function(){
        $(this).css("background-color", "#003366");
    },
    //When the mouse is not over the text
    mouseleave: function(){
        $(this).css("background-color", "transparent");
    }
});
//Text is intitially hidden
$('.more').hide();

//When the button is clicked, more text will fade in and the button will hide itself
 $("button").click(function(){
   $('.more').fadeIn("slow", function(){
     $('.more').on("click", function(){
       $(this).hide();
     });
   });
 })

//When heading is clicked, the body will change color.
$('#hello').click(function(){
  $('#hello').html("<h2>Hello There!</h2>");
  $('body').css('background-color', 'darkblue');
});

//Resets everything that was done on the page back to how it was originally shown when a user first enters
$('#restart').click(function(){
  $('body').css('background-color', '');
  $('#image').hide();
  $('#clickme').show();
  $('#hello').html("<h2>Fun Facts (Click me!)</h2>");
  $('td').css("color", "");
  $('.more').hide();
});

//The table data will change color when clicked
$("td").click(function(){
  $(this).css("color", "purple");
});

//When the mouse hovers over the soup_dumplings image, the image will change. 
$('#ima').hover(function(){
  $(this).attr('src', 'images/nano.jpg');
}, function(){
  $(this).attr('src', 'images/soup_dumplings.jpg');
})

})
