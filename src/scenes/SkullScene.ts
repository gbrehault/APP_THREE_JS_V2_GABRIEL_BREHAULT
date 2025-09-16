import {
  Scene,
  PointLight,
  PerspectiveCamera,
  Mesh
} from 'three'

import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import SkullGLb from '~~/assets/models/skull.glb'
import EnveMap from '~~/assets/textures/envmap_skull_gardient.hdr'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';;
import * as THREE from 'three';

import type {
  Viewport,
  Clock,
  Lifecycle,
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
  public skullMesh: THREE.Mesh | null = null
  public mesh?: Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
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

    this.pointLight1 = new THREE.PointLight(0xffffff, 10000, 10);
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
    });
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      new GLTFLoader().load(SkullGLb, resolve, undefined, reject)
    });
    this.mesh = gltf.scene.children[0] as Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>

    this.mesh.scale.setScalar(1);
    this.mesh.position.setScalar(0);
    this.mesh.rotation.set(0, 1, 0.4, 'XYZ');
    this.mesh.updateMatrixWorld(true);
    this.mesh.matrix.copy(this.matrixWorld);
    this.add(this.mesh);
    this.mesh.material.roughness = 0;
    this.mesh.material.metalness = 0;

    console.log(gltf);
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
