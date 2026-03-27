'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import pizzaLowModel from '../../../images/pizza-low.glb';
import pizzaModel from '../../../images/pizza.glb';

function disposeObject3D(root: THREE.Object3D) {
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => material.dispose());
      } else {
        mesh.material.dispose();
      }
    }
  });
}

function fitPizzaModel(model: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z);
  const viewportWidth = window.innerWidth;
  const targetSize = viewportWidth < 640 ? 4.05 : 4.8;
  const scale = targetSize / maxAxis;

  model.position.sub(center);
  model.scale.setScalar(scale);
  model.rotation.x = 0.88;
  model.rotation.y = Math.PI / 2 + 0.18;
  model.rotation.z = 0.14;
}

export function HeroPizzaModel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 1.35, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(`${import.meta.env.BASE_URL}basis/`);
    ktx2Loader.detectSupport(renderer);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.8;
    controls.target.set(0, 0.35, 0);
    controls.minPolarAngle = Math.PI / 2.5;
    controls.maxPolarAngle = Math.PI / 1.65;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff8a47, 1.6);
    rimLight.position.set(-5, 2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xf3d7b4, 1.2, 30);
    fillLight.position.set(0, -1, 4);
    scene.add(fillLight);

    const group = new THREE.Group();
    scene.add(group);

    let animationId = 0;
    let activeModel: THREE.Object3D | null = null;
    let highModelLoaded = false;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2Loader);
    loader.setMeshoptDecoder(MeshoptDecoder);
    const setActiveModel = (nextModel: THREE.Object3D) => {
      fitPizzaModel(nextModel);

      if (activeModel) {
        group.remove(activeModel);
        disposeObject3D(activeModel);
      }

      activeModel = nextModel;
      group.add(nextModel);
    };

    loader.load(
      pizzaLowModel,
      (gltf) => {
        if (disposed) {
          disposeObject3D(gltf.scene);
          return;
        }

        if (!highModelLoaded) {
          setActiveModel(gltf.scene);
        } else {
          disposeObject3D(gltf.scene);
        }
      },
      undefined,
      (error) => {
        console.error('Failed to load low pizza model', error);
      }
    );

    loader.load(
      pizzaModel,
      (gltf) => {
        if (disposed) {
          disposeObject3D(gltf.scene);
          return;
        }

        highModelLoaded = true;
        setActiveModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Failed to load detailed pizza model', error);
      }
    );

    const clock = new THREE.Clock();

    const onResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (activeModel) {
        group.position.y = 0.25 + Math.sin(elapsed * 1.2) * 0.05;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    onResize();
    animate();
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      ktx2Loader.dispose();
      renderer.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-[2] h-full w-full cursor-grab touch-none active:cursor-grabbing"
    />
  );
}
