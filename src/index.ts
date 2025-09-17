import gsap from 'gsap'
import { App } from '~/App'

const app = await App.mount({
  debug: true,
  canvas: document.querySelector('canvas')!
})
document.body.classList.add('loaded')

const sectionA = document.querySelector('#a')
const sectionB = document.querySelector('#b')
const sectionC = document.querySelector('#c')
const sectionD = document.querySelector('#d')
const sectionE = document.querySelector('#e')
const sectionF = document.querySelector('#f')

// const titleB = document.querySelector('#title-b')
// const paragraphB = document.querySelector('#paragraph-b')



// window.addEventListener('scroll', () => {
//   const scrollPosition = window.scrollY; // Position verticale en pixels
//   console.log(`Scroll position: ${scrollPosition}px`);
// });


const intersectionObserver = new IntersectionObserver((items) => {
  for (const item of items) {
    switch (item.target) {
      case sectionA:
        if (item.isIntersecting) {
          gsap.to(app.scene.camera.position, {
            x: 0, // ou la valeur que tu veux cibler
            y: 10, // ou la valeur que tu veux cibler
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
        } else {
          console.log('section A invisible')
        }
        break;

      case sectionB:
        if (item.isIntersecting) {
          gsap.to(app.scene.camera.position, {
            x: 30, // ou la valeur que tu veux cibler
            y: 0, // ou la valeur que tu veux cibler

            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
          gsap.to('h1', {
            opacity: 1,
            top: 0,
            duration: 1.5,
            ease: "power2.inOut",
          })
        } else {
          gsap.to('h1', {
            opacity: 0,
            top: -20,
            duration: 1.5,
            ease: "power2.inOut",
          })
        }
        break;

      case sectionC:
        if (item.isIntersecting) {
          gsap.to(app.scene.camera.position, {
            y: 30, // ou la valeur que tu veux cibler
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 1,
            duration: 1.5,
            y: 1,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.camera.lookAt(0, 0, 0);
            }
          })
        } else {
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
        }
        break;
      case sectionD:
        if (item.isIntersecting) {
          gsap.to(app.scene.camera.position, {
            y: 30, // ou la valeur que tu veux cibler
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to('.p1', {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          })
        } else {
          gsap.to('.p1', {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          })
        }
        break;
    }
  }
}, {
  threshold: 0.6,
  rootMargin: '-20% 0px -20% 0px',
});

if (sectionA) intersectionObserver.observe(sectionA)
if (sectionB) intersectionObserver.observe(sectionB)
if (sectionC) intersectionObserver.observe(sectionC)
if (sectionD) intersectionObserver.observe(sectionD)
if (sectionE) intersectionObserver.observe(sectionE)
if (sectionF) intersectionObserver.observe(sectionF)

