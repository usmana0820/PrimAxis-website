import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BRAND_CYAN = '#06b6d4'
const BRAND_NAVY = '#355c7d'
const BRAND_INDIGO = '#6366f1'
const DEEP_BG = '#070f18'

const PRESETS = {
  hero: {
    className: 'live-bg live-bg-hero',
    particles: [
      { count: 1200, size: 0.035, spread: [26, 16, 14], speed: 0.018 },
      { count: 400, size: 0.06, spread: [18, 12, 10], speed: 0.012 },
    ],
    showOrbs: true,
    showWire: true,
    showGrid: true,
    camera: { position: [0, 0.3, 7.5], fov: 50 },
  },
  footer: {
    className: 'live-bg live-bg-footer',
    particles: [
      { count: 600, size: 0.03, spread: [22, 10, 12], speed: 0.012 },
      { count: 200, size: 0.05, spread: [16, 8, 8], speed: 0.008 },
    ],
    showOrbs: true,
    showWire: true,
    showGrid: false,
    camera: { position: [0, 0, 8], fov: 52 },
  },
  band: {
    className: 'live-bg live-bg-band',
    particles: [
      { count: 450, size: 0.028, spread: [20, 8, 10], speed: 0.01 },
    ],
    showOrbs: true,
    showWire: false,
    showGrid: false,
    camera: { position: [0, 0, 7], fov: 54 },
  },
}

function ParticleLayer({ count, size, colors, spread, speed = 0.02 }) {
  const pointsRef = useRef(null)

  const [positions, particleColors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = colors.map((hex) => new THREE.Color(hex))

    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * spread[0]
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1]
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread[2]

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count, colors, spread])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * speed
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.04
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[particleColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GlowOrbs({ subtle = false }) {
  const orbs = useRef([])

  const configs = useMemo(
    () => [
      { pos: [2.8, 0.8, -2], scale: subtle ? 0.4 : 0.55, color: BRAND_CYAN, speed: 0.35 },
      { pos: [-2.5, -0.4, -1.5], scale: subtle ? 0.3 : 0.4, color: BRAND_INDIGO, speed: 0.28 },
      { pos: [0.5, 1.2, -3], scale: subtle ? 0.22 : 0.28, color: BRAND_NAVY, speed: 0.42 },
    ],
    [subtle]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    orbs.current.forEach((mesh, i) => {
      if (!mesh) return
      const cfg = configs[i]
      mesh.position.y = cfg.pos[1] + Math.sin(t * cfg.speed + i) * 0.15
      mesh.rotation.y = t * 0.15
    })
  })

  return (
    <>
      {configs.map((cfg, i) => (
        <mesh
          key={`${cfg.color}-${i}`}
          ref={(el) => { orbs.current[i] = el }}
          position={cfg.pos}
        >
          <sphereGeometry args={[cfg.scale, 24, 24]} />
          <meshBasicMaterial color={cfg.color} transparent opacity={subtle ? 0.05 : 0.07} depthWrite={false} />
        </mesh>
      ))}
    </>
  )
}

function WireShapes({ minimal = false }) {
  const knotRef = useRef(null)
  const ringRef = useRef(null)
  const ring2Ref = useRef(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.14
      knotRef.current.rotation.y = t * 0.18
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.1
      ringRef.current.rotation.z = t * 0.14
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.12
      ring2Ref.current.rotation.x = Math.sin(t * 0.08) * 0.2
    }
  })

  if (minimal) {
    return (
      <mesh ref={ringRef} position={[-1.5, 0, -2]}>
        <torusGeometry args={[0.9, 0.015, 12, 64]} />
        <meshBasicMaterial color={BRAND_INDIGO} transparent opacity={0.22} />
      </mesh>
    )
  }

  return (
    <>
      <mesh ref={knotRef} position={[2.2, 0.2, -1.8]}>
        <torusKnotGeometry args={[0.65, 0.16, 100, 14]} />
        <meshBasicMaterial color={BRAND_CYAN} wireframe transparent opacity={0.14} />
      </mesh>
      <mesh ref={ringRef} position={[-2.4, -0.5, -2.2]}>
        <torusGeometry args={[1.05, 0.018, 12, 80]} />
        <meshBasicMaterial color={BRAND_INDIGO} transparent opacity={0.28} />
      </mesh>
      <mesh ref={ring2Ref} position={[0.2, -1.1, -2.5]} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.6, 0.012, 8, 100]} />
        <meshBasicMaterial color={BRAND_NAVY} transparent opacity={0.2} />
      </mesh>
    </>
  )
}

function HorizonGrid() {
  const gridRef = useRef(null)

  useFrame((state) => {
    if (!gridRef.current) return
    gridRef.current.position.z = -4 + Math.sin(state.clock.elapsedTime * 0.15) * 0.1
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[24, 40, BRAND_CYAN, BRAND_NAVY]}
      position={[0, -2.8, -4]}
    />
  )
}

function Scene({ preset, webgl }) {
  if (!webgl) return null

  const colors = [BRAND_CYAN, BRAND_INDIGO, '#67e8f9', BRAND_NAVY]

  return (
    <>
      <fog attach="fog" args={[DEEP_BG, 6, 20]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 2]} intensity={0.6} color={BRAND_CYAN} />
      <pointLight position={[-4, -2, 1]} intensity={0.35} color={BRAND_INDIGO} />
      {preset.particles.map((layer, i) => (
        <ParticleLayer
          key={`layer-${i}`}
          count={layer.count}
          size={layer.size}
          colors={colors}
          spread={layer.spread}
          speed={layer.speed}
        />
      ))}
      {preset.showOrbs && <GlowOrbs subtle={preset.className.includes('band') || preset.className.includes('footer')} />}
      {preset.showWire && <WireShapes minimal={!preset.showGrid} />}
      {preset.showGrid && <HorizonGrid />}
    </>
  )
}

function LiveBgCss() {
  return (
    <div className="live-bg-css" aria-hidden="true">
      <span className="live-bg-blob live-bg-blob-1" />
      <span className="live-bg-blob live-bg-blob-2" />
      <span className="live-bg-blob live-bg-blob-3" />
      <span className="live-bg-blob live-bg-blob-4" />
    </div>
  )
}

export default function LiveBackground({ variant = 'hero', webgl = true, className = '' }) {
  const preset = PRESETS[variant] || PRESETS.hero
  const [motionOk, setMotionOk] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionOk(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const showWebgl = webgl && motionOk

  return (
    <div className={`${preset.className} ${className}`.trim()} aria-hidden="true">
      <LiveBgCss />
      <div className="live-bg-gradient" aria-hidden="true" />
      {showWebgl && (
        <Canvas
          className="live-bg-canvas"
          camera={preset.camera}
          dpr={[1, variant === 'hero' ? 1.5 : 1.25]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <Scene preset={preset} webgl={showWebgl} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
