import { useState } from 'react'

const TECH_INITIALS = {
  'MERN Stack': 'ME',
  'Tailwind CSS': 'TW',
  'React Native': 'RN',
  'Next.js': 'N',
  'Node.js': 'N',
  'Express.js': 'EX',
  'TypeScript': 'TS',
  'Zoho CRM': 'ZC',
  'Zoho ERP': 'ZE',
  'Zoho Creator': 'ZR',
  'Zoho Books': 'ZB',
  'Zoho Analytics': 'ZA',
  'Zoho Flow': 'ZF',
  'Zoho Desk': 'ZD',
  'Zoho API': 'ZP',
  Deluge: 'DL',
  MongoDB: 'MG',
  PostgreSQL: 'PG',
  Firebase: 'FB',
  Kotlin: 'KT',
  Flutter: 'FL',
}

export default function TechIcon({ name, icon, size = 28, className = '' }) {
  const [error, setError] = useState(false)
  const fallbackLabel = TECH_INITIALS[name] ?? name.charAt(0)

  if (!icon || error) {
    return (
      <span
        className={`inline-flex items-center justify-center font-bold text-[#355C7D] leading-none ${className}`}
        style={{ fontSize: fallbackLabel.length > 1 ? size * 0.32 : size * 0.42 }}
      >
        {fallbackLabel}
      </span>
    )
  }

  return (
    <img
      src={icon}
      alt={`${name} logo`}
      className={`object-contain ${className}`}
      width={size}
      height={size}
      loading="eager"
      onError={() => setError(true)}
    />
  )
}
