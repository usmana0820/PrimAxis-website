import { useReveal } from '../hooks/useReveal'

const variantClass = {
  'fade-up': 'reveal',
  scale: 'reveal-scale',
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
  flip: 'reveal-flip',
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  as: Tag = 'div',
}) {
  const { ref, revealed } = useReveal()

  return (
    <Tag
      ref={ref}
      className={`${variantClass[variant] || 'reveal'} ${revealed ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
