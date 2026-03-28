import React from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";
import { HeroPizzaModel } from "@/components/blocks/hero-pizza-model";

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
  { name: "Сценарии", href: "#scenarios" },
  { name: "Ассортимент", href: "#assortment" },
  { name: "Экономика", href: "#economics" },
  { name: "Возражения", href: "#objections" },
];

const heroFacts = ["ОТ 15 ШТ НА ТЕСТ", "8 МИНУТ ДО ПОДАЧИ", "ОТ 270 ₽ ОПТ"];

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden bg-[var(--paper)]">
        <section>
          <div className="relative overflow-hidden pt-18 md:pt-22">
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
              <div className="pb-2 text-center md:pb-6">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#order"
                    className="group mx-auto flex w-fit items-center gap-4 rounded-full border border-black/10 bg-[rgba(255,255,255,0.72)] p-1 pl-4 shadow-sm shadow-black/5 backdrop-blur-sm transition-all duration-300"
                  >
                    <span className="text-sm text-[var(--ink)]">
                      Тестовая поставка для бизнеса
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

                  <h1 className="mx-auto mt-6 max-w-4xl text-balance font-['Martian_Grotesk'] text-5xl leading-[0.92] tracking-[-0.07em] text-[var(--ink)] md:mt-8 md:text-6xl lg:text-[4.25rem]">
                    Римская пицца для бизнеса
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-balance font-['Martian_Mono'] text-sm leading-7 text-black/72 md:text-[15px]">
                    Помогает добавить горячее в меню без новой кухни,
                    сложной заготовки и лишней операционки.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
                    {heroFacts.map((fact) => (
                      <span
                        key={fact}
                        className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5 font-['Martian_Mono'] text-[11px] uppercase tracking-[0.12em] text-[var(--ink)]"
                      >
                        {fact}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col items-center justify-center gap-2 md:flex-row">
                    <div className="rounded-[14px] border border-[var(--line)] p-0.5">
                      <Button asChild size="lg" className="rounded-xl px-5 text-base">
                        <a href="#order">
                          <span className="text-nowrap">Запросить тестовую партию</span>
                        </a>
                      </Button>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      variant="ghost"
                      className="h-10.5 rounded-xl px-5"
                    >
                      <a href="#economics">
                        <span className="text-nowrap">Посмотреть экономику</span>
                      </a>
                    </Button>
                  </div>
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
                  className="relative mt-1 md:mt-2"
                >
                  <div className="relative mx-auto h-[220px] w-full max-w-[720px] md:h-[340px]">
                    <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_52%,rgba(0,0,0,0.03),transparent_56%)]" />
                    <HeroPizzaModel />
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
    const sections = ["top", "scenarios", "assortment", "economics", "objections", "order"];
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
                className="flex items-center space-x-2 font-['Martian_Grotesk'] text-lg font-semibold tracking-[-0.05em] text-[var(--ink)]"
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
                        "block font-['Martian_Mono'] text-[11px] uppercase tracking-[0.12em] duration-150 hover:text-[var(--ink)]",
                        activeSection === item.href ? "text-[var(--ink)]" : "text-black/65"
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
                          "block font-['Martian_Mono'] text-xs uppercase tracking-[0.12em] duration-150 hover:text-[var(--ink)]",
                          activeSection === item.href ? "text-[var(--ink)]" : "text-black/72"
                        )}
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm" className={cn(isScrolled && "lg:hidden")}>
                  <a href="#economics">
                    <span>Экономика</span>
                  </a>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled && "lg:hidden")}>
                  <a href="#order">
                    <span>Оставить заявку</span>
                  </a>
                </Button>
                <Button asChild size="sm" className={cn(isScrolled ? "lg:inline-flex" : "hidden")}>
                  <a href="#order">
                    <span>Тестовая поставка</span>
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
    <span className={cn("font-['Martian_Grotesk'] text-[18px] font-semibold tracking-[-0.06em]", className)}>
      РИМСК
    </span>
  );
};
