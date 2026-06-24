const fs = require('fs');
const path = require('path');

const postsDir = 'src/content/posts';
const imagesDir = 'public/images/posts';

// Color palettes: [bg-start, bg-end, accent]
const palettes = [
  ['#0c1631', '#1e3a5f', '#60a5fa'],  // blue
  ['#14221a', '#1a4731', '#34d399'],  // green
  ['#2d1b2e', '#5b2764', '#c084fc'],  // purple
  ['#1a1a0e', '#4a3f20', '#fbbf24'],  // gold
  ['#1c0f0f', '#6b2121', '#f87171'],  // red
  ['#0e1a2d', '#1e3a5f', '#38bdf8'],  // sky
  ['#1a0e1f', '#4c1d95', '#a78bfa'],  // violet
  ['#0f1f1a', '#065f46', '#6ee7b7'],  // emerald
  ['#1f1409', '#78350f', '#fcd34d'],  // amber
  ['#180e24', '#581c87', '#d8b4fe'],  // lavender
  ['#0e1631', '#1e3a6f', '#93c5fd'],  // light blue
  ['#1a150e', '#713f12', '#f59e0b'],  // warm amber
  ['#0f1f1f', '#134e4a', '#2dd4bf'],  // teal
  ['#1f0e0e', '#7f1d1d', '#fca5a5'],  // rose
  ['#0e1a22', '#164e63', '#67e8f9'],  // cyan
];

