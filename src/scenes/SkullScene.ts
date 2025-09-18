import {
  Scene,
  PointLight,
  PerspectiveCamera,
  Mesh,
  InstancedMesh,
  Matrix4,
  Vector3,
  MeshStandardMaterial,
  BufferGeometry,
  Quaternion
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
const matrix = new Matrix4();
const position = new Vector3();
const rotation = new Quaternion();
const scale = new Vector3();
const UP = new Vector3(0, 1, 0);

export class SkullScene extends Scene implements Lifecycle {
  public clock: Clock
  public camera: PerspectiveCamera
  public viewport: Viewport
  public pointLight1: PointLight
  public skullMesh: THREE.Mesh | null = null
  public mesh?: Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
  public instancedMesh?: InstancedMesh<BufferGeometry, MeshStandardMaterial>
  public constructor({
    clock,
    camera,
    viewport
  }: MainSceneParamaters) {
    super()

    this.clock = clock
    this.camera = camera
    this.viewport = viewport

    // const axesHelper = new THREE.AxesHelper(5);
    // this.add(axesHelper);

    this.pointLight1 = new THREE.PointLight(0xffffff, 100000, 100);
    this.pointLight1.position.set(0, 20, -20);
    this.add(this.pointLight1);

    // // Ajout du PointLightHelper
    // const pointLightHelper = new THREE.PointLightHelper(this.pointLight1, 1);
    // this.add(pointLightHelper);

    // const cameraHelper = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // const helper = new THREE.CameraHelper(cameraHelper);
    // this.add(helper);
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
    this.mesh.material.roughness = 0.15;
    this.mesh.material.metalness = 0;
    this.mesh.material.transparent = true;
    this.mesh.material.opacity = 0;
    this.add(this.mesh);

    console.log(this.mesh);

    const rows = 10;
    const columns = 10;

    this.instancedMesh = new InstancedMesh(
      this.mesh.geometry,
      this.mesh.material.clone(),
      rows * columns
    )
    this.add(this.instancedMesh);
    this.instancedMesh.material.depthTest = false;
    this.instancedMesh.material.transparent = true;
    this.instancedMesh.material.opacity = 0;

    for (let i = 0; i < this.instancedMesh.count; i++) {
      const column = Math.floor(i / columns) / (columns - 1); // Floor ça arrondi à l'inferrieur 
      const row = Math.floor(i % columns) / (rows - 1); // Modulo ça permet de faire boucler la variable en zero et le modulo

      position.set(
        column * 100 - 50,
        row * 100 - 50,
        0,
      );
      scale.setScalar(0.3);
      matrix.compose(position, rotation, scale);

      this.instancedMesh.setMatrixAt(i, matrix);
      console.log(position
      );
    }
    this.instancedMesh.lookAt(this.camera.position);

    console.log(gltf);
  }

  public update(): void {

    for (let i = 0; i < this.instancedMesh!.count; i++) {
      this.instancedMesh?.getMatrixAt(i, matrix);
      matrix.decompose(position, rotation, scale);
      rotation.setFromAxisAngle(UP, this.clock.elapsed / 1000);
      matrix.compose(position, rotation, scale);
      this.instancedMesh!.setMatrixAt(i, matrix);

    }
    this.instancedMesh!.instanceMatrix.needsUpdate = true;
  }
  public resize(): void {
    this.camera.aspect = this.viewport.ratio
    this.camera.updateProjectionMatrix()
  }

  public dispose(): void {
  }
}
