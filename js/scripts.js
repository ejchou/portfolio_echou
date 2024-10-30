console.log("Welcome! Thanks for checking out my site.")

function menuToggle() {
    var x = document.getElementById('myNavtoggle');
    if (x.className === 'navtoggle') {
        x.className += ' responsive';
    } else {
        x.className = 'navtoggle';
    }
}

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Stop float scroll //

  $(document).ready(function() {
  var $image = $('#about img'); 
  var stopScroll = $('#stop').offset().top;

  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop();

    if (scrollTop + $image.height() < stopScroll) {
      $image.css({
        'position': 'fixed',
      });
    } else {
      $image.css({
        'position': 'absolute',
        'top': stopScroll - $image.height()
      });
    }
  });
});
