const avatar = (name, bg) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=128&bold=true`

export const TESTIMONIALS = [
  {
    name: 'Ahmed Khan',
    role: 'Operations Director',
    review:
      'PrimeAxis delivered a flawless Zoho CRM setup with custom workflows that transformed how we manage leads. Professional, responsive, and truly experts in their field.',
    rating: 5,
    photo: avatar('Ahmed Khan', '355C7D'),
  },
  {
    name: 'Sarah Malik',
    role: 'Chief Executive Officer',
    review:
      'Our patient management system was built on time and exceeded expectations. The team understood our requirements deeply and provided excellent ongoing support.',
    rating: 5,
    photo: avatar('Sarah Malik', '06B6D4'),
  },
  {
    name: 'Usman Ali',
    role: 'Project Manager',
    review:
      'From ERP implementation to mobile app development, PrimeAxis handled everything seamlessly. Their agile approach kept us informed at every milestone.',
    rating: 5,
    photo: avatar('Usman Ali', '4F46E5'),
  },
  {
    name: 'Fatima Raza',
    role: 'Marketing Head',
    review:
      'They rebuilt our website and integrated analytics dashboards that finally gave us clear insight into campaign performance. Communication was clear from day one.',
    rating: 5,
    photo: avatar('Fatima Raza', '0891B2'),
  },
  {
    name: 'Hassan Sheikh',
    role: 'Founder',
    review:
      'We needed a custom CRM fast, and PrimeAxis delivered a polished product within the agreed timeline. The handover and training were thorough and practical.',
    rating: 5,
    photo: avatar('Hassan Sheikh', '7C3AED'),
  },
  {
    name: 'Ayesha Noor',
    role: 'Product Manager',
    review:
      'The mobile app they developed is stable, intuitive, and well received by our users. Their UI/UX suggestions improved the product beyond our initial scope.',
    rating: 5,
    photo: avatar('Ayesha Noor', 'DB2777'),
  },
  {
    name: 'Bilal Hussain',
    role: 'IT Manager',
    review:
      'PrimeAxis migrated our legacy tools into a unified Zoho ERP workflow. Downtime was minimal, documentation was strong, and support after launch has been reliable.',
    rating: 5,
    photo: avatar('Bilal Hussain', '059669'),
  },
  {
    name: 'Zainab Qureshi',
    role: 'Business Analyst',
    review:
      'They listened carefully, translated business needs into clear technical specs, and delivered exactly what we discussed. A dependable partner for complex software work.',
    rating: 5,
    photo: avatar('Zainab Qureshi', 'EA580C'),
  },
  {
    name: 'Omar Farooq',
    role: 'Sales Director',
    review:
      'Lead tracking and follow-up automation changed how our sales team works. PrimeAxis configured the system around our process instead of forcing a generic template.',
    rating: 5,
    photo: avatar('Omar Farooq', '2563EB'),
  },
  {
    name: 'Maryam Siddiqui',
    role: 'Operations Manager',
    review:
      'Reporting used to take hours every week. After PrimeAxis built our dashboard, leadership gets real-time numbers and the team saves significant manual effort.',
    rating: 5,
    photo: avatar('Maryam Siddiqui', '0D9488'),
  },
  {
    name: 'Kamran Iqbal',
    role: 'Chief Technology Officer',
    review:
      'Strong engineering standards, clean code, and sensible architecture choices. They integrated third-party APIs without the usual delays and integration headaches.',
    rating: 5,
    photo: avatar('Kamran Iqbal', '4338CA'),
  },
  {
    name: 'Sana Tariq',
    role: 'Customer Success Lead',
    review:
      'PrimeAxis improved our client portal with role-based access and automated notifications. Support tickets dropped noticeably within the first month of launch.',
    rating: 5,
    photo: avatar('Sana Tariq', 'BE185D'),
  },
  {
    name: 'Imran Javed',
    role: 'Managing Director',
    review:
      'We trusted PrimeAxis with a full digital transformation initiative and they delivered across web, CRM, and internal tools. Professional team, measurable results.',
    rating: 5,
    photo: avatar('Imran Javed', '1D4ED8'),
  },
]
