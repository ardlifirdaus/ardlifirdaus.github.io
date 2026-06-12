import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { experience } from '../../data/portfolio'
import styles from './Timeline.module.css'

export default function Timeline() {
  const { lang } = useLang()
  const listRef = useRef(null)

  useGSAP(() => {
    if (!listRef.current) return
    gsap.from(listRef.current.children, {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 78%',
      },
    })
  }, [])

  return (
    <section id="timeline" className="section">
      <SectionSlug slug="//timeline" />
      <div ref={listRef} className={styles.list}>
        {experience.map((exp, i) => (
          <div key={i} className={styles.entry}>
            <div className={styles.dot} />
            <div className={styles.entryContent}>
              <div className={styles.header}>
                <span className={styles.role}>{exp.role[lang]}</span>
                {exp.current && (
                  <span className={styles.currentBadge}>CURRENT</span>
                )}
              </div>
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.company}
              >
                {exp.company} <span className={styles.arrow}>↗</span>
              </a>
              <span className={styles.period}>{exp.period}</span>
              <ul className={styles.bullets}>
                {exp.bullets[lang].map((b, j) => (
                  <li key={j} className={styles.bullet}>
                    <span className={styles.prefix}>&gt;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
