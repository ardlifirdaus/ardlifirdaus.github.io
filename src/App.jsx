import { useState, useCallback } from 'react'
import { LangProvider } from './context/LangContext'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Stack from './components/Stack'
import Builds from './components/Builds'
import Creds from './components/Creds'
import Connect from './components/Connect'

function MainLayout() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Stack />
        <Builds />
        <Creds />
        <Connect />
      </main>
    </>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => setLoaded(true), [])
  return (
    <LangProvider>
      {loaded ? <MainLayout /> : <Loader onComplete={handleLoaded} />}
    </LangProvider>
  )
}
