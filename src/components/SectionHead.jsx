import TextFlow from './TextFlow'

const TITLE_CLASS =
  'mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-text tracking-tight font-display'

const SUBTITLE_CLASS = 'mt-5 text-text-muted text-lg leading-relaxed'

export default function SectionHead({
  label,
  title,
  subtitle,
  dark = false,
  className = '',
  titleClassName = TITLE_CLASS,
  subtitleClassName = SUBTITLE_CLASS,
  align = 'center',
}) {
  const alignClass = align === 'left' ? 'text-left mx-0' : 'text-center max-w-3xl mx-auto'

  return (
    <header className={`section-header ${alignClass} ${className}`.trim()}>
      {label && (
        <TextFlow
          as="span"
          mode="chars"
          className={`section-label block${dark ? ' section-label-on-dark' : ''}`}
          text={label}
        />
      )}
      {title && (
        <TextFlow
          as="h2"
          mode="words"
          delay={90}
          className={titleClassName}
          text={title}
        />
      )}
      {subtitle && (
        <TextFlow
          as="p"
          mode="words"
          delay={180}
          className={subtitleClassName}
          text={subtitle}
        />
      )}
    </header>
  )
}
