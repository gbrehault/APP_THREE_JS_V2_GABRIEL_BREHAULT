import {
  Scene,
  PointLight,
  PerspectiveCamera
} from 'three'

import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import SkullGLb from '~~/assets/models/skull.glb'
import * as THREE from 'three';

import type {
  Viewport,
  Clock,
  Lifecycle
} from '~/core'

export interface MainSceneParamaters {
  clock: Clock
  camera: PerspectiveCamera
  viewport: Viewport
}

export class SkullScene extends Scene implements Lifecycle {
  public clock: Clock
  public camera: PerspectiveCamera
  public viewport: Viewport
  public light1: PointLight
  // public light2: PointLight
  // public light3: PointLight

  public constructor({
    clock,
    camera,
    viewport
  }: MainSceneParamaters) {
    super()

    this.clock = clock
    this.camera = camera
    this.viewport = viewport

    this.light1 = new PointLight(0xffbbff, 100, 50, 0.5)
    this.light1.position.set(2, 50, 50)

    // this.light2 = new PointLight(0xbbffff, 0.5, 60, 0.5)
    // this.light2.position.set(-2, 4, 2)

    // this.light3 = new PointLight(0xffffff, 1, 100, 2)
    // this.light3.position.set(0, 5, 0)

    this.add(
      this.light1,
      // this.light2,
      // this.light3
    )
  }

  public async load(): Promise<void> {
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      new GLTFLoader().load(SkullGLb, resolve, undefined, reject)
    });
    gltf.scene.scale.setScalar(0.3);

    this.add(gltf.scene)
    const axesHelper = new THREE.AxesHelper(5);
    this.add(axesHelper);

    const pointLight = new THREE.PointLight(0xff0000, 1, 100);
    pointLight.position.set(10, 10, 10);
    this.add(pointLight);

    // Ajout du PointLightHelper
    const pointLightHelper = new THREE.PointLightHelper(this.light1, 1); // Le deuxième paramètre est la taille du helper
    this.add(pointLightHelper);

  }

  public update(): void {
    const theta = Math.atan2(this.camera.position.x, this.camera.position.z)

    this.light1.position.x = Math.cos(theta + this.clock.elapsed * 0.001) * 2
    this.light1.position.z = Math.sin(theta + this.clock.elapsed * 0.0005) * 2
    // this.light2.position.y = Math.sin(theta + this.clock.elapsed * 0.001) * 4
    // this.light2.position.z = Math.cos(theta + this.clock.elapsed * 0.0005) * 2
  }

  public resize(): void {
    this.camera.aspect = this.viewport.ratio
    this.camera.updateProjectionMatrix()
  }

  public dispose(): void {
  }
}
