import type {
  WebGLRenderer,
  Scene,
  Camera
} from 'three'

import {
  EffectComposer,
  FXAAEffect,
  EffectPass,
  RenderPass,
  BloomEffect
} from 'postprocessing'

import type {
  Clock,
  Viewport,
  Lifecycle
} from '~/core'

export interface ComposerParameters {
  renderer: WebGLRenderer
  viewport: Viewport
  clock: Clock
  scene?: Scene
  camera?: Camera
}

export class Composer extends EffectComposer implements Lifecycle {
  public clock: Clock
  public viewport: Viewport
  public renderPass: RenderPass
  public effectPass?: EffectPass
  public fxaaEffect?: FXAAEffect
  public bloomEffect?: BloomEffect

  public get camera(): Camera | undefined {
    return this.renderPass.mainCamera
  }

  public constructor({
    renderer,
    viewport,
    clock,
    scene,
    camera
  }: ComposerParameters) {
    super(renderer)
    this.clock = clock
    this.viewport = viewport
    this.renderPass = new RenderPass(scene, camera)
  }

  public async load(): Promise<void> {
    this.fxaaEffect = new FXAAEffect()
    this.bloomEffect = new BloomEffect({
      intensity: 3.5,              // force du bloom
      luminanceThreshold: 0.2,     // seuil
      luminanceSmoothing: 0.5,     // adoucissement (approche du radius)
      mipmapBlur: true,         // Utilise le flou avec mipmaps (plus performant/soft)
    });
    this.effectPass = new EffectPass(this.camera, this.fxaaEffect, this.bloomEffect)


    this.addPass(this.renderPass)
    this.addPass(this.effectPass)
  }

  public update(): void {

  }

  public resize(): void {
    this.getRenderer().setPixelRatio(this.viewport.dpr)
    this.setSize(this.viewport.size.x, this.viewport.size.y, false)
  }

  public render(): void {
    super.render(this.clock.delta / 1000)
  }
}
