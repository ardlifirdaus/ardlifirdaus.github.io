import { useState, useEffect } from 'react'
import { useLang } from '../../context/LangContext'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { id: 'about',    label: '//about'    },
  { id: 'timeline', label: '//timeline' },
  { id: 'stack',    label: '//stack'    },
  { id: 'builds',   label: '//builds'   },
  { id: 'creds',    label: '//creds'    },
  { id: 'connect',  label: '//connect'  },
]

export default function Nav() {
  const { lang, toggle } = useLang()
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = NAV_LINKS.map(l => document.getElementById(l.id)).filter(Boolean)
      let current = ''
      for (const sec of sections) {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#top" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ARDLI.DEV
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li className={styles.closeBtn}>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            [ X ]
          </button>
        </li>
        {NAV_LINKS.map(l => (
          <li key={l.id}>
            <button
              className={`${styles.link} ${active === l.id ? styles.active : ''}`}
              onClick={() => handleLink(l.id)}
            >
              {l.label}{active === l.id ? <span className={styles.cursor}>_</span> : null}
            </button>
          </li>
        ))}
        <li className={styles.mobileLang}>
          <button onClick={toggle} className={styles.langToggle} aria-label="Toggle language">
            <span className={lang === 'en' ? styles.activeLang : ''}>EN</span>
            <span className={styles.divider}>/</span>
            <span className={lang === 'id' ? styles.activeLang : ''}>ID</span>
          </button>
        </li>
      </ul>

      <div className={styles.right}>
        <button onClick={toggle} className={styles.langToggle} aria-label="Toggle language">
          <span className={lang === 'en' ? styles.activeLang : ''}>EN</span>
          <span className={styles.divider}>/</span>
          <span className={lang === 'id' ? styles.activeLang : ''}>ID</span>
        </button>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