// Topic-to-icon and display name mapping
const topicMeta = {
  'advanced-sleep-optimization': { emoji: '😴', title: 'Advanced Sleep', subtitle: 'Optimization' },
  'the-microbiome-diet': { emoji: '🦠', title: 'Microbiome', subtitle: 'Diet Science' },
  'understanding-peptides': { emoji: '🧬', title: 'Peptides', subtitle: 'Deep Dive' },
  'cortisol-and-stress-management': { emoji: '😤', title: 'Cortisol &amp; Stress', subtitle: 'Management' },
  'the-role-of-nad': { emoji: '⚡', title: 'NAD+ Role', subtitle: 'in Longevity' },
  'metabolic-flexibility': { emoji: '🔥', title: 'Metabolic', subtitle: 'Flexibility' },
  'dopamine-receptors': { emoji: '🧠', title: 'Dopamine', subtitle: 'Receptors' },
  'circadian-biology': { emoji: '🌅', title: 'Circadian', subtitle: 'Biology' },
  'zone-5-training': { emoji: '🏃', title: 'Zone 5', subtitle: 'Training' },
  'sauna-protocols': { emoji: '🧖', title: 'Sauna', subtitle: 'Protocols' },
  'exosomes-in-medicine': { emoji: '💊', title: 'Exosomes', subtitle: 'in Medicine' },
  'stem-cell-therapy': { emoji: '🔬', title: 'Stem Cell', subtitle: 'Therapy' },
  'hyperbaric-oxygen': { emoji: '🫁', title: 'Hyperbaric', subtitle: 'Oxygen' },
  'akkermansia-muciniphila': { emoji: '🦠', title: 'Akkermansia', subtitle: 'Microbiome' },
  'glutathione-the-master-antioxidant': { emoji: '🛡️', title: 'Glutathione', subtitle: 'Antioxidant' },
  'nitric-oxide-benefits': { emoji: '💨', title: 'Nitric Oxide', subtitle: 'Benefits' },
  'blue-light-toxicity': { emoji: '📱', title: 'Blue Light', subtitle: 'Toxicity' },
  'emf-exposure': { emoji: '📡', title: 'EMF', subtitle: 'Exposure' },
  'endocrine-disruptors': { emoji: '⚠️', title: 'Endocrine', subtitle: 'Disruptors' },
  'heavy-metal-detox': { emoji: '🧪', title: 'Heavy Metal', subtitle: 'Detox' },
  'the-vagus-nerve': { emoji: '🧠', title: 'Vagus Nerve', subtitle: 'Science' },
  'heart-rate-variability-mastery': { emoji: '💓', title: 'HRV', subtitle: 'Mastery' },
  'cgm-insights': { emoji: '📊', title: 'CGM', subtitle: 'Insights' },
  'biological-clocks': { emoji: '⏰', title: 'Biological', subtitle: 'Clocks' },
  'epigenetic-clocks': { emoji: '🧬', title: 'Epigenetic', subtitle: 'Clocks' },
  'methylene-blue': { emoji: '💧', title: 'Methylene', subtitle: 'Blue' },
  'rapamycin-and-longevity': { emoji: '💊', title: 'Rapamycin', subtitle: '&amp; Longevity' },
  'the-benefits-of-spermidine': { emoji: '🌿', title: 'Spermidine', subtitle: 'Benefits' },
  'urolithin-a': { emoji: '🫐', title: 'Urolithin A', subtitle: 'Research' },
  'astaxanthin': { emoji: '🦐', title: 'Astaxanthin', subtitle: 'Science' },
  'phosphatidylcholine': { emoji: '🧬', title: 'Phosphatidyl-', subtitle: 'choline' },
  'lithium-orotate': { emoji: '⚗️', title: 'Lithium', subtitle: 'Orotate' },
  'bpc-157': { emoji: '💉', title: 'BPC-157', subtitle: 'Peptide' },
  'thymosin-alpha-1': { emoji: '🛡️', title: 'Thymosin', subtitle: 'Alpha-1' },
  'hormetic-stressors': { emoji: '💪', title: 'Hormetic', subtitle: 'Stressors' },
  'cryotherapy': { emoji: '🧊', title: 'Cryotherapy', subtitle: 'Science' },
  'heat-shock-proteins': { emoji: '🔥', title: 'Heat Shock', subtitle: 'Proteins' },
  'autophagy-mechanisms': { emoji: '♻️', title: 'Autophagy', subtitle: 'Mechanisms' },
  'mtor-pathway': { emoji: '🔀', title: 'mTOR', subtitle: 'Pathway' },
  'ampk-activation': { emoji: '⚡', title: 'AMPK', subtitle: 'Activation' },
  'sirtuins-and-aging': { emoji: '🧬', title: 'Sirtuins', subtitle: '&amp; Aging' },
  'mitochondrial-biogenesis': { emoji: '🔋', title: 'Mitochondrial', subtitle: 'Biogenesis' },
  'telomerase-activation': { emoji: '🧬', title: 'Telomerase', subtitle: 'Activation' },
  'senolytics': { emoji: '🧹', title: 'Senolytics', subtitle: 'Research' },
  'exogenous-ketones': { emoji: '⚡', title: 'Exogenous', subtitle: 'Ketones' },
  'brown-adipose-tissue': { emoji: '🔥', title: 'Brown Adipose', subtitle: 'Tissue' },
  'insulin-sensitivity': { emoji: '📉', title: 'Insulin', subtitle: 'Sensitivity' },
  'glycation-and-ages': { emoji: '🍬', title: 'Glycation', subtitle: '&amp; AGEs' },
  'visceral-fat': { emoji: '⚖️', title: 'Visceral Fat', subtitle: 'Science' },
  'brain-derived-neurotrophic-factor': { emoji: '🧠', title: 'BDNF', subtitle: 'Research' },
  'keto-diet-variations': { emoji: '🥑', title: 'Keto Diet', subtitle: 'Variations' },
  'paleo-nutrition-hacks': { emoji: '🥩', title: 'Paleo', subtitle: 'Nutrition' },
  'plant-based-proteins': { emoji: '🌱', title: 'Plant-Based', subtitle: 'Proteins' },
  'carnivore-diet-science': { emoji: '🥩', title: 'Carnivore', subtitle: 'Diet Science' },
  'intermittent-fasting-schedules': { emoji: '⏳', title: 'IF Schedules', subtitle: 'Guide' },
  'prolonged-fasting-protocols': { emoji: '🕰️', title: 'Prolonged', subtitle: 'Fasting' },
  'dry-fasting-risks': { emoji: '🏜️', title: 'Dry Fasting', subtitle: 'Risks' },
  'protein-pacing': { emoji: '🍗', title: 'Protein', subtitle: 'Pacing' },
  'electrolyte-balance': { emoji: '💧', title: 'Electrolyte', subtitle: 'Balance' },
  'magnesium-types': { emoji: '💊', title: 'Magnesium', subtitle: 'Types' },
  'vitamin-k2-and-d3': { emoji: '☀️', title: 'Vitamin K2', subtitle: '&amp; D3' },
  'omega-3-vs-omega-6': { emoji: '🐟', title: 'Omega-3 vs', subtitle: 'Omega-6' },
  'nootropics-for-focus': { emoji: '🧠', title: 'Nootropics', subtitle: 'for Focus' },
  'modafinil-science': { emoji: '💊', title: 'Modafinil', subtitle: 'Science' },
  'caffeine-tolerance': { emoji: '☕', title: 'Caffeine', subtitle: 'Tolerance' },
  'adaptogens-overview': { emoji: '🌿', title: 'Adaptogens', subtitle: 'Overview' },
  'ashwagandha-benefits': { emoji: '🌿', title: 'Ashwagandha', subtitle: 'Benefits' },
  'rhodiola-rosea': { emoji: '🌸', title: 'Rhodiola', subtitle: 'Rosea' },
  'l-theanine-and-sleep': { emoji: '🍵', title: 'L-Theanine', subtitle: '&amp; Sleep' },
  'melatonin-myths': { emoji: '🌙', title: 'Melatonin', subtitle: 'Myths' },
  'gaba-supplementation': { emoji: '😌', title: 'GABA', subtitle: 'Supplementation' },
  '5-htp-and-serotonin': { emoji: '😊', title: '5-HTP', subtitle: '&amp; Serotonin' },
  'psychedelics-in-medicine': { emoji: '🍄', title: 'Psychedelics', subtitle: 'in Medicine' },
  'microdosing-psilocybin': { emoji: '🍄', title: 'Microdosing', subtitle: 'Psilocybin' },
  'ketamine-therapy': { emoji: '💉', title: 'Ketamine', subtitle: 'Therapy' },
  'mdma-for-ptsd': { emoji: '💊', title: 'MDMA', subtitle: 'for PTSD' },
  'breathwork-techniques': { emoji: '🌬️', title: 'Breathwork', subtitle: 'Techniques' },
  'wim-hof-method': { emoji: '🧊', title: 'Wim Hof', subtitle: 'Method' },
  'box-breathing': { emoji: '🫁', title: 'Box', subtitle: 'Breathing' },
  'buteyko-method': { emoji: '👃', title: 'Buteyko', subtitle: 'Method' },
  'holotropic-breathwork': { emoji: '🌀', title: 'Holotropic', subtitle: 'Breathwork' },
  'meditation-styles': { emoji: '🧘', title: 'Meditation', subtitle: 'Styles' },
  'vipassana-retreats': { emoji: '🧘', title: 'Vipassana', subtitle: 'Retreats' },
  'transcendental-meditation': { emoji: '🕉️', title: 'Transcendental', subtitle: 'Meditation' },
  'mindfulness-practices': { emoji: '🧘', title: 'Mindfulness', subtitle: 'Practices' },
  'neurofeedback-training': { emoji: '📡', title: 'Neurofeedback', subtitle: 'Training' },
  'brain-wave-states': { emoji: '🧠', title: 'Brain Wave', subtitle: 'States' },
  'binaural-beats': { emoji: '🎧', title: 'Binaural', subtitle: 'Beats' },
  'red-light-therapy': { emoji: '🔴', title: 'Red Light', subtitle: 'Therapy' },
  'near-infrared-light': { emoji: '🔆', title: 'Near Infrared', subtitle: 'Light' },
  'pemf-devices': { emoji: '🧲', title: 'PEMF', subtitle: 'Devices' },
  'grounding-earthing': { emoji: '🌍', title: 'Grounding', subtitle: '&amp; Earthing' },
  'forest-bathing': { emoji: '🌲', title: 'Forest', subtitle: 'Bathing' },
  'nature-deficit-disorder': { emoji: '🏞️', title: 'Nature Deficit', subtitle: 'Disorder' },
  'cold-thermogenesis': { emoji: '❄️', title: 'Cold', subtitle: 'Thermogenesis' },
  'ice-bath-protocols': { emoji: '🧊', title: 'Ice Bath', subtitle: 'Protocols' },
  'contrast-therapy': { emoji: '🔥', title: 'Contrast', subtitle: 'Therapy' },
  'sweat-lodge-traditions': { emoji: '🏔️', title: 'Sweat Lodge', subtitle: 'Traditions' },
  'lymphatic-drainage': { emoji: '💧', title: 'Lymphatic', subtitle: 'Drainage' },
  'fascia-release': { emoji: '🤸', title: 'Fascia', subtitle: 'Release' },
};

