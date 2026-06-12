import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { about } from '../../data/portfolio'
import styles from './About.module.css'

export default function About() {
  const { lang } = useLang()
  const textRef = useRef(null)

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  const paragraphs = about[lang].split('\n\n')

  return (
    <section id="about" className="section">
      <SectionSlug slug="//about" />
      <div ref={textRef} className={styles.body}>
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.paragraph}>{p}</p>
        ))}
      </div>
    </section>
  )
}
