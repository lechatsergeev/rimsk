import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { STAGES } from "@/content/stages";

/** Шеренга: соседи стоят друг за другом вглубь, чуть выглядывая вбок. */
const DEPTH = 1.45;
const PEEK = 0.5;
const DIM = 0.3;

function fit(model: THREE.Object3D, target: number) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  model.scale.setScalar(target / Math.max(size.x, size.y, size.z));
}

/**
 * Все стадии в одной сцене.
 *
 * Четыре модели живут в общем WebGL-контексте и выстроены в линию:
 * активная впереди и в цвете, соседи уходят вглубь и в тень. Отдельный
 * холст на каждую стадию стоил бы четыре контекста и четыре цикла
 * отрисовки — мы уже выкидывали один такой за расточительность.
 */
export function PizzaQueue({ active }: { active: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2.4));
    const key = new THREE.DirectionalLight(0xfff1dc, 2.6);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd9b0, 1.4);
    rim.position.set(-5, 2, -4);
    scene.add(rim);

    const ktx2 = new KTX2Loader();
    ktx2.setTranscoderPath(`${import.meta.env.BASE_URL}basis/`);
    ktx2.detectSupport(renderer);

    const loader = new GLTFLoader();
    loader.setKTX2Loader(ktx2);
    loader.setMeshoptDecoder(MeshoptDecoder);

    const slots: (THREE.Group | null)[] = STAGES.map(() => null);
    let disposed = false;

    STAGES.forEach((stage, i) => {
      loader.load(
        stage.modelSrc,
        (gltf) => {
          if (disposed) return;
          const group = new THREE.Group();
          fit(gltf.scene, 2.4);
          gltf.scene.rotation.x = 0.72;
          group.add(gltf.scene);
          const off0 = i - activeRef.current;
          group.position.set(off0 * PEEK, 0, -off0 * DEPTH);
          slots[i] = group;
          scene.add(group);
        },
        undefined,
        (err) => console.error(`Не загрузилась модель ${stage.key}`, err)
      );
    });

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let frame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const a = activeRef.current;

      slots.forEach((group, i) => {
        if (!group) return;
        const offset = i - a;
        const isActive = offset === 0;
        const passed = offset < 0;

        // Шеренга: следующие стоят за активной, каждая чуть в сторону,
        // чтобы наружу выходил только силуэт. Пройденные уезжают на
        // зрителя и растворяются — очередь двигается, а не толпится.
        const tx = passed ? offset * 0.8 : offset * PEEK;
        const tz = passed ? 2.2 : -offset * DEPTH;
        const ts = isActive ? 1 : passed ? 1.1 : 0.86;

        group.position.x += (tx - group.position.x) * 0.09;
        group.position.z += (tz - group.position.z) * 0.09;
        group.position.y = isActive ? Math.sin(t * 1.1) * 0.05 : -0.06;
        const s = group.scale.x + (ts - group.scale.x) * 0.09;
        group.scale.setScalar(s);

        // Лёгкое покачивание вместо оборота: продукт не показывает
        // зрителю обратную сторону.
        group.rotation.y = isActive ? Math.sin(t * 0.5) * 0.13 : 0.05;

        const tint = isActive ? 1 : DIM;
        const alpha = passed ? 0 : 1;
        group.traverse((o) => {
          const mesh = o as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
          if (!mat || !mat.color) return;
          mat.color.setScalar(mat.color.r + (tint - mat.color.r) * 0.09);
          mat.transparent = true;
          mat.opacity += (alpha - mat.opacity) * 0.09;
          mat.depthWrite = mat.opacity > 0.9;
        });
      });

      renderer.render(scene, camera);
    };

    onResize();
    animate();
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("resize", onResize);
      ktx2.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const m = mesh.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m?.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pizza-queue"
    />
  );
}