function generateSVG(meta, palette) {
  const [bgStart, bgEnd, accent] = palette;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgStart}"/>
      <stop offset="100%" stop-color="${bgEnd}"/>
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
  <text x="140" y="332" font-family="system-ui" font-size="44" text-anchor="middle" dominant-baseline="middle">${meta.emoji}</text>

  <!-- Brand label top left -->
  <text x="80" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="${accent}" opacity="0.7" letter-spacing="3">PEAK STATE JOURNAL</text>
  <line x1="80" y1="62" x2="340" y2="62" stroke="${accent}" stroke-opacity="0.25" stroke-width="1"/>

  <!-- Main title -->
  <text x="240" y="285" font-family="system-ui, -apple-system, Georgia, serif" font-size="56" font-weight="800" fill="white" opacity="0.95" letter-spacing="-0.5">${meta.title}</text>
  <text x="240" y="350" font-family="system-ui, -apple-system, Georgia, serif" font-size="56" font-weight="800" fill="${accent}" opacity="0.9" letter-spacing="-0.5">${meta.subtitle}</text>

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

// Read all posts, find missing ones, generate SVGs and update MDX
const files = fs.readdirSync(postsDir);
let generated = 0;

files.forEach((f, index) => {
  const filePath = path.join(postsDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/coverImage:\s*"([^"]+)"/);
  
  if (match && match[1] === '/images/posts/default-placeholder.svg') {
    const slug = f.replace('.mdx', '');
    const meta = topicMeta[slug];
    
    if (meta) {
      const palette = palettes[index % palettes.length];
      const svgFileName = `${slug}.svg`;
      const svgPath = path.join(imagesDir, svgFileName);
      
      // Generate SVG
      fs.writeFileSync(svgPath, generateSVG(meta, palette));
      
      // Update MDX coverImage
      const updatedContent = content.replace(
        /coverImage:\s*"\/images\/posts\/default-placeholder\.svg"/,
        `coverImage: "/images/posts/${svgFileName}"`
      );
      fs.writeFileSync(filePath, updatedContent);
      
      generated++;
      console.log(`✓ ${slug}`);
    } else {
      console.log(`✗ No meta for: ${slug}`);
    }
  }
});

console.log(`\nGenerated ${generated} SVG cover images.`);
