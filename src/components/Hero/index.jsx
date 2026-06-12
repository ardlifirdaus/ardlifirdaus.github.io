import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { useLang } from '../../context/LangContext'
import { meta, experience, personalProjects } from '../../data/portfolio'
import styles from './Hero.module.css'

const uniqueCompanies = [...new Set(experience.map(e => e.company))].length

export default function Hero() {
  const { lang } = useLang()
  const nameRef = useRef(null)
  const yearsRef = useRef(null)
  const companiesRef = useRef(null)
  const buildsRef = useRef(null)

  useGSAP(() => {
    if (!nameRef.current) return
    const split = new SplitType(nameRef.current, { types: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.04,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.3,
    })
    return () => split.revert()
  }, [])

  useGSAP(() => {
    const animate = (ref, target) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 2,
        snap: { val: 1 },
        ease: 'power1.inOut',
        delay: 0.8,
        onUpdate: () => {
          if (ref.current) ref.current.textContent = Math.round(obj.val)
        },
      })
    }
    animate(companiesRef, uniqueCompanies)
    animate(buildsRef, personalProjects.length)
  }, [])

  return (
    <section className={styles.hero} id="top">
      <div className={styles.content}>
        <div className={styles.cursor}>
          <span className={styles.cursorBlink}>&gt;_</span>
        </div>
        <h1 ref={nameRef} className={styles.name}>{meta.name.toUpperCase()}</h1>
        <p className={styles.role}>{meta.role[lang].toUpperCase()}</p>
        <p className={styles.tagline}>&ldquo;{meta.tagline[lang]}&rdquo;</p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>10+</span>
            <span className={styles.statLabel}>YEARS EXP</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum} ref={companiesRef}>0</span>
            <span className={styles.statLabel}>COMPANIES</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum} ref={buildsRef}>0</span>
            <span className={styles.statLabel}>BUILDS</span>
          </div>
        </div>
      </div>

      <div className={styles.photoWrap}>
        <img
          src={meta.photo}
          alt={meta.name}
          className={styles.photo}
          width="280"
          height="320"
        />
      </div>

      <a href="#about" className={styles.scrollPrompt} aria-label="Scroll down">
        [ SCROLL DOWN ▼ ]
      </a>
    </section>
  )
}
