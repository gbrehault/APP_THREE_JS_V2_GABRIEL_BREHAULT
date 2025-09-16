import {
  Scene,
  PointLight,
  PerspectiveCamera
} from 'three'

import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import SkullGLb from '~~/assets/models/skull.glb'
import EnveMap from '~~/assets/textures/brown_photostudio_02_4k.hdr'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';;
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
  public pointLight1: PointLight
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

    this.pointLight1 = new THREE.PointLight(0xffffff, 10000, 100);
    this.pointLight1.position.set(10, 10, 10);
    this.add(this.pointLight1);

    // Ajout du PointLightHelper
    const pointLightHelper = new THREE.PointLightHelper(this.pointLight1, 1);
    this.add(pointLightHelper);

  }

  public async load(): Promise<void> {
    const hdrLoader = new RGBELoader();
    hdrLoader.load(EnveMap, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.environment = texture; // Pour les réflexions
      this.background = texture;
    });
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      new GLTFLoader().load(SkullGLb, resolve, undefined, reject)
    });
    gltf.scene.scale.setScalar(0.3);
    this.add(gltf.scene)
    console.log(gltf)
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
