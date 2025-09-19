// Option 1: Import par défaut (recommandé)
import Lenis from 'lenis'

const lenis = new Lenis({
    autoRaf: true,
})

lenis.on('scroll', (e) => {
    console.log('scroll', e)
})

// Option 2: Import nommé (alternative)
// import { Lenis } from 'lenis'
// 
// const lenis = new Lenis({
//   autoRaf: true,
// })

// Configuration plus complète (optionnel)
/*
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  autoRaf: true,
})
*/