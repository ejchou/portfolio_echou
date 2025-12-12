// Seleccionar todas las tarjetas y definir la distancia de stick
const cards = gsap.utils.toArray(".c-card");
const lastCardIndex = cards.length - 1;

// Crear el ScrollTrigger para la primera y última tarjeta
const firstCardST = ScrollTrigger.create({
  trigger: cards[1],
  start: "center center"
});

const lastCardST = ScrollTrigger.create({
  trigger: cards[cards.length - 1],
  start: "center center"
});

// Iterar sobre cada tarjeta
cards.forEach((card, index) => {
  const scale = index === lastCardIndex ? 1 : 0.5;
  const scaleDown = gsap.to(card, {
    scale: scale,
  });

  ScrollTrigger.create({
    trigger: card,
    start: "top top",
    end: () => lastCardST.start,
    pin: true,
    pinSpacing: false,
    scrub: 0.5,
    ease: "none",
    animation: scaleDown,
    toggleActions: "restart none none reverse"
  });
});