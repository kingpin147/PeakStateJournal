const fs = require('fs');
const path = require('path');

// Each post gets a unique SVG image with relevant icon, gradient, and label
const images = [
  // clinical-testing category - blue/teal
  { name: 'blood-tests', icon: '🔬', title: 'Lab & Blood Tests', grad1: '#1e3a5f', grad2: '#0ea5e9', accent: '#38bdf8' },
  { name: 'blood-pressure', icon: '❤️', title: 'Blood Pressure', grad1: '#1e1b4b', grad2: '#6366f1', accent: '#a5b4fc' },
  { name: 'blood-sugar', icon: '📊', title: 'Blood Sugar', grad1: '#14532d', grad2: '#16a34a', accent: '#86efac' },
  { name: 'cholesterol', icon: '🫀', title: 'Cholesterol & Lipids', grad1: '#1e3a5f', grad2: '#2563eb', accent: '#93c5fd' },
  { name: 'thyroid-test', icon: '🦋', title: 'Thyroid Testing', grad1: '#3b0764', grad2: '#7c3aed', accent: '#c4b5fd' },
  { name: 'iron-ferritin', icon: '🩸', title: 'Iron & Ferritin', grad1: '#450a0a', grad2: '#dc2626', accent: '#fca5a5' },
  { name: 'kidney-test', icon: '🫘', title: 'Kidney Function', grad1: '#1e3a5f', grad2: '#0369a1', accent: '#7dd3fc' },
  { name: 'liver-test', icon: '🧫', title: 'Liver Function', grad1: '#365314', grad2: '#65a30d', accent: '#bef264' },
  { name: 'cbc-test', icon: '🔭', title: 'Complete Blood Count', grad1: '#0c1445', grad2: '#1d4ed8', accent: '#93c5fd' },
  { name: 'vitamin-d-test', icon: '☀️', title: 'Vitamin D Testing', grad1: '#713f12', grad2: '#d97706', accent: '#fde68a' },
  { name: 'hba1c-test', icon: '📈', title: 'HbA1c & Glucose', grad1: '#14532d', grad2: '#059669', accent: '#6ee7b7' },
  { name: 'uric-acid', icon: '⚗️', title: 'Uric Acid & Gout', grad1: '#1e3a5f', grad2: '#0284c7', accent: '#bae6fd' },

  // nutrition-supplements category - green/gold
  { name: 'vitamins-supplements', icon: '💊', title: 'Vitamins & Supplements', grad1: '#14532d', grad2: '#15803d', accent: '#4ade80' },
  { name: 'omega3', icon: '🐟', title: 'Omega-3 Fatty Acids', grad1: '#164e63', grad2: '#0891b2', accent: '#67e8f9' },
  { name: 'vitamin-d', icon: '🌤️', title: 'Vitamin D', grad1: '#78350f', grad2: '#f59e0b', accent: '#fde68a' },
  { name: 'vitamin-c', icon: '🍊', title: 'Vitamin C', grad1: '#7c2d12', grad2: '#ea580c', accent: '#fdba74' },
  { name: 'vitamin-a', icon: '🥕', title: 'Vitamin A & Retinol', grad1: '#7c2d12', grad2: '#b45309', accent: '#fcd34d' },
  { name: 'vitamin-b12', icon: '⚡', title: 'Vitamin B12', grad1: '#1e1b4b', grad2: '#4338ca', accent: '#a5b4fc' },
  { name: 'magnesium', icon: '🪨', title: 'Magnesium', grad1: '#1c1917', grad2: '#57534e', accent: '#d6d3d1' },
  { name: 'calcium-bone', icon: '🦴', title: 'Calcium & Bone Health', grad1: '#1e3a5f', grad2: '#64748b', accent: '#e2e8f0' },
  { name: 'creatine', icon: '💪', title: 'Creatine Performance', grad1: '#1e1b4b', grad2: '#7c3aed', accent: '#ddd6fe' },
  { name: 'multivitamin', icon: '🌈', title: 'Multivitamin Science', grad1: '#14532d', grad2: '#0f766e', accent: '#5eead4' },
  { name: 'folate-b', icon: '🧬', title: 'Folate & B Vitamins', grad1: '#14532d', grad2: '#16a34a', accent: '#86efac' },
  { name: 'nutrients-deficiency', icon: '⚠️', title: 'Nutrient Deficiencies', grad1: '#713f12', grad2: '#ca8a04', accent: '#fef08a' },
  { name: 'diet-foods', icon: '🥗', title: 'Diet & Foods', grad1: '#14532d', grad2: '#15803d', accent: '#bbf7d0' },
  { name: 'protein-muscle', icon: '🥩', title: 'Protein & Muscle', grad1: '#450a0a', grad2: '#b91c1c', accent: '#fca5a5' },

  // sleep-recovery
  { name: 'sleep-circadian', icon: '🌙', title: 'Sleep & Circadian Rhythm', grad1: '#0f172a', grad2: '#1e1b4b', accent: '#818cf8' },
  { name: 'sleep-brain', icon: '🧠', title: 'Sleep & Brain Health', grad1: '#1e0a3c', grad2: '#5b21b6', accent: '#c4b5fd' },
  { name: 'sleep-sunlight', icon: '🌅', title: 'Circadian Light', grad1: '#431407', grad2: '#c2410c', accent: '#fdba74' },

  // hormones-metabolism
  { name: 'testosterone', icon: '⚡', title: 'Testosterone Optimization', grad1: '#1e3a5f', grad2: '#1d4ed8', accent: '#93c5fd' },
  { name: 'thyroid-hormones', icon: '🦋', title: 'Thyroid & Metabolism', grad1: '#3b0764', grad2: '#7c3aed', accent: '#ddd6fe' },
  { name: 'insulin-resistance', icon: '📉', title: 'Insulin Resistance', grad1: '#14532d', grad2: '#15803d', accent: '#6ee7b7' },
  { name: 'cortisol-stress', icon: '😤', title: 'Cortisol & Stress', grad1: '#431407', grad2: '#b45309', accent: '#fde68a' },
  { name: 'nad-energy', icon: '⚡', title: 'NAD+ & Cellular Energy', grad1: '#0c4a6e', grad2: '#0ea5e9', accent: '#7dd3fc' },
  { name: 'fasting-glucose', icon: '🩺', title: 'Fasting & Glucose', grad1: '#14532d', grad2: '#16a34a', accent: '#86efac' },

  // fitness-metabolic
  { name: 'zone2-training', icon: '🏃', title: 'Zone 2 Training', grad1: '#1c1917', grad2: '#b45309', accent: '#fde68a' },
  { name: 'strength-training', icon: '🏋️', title: 'Strength Training', grad1: '#0c1445', grad2: '#1d4ed8', accent: '#93c5fd' },
  { name: 'vo2max', icon: '🫁', title: 'VO2 Max & Longevity', grad1: '#1e3a5f', grad2: '#0369a1', accent: '#7dd3fc' },
  { name: 'fasting-autophagy', icon: '⏱️', title: 'Fasting & Autophagy', grad1: '#14532d', grad2: '#065f46', accent: '#6ee7b7' },
  { name: 'weight-loss', icon: '⚖️', title: 'Weight & Metabolism', grad1: '#1e1b4b', grad2: '#4338ca', accent: '#a5b4fc' },
  { name: 'yoga-flexibility', icon: '🧘', title: 'Yoga & Longevity', grad1: '#2d1657', grad2: '#7c3aed', accent: '#ddd6fe' },

  // mental-awareness
  { name: 'dopamine-focus', icon: '🎯', title: 'Dopamine & Focus', grad1: '#1e1b4b', grad2: '#6d28d9', accent: '#ddd6fe' },
  { name: 'meditation-brain', icon: '🧘', title: 'Meditation & Brain', grad1: '#0c2340', grad2: '#1e40af', accent: '#bfdbfe' },
  { name: 'burnout-stress', icon: '🔥', title: 'Burnout & Recovery', grad1: '#450a0a', grad2: '#be123c', accent: '#fda4af' },
  { name: 'mindfulness', icon: '🕊️', title: 'Mindfulness', grad1: '#0c2340', grad2: '#1e3a8a', accent: '#bfdbfe' },
  { name: 'executive-mental', icon: '💼', title: 'Executive Performance', grad1: '#1c1917', grad2: '#374151', accent: '#d1d5db' },
  { name: 'hrv-stress', icon: '💓', title: 'Heart Rate Variability', grad1: '#450a0a', grad2: '#dc2626', accent: '#fca5a5' },

  // wellness-somatics
  { name: 'cold-therapy', icon: '🧊', title: 'Cold Therapy', grad1: '#0c1a4e', grad2: '#0369a1', accent: '#7dd3fc' },
  { name: 'sauna-heat', icon: '🌡️', title: 'Sauna & Heat Therapy', grad1: '#431407', grad2: '#c2410c', accent: '#fb923c' },
  { name: 'breathwork', icon: '💨', title: 'Breathwork', grad1: '#0c2340', grad2: '#0ea5e9', accent: '#bae6fd' },
  { name: 'red-light', icon: '💡', title: 'Red Light Therapy', grad1: '#450a0a', grad2: '#dc2626', accent: '#fca5a5' },
  { name: 'posture-body', icon: '🏃', title: 'Posture & Movement', grad1: '#1c1917', grad2: '#57534e', accent: '#d6d3d1' },

  // preventive-health / longevity
  { name: 'longevity', icon: '⏳', title: 'Longevity Science', grad1: '#0c1445', grad2: '#1d4ed8', accent: '#93c5fd' },
  { name: 'telomeres', icon: '🧬', title: 'Telomeres & Aging', grad1: '#14532d', grad2: '#15803d', accent: '#86efac' },
  { name: 'senescent-cells', icon: '🔬', title: 'Senescent Cells', grad1: '#1e1b4b', grad2: '#4338ca', accent: '#a5b4fc' },
  { name: 'biological-age', icon: '📅', title: 'Biological Age', grad1: '#0c1445', grad2: '#1e40af', accent: '#93c5fd' },
  { name: 'cancer-prevention', icon: '🛡️', title: 'Cancer Prevention', grad1: '#1e3a5f', grad2: '#1e40af', accent: '#93c5fd' },
  { name: 'inflammation', icon: '🔥', title: 'Chronic Inflammation', grad1: '#450a0a', grad2: '#b91c1c', accent: '#fca5a5' },
  { name: 'metformin', icon: '💊', title: 'Longevity Medicine', grad1: '#14532d', grad2: '#0f766e', accent: '#5eead4' },
  { name: 'alcohol-health', icon: '🍷', title: 'Alcohol & Health', grad1: '#450a0a', grad2: '#9f1239', accent: '#fda4af' },

  // immune-support
  { name: 'gut-microbiome', icon: '🦠', title: 'Gut Microbiome', grad1: '#14532d', grad2: '#16a34a', accent: '#86efac' },
  { name: 'gut-brain', icon: '🧠', title: 'Gut-Brain Axis', grad1: '#14532d', grad2: '#0f766e', accent: '#5eead4' },
  { name: 'leaky-gut', icon: '🔓', title: 'Leaky Gut', grad1: '#451a03', grad2: '#b45309', accent: '#fde68a' },
  { name: 'immune-aging', icon: '🛡️', title: 'Immune System Aging', grad1: '#0c2340', grad2: '#1e40af', accent: '#bfdbfe' },
  { name: 'plant-based', icon: '🌱', title: 'Plant-Based Diet', grad1: '#14532d', grad2: '#15803d', accent: '#bbf7d0' },
  { name: 'good-fats-fiber', icon: '🥑', title: 'Healthy Fats & Fiber', grad1: '#14532d', grad2: '#065f46', accent: '#6ee7b7' },
  { name: 'fatty-liver', icon: '🫁', title: 'Fatty Liver & NAFLD', grad1: '#713f12', grad2: '#d97706', accent: '#fde68a' },

  // personalized-medicine
  { name: 'genetic-testing', icon: '🧬', title: 'Genetic Testing', grad1: '#14532d', grad2: '#0f766e', accent: '#5eead4' },
  { name: 'dna-medicine', icon: '🔬', title: 'DNA Personalized Medicine', grad1: '#1e1b4b', grad2: '#4338ca', accent: '#c4b5fd' },
  { name: 'brain-diet', icon: '🧠', title: 'Brain Health & Diet', grad1: '#1e1b4b', grad2: '#5b21b6', accent: '#ddd6fe' },
  { name: 'fat-vitamins', icon: '💧', title: 'Fat vs Water Vitamins', grad1: '#14532d', grad2: '#0369a1', accent: '#7dd3fc' },
  { name: 'healthy-diet', icon: '🥗', title: 'Longevity Diet', grad1: '#14532d', grad2: '#15803d', accent: '#bbf7d0' },
  { name: 'sugar-damage', icon: '⚠️', title: 'Sugar & Metabolic Damage', grad1: '#713f12', grad2: '#ca8a04', accent: '#fef08a' },
  { name: 'general-health', icon: '🌿', title: 'Peak Health', grad1: '#14532d', grad2: '#15803d', accent: '#86efac' },
];

function generateSVG(img) {
  const { icon, title, grad1, grad2, accent } = img;
  const escapedTitle = title.replace(/&/g, '&amp;');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${grad1}"/>
      <stop offset="100%" stop-color="${grad2}"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="blur1">
      <feGaussianBlur stdDeviation="40"/>
    </filter>
    <filter id="blur2">
      <feGaussianBlur stdDeviation="60"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Glow orbs -->
  <circle cx="200" cy="150" r="250" fill="${accent}" opacity="0.08" filter="url(#blur2)"/>
  <circle cx="1000" cy="480" r="200" fill="${accent}" opacity="0.1" filter="url(#blur2)"/>
  <circle cx="600" cy="315" r="300" fill="${accent}" opacity="0.04" filter="url(#blur1)"/>

  <!-- Grid lines subtle -->
  <g stroke="${accent}" stroke-opacity="0.05" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="150" y1="0" x2="150" y2="630"/>
    <line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="450" y1="0" x2="450" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="750" y1="0" x2="750" y2="630"/>
    <line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1050" y1="0" x2="1050" y2="630"/>
  </g>

  <!-- Decorative circles -->
  <circle cx="1100" cy="80" r="120" fill="none" stroke="${accent}" stroke-opacity="0.12" stroke-width="1.5"/>
  <circle cx="1100" cy="80" r="80" fill="none" stroke="${accent}" stroke-opacity="0.08" stroke-width="1"/>
  <circle cx="100" cy="550" r="100" fill="none" stroke="${accent}" stroke-opacity="0.1" stroke-width="1"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="1200" height="4" fill="${accent}" opacity="0.6"/>

  <!-- Content area -->
  <!-- Icon circle -->
  <circle cx="140" cy="315" r="64" fill="${accent}" opacity="0.12"/>
  <circle cx="140" cy="315" r="50" fill="${accent}" opacity="0.08"/>
  <text x="140" y="332" font-family="system-ui" font-size="44" text-anchor="middle" dominant-baseline="middle">${icon}</text>

  <!-- Brand label top left -->
  <text x="80" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="${accent}" opacity="0.7" letter-spacing="3">PEAK STATE JOURNAL</text>
  <line x1="80" y1="62" x2="340" y2="62" stroke="${accent}" stroke-opacity="0.25" stroke-width="1"/>

  <!-- Main title -->
  <text x="240" y="285" font-family="system-ui, -apple-system, Georgia, serif" font-size="56" font-weight="800" fill="white" opacity="0.95" letter-spacing="-0.5">${escapedTitle.split(' ').slice(0, 3).join(' ')}</text>
  <text x="240" y="350" font-family="system-ui, -apple-system, Georgia, serif" font-size="56" font-weight="800" fill="${accent}" opacity="0.9" letter-spacing="-0.5">${escapedTitle.split(' ').slice(3).join(' ') || 'Research'}</text>

  <!-- Subtitle line -->
  <text x="240" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="white" opacity="0.5" letter-spacing="1">Clinical Evidence-Based Research</text>

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="black" opacity="0.3"/>
  <text x="80" y="614" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="${accent}" opacity="0.6" letter-spacing="2">peakstatejournal.com</text>
  <text x="1120" y="614" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="white" opacity="0.35" text-anchor="end">Evidence-Based · Peer-Reviewed</text>

  <!-- Bottom accent line -->
  <rect x="0" y="626" width="1200" height="4" fill="${accent}" opacity="0.4"/>
</svg>`;
}

const outputDir = path.join(__dirname, '..', 'public', 'images', 'posts');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

images.forEach(img => {
  const svg = generateSVG(img);
  const filename = path.join(outputDir, `${img.name}.svg`);
  fs.writeFileSync(filename, svg, 'utf8');
  console.log(`Generated: ${img.name}.svg`);
});

console.log(`\n✅ Generated ${images.length} post images in public/images/posts/`);
