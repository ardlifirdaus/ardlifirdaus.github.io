import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { skills } from '../../data/portfolio'
import styles from './Stack.module.css'

export default function Stack() {
  const { lang } = useLang()
  const gridRef = useRef(null)

  useGSAP(() => {
    if (!gridRef.current) return
    gsap.from(gridRef.current.children, {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 78%',
      },
    })
  }, [])

  return (
    <section id="stack" className="section">
      <SectionSlug slug="//stack" />
      <div ref={gridRef} className={styles.grid}>
        {skills.categories.map((cat, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardDot}>■</span>
              <span className={styles.cardTitle}>{cat.label[lang].toUpperCase()}</span>
            </div>
            <ul className={styles.items}>
              {cat.items.map((item, j) => (
                <li key={j} className={styles.item}>
                  <span className={styles.itemPrefix}>&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
