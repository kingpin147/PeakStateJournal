const fs = require('fs');
const path = require('path');

const topics = [
  // First 50
  "Advanced Sleep Optimization", "The Microbiome Diet", "Understanding Peptides", "Cortisol and Stress Management", 
  "The Role of NAD+", "Metabolic Flexibility", "Dopamine Receptors", "Circadian Biology", "Zone 5 Training",
  "Sauna Protocols", "Exosomes in Medicine", "Stem Cell Therapy", "Hyperbaric Oxygen", "Akkermansia Muciniphila",
  "Glutathione The Master Antioxidant", "Nitric Oxide Benefits", "Blue Light Toxicity", "EMF Exposure",
  "Endocrine Disruptors", "Heavy Metal Detox", "The Vagus Nerve", "Heart Rate Variability Mastery",
  "CGM Insights", "Biological Clocks", "Epigenetic Clocks", "Methylene Blue", "Rapamycin and Longevity",
  "The Benefits of Spermidine", "Urolithin A", "Astaxanthin", "Phosphatidylcholine", "Lithium Orotate",
  "BPC-157", "Thymosin Alpha-1", "Hormetic Stressors", "Cryotherapy", "Heat Shock Proteins",
  "Autophagy Mechanisms", "mTOR Pathway", "AMPK Activation", "Sirtuins and Aging", "Mitochondrial Biogenesis",
  "Telomerase Activation", "Senolytics", "Exogenous Ketones", "Brown Adipose Tissue", "Insulin Sensitivity",
  "Glycation and AGES", "Visceral Fat", "Brain Derived Neurotrophic Factor",
  // Next 50
  "Keto Diet Variations", "Paleo Nutrition Hacks", "Plant Based Proteins", "Carnivore Diet Science",
  "Intermittent Fasting Schedules", "Prolonged Fasting Protocols", "Dry Fasting Risks", "Protein Pacing",
  "Electrolyte Balance", "Magnesium Types", "Vitamin K2 and D3", "Omega 3 vs Omega 6", "Nootropics for Focus",
  "Modafinil Science", "Caffeine Tolerance", "Adaptogens Overview", "Ashwagandha Benefits", "Rhodiola Rosea",
  "L Theanine and Sleep", "Melatonin Myths", "GABA Supplementation", "5 HTP and Serotonin", "Psychedelics in Medicine",
  "Microdosing Psilocybin", "Ketamine Therapy", "MDMA for PTSD", "Breathwork Techniques", "Wim Hof Method",
  "Box Breathing", "Buteyko Method", "Holotropic Breathwork", "Meditation Styles", "Vipassana Retreats",
  "Transcendental Meditation", "Mindfulness Practices", "Neurofeedback Training", "Brain Wave States",
  "Binaural Beats", "Red Light Therapy", "Near Infrared Light", "PEMF Devices", "Grounding Earthing",
  "Forest Bathing", "Nature Deficit Disorder", "Cold Thermogenesis", "Ice Bath Protocols", "Contrast Therapy",
  "Sweat Lodge Traditions", "Lymphatic Drainage", "Fascia Release"
];

const categories = ["longevity", "preventive-health", "mental-performance", "nutrition", "fitness", "biohacking", "mindfulness"];
const tags = ["Biohacking", "Anti-aging", "Health", "Science", "Optimization", "Wellness", "Diet", "Recovery", "Brain"];

const postsDir = path.join(__dirname, 'src', 'content', 'posts');

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

topics.forEach((topic, i) => {
  const slug = topic.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  const category = categories[i % categories.length];
  const tagList = [tags[i % tags.length], tags[(i + 1) % tags.length], "Science"];
  const date = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
  
  const content = `---
title: "${topic}: What You Need to Know"
slug: "${slug}"
readTime: "5 min read"
date: "${date}"
citations:
category: "${category}"
tags: ${JSON.stringify(tagList)}
coverImage: "/images/posts/default-placeholder.svg"
summary: "An in-depth look at ${topic} and how it impacts your long-term health span and vitality."
---

## Introduction to ${topic}

The science surrounding ${topic} is rapidly evolving. Researchers are finding new pathways that directly impact our lifespan and healthspan. Whether you are aiming for longevity, enhanced mental performance, or general preventive health, understanding these mechanisms is crucial.

## Key Mechanisms and Science

Understanding how ${topic} works on a cellular level provides insight into potential interventions and lifestyle optimizations. We cover the main pathways including metabolic regulation, cellular cleanup, and stress resilience.

## Practical Applications

Here is how you can practically implement protocols related to ${topic} into your daily routine:
1. **Consistency is key**: Integrate practices slowly.
2. **Measure and track outcomes**: Use wearables or lab tests to verify results.
3. **Adjust based on your personal biology**: Not everything works the same for everyone.

*Disclaimer: This article is for informational purposes only and does not constitute medical advice.*
`;

  fs.writeFileSync(path.join(postsDir, `${slug}.mdx`), content);
});

console.log(`Successfully generated ${topics.length} blogs.`);
