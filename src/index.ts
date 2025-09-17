import gsap from 'gsap'
import { App } from '~/App'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three'


const app = await App.mount({
  debug: true,
  canvas: document.querySelector('canvas')!
})
document.body.classList.add('loaded')

const composer = new EffectComposer(app.renderer);
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const renderPass = new RenderPass(app.scene, app.camera);
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight), // résolution
  0.5,  // strength (intensité)
  1,    // radius (diffusion)
  0.85  // threshold (seuil de luminosité)
);
composer.addPass(bloomPass);

// Utiliser le composer dans la boucle de rendu au lieu de renderer.render(scene, camera)
app.renderer.setAnimationLoop(() => {
  composer.render();
});

window.addEventListener('resize', () => {
  composer.setSize(window.innerWidth, window.innerHeight);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (typeof (bloomPass as any).setSize === 'function') {
    (bloomPass as any).setSize(window.innerWidth, window.innerHeight);
  }
});

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
          gsap.to(app.camera.position, {
            x: 0, // ou la valeur que tu veux cibler
            y: 10, // ou la valeur que tu veux cibler
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
          gsap.to(app.scene.mesh!.material, {
            opacity: 1,
          });

        } else {
          console.log('section A invisible')
        }
        break;

      case sectionB:
        if (item.isIntersecting) {
          gsap.to(app.camera.position, {
            x: 30, // ou la valeur que tu veux cibler
            y: 0, // ou la valeur que tu veux cibler
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate() {
              app.camera.lookAt(0, 0, 0);
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
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
          gsap.to(app.scene.mesh!.material, {
            opacity: 1,
          });
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
          gsap.to(app.camera.position, {
            y: 30, // ou la valeur que tu veux cibler
            z: 0,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
              app.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 1,
            duration: 1,
            y: 1,
            ease: "power2.inOut",
            onUpdate() {
              app.scene.instancedMesh?.lookAt(app.camera.position);
            }
          });
          gsap.to(app.scene.mesh!.material, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        }
        else {
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
        }
        break;
      case sectionD:
        if (item.isIntersecting) {
          gsap.to(app.camera.position, {
            y: 10, // ou la valeur que tu veux cibler
            z: -10,
            duration: 1,
            ease: "power2.inOut",
            onUpdate() {
              app.camera.lookAt(0, 0, 0);
            }
          });
          gsap.to('.social-network', {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          })
          gsap.to(app.scene.instancedMesh!.material, {
            opacity: 0,
          });
          gsap.to(app.scene.mesh!.material, {
            opacity: 1,
          });
        } else {
          gsap.to('.social-network', {
            opacity: 0,
            duration: 0.5,
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

