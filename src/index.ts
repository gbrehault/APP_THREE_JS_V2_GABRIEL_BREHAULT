import gsap from 'gsap'
import { App } from '~/App'
import { ScrollTrigger, } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const app = await App.mount({
  debug: true,
  canvas: document.querySelector('canvas')!
})
document.body.classList.add('loaded')

const sectionA = document.querySelector('#a')
const sectionB = document.querySelector('#b')
const sectionB1 = document.querySelector('#b1')
const sectionB2 = document.querySelector('#b2')
const sectionB3 = document.querySelector('#b3')
const sectionC = document.querySelector('#c')
const sectionD = document.querySelector('#d')

const intersectionObserver = new IntersectionObserver((items) => {
  for (const item of items) {
    switch (item.target) {
      case sectionA:
        if (item.isIntersecting) {
          gsap.fromTo(app.camera.position,
            { y: 10.7, x: 0.3, z: -22.6 }, // ou la valeur que tu veux cibler
            {
              y: 10, x: 0.3, z: -22.6, // ou la valeur que tu veux cibler
              duration: 1,
              ease: "ease-out",
              onComplete() {
                app.controls.setPosition(10, 0.3, -22.6);
                app.controlsEnabled = false;
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
              ease: "ease-out",
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
              ease: "ease-out",
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
          app.controlsEnabled = false;
          gsap.fromTo(app.camera.position, {
            y: 10, x: 0.3, z: -22.6,
          }, // ou la valeur que tu veux cibler
            {
              y: 0, x: 30, z: -22.6, // ou la valeur que tu veux cibler
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controls.setPosition(0, 30, -22.6);
                app.controlsEnabled = false;
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material, {
            opacity: 0
          },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.h1', {
            opacity: 0
          },
            {
              opacity: 1,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
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
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "ease-out",
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
      case sectionB1:
        if (item.isIntersecting) {
          app.controlsEnabled = false;
          gsap.fromTo(app.camera.position, {
            y: 0, x: 30, z: -22.6,
          }, // ou la valeur que tu veux cibler
            {
              y: 10, x: -30, z: 1, // ou la valeur que tu veux cibler
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controls.setPosition(0, 30, -22.6);
                app.controlsEnabled = false;
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo('.h1-1', {
            opacity: 0
          },
            {
              opacity: 1,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.h1', {
            opacity: 1
          },
            {
              opacity: 0,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material,
            { opacity: 0 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionB1,
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
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
        } else {
        }
        break;
      case sectionB2:
        if (item.isIntersecting) {
          app.controlsEnabled = false;
          gsap.fromTo(app.camera.position, {
            y: 10, x: -30, z: 1,
          }, // ou la valeur que tu veux cibler
            {
              y: 30, x: 10, z: -20, // ou la valeur que tu veux cibler
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB2,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controls.setPosition(0, 30, -22.6);
                app.controlsEnabled = false;
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo('.h1-2', {
            opacity: 0
          },
            {
              opacity: 1,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB2,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.h1-1', {
            opacity: 1
          },
            {
              opacity: 0,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB2,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material,
            { opacity: 0 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionB2,
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
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB2,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
        } else {
        }
        break;
      case sectionB3:
        if (item.isIntersecting) {
          app.controlsEnabled = false;
          gsap.fromTo(app.camera.position, {
            y: 30, x: 10, z: -20,
          }, // ou la valeur que tu veux cibler
            {
              y: 10, x: 5, z: -20, // ou la valeur que tu veux cibler
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB3,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controls.setPosition(0, 30, -22.6);
                app.controlsEnabled = false;
              },
              onUpdate() {
                app.camera.lookAt(0, 0, 0);
              }
            });
          gsap.fromTo('.h1-3', {
            opacity: 0
          },
            {
              opacity: 1,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB3,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.h1-2', {
            opacity: 1
          },
            {
              opacity: 0,
              top: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB3,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo(app.scene.instancedMesh!.material,
            { opacity: 0 },
            {
              opacity: 0,
              scrollTrigger: {
                trigger: sectionB3,
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
                trigger: sectionB1,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              }
            });
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionB3,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              }
            });
        } else {
        }
        break;

      case sectionC:
        if (item.isIntersecting) {
          app.controlsEnabled = false;
          gsap.fromTo(app.camera.position, {
            y: 0, x: 30, z: -22.6,
          },
            {
              y: 30, x: 0, z: -22.6,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controls.setPosition(30, 0, -22.6);
                app.controlsEnabled = false;
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
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
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
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
            });
          gsap.fromTo('.h1-3', {
            opacity: 0
          },
            {
              opacity: 0,
              top: -20,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
            })
          gsap.fromTo('.social-network', {
            opacity: 0
          },
            {
              opacity: 0,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionC,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
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
              y: 10, x: 50, z: -10,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
              onComplete() {
                app.controlsEnabled = true;
                this.camera.setPosition(10, 50, 0);
                app.controls.setPosition(10, 50, 0);
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
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
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
                once: true,                // ✅ joue une seule fois
                toggleActions: "play none none reverse"
              },
            });
          gsap.fromTo('h3', {
            opacity: 0
          },
            {
              opacity: 1,
              duration: 0.5,
              ease: "ease-out",
              scrollTrigger: {
                trigger: sectionD,
                start: "top center",
                end: "bottom center",
                once: true,                // ✅ joue une seule fois
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
if (sectionB1) intersectionObserver.observe(sectionB1)
if (sectionB2) intersectionObserver.observe(sectionB2)
if (sectionB3) intersectionObserver.observe(sectionB3)
if (sectionC) intersectionObserver.observe(sectionC)
if (sectionD) intersectionObserver.observe(sectionD)
