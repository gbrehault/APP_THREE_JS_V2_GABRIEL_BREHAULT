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
  public pointLight: PointLight
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

    const axesHelper = new THREE.AxesHelper(5);
    this.add(axesHelper);

    this.pointLight = new THREE.PointLight(0xff0000, 10000, 100);
    this.pointLight.position.set(10, 10, 10);
    this.add(this.pointLight);

    // Ajout du PointLightHelper
    const pointLightHelper = new THREE.PointLightHelper(this.pointLight, 1);
    this.add(pointLightHelper);

  }

  public async load(): Promise<void> {
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      new GLTFLoader().load(SkullGLb, resolve, undefined, reject)
    });
    gltf.scene.scale.setScalar(0.3);
    this.add(gltf.scene)
  }

  public update(): void {
  }

  public resize(): void {
    this.camera.aspect = this.viewport.ratio
    this.camera.updateProjectionMatrix()
  }

  public dispose(): void {
  }
}
