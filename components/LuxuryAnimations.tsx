'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function LuxuryAnimations() {
  const pathname = usePathname()

  // Scroll reveal
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )

    // Double rAF ensures the browser has painted the initial hidden state
    // before the observer starts firing, so transitions are actually visible
    let frame1: number
    let frame2: number
    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        elements.forEach(el => observer.observe(el))
      })
    })

    return () => {
      cancelAnimationFrame(frame1)
      cancelAnimationFrame(frame2)
      observer.disconnect()
    }
  }, [pathname])

  return null
}
