import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { STAGES } from "@/content/stages";

/** Коробка под модель внутри ленты, в пикселях от её левого верхнего угла. */
export type Slot = {
  left: number;
  width: number;
  top: number;
  height: number;
};

/** Доля отведённой коробки, которую занимает модель. */
const FILL = 0.94;

/**
 * Вписать модель в коробку и вернуть её половинные размеры.
 *
 * Масштаб берётся по обеим сторонам коробки, а не по наибольшей стороне
 * модели: плоская пицца вписывалась по своей ширине в размер, посчитанный
 * от высоты коробки, и занимала едва половину отведённой ширины.
 *
 * Порядок важен дважды. Коробку меряем после поворота — у наклонённой
 * модели она своя. И центрируем после масштаба: сдвиг задаётся в
 * координатах родителя, а масштаб уводит центр пропорционально себе,
 * поэтому центрирование до него промахивалось тем сильнее, чем мельче
 * была модель.
 */
function fit(model: THREE.Object3D, boxWidth: number, boxHeight: number) {
  model.updateMatrixWorld(true);
  const size = new THREE.Box3()
    .setFromObject(model)
    .getSize(new THREE.Vector3());
  model.scale.setScalar(
    Math.min(boxWidth / size.x, boxHeight / size.y) * FILL
  );

  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  model.position.sub(box.getCenter(new THREE.Vector3()));

  // По ним модель встаёт на левую ось и прижимается к низу коробки.
  const fitted = box.getSize(new THREE.Vector3());
  return { halfWidth: fitted.x / 2, halfHeight: fitted.y / 2 };
}

/**
 * Модели ленты в одной сцене.
 *
 * Холст стоит неподвижно в окне этажа, а едет камера — ровно на то же
 * смещение, что и подписи в разметке. Поэтому модель и её подпись
 * держатся вместе, и не нужен ни холст во всю длину ленты, ни перенос
 * пикселей в скрипт: места приходят замером готовой раскладки.
 *
 * Единица мира равна высоте окна. Тогда любое место в пикселях — это
 * просто деление на неё, и пересчёт нигде не повторяется.
 *
 * Общий контекст на все пять: отдельный холст на шаг стоил бы пять
 * контекстов и пять циклов отрисовки — один такой мы уже выкидывали за
 * расточительность.
 */
export function StageModels({
  slots,
  offset,
  unit,
  reached,
}: {
  slots: Slot[];
  offset: number;
  unit: number;
  reached: boolean[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ slots, offset, unit, reached });
  // Кадры идут не всегда, поэтому отрисовку будит тот, кто её меняет.
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    stateRef.current = { slots, offset, unit, reached };
    wakeRef.current();
  }, [slots, offset, unit, reached]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    const groups: (THREE.Group | null)[] = STAGES.map(() => null);
    const models: (THREE.Object3D | null)[] = STAGES.map(() => null);
    const shown: number[] = STAGES.map(() => 0);
    /** Коробка, под которую модель уже вписана: лишний fit — лишний обход. */
    const fitted: string[] = STAGES.map(() => "");
    /** Половинные размеры вписанной модели, в единицах мира. */
    const half = STAGES.map(() => ({ halfWidth: 0, halfHeight: 0 }));
    let disposed = false;

    STAGES.forEach((stage, i) => {
      loader.load(
        stage.modelSrc,
        (gltf) => {
          if (disposed) return;
          const group = new THREE.Group();
          gltf.scene.rotation.x = 0.62;
          group.add(gltf.scene);
          group.visible = false;
          groups[i] = group;
          models[i] = gltf.scene;
          scene.add(group);
          wake();
        },
        undefined,
        (err) => console.error(`Не загрузилась модель ${stage.key}`, err)
      );
    });

    let frame = 0;
    let running = false;
    let dirty = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h || (w === width && h === height)) return;
      width = w;
      height = h;
      renderer.setSize(w, h);
      // Высота кадра — одна единица, ширина по соотношению сторон.
      camera.left = -w / h / 2;
      camera.right = w / h / 2;
      camera.updateProjectionMatrix();
    };

    /**
     * Один кадр. Модели никуда не едут сами и не качаются — «замирают»,
     * как и задумано; двигает их только камера, а меняется лишь
     * прозрачность. Поэтому цикл нужен на время прокрутки и проявления,
     * а в покое сцена спит.
     */
    const draw = () => {
      dirty = false;
      resize();

      const state = stateRef.current;
      const unit = state.unit || height || 1;
      // Камера едет вбок ровно на смещение ленты; по вертикали окно
      // стоит на месте, поэтому она смотрит в его середину.
      camera.position.x = (state.offset + width / 2) / unit;
      camera.position.y = -height / 2 / unit;

      let fading = false;

      groups.forEach((group, i) => {
        if (!group) return;
        const slot = state.slots[i];
        if (slot) {
          const boxWidth = slot.width / unit;
          const boxHeight = slot.height / unit;
          const model = models[i];
          const box = `${boxWidth}×${boxHeight}`;
          if (model && fitted[i] !== box) {
            fitted[i] = box;
            half[i] = fit(model, boxWidth, boxHeight);
          }

          // Левым краем на ось подписи: модель стояла по центру своей
          // коробки, подпись была выключена влево, и общей оси у пары не
          // было ни одной — потому она и выглядела составленной случайно.
          group.position.x = slot.left / unit + half[i].halfWidth;
          // Низом к низу коробки, а не по центру: у плоской пиццы высота
          // втрое меньше ширины, и по центру она отрывалась от своей
          // подписи сильнее, чем отстоит от соседнего шага.
          group.position.y =
            -(slot.top + slot.height) / unit + half[i].halfHeight;
        }

        const target = state.reached[i] ? 1 : 0;
        const next = shown[i] + (target - shown[i]) * 0.12;
        shown[i] = Math.abs(target - next) < 0.004 ? target : next;
        if (shown[i] !== target) fading = true;

        group.visible = shown[i] > 0.001 && Boolean(slot);
        group.traverse((o) => {
          const mesh = o as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
          if (!mat) return;
          mat.transparent = true;
          mat.opacity = shown[i];
          mat.depthWrite = shown[i] > 0.9;
        });
      });

      renderer.render(scene, camera);

      if (dirty || fading) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    function wake() {
      if (disposed) return;
      dirty = true;
      if (running) return;
      running = true;
      frame = requestAnimationFrame(draw);
    }

    wakeRef.current = wake;

    const onResize = () => wake();
    window.addEventListener("resize", onResize);
    wake();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
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

  return <div ref={containerRef} aria-hidden className="stage-canvas" />;
}
