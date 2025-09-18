import gsap from 'gsap'
import { App } from '~/App'
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing'
import { ScrollTrigger, } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const app = await App.mount({
  debug: true,
  canvas: document.querySelector('canvas')!
})
document.body.classList.add('loaded')

const composer = new EffectComposer(app.renderer);

const renderPass = new RenderPass(app.scene, app.camera);
composer.addPass(renderPass);

const bloomEffect = new BloomEffect({
  intensity: 2.5,              // force du bloom
  luminanceThreshold: 0.2,     // seuil
  luminanceSmoothing: 0.5,     // adoucissement (approche du radius)
  mipmapBlur: true,         // Utilise le flou avec mipmaps (plus performant/soft)
});

const effectPass = new EffectPass(app.camera, bloomEffect);
composer.addPass(effectPass);

// Utiliser le composer dans la boucle de rendu au lieu de renderer.render(scene, camera)
app.renderer.setAnimationLoop(() => {
  composer.render();
});

window.addEventListener('resize', () => {
  composer.setSize(window.innerWidth, window.innerHeight);
});



const sectionA = document.querySelector('#a')
const sectionB = document.querySelector('#b')
const sectionC = document.querySelector('#c')
const sectionD = document.querySelector('#d')

// const titleB = document.querySelector('#title-b')
// const paragraphB = document.querySelector('#paragraph-b')



// window.addEventListener('scroll', () => {
//   const scrollPosition = window.scrollY; // Position verticale en pixels
//   console.log(`Scroll position: ${scrollPosition}px`);
// });

// function onClickMesh() {
//   document.querySelector('div');
//   const popup = document.querySelector('#popup');
//   if (popup) {
//     popup.style.display = 'block';
//   }
// }

// app.renderer.domElement.addEventListener('click', onClickMesh);


const intersectionObserver = new IntersectionObserver((items) => {
  for (const item of items) {
    switch (item.target) {
      case sectionA:
        if (item.isIntersecting) {
          gsap.fromTo(app.camera.position,
            { y: 10.7, x: 0.3, z: -22.6 }, // ou la valeur que tu veux cibler
            {
              y: 10, x: 0.3, z: -22.6, // ou la valeur que tu veux cibler
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionA,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse",
                scrub: true // ← avance/recul selon le scroll
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material,
            { opacity: 0 },
            {
              opacity: 0,
              overwrite: 'auto',
              duration: 0.5,
              scrollTrigger: {
                trigger: sectionA,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo(app.scene.mesh!.material, {
            opacity: 1
          },
            {
              opacity: 1,
              overwrite: 'auto',
              scrollTrigger: {
                trigger: sectionA,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });

          gsap.fromTo('h1',
            { opacity: 0 },
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionA,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            }
          )
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 1.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionA,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
        } else {
          console.log('section A invisible')
        }
        break;

      case sectionB:
        if (item.isIntersecting) {
          gsap.fromTo(app.camera.position, {
            y: 10, x: 0.3, z: -22.6,
          }, // ou la valeur que tu veux cibler
            {
              y: 0, x: 30, z: -22.6, // ou la valeur que tu veux cibler
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material, {
            opacity: 0
          },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('h1', {
            opacity: 0
          },
            {
              opacity: 1,
              top: 0,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            })
          gsap.fromTo(app.scene.instancedMesh!.material,
            { opacity: 0 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo(app.scene.mesh!.material, {
            opacity: 0
          },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
        } else {
          // gsap.to('h1', {
          //   opacity: 0,
          //   top: -20,
          //   duration: 0.5,
          //   ease: "power2.inOut",
          // })
        }
        break;

      case sectionC:
        if (item.isIntersecting) {
          gsap.fromTo(app.camera.position, {
            y: 0, x: 30, z: -22.6,
          },
            {
              y: 30, x: 0, z: -22.6,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material, {
            opacity: 0
          },
            {
              opacity: 1,
              duration: 0.5,
              top: 0,
              y: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
              onUpdate() {
                app.scene.instancedMesh?.lookAt(app.camera.position);
              }
            });
          gsap.fromTo(app.scene.mesh!.material, {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            });
          gsap.fromTo('h1', {
            opacity: 0
          },
            {
              opacity: 0,
              top: -20,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            })
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            });
        }

        else {
        }
        break;
      case sectionD:
        if (item.isIntersecting) {
          gsap.fromTo(app.camera.position, {
            y: 30, x: 0, z: -22.6,
          },
            {
              y: 10, x: 30, z: -10,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            });
          gsap.fromTo(app.scene.instancedMesh!.material, {
            opacity: 0
          },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            });
          gsap.fromTo(app.scene.mesh!.material, {
            opacity: 1
          },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
            });
        } else {
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
