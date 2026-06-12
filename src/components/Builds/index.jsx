import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { personalProjects, professionalProjects } from '../../data/portfolio'
import styles from './Builds.module.css'

export default function Builds() {
  const { lang } = useLang()
  const cardsRef = useRef(null)
  const proListRef = useRef(null)

  useGSAP(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 78%' },
      })
    }
    if (proListRef.current) {
      gsap.from(proListRef.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: proListRef.current, start: 'top 78%' },
      })
    }
  }, [])

  return (
    <section id="builds" className="section">
      <SectionSlug slug="//builds" />

      <div ref={cardsRef} className={styles.cards}>
        {personalProjects.map((proj) => (
          <div key={proj.id} className={styles.card}>
            <span className={styles.index}>[{proj.id}]</span>
            <h3
              className={styles.projTitle}
              data-text={proj.title}
            >
              {proj.title}
            </h3>
            <div className={styles.tags}>
              {proj.tech.map((t) => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            <p className={styles.desc}>{proj.description[lang]}</p>
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              [ VISIT SITE ↗ ]
            </a>
          </div>
        ))}
      </div>

      <div className={styles.proSection}>
        <h2 className={styles.proHeading}>PROFESSIONAL WORK</h2>
        <div ref={proListRef} className={styles.proList}>
          {professionalProjects.map((proj, i) => (
            <div key={i} className={styles.proEntry}>
              <div className={styles.proLeft}>
                <span className={styles.proPrefix}>&gt;</span>
                <div className={styles.proInfo}>
                  {proj.url ? (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.proTitle}
                    >
                      {proj.title[lang]} <span className={styles.arrow}>↗</span>
                    </a>
                  ) : (
                    <span className={styles.proTitle}>{proj.title[lang]}</span>
                  )}
                  <span className={styles.proDesc}>{proj.description[lang]}</span>
                </div>
              </div>
              <span className={styles.proPeriod}>{proj.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
