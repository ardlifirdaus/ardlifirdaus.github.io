import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { education, awards } from '../../data/portfolio'
import styles from './Creds.module.css'

export default function Creds() {
  const { lang } = useLang()
  const eduRef = useRef(null)
  const awardsRef = useRef(null)

  useGSAP(() => {
    const refs = [eduRef, awardsRef]
    refs.forEach(r => {
      if (!r.current) return
      gsap.from(r.current.children, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: r.current, start: 'top 80%' },
      })
    })
  }, [])

  return (
    <section id="creds" className="section">
      <SectionSlug slug="//creds" />
      <div className={styles.grid}>
        <div>
          <h2 className={styles.colTitle}>EDUCATION</h2>
          <div ref={eduRef} className={styles.eduList}>
            {education.map((ed, i) => (
              <div key={i} className={styles.eduEntry}>
                <a
                  href={ed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.degree}
                >
                  {ed.degree[lang].toUpperCase()} <span className={styles.arrow}>↗</span>
                </a>
                <span className={styles.institution}>{ed.institution}</span>
                <span className={styles.field}>{ed.field[lang]}</span>
                <span className={styles.period}>{ed.period}</span>
                <span className={styles.gpa}>GPA: {ed.gpa}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.colTitle}>AWARDS & CERTS</h2>
          <div ref={awardsRef} className={styles.awardList}>
            {awards.map((aw, i) => (
              <div key={i} className={styles.awardEntry}>
                <div className={styles.awardRow}>
                  <span className={styles.awardPrefix}>&gt;</span>
                  <a
                    href={aw.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.awardTitle}
                  >
                    {aw.title[lang]} <span className={styles.arrow}>↗</span>
                  </a>
                </div>
                <span className={styles.awardPeriod}>{aw.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
