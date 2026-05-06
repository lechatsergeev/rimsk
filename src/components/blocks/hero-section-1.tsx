import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";
import { getRouteHref } from "@/app/routes";

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
  { name: "Доставка", href: getRouteHref("/delivery") },
  { name: "Сертификаты", href: getRouteHref("/certificates") },
  { name: "Контакты", href: getRouteHref("/contacts") },
];

export function HeroSection() {
  const canRender3d = typeof window !== "undefined";

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden bg-[var(--paper)]">
        <section>
          <div className="relative overflow-hidden pt-15 md:pt-18">
            <div
              aria-hidden
              className="absolute inset-0 z-0 bg-white"
            />
            <div
              aria-hidden
              className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.04),transparent_38%)]"
            />
            <DottedSurface className="z-[1] opacity-[0.24]" />
            <div
              aria-hidden
              className="absolute inset-0 z-0 [background:linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.86)_100%)]"
            />
            <div className="relative z-[2] mx-auto max-w-7xl px-6">
              <div className="grid items-center gap-6 pb-1 md:min-h-[calc(100svh-9.5rem)] md:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.85fr)] md:gap-8 md:pb-4">
                <AnimatedGroup variants={transitionVariants} className="text-left">
                  <a
                    href="#order"
                    className="group inline-flex w-fit items-center gap-4 rounded-full border border-black/10 bg-[rgba(255,255,255,0.72)] p-1 pl-4 shadow-sm shadow-black/5 backdrop-blur-sm transition-all duration-300"
                  >
                    <span className="text-sm text-[var(--ink)]">
                      Локальное производство в Петербурге
                    </span>
                    <span className="block h-4 w-px bg-[var(--line)]" />
                    <div className="size-6 overflow-hidden rounded-full bg-[var(--ink)] text-[var(--sheet)] duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <h1 className="mt-5 max-w-[11ch] text-balance font-['Martian_Grotesk'] text-[2.85rem] leading-[0.88] tracking-[-0.085em] text-[var(--ink)] md:mt-6 md:text-[4rem] lg:text-[4.6rem]">
                    Римская пицца,
                    <br />
                    которую хочется есть
                  </h1>
                  <p className="mt-4 max-w-[34rem] text-balance font-['Martian_Mono'] text-[13px] leading-6 text-[var(--ink)] md:text-sm md:leading-7">
                    Чистый состав, ручная работа и локальное производство в
                    Санкт-Петербурге.
                  </p>
                </AnimatedGroup>

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
                      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,0,0,0.03),transparent_56%)]" />
                      {canRender3d ? (
                        <React.Suspense fallback={<div className="h-full w-full" />}>
                          <HeroPizzaModel targetSize={3.2} />
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

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const mobileMenuId = React.useId();
  const [activeSection, setActiveSection] = React.useState<string>("#top");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const sections = ["top", "assortment", "order"];
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
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-expanded={menuState}
                aria-controls={mobileMenuId}
                aria-label={menuState ? "Закрыть меню" : "Открыть меню"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
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
                        "block font-['Martian_Mono'] text-[11px] uppercase tracking-[0.12em] text-[var(--ink)] duration-150 hover:text-[var(--ink)]",
                        activeSection === item.href ? "opacity-100" : "opacity-100"
                      )}
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-[var(--line)] bg-[var(--sheet)] p-6 shadow-2xl shadow-zinc-300/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
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
                          "block font-['Martian_Mono'] text-xs uppercase tracking-[0.12em] text-[var(--ink)] duration-150 hover:text-[var(--ink)]",
                          activeSection === item.href ? "opacity-100" : "opacity-100"
                        )}
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild size="sm" className={cn(isScrolled && "lg:hidden")}>
                  <a href="#order">
                    <span>Оставить заявку</span>
                  </a>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled ? "lg:inline-flex" : "hidden")}>
                  <a href="#order">
                    <span>Связаться</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Logo = ({ className }: { className?: string }) => {
  return (
    <span
      className={cn(
        "font-['IBM_Plex_Serif'] text-[19px] font-semibold uppercase tracking-[-0.045em] text-[var(--ink)]",
        className
      )}
    >
      ПИЦЦА ПИЦЦА
    </span>
  );
};
