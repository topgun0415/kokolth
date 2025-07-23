import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Typography } from "../atoms/Typography";

interface NavigationProps {
  className?: string;
  setNavBackground?: (isOpen: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  className = "",
  setNavBackground,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navItems = useMemo(
    () => [
      { label: "コンセプト", href: "#concept" },
      { label: "ニュース", href: "#news" },
      { label: "メールカウンセリングとは", href: "#service" },
      { label: "カウンセラーよりご挨拶", href: "#about" },
      { label: "カウンセリングの進め方", href: "#process" },
      { label: "こんなお悩みの方へ", href: "#menu" },
      { label: "料金について", href: "#price" },
      { label: "お支払い方法", href: "#payment" },
    ],
    []
  );

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (setNavBackground) setNavBackground(newState);
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (setNavBackground) setNavBackground(false);
      }

      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(targetId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector("header")?.offsetHeight || 80;
      const windowHeight = window.innerHeight;

      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.href.replace("#", ""));
          return {
            id: item.href.replace("#", ""),
            offsetTop: element?.offsetTop || 0,
            offsetHeight: element?.offsetHeight || 0,
          };
        })
        .filter((section) => section.offsetTop > 0);

      sections.sort((a, b) => a.offsetTop - b.offsetTop);

      let currentActive = "";

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionCenter = sectionTop + section.offsetHeight / 2;
        const viewportCenter = scrollPosition + windowHeight / 2;

        if (
          (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) ||
          (Math.abs(sectionCenter - viewportCenter) < section.offsetHeight / 2)
        ) {
          currentActive = section.id;
        }
      }

      if (scrollPosition < 100 && sections.length > 0) {
        currentActive = sections[0].id;
      }

      if (scrollPosition + windowHeight >= document.body.scrollHeight - 100 && sections.length > 0) {
        currentActive = sections[sections.length - 1].id;
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    let timeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", debouncedScroll);
    window.addEventListener("resize", debouncedScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      window.removeEventListener("resize", debouncedScroll);
      clearTimeout(timeout);
    };
  }, [activeSection, navItems]);

  return (
    <>
      <nav className={`${className}`}>
        {/* Mobile Only Navigation */}
        <div>
          <button
            className="text-black hover:text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 text-left transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div
            className={`fixed top-15 left-0 w-screen h-screen p-4 z-20 transition-all duration-300 ${
              isMobileMenuOpen
                ? "bg-white"
                : "bg-transparent shadow-none pointer-events-none -translate-x-full"
            }`}
          >
            {isMobileMenuOpen && (
              <div className="flex flex-col h-full">
                {/* Navigation Items */}
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      href={item.href}
                      key={item.href}
                      className="cursor-pointer"
                      onClick={(e) => scrollToSection(e, item.href)}
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          activeSection === item.href.replace("#", "")
                            ? "text-lime-800"
                            : "text-gray-800"
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
                
                {/* Footer section - positioned at bottom */}
                <div className="flex flex-col space-y-2 mt-auto mb-16">
                  <div className="flex space-x-1 text-[10px]">
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:underline font-yugothic-regular"
                    >
                      利用規約
                    </Link>
                    <span className="text-gray-600 font-yugothic-regular">
                      |
                    </span>
                    <Link
                      href="/faq"
                      className="text-gray-600 hover:underline font-yugothic-regular"
                    >
                      よくある質問
                    </Link>
                    <span className="text-gray-600 font-yugothic-regular">
                      |
                    </span>
                    <Link
                      href="/legal"
                      className="text-gray-600 hover:underline font-yugothic-regular"
                    >
                      特定商取引法に基づく表記
                    </Link>
                  </div>
                  
                  <Typography
                    variant="caption"
                    weight="light"
                    color="primary"
                    font="yugothic-regular"
                    className="text-[12px]"
                  >
                    ⓒ Kokolth. All Rights Reserved.
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
