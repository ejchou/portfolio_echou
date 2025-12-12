console.log("Thank you for being here.")


/* Menu Toggle */

let menuOpen = false;

function toggleMenuAndIcon() {
  
  var x = document.getElementById('myNavtoggle');

    if (x.className === 'navtoggle') {
        x.className += ' responsive';
    } else {
        x.className = 'navtoggle';
    }

  const icon = document.getElementById("menuIcon");

    if (!menuOpen) {
      icon.setAttribute("data-feather", "x-circle"); // change to close icon
    } else {
      icon.setAttribute("data-feather", "align-right"); // change back to menu icon
    }

    feather.replace(); // IMPORTANT: re-render the SVG
    menuOpen = !menuOpen;
}


/* Scroll to top */

// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (!mybutton) return; // bail if button doesn't exist
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


/* Parallax Scrolling */

const featured = document.getElementById("featured");
  const textTrigger = document.getElementById("hero-text-trigger");
  const work = document.getElementById("work");

  /* Phase 1: Lift hero text */
  const textObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("lift-hero-text");
      } else {
        document.body.classList.remove("lift-hero-text");
      }
    },
    { threshold: 0.2 }
  );

  if (textTrigger) textObserver.observe(textTrigger);

  /* Phase 2: Background exit */
  const bgObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("release-hero");
      } else {
        document.body.classList.remove("release-hero");
      }
    },
    { threshold: 0.15 }
  );

  if (featured) bgObserver.observe(featured);

  /* Phase 3: Lift #featured when #work enters view */
  const featuredLiftObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        document.body.classList.add("lift-featured");
      } else {
        document.body.classList.remove("lift-featured");
      }
    },
    { threshold: 0.1 }
  );

  if (work) featuredLiftObserver.observe(work);


/* Card Stacking */

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  const cards = gsap.utils.toArray("#work .c-work__item");
  const lastCard = cards[cards.length - 1];
  const totalCards = cards.length;

  cards.forEach((card, index) => {
    const isLast = index === totalCards - 1;

    // Scale: last card full size, earlier ones smaller
    const targetScale = isLast ? 1 : 0.4;

    // Vertical lift: earlier cards lift higher
    const liftOffset = isLast ? 0 : -30 * (totalCards - index); // tweak 40px if needed

    // Opacity fade: last card stays solid, earlier ones fade out
    const targetOpacity = isLast ? 1 : 0.15;

    // Z-index: later cards appear above earlier ones
    gsap.set(card, {
      zIndex: index + 1,
      transformOrigin: "center top",
    });

    gsap.to(card, {
      scale: targetScale,
      y: liftOffset,
      opacity: targetOpacity,
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top top",
        // end when the LAST card hits center of viewport
        endTrigger: lastCard,
        end: "center center",
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });
  });

  // cleanup on smaller viewports
  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.set(cards, { clearProps: "all" });
  };
});


/* Header Background Color Change */

const primaryHeader = document.querySelector('.primary-header');
const scrollWatcher = document.createElement('div');

scrollWatcher.setAttribute('data-scroll-watcher', '');
primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  primaryHeader.classList.toggle('sticking', !entries[0].isIntersecting)
}, {rootMargin: "1300px 0px 0px 0px"});

navObserver.observe(scrollWatcher)

