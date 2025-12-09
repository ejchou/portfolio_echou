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
    const lastCardIndex = cards.length - 1;
    const triggers = [];

    // Use the last card to define where the stack ends
    const lastCardST = ScrollTrigger.create({
      trigger: cards[lastCardIndex],
      start: "center center"
    });
    triggers.push(lastCardST);

    cards.forEach((card, index) => {
      const scale = index === lastCardIndex ? 1 : 0.5; // last card ends full size

      const st = ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: () => lastCardST.start,
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        animation: gsap.to(card, { scale }),
        ease: "none"
      });

      triggers.push(st);
    });

    // Cleanup if viewport shrinks below 768px
    return () => {
      triggers.forEach(t => t.kill());
      gsap.set(cards, { clearProps: "all" });
    };
  });