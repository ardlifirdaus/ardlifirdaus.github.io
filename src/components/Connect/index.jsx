import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionSlug from '../SectionSlug'
import { useLang } from '../../context/LangContext'
import { meta } from '../../data/portfolio'
import { PIXEL_ICONS } from '../PixelIcons/PixelIcons'
import styles from './Connect.module.css'

const closing = {
  en: "Let's build something that works.",
  id: 'Yuk bikin sesuatu yang jalan beneran.',
}

const links = [
  { label: 'LINKEDIN',    key: 'linkedin', iconKey: 'linkedin', display: 'linkedin.com/in/ardli-firdlaus' },
  { label: 'GITHUB',      key: 'github',   iconKey: 'github',   display: 'github.com/ardlifirdaus' },
  { label: 'TELEGRAM',    key: 'telegram', iconKey: 'telegram', display: 't.me/arka51' },
  { label: 'EMAIL',       key: 'email',    iconKey: 'email',    display: 'ardli.firdaus@gmail.com' },
  { label: 'CV / RESUME', key: 'cv',       iconKey: 'pdf',      display: 'Google Drive' },
]

export default function Connect() {
  const { lang } = useLang()
  const linksRef = useRef(null)

  useGSAP(() => {
    if (!linksRef.current) return
    gsap.from(linksRef.current.children, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: linksRef.current, start: 'top 80%' },
    })
  }, [])

  const getHref = (key) => {
    if (key === 'email') return `mailto:${meta.email}`
    return meta.links[key]
  }

  return (
    <section id="connect" className="section">
      <SectionSlug slug="//connect" />
      <p className={styles.closing}>&ldquo;{closing[lang]}&rdquo;</p>

      <div ref={linksRef} className={styles.links}>
        {links.map((l) => {
          const Icon = PIXEL_ICONS[l.iconKey]
          return (
            <a
              key={l.key}
              href={getHref(l.key)}
              target={l.key !== 'email' ? '_blank' : undefined}
              rel={l.key !== 'email' ? 'noopener noreferrer' : undefined}
              className={styles.linkItem}
            >
              <Icon size={24} className={styles.icon} />
              <span className={styles.linkLabel}>[ {l.label} ↗ ]</span>
              <span className={styles.linkDisplay}>{l.display}</span>
            </a>
          )
        })}
      </div>

      <footer className={styles.footer}>
        <span>© 2026 ARDLI FIRDLAUS</span>
        <span className={styles.sep}>·</span>
        <span>v1.0.0</span>
      </footer>
    </section>
  )
}
