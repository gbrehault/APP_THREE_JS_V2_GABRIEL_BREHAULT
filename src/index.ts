import { App } from '~/App'


App
  .mount({
    debug: true,
    canvas: document.querySelector('canvas')!
  })
document.body.classList.add('loaded')

const sectionA = document.querySelector('#a')
const sectionB = document.querySelector('#b')

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY; // Position verticale en pixels
  console.log(`Scroll position: ${scrollPosition}px`);
});
const intersectionObserver = new IntersectionObserver((items) => {
  for (const item of items) {
    switch (item.target) {
      case sectionA:
        if (item.isIntersecting) {
          console.log('section A visible')
        }
        else {
          console.log('section A invisible')
        }

        break;

      case sectionB:
        if (item.isIntersecting) {
          console.log('section B visible')
        }
        else {
          console.log('section B invisible')
        }

        break;
    }
  }
}, {
  threshold: 0,
  rootMargin: '0px',
});

if (sectionA) intersectionObserver.observe(sectionA)
if (sectionB) intersectionObserver.observe(sectionB)
