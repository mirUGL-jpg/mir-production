"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const livePhotos = [
  "/media/live2.png",
  "/media/live1.png",
  "/media/live3.png",
  "/media/live4.png",
  "/media/live5.png",
  "/media/live6.png",
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? livePhotos.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === livePhotos.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    // Mouse Blob Follower
    const blob = document.getElementById("cursor-blob")
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (blob) {
        blob.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      }
    }
    document.addEventListener("mousemove", handleMouseMove)

    // Parallax Effect
    const handleScroll = () => {
      const scroll = window.pageYOffset

      // Hero parallax
      const parallaxTexts = document.querySelectorAll(".parallax-text")
      parallaxTexts.forEach((text) => {
        const speed = text.getAttribute("data-speed")
        if (speed) {
          ;(text as HTMLElement).style.transform = `translateX(${scroll * Number.parseFloat(speed) * 0.1}px)`
        }
      })

      const heroImg = document.getElementById("hero-img")
      if (heroImg) {
        heroImg.style.transform = `translate(-50%, calc(-50% + ${scroll * 0.2}px)) scale(${1 + scroll * 0.0005})`
      }

      // Floating labels in project section
      const labels = document.querySelectorAll(".floating-label")
      labels.forEach((label, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        ;(label as HTMLElement).style.transform = `translateY(${scroll * 0.1 * direction}px)`
      })
    }
    window.addEventListener("scroll", handleScroll)

    // Simple reveal on enter (Intersection Observer)
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".reveal-text").forEach((text) => {
      observer.observe(text)
    })

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const href = anchor.getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="blob" id="cursor-blob"></div>

      <nav>
        <div className="logo">MIR.PRODUCTION</div>
        <ul className="nav-links">
          <li>
            <Link href="/works">WORK</Link>
          </li>
          <li>
            <a href="#about">Studio</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <img
            src="/media/hero2.jpg"
            alt="Моё фото"
            className="hero-img"
            id="hero-img"
          />
          <div className="hero-title-container container">
            <span className="huge-type parallax-text" data-speed="-2">
              MIR
            </span>
            <span className="huge-type outline-text parallax-text" data-speed="2" style={{ paddingLeft: "200px" }}>
              PRODUCTION
            </span>
          </div>
        </section>

        {/* INTRO */}
        <section id="about">
          <div className="container">
            <div style={{ maxWidth: "800px" }}>
              <h2
                style={{
                  fontSize: "3rem",
                  fontFamily: "var(--syne)",
                  marginBottom: "40px",
                }}
              >
                DUBAI-BASED VIDEOGRAPHER CRAFTING VISUAL STORIES THAT ELEVATE BRANDS.
              </h2>

              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  color: "#888",
                }}
              >
                My name is Miroslav Uglanov. With over five years of professional experience in video production, I collaborate with influencers and established companies across the UAE. From cinematic reels and podcast production to live streaming and branded campaigns, I create powerful visual content designed to capture attention and drive real engagement.
              </p>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="scrolling-marquee">
          <div className="marquee-inner">
            <span className="huge-type outline-text">MIR.PRODUCTION — REELS • PODCASTS • LIVE • COMMERCIAL • CINEMATIC STORYTELLING — </span>
            <span className="huge-type outline-text">MIR.PRODUCTION — REELS • PODCASTS • LIVE • COMMERCIAL • CINEMATIC STORYTELLING — </span>
          </div>
        </div>

        {/* WORK SECTION */}
        <section id="work" className="container">
          <div className="sticky-type">EXPERTISE</div>

          {/* Project 1: LIVE STREAMING */}
          <div className="project-row" style={{ alignItems: "center" }}>
            <div className="project-info" style={{ paddingTop: 0 }}>
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)", letterSpacing: "0.05em" }}>
                001 / LIVE STREAMING
              </span>
                            <h3 className="huge-type" style={{ fontSize: "5.5rem", margin: "20px 0", color: "#5A241E" }}>
                LIVE
              </h3>
              <p style={{ color: "#ccc", lineHeight: 1.6, fontSize: "1.05rem" }}>
                Turnkey multi-camera live streaming, produced on location or inside our studio. We handle the entire broadcast pipeline — cinema cameras, studio lighting, pro audio, live switching, and real-time on-air graphics.
              </p>
              <div className="divider"></div>
              <a
                href="#contact"
                style={{
                  display: "inline-block",
                  padding: "16px 36px",
                  border: "1px solid var(--fg)",
                  fontFamily: "var(--syne)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent)"
                  e.currentTarget.style.borderColor = "var(--accent)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.borderColor = "var(--fg)"
                }}
              >
                LEARN MORE
              </a>
            </div>

            <div className="project-media">
              <div style={{ position: "relative", overflow: "hidden", border: "1px solid var(--gray)" }}>
                <img
                  src={livePhotos[currentSlide]}
                  alt={`Live streaming setup ${currentSlide + 1}`}
                  className="project-image"
                  style={{ height: "520px", display: "block" }}
                />

                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    background: "rgba(14, 14, 14, 0.65)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease",
                  }}
                >
                  ←
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  style={{
                    position: "absolute",
                    right: "20px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    background: "rgba(14, 14, 14, 0.65)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    backdropFilter: "blur(4px)",
                    transition: "all 0.2s ease",
                  }}
                >
                  →
                </button>

                {/* Slide Counter */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "20px",
                    fontFamily: "var(--syne)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    background: "rgba(14, 14, 14, 0.75)",
                    padding: "6px 12px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  0{currentSlide + 1} / 0{livePhotos.length}
                </div>
              </div>

              <div className="floating-label huge-type outline-text" style={{ fontSize: "8rem" }}>
                BROADCAST
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-row" style={{ flexDirection: "row-reverse" }}>
            <div className="project-info">
              <span style={{ fontFamily: "var(--syne)", color: "var(--accent)" }}>002 / ARCHITECTURE</span>
              <h3 className="huge-type" style={{ fontSize: "6rem", margin: "20px 0" }}>
                BRUTE
              </h3>
              <p>
                Conceptual web experience for a structural engineering firm focused on monolithic concrete structures.
              </p>
              <div className="divider"></div>
              <p>YEAR: 2023</p>
            </div>
            <div className="project-media">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                alt="Brute Project"
                className="project-image"
              />
              <div
                className="floating-label huge-type outline-text"
                style={{ fontSize: "8rem", right: "auto", left: "-100px" }}
              >
                CONCRETE
              </div>
            </div>
          </div>
        </section>

        {/* OVERLAPPING COMPOSITION SECTION */}
        <section>
          <div className="container composition">
            <div className="comp-item-1">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=600"
                className="comp-image"
                alt="Layer 1"
              />
            </div>
            <div className="comp-item-2">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
                className="comp-image"
                alt="Layer 2"
              />
            </div>
            <div className="comp-item-3">
              <div
                style={{
                  background: "var(--accent)",
                  padding: "40px",
                  color: "white",
                }}
              >
                <h4 style={{ fontFamily: "var(--syne)", fontSize: "2rem" }}>LAYERED DEPTH</h4>
                <p style={{ marginTop: "20px" }}>
                  We believe in depth—both in meaning and in visual manifestation. Overlapping elements create a
                  zine-like chaos that is meticulously organized.
                </p>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "400px",
                zIndex: 10,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500"
                className="comp-image"
                alt="Layer 3"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact">
          <div className="container">
            <div className="footer-cta">
              <a href="mailto:hello@viscera.studio">LET&apos;S — WORK</a>
            </div>
            <div className="divider"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--syne)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "#555",
              }}
            >
              <div>© 2026 VISCERA STUDIO</div>
              <div style={{ display: "flex", gap: "30px" }}>
                <span>INSTAGRAM1</span>
                <span>TWITTER/X</span>
                <span>BEHANCE</span>
              </div>
              <div>LOCATED IN BERLIN // TOKYO</div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
