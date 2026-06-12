import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Loader.module.css'

const TEXT = 'CONNECTING...'

export default function Loader({ onComplete }) {
  const barRef = useRef(null)
  const percentRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const onDone = onComplete
    const tl = gsap.timeline({
      onComplete: () => {
        if (!wrapperRef.current) return
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: onDone,
        })
      },
    })

    const obj = { val: 0 }
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val)
        if (barRef.current) barRef.current.style.width = v + '%'
        if (percentRef.current) percentRef.current.textContent = v + '%'
      },
    })

    return () => { tl.kill(); gsap.killTweensOf(wrapperRef.current) }
  }, [])

  return (
    <div ref={wrapperRef} className={styles.loader}>
      <div className={styles.inner}>
        <div className={styles.title}>
          {TEXT.split('').map((c, i) => (
            <span
              key={i}
              className={styles.char}
              style={{ '--i': i }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className={styles.barWrap}>
          <div className={styles.bar} ref={barRef} />
        </div>
        <div className={styles.percent} ref={percentRef}>0%</div>
      </div>
    </div>
  )
}
