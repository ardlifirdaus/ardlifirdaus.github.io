import styles from './SectionSlug.module.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function SectionSlug({ slug }) {
  const ref = useScrollReveal(0.3)
  return (
    <div ref={ref} className={styles.wrapper}>
      {slug.split('').map((c, i) => (
        <span
          key={i}
          className={styles.char}
          style={{ '--i': i, '--total': slug.length }}
        >
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </div>
  )
}
