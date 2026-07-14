// Simple hand-crafted SVG icons, one per weather category
export const weatherIcons = {
  sunny: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="14" fill="#FDB813"/>
    <g stroke="#FDB813" stroke-width="4" stroke-linecap="round">
      <line x1="32" y1="4" x2="32" y2="12"/>
      <line x1="32" y1="52" x2="32" y2="60"/>
      <line x1="4" y1="32" x2="12" y2="32"/>
      <line x1="52" y1="32" x2="60" y2="32"/>
      <line x1="12" y1="12" x2="18" y2="18"/>
      <line x1="46" y1="46" x2="52" y2="52"/>
      <line x1="52" y1="12" x2="46" y2="18"/>
      <line x1="18" y1="46" x2="12" y2="52"/>
    </g>
  </svg>`,

  cloudy: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="38" rx="16" ry="12" fill="#B0BEC5"/>
    <ellipse cx="40" cy="34" rx="14" ry="11" fill="#CFD8DC"/>
  </svg>`,

  rain: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="26" rx="16" ry="12" fill="#90A4AE"/>
    <ellipse cx="40" cy="22" rx="14" ry="11" fill="#B0BEC5"/>
    <g stroke="#4FC3F7" stroke-width="3" stroke-linecap="round">
      <line x1="22" y1="42" x2="18" y2="54"/>
      <line x1="34" y1="42" x2="30" y2="54"/>
      <line x1="46" y1="42" x2="42" y2="54"/>
    </g>
  </svg>`,

  storm: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="24" rx="16" ry="12" fill="#78909C"/>
    <ellipse cx="40" cy="20" rx="14" ry="11" fill="#90A4AE"/>
    <polygon points="34,38 24,52 32,52 28,60 42,44 34,44" fill="#FDB813"/>
  </svg>`,

  snow: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="26" cy="24" rx="16" ry="12" fill="#B0BEC5"/>
    <ellipse cx="40" cy="20" rx="14" ry="11" fill="#CFD8DC"/>
    <g fill="#B3E5FC">
      <circle cx="20" cy="46" r="3"/>
      <circle cx="32" cy="52" r="3"/>
      <circle cx="44" cy="46" r="3"/>
    </g>
  </svg>`,

  fog: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#B0BEC5" stroke-width="4" stroke-linecap="round">
      <line x1="8" y1="24" x2="56" y2="24"/>
      <line x1="14" y1="34" x2="50" y2="34"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
    </g>
  </svg>`,
}

/**
 * Maps an AEMET stateSky id to one of our simplified icon categories.
 */
export function getSkyCategory(stateSkyId) {
  const code = parseInt(stateSkyId, 10)
  const firstDigit = Math.floor(code / 10)

  const categoryMap = {
    1: 'sunny',
    2: 'rain',
    3: 'rain',
    4: 'snow',
    5: 'storm',
    6: 'storm',
    7: 'snow',
    8: 'fog',
  }

  return categoryMap[firstDigit] || 'cloudy'
}