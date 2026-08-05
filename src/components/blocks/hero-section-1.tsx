import React from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { getRouteHref } from "@/app/routes";
import {
  BAKE_INSTRUCTION,
  BRAND_NAME,
  NET_WEIGHT,
  PRODUCTION_CITY,
  SHELF_LIFE,
} from "@/content/brand";

const HeroPizzaModel = React.lazy(() =>
  import("@/components/blocks/hero-pizza-model").then((module) => ({
    default: module.HeroPizzaModel,
  }))
);

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const menuItems = [
  { name: "Ассортимент", href: "#assortment" },
  { name: "Состав", href: "#specs" },
  { name: "Доставка", href: getRouteHref("/delivery") },
  { name: "Сертификаты", href: getRouteHref("/certificates") },
  { name: "Контакты", href: getRouteHref("/contacts") },
];

export function HeroSection() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const mounted = useMounted();
  const heroSectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -64px 0px",
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HeroHeader isScrolled={isScrolled} />
      <main className="overflow-hidden bg-[var(--paper)]">
        <section ref={heroSectionRef}>
          <div className="relative overflow-hidden pt-15 md:pt-18">
            <div
              aria-hidden
              className="absolute inset-0 z-0 bg-[var(--ultra)]"
            />
            {/* Холодное свечение за продуктом: отделяет тёплую корку от поля. */}
            <div
              aria-hidden
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_72%_48%,rgba(201,233,255,0.28),transparent_46%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 z-0 [background:linear-gradient(180deg,transparent_0%,rgba(13,18,121,0.6)_100%)]"
            />
            <div className="relative z-[2] mx-auto max-w-7xl px-6">
              <div className="grid items-center gap-6 pb-1 md:min-h-[calc(100svh-9.5rem)] md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.85fr)] md:gap-8 md:pb-4">
                {/* Без entrance-анимации: первый экран должен быть читаемым
                    сразу в отрендеренном HTML, до загрузки и гидрации JS. */}
                <div className="text-left">
                  <div className="mt-3 inline-flex w-fit items-center rounded-full border border-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.1)] px-4 py-1.5">
                    <span className="type-heading text-[0.82rem] uppercase tracking-[0.12em] text-white md:text-[0.9rem]">
                      Замороженная римская пицца
                    </span>
                  </div>
                  <h1 className="mt-3 min-h-[3.9rem] text-balance text-[4.6rem] leading-[0.8] tracking-[-0.042em] text-white md:mt-4 md:min-h-[5.9rem] md:text-[6.8rem] lg:min-h-[7.1rem] lg:text-[8.2rem]">
                    <span className="type-logo inline-block">{BRAND_NAME}</span>
                  </h1>
                  <p className="mt-2.5 max-w-[34rem] text-balance text-[13px] leading-[1.34] text-[rgba(255,255,255,0.86)] md:text-sm md:leading-[1.4]">
                    Римская пицца ручной работы: тесто длительного холодного
                    брожения, ручная формовка, заморозка сразу после выпечки.
                    Производство — {PRODUCTION_CITY}.
                  </p>
                  {/* Берри по ультрамарину вибрирует в мелком кегле —
                      строка фактов идёт ледяным, акцент живёт в плашках. */}
                  <ul className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--frost)] md:text-[12px]">
                    <li>{NET_WEIGHT}</li>
                    <li aria-hidden className="opacity-40">
                      /
                    </li>
                    <li>{SHELF_LIFE}</li>
                    <li aria-hidden className="opacity-40">
                      /
                    </li>
                    <li>допекается {BAKE_INSTRUCTION}</li>
                  </ul>
                  <div className="mt-4 flex justify-start">
                    <Button
                      asChild
                      size="sm"
                      className="bg-[var(--signal)] text-[var(--ink)] hover:bg-[var(--signal)]/85"
                    >
                      <a href="#order">
                        <span>Написать нам</span>
                      </a>
                    </Button>
                  </div>
                </div>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="relative"
                >
                  <div className="flex flex-col items-start gap-4 md:items-end md:gap-5">
                    <div className="relative h-[185px] w-full max-w-[420px] self-center md:h-[320px] md:max-w-[540px] md:self-auto lg:h-[360px] lg:max-w-[600px]">
                      {/* Контактная тень в два слоя: широкий мягкий ореол
                          сажает объект в сцену, плотное ядро под центром даёт
                          точку касания. Без них продукт читается как экспонат
                          в невесомости, а не как предмет. */}
                      <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[16%] w-[74%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(4,7,52,0.42),transparent_72%)] blur-[16px]" />
                      <div className="pointer-events-none absolute bottom-[11%] left-1/2 h-[7%] w-[42%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(3,5,40,0.62),transparent_66%)] blur-[6px]" />
                      {/* Модель подключается только после гидрации: иначе
                          структура расходится с пререндером и React
                          перерисовывает страницу заново.
                          Прогрессивная загрузка: лёгкая модель показывается
                          сразу, детальная подменяет её фоном, когда дойдёт. */}
                      {mounted ? (
                        <React.Suspense fallback={<div className="h-full w-full" />}>
                          <HeroPizzaModel targetSize={3.1} />
                        </React.Suspense>
                      ) : (
                        <div className="h-full w-full" />
                      )}
                    </div>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const HeroHeader = ({ isScrolled }: { isScrolled: boolean }) => {
  const [menuState, setMenuState] = React.useState(false);
  const mobileMenuId = React.useId();
  const [activeSection, setActiveSection] = React.useState<string>("#top");

  React.useEffect(() => {
    const sections = ["top", "assortment", "specs", "order"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <nav data-state={menuState && "active"} className="group fixed z-20 w-full px-2">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "max-w-4xl rounded-2xl border border-[var(--line)] bg-[rgba(251,250,246,0.68)] backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <a
                href="#top"
                aria-label="home"
                className="flex items-center space-x-2 text-lg text-[var(--ink)]"
              >
                <Logo isVisible={isScrolled} />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-expanded={menuState}
                aria-controls={mobileMenuId}
                aria-label={menuState ? "Закрыть меню" : "Открыть меню"}
                className={cn(
                  "relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden",
                  isScrolled ? "text-[var(--ink)]" : "text-white"
                )}
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={cn(
                        "block text-[11px] uppercase tracking-[0.12em] duration-150",
                        isScrolled ? "text-[var(--ink)]" : "text-white"
                      )}
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-[var(--line)] bg-[var(--sheet)] p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-4 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div
                id={mobileMenuId}
                role="dialog"
                aria-modal="true"
                aria-label="Мобильная навигация"
                className="lg:hidden"
              >
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className={cn(
                          "block text-xs uppercase tracking-[0.12em] text-[var(--ink)] duration-150 hover:text-[var(--ink)]",
                          activeSection === item.href ? "opacity-100" : "opacity-100"
                        )}
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <AnimatePresence initial={false}>
                {isScrolled ? (
                  <motion.div
                    key="header-cta"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="hidden lg:block"
                  >
                    <Button asChild size="sm">
                      <a href="#order">
                        <span>Написать нам</span>
                      </a>
                    </Button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Logo = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className="flex min-h-[1.5rem] items-center">
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.span
            key="header-brand"
            className="type-logo inline-block text-[23px] leading-none tracking-[0.01em] text-[var(--ink)]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {BRAND_NAME}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
