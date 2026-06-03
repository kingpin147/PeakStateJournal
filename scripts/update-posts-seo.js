const fs = require('fs');
const path = require('path');

// Map slug -> { category, coverImage, seoTitle, summary, tags }
const postMeta = {
  'alcohol-health-effects-evidence': {
    category: 'preventive-health',
    coverImage: '/images/posts/alcohol-health.svg',
    title: 'Alcohol & Health: What the Evidence Actually Shows',
    summary: 'A comprehensive review of peer-reviewed research on alcohol consumption and its dose-dependent effects on cardiovascular health, cancer risk, liver function, and longevity.',
    tags: ['Alcohol', 'Liver Health', 'Cancer Risk', 'Longevity', 'Preventive Health'],
  },
  'best-time-take-vitamins-supplements': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamins-supplements.svg',
    title: 'Best Time to Take Vitamins & Supplements: A Clinical Guide',
    summary: 'Timing your vitamin and supplement intake correctly can significantly enhance absorption and bioavailability. This guide covers the optimal timing for every major supplement.',
    tags: ['Supplements', 'Vitamins', 'Bioavailability', 'Absorption', 'Timing'],
  },
  'best-time-to-take-vitamins': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamins-supplements.svg',
    title: 'When to Take Your Vitamins: Timing Strategies for Maximum Effect',
    summary: 'Strategic supplement timing based on circadian biology and nutrient interactions. Learn when fat-soluble vs water-soluble vitamins should be taken for optimal uptake.',
    tags: ['Vitamins', 'Supplement Timing', 'Fat-Soluble', 'Water-Soluble', 'Nutrition'],
  },
  'biological-age-measuring-true-aging': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/biological-age.svg',
    title: 'Biological Age: How to Measure Your True Rate of Aging',
    summary: 'Chronological age tells you little about how fast you are aging. This review covers methylation clocks, telomere length, and biomarker panels that reveal your real biological age.',
    tags: ['Biological Age', 'Epigenetics', 'Methylation', 'Telomeres', 'Longevity'],
  },
  'blood-pressure-arterial-health-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/blood-pressure.svg',
    title: 'Blood Pressure & Arterial Health: Your Complete Clinical Guide',
    summary: 'Understanding blood pressure goes beyond a single reading. This clinical guide covers arterial stiffness, pulse wave velocity, and evidence-based strategies for cardiovascular protection.',
    tags: ['Blood Pressure', 'Arterial Health', 'Cardiovascular', 'Hypertension', 'Heart Health'],
  },
  'blood-sugar-monitor-healthy-people': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/blood-sugar.svg',
    title: 'Why Healthy People Should Monitor Blood Sugar',
    summary: 'Continuous glucose monitoring reveals metabolic patterns invisible to standard fasting tests. Discover why tracking postprandial glucose matters even without diabetes.',
    tags: ['Blood Sugar', 'CGM', 'Glucose', 'Metabolic Health', 'Insulin'],
  },
  'boosting-energy-nad-cellular-power': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/nad-energy.svg',
    title: 'NAD+ and Cellular Energy: The Science of Mitochondrial Power',
    summary: 'NAD+ is the central currency of cellular energy metabolism. This review examines the research on NR and NMN supplementation, sirtuins, and age-related NAD+ decline.',
    tags: ['NAD+', 'NMN', 'NR', 'Mitochondria', 'Cellular Energy', 'Longevity'],
  },
  'breathwork-nervous-system-reset': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/breathwork.svg',
    title: 'Breathwork for Nervous System Reset: Clinical Evidence',
    summary: 'Controlled breathing protocols directly modulate the autonomic nervous system. A science-backed review of box breathing, 4-7-8, and physiological sighs for stress regulation.',
    tags: ['Breathwork', 'Nervous System', 'HRV', 'Stress', 'Parasympathetic'],
  },
  'calcium-bone-health-beyond-dairy': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/calcium-bone.svg',
    title: 'Calcium & Bone Health: The Science Beyond Dairy',
    summary: 'Bone density optimization requires more than calcium. This review covers the calcium-vitamin D-K2 axis, magnesium co-factors, and the evidence on supplementation for fracture prevention.',
    tags: ['Calcium', 'Bone Health', 'Vitamin D', 'Vitamin K2', 'Osteoporosis'],
  },
  'cancer-prevention-lifestyle-factors': {
    category: 'preventive-health',
    coverImage: '/images/posts/cancer-prevention.svg',
    title: 'Cancer Prevention: Lifestyle Factors with the Strongest Evidence',
    summary: 'Up to 40% of cancers are preventable through modifiable lifestyle factors. This review examines the highest-quality evidence on diet, exercise, sleep, and environmental exposures.',
    tags: ['Cancer Prevention', 'Lifestyle', 'Diet', 'Exercise', 'Longevity'],
  },
};

// continued postMeta
const postMeta2 = {
  'checking-heart-early-warning-signs': {
    category: 'early-signs',
    coverImage: '/images/posts/hrv-stress.svg',
    title: 'Early Warning Signs of Heart Disease: What to Check Now',
    summary: 'Cardiovascular disease rarely appears without warning. This guide covers the silent biomarkers — CAC score, ApoB, Lp(a), and hs-CRP — that predict cardiac events years in advance.',
    tags: ['Heart Disease', 'Early Warning', 'ApoB', 'CAC Score', 'Cardiovascular'],
  },
  'cholesterol-vs-lipid-profile-difference': {
    category: 'clinical-testing',
    coverImage: '/images/posts/cholesterol.svg',
    title: 'Cholesterol vs Full Lipid Profile: What Your Doctor Should Order',
    summary: 'Total cholesterol is an outdated metric. Learn why ApoB, LDL particle number, and Lp(a) provide far superior cardiovascular risk stratification than standard cholesterol panels.',
    tags: ['Cholesterol', 'LDL', 'ApoB', 'Lipid Profile', 'Cardiovascular Risk'],
  },
  'cold-exposure-hormesis-adaptation': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/cold-therapy.svg',
    title: 'Cold Exposure & Hormesis: How Cold Stress Strengthens Biology',
    summary: 'Deliberate cold exposure activates hormetic pathways that improve metabolic health, boost norepinephrine, and enhance brown adipose tissue activation. The clinical evidence reviewed.',
    tags: ['Cold Exposure', 'Hormesis', 'Norepinephrine', 'Brown Fat', 'Resilience'],
  },
  'cold-plunges-benefits-cold-therapy': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/cold-therapy.svg',
    title: 'Cold Plunge Benefits: A Data-Driven Review of Cold Water Immersion',
    summary: 'Cold water immersion has exploded in popularity, but which benefits are evidence-based? This review examines muscle recovery, mood enhancement, metabolism, and immune effects.',
    tags: ['Cold Plunge', 'Ice Bath', 'Cold Therapy', 'Recovery', 'Inflammation'],
  },
  'common-medical-blood-tests-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/blood-tests.svg',
    title: 'Common Medical Blood Tests: What Every Result Means',
    summary: 'A complete guide to interpreting standard blood test results — from CBC and metabolic panel to thyroid, hormones, and inflammatory markers — with optimal reference ranges.',
    tags: ['Blood Tests', 'Lab Results', 'CBC', 'Metabolic Panel', 'Diagnostics'],
  },
  'common-medicine-longevity-metformin': {
    category: 'preventive-health',
    coverImage: '/images/posts/metformin.svg',
    title: 'Metformin and Longevity: What the Research Actually Shows',
    summary: 'Metformin is the most prescribed diabetes drug and a leading longevity research candidate. This review covers AMPK activation, mTOR inhibition, and the TAME trial evidence.',
    tags: ['Metformin', 'Longevity', 'AMPK', 'mTOR', 'Anti-Aging'],
  },
  'common-nutrient-deficiencies-signs': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/nutrients-deficiency.svg',
    title: 'Common Nutrient Deficiencies: Signs Your Body Is Sending You',
    summary: 'Subclinical nutrient deficiencies affect millions without obvious symptoms. Learn the subtle physical signs of deficiencies in vitamin D, B12, iron, magnesium, and zinc.',
    tags: ['Nutrient Deficiency', 'Vitamins', 'Minerals', 'Fatigue', 'Symptoms'],
  },
  'compare-hba1c-fasting-blood-sugar': {
    category: 'clinical-testing',
    coverImage: '/images/posts/hba1c-test.svg',
    title: 'HbA1c vs Fasting Glucose: Which Test Tells You More?',
    summary: 'HbA1c and fasting glucose measure different aspects of blood sugar regulation. This clinical comparison explains when each test is appropriate and what optimal ranges look like.',
    tags: ['HbA1c', 'Fasting Glucose', 'Diabetes', 'Metabolic Health', 'Blood Sugar'],
  },
  'complete-blood-count-interpretation': {
    category: 'clinical-testing',
    coverImage: '/images/posts/cbc-test.svg',
    title: 'Complete Blood Count (CBC): A Comprehensive Guide to Interpretation',
    summary: 'The CBC is the most ordered lab test in medicine, yet few patients understand what it reveals. A detailed walkthrough of every CBC component with clinical context.',
    tags: ['CBC', 'Blood Count', 'Anemia', 'WBC', 'Diagnostics'],
  },
  'creatine-cognitive-physical-performance': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/creatine.svg',
    title: 'Creatine: The Evidence for Cognitive and Physical Performance',
    summary: 'Creatine is among the most studied supplements in existence. This review covers its mechanisms for ATP regeneration, cognitive enhancement, and muscle performance across age groups.',
    tags: ['Creatine', 'Performance', 'Cognitive Function', 'Muscle', 'Supplementation'],
  },
};

const postMeta3 = {
  'diagnostic-tests-iron-deficiency': {
    category: 'clinical-testing',
    coverImage: '/images/posts/iron-ferritin.svg',
    title: 'Diagnosing Iron Deficiency: The Tests You Actually Need',
    summary: 'Iron deficiency is often missed with simple haemoglobin checks alone. This guide covers the full iron panel — serum iron, ferritin, TIBC, and transferrin saturation — with optimal targets.',
    tags: ['Iron Deficiency', 'Ferritin', 'TIBC', 'Anemia', 'Lab Tests'],
  },
  'dietary-supplements-guide': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamins-supplements.svg',
    title: 'The Evidence-Based Dietary Supplements Guide for 2025',
    summary: 'Not all supplements are created equal. A clinician-reviewed guide ranking supplements by strength of evidence for longevity, cognition, immunity, and metabolic health.',
    tags: ['Dietary Supplements', 'Evidence-Based', 'Vitamins', 'Minerals', 'Health Optimization'],
  },
  'dna-medicine-how-pills-work': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/dna-medicine.svg',
    title: 'DNA Medicine: How Your Genes Determine Drug Response',
    summary: 'Pharmacogenomics reveals why the same medication works brilliantly for one person and fails — or harms — another. The science of gene-drug interactions explained.',
    tags: ['Pharmacogenomics', 'DNA', 'Drug Response', 'Personalized Medicine', 'Genetics'],
  },
  'dopamine-detox-resetting-focus': {
    category: 'mental-awareness',
    coverImage: '/images/posts/dopamine-focus.svg',
    title: 'Dopamine Detox: Resetting Your Brain\'s Reward System',
    summary: 'Chronic overstimulation dysregulates the dopamine system, reducing motivation and pleasure. The neuroscience behind dopamine reset protocols and digital minimalism.',
    tags: ['Dopamine', 'Focus', 'Digital Detox', 'Reward System', 'Neuroscience'],
  },
  'eating-brain-health-alzheimers-prevention': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/brain-diet.svg',
    title: 'Diet and Brain Health: Evidence-Based Alzheimer\'s Prevention',
    summary: 'The connection between dietary patterns and cognitive decline is strong and modifiable. A comprehensive review of the MIND diet, omega-3s, and neuroprotective nutrients.',
    tags: ['Brain Health', 'Alzheimer\'s', 'MIND Diet', 'Cognitive Decline', 'Neuroprotection'],
  },
  'fasting-autophagy-cellular-cleanup': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/fasting-autophagy.svg',
    title: 'Fasting and Autophagy: The Science of Cellular Self-Cleaning',
    summary: 'Autophagy is the cellular recycling process triggered by fasting that removes damaged proteins and organelles. A detailed review of the evidence on fasting protocols and cellular renewal.',
    tags: ['Autophagy', 'Fasting', 'Cellular Health', 'mTOR', 'Longevity'],
  },
  'fasting-blood-glucose-insulin-testing': {
    category: 'clinical-testing',
    coverImage: '/images/posts/fasting-glucose.svg',
    title: 'Fasting Glucose & Insulin Testing: Interpreting Your Results',
    summary: 'Fasting glucose alone misses early insulin resistance. Learn why fasting insulin, HOMA-IR, and post-meal glucose tracking provide a far more complete picture of metabolic health.',
    tags: ['Fasting Glucose', 'Insulin', 'HOMA-IR', 'Metabolic Health', 'Pre-Diabetes'],
  },
  'fat-soluble-vs-water-soluble-vitamins': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/fat-vitamins.svg',
    title: 'Fat-Soluble vs Water-Soluble Vitamins: Key Differences Explained',
    summary: 'Fat-soluble vitamins (A, D, E, K) accumulate in tissue and carry toxicity risks. Water-soluble vitamins are excreted daily. Understanding this distinction is essential for safe supplementation.',
    tags: ['Fat-Soluble Vitamins', 'Water-Soluble Vitamins', 'Supplementation', 'Toxicity', 'Absorption'],
  },
  'fatty-liver-nafld-reversal': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/fatty-liver.svg',
    title: 'Fatty Liver Disease (NAFLD): How to Reverse It Naturally',
    summary: 'Non-alcoholic fatty liver disease affects 1 in 4 adults globally and often goes undetected. Evidence-based review of dietary interventions, exercise, and metabolic approaches to reversal.',
    tags: ['NAFLD', 'Fatty Liver', 'Liver Health', 'Metabolic Syndrome', 'Diet'],
  },
  'folate-b-vitamins-genes-energy': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/folate-b.svg',
    title: 'Folate, B Vitamins & Genetics: The MTHFR Connection',
    summary: 'MTHFR gene variants affect folate metabolism in up to 40% of the population, influencing homocysteine levels, methylation, and cardiovascular risk. A complete clinical review.',
    tags: ['Folate', 'MTHFR', 'B Vitamins', 'Methylation', 'Homocysteine'],
  },
};

const postMeta4 = {
  'foods-rich-essential-vitamins-minerals': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/diet-foods.svg',
    title: 'Foods Rich in Essential Vitamins & Minerals: A Clinical Reference',
    summary: 'A comprehensive food-first guide to meeting micronutrient needs through diet before resorting to supplementation, with bioavailability data for every major nutrient.',
    tags: ['Micronutrients', 'Food Sources', 'Vitamins', 'Minerals', 'Diet'],
  },
  'genetic-testing-health-optimization': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/genetic-testing.svg',
    title: 'Genetic Testing for Health Optimization: What You Actually Learn',
    summary: 'Direct-to-consumer genetic tests reveal risk tendencies, not destiny. This guide explains which genetic insights are clinically actionable and which require professional interpretation.',
    tags: ['Genetic Testing', 'DNA', 'SNPs', 'Personalized Medicine', 'APOE'],
  },
  'good-fats-gut-fiber-benefits': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/good-fats-fiber.svg',
    title: 'Healthy Fats and Dietary Fiber: The Evidence for Gut and Heart Health',
    summary: 'Monounsaturated and polyunsaturated fats, combined with diverse fiber intake, form the nutritional foundation of cardiovascular and gut microbiome health.',
    tags: ['Healthy Fats', 'Fiber', 'Gut Health', 'Omega-3', 'Cardiovascular'],
  },
  'gut-health-mind-connection': {
    category: 'immune-support',
    coverImage: '/images/posts/gut-brain.svg',
    title: 'The Gut-Brain Connection: How Your Microbiome Shapes Mental Health',
    summary: 'The gut-brain axis is a bidirectional communication highway. Research links microbiome composition to anxiety, depression, and cognitive performance via the vagus nerve and metabolites.',
    tags: ['Gut-Brain Axis', 'Microbiome', 'Mental Health', 'Serotonin', 'Vagus Nerve'],
  },
  'gut-microbiome-diet-diversity': {
    category: 'immune-support',
    coverImage: '/images/posts/gut-microbiome.svg',
    title: 'Your Gut Microbiome: Why Diversity Is Your Greatest Health Asset',
    summary: 'The 38 trillion microbes in your gut regulate immunity, metabolism, and mental state. A clinical review of how dietary diversity shapes microbiome composition and health outcomes.',
    tags: ['Gut Microbiome', 'Diet Diversity', 'Immunity', 'Probiotics', 'Prebiotics'],
  },
  'gut-permeability-autoimmune-connection': {
    category: 'immune-support',
    coverImage: '/images/posts/leaky-gut.svg',
    title: 'Gut Permeability and Autoimmune Disease: The Leaky Gut Evidence',
    summary: 'Increased intestinal permeability allows bacterial endotoxins into circulation, potentially triggering systemic inflammation and autoimmune conditions. The clinical evidence reviewed.',
    tags: ['Leaky Gut', 'Intestinal Permeability', 'Autoimmune', 'Inflammation', 'Zonulin'],
  },
  'healthy-diet-principles-longevity': {
    category: 'preventive-health',
    coverImage: '/images/posts/healthy-diet.svg',
    title: 'Dietary Principles for Longevity: What the Evidence Says',
    summary: 'Blue zone populations and clinical trial data converge on consistent dietary patterns. This review synthesizes the highest-quality evidence on diet, lifespan, and healthspan.',
    tags: ['Longevity Diet', 'Blue Zones', 'Mediterranean Diet', 'Plant-Based', 'Healthspan'],
  },
  'heart-attack-prevention-essential-tests': {
    category: 'clinical-testing',
    coverImage: '/images/posts/blood-pressure.svg',
    title: 'Heart Attack Prevention: The Essential Tests to Get Before Age 50',
    summary: 'Most heart attacks are preventable with early detection. The evidence-based panel of tests — CAC score, ApoB, Lp(a), hs-CRP, and homocysteine — that should be on every proactive health checklist.',
    tags: ['Heart Attack Prevention', 'CAC Score', 'ApoB', 'Cardiovascular Tests', 'Preventive Cardiology'],
  },
  'heart-rate-variability-stress-energy': {
    category: 'mental-awareness',
    coverImage: '/images/posts/hrv-stress.svg',
    title: 'Heart Rate Variability: Your Window Into Stress and Recovery',
    summary: 'HRV is the single most actionable wearable metric for tracking autonomic nervous system health, stress load, and recovery readiness. A complete clinical guide to measurement and interpretation.',
    tags: ['HRV', 'Heart Rate Variability', 'Stress', 'Recovery', 'Autonomic Nervous System'],
  },
  'heat-therapy-infrared-sauna-benefits': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/sauna-heat.svg',
    title: 'Heat Therapy & Infrared Sauna: Clinical Benefits and Evidence',
    summary: 'Far-infrared sauna exposure mimics the cardiovascular effects of moderate exercise. A review of the evidence for cardiovascular protection, detoxification, and neurocognitive benefits.',
    tags: ['Infrared Sauna', 'Heat Therapy', 'Cardiovascular', 'Detoxification', 'Sauna'],
  },
};

const postMeta5 = {
  'hemoglobin-a1c-complete-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/hba1c-test.svg',
    title: 'Hemoglobin A1c: The Complete Guide to Understanding Your Score',
    summary: 'HbA1c reflects average blood glucose over 90 days and is the gold standard for diabetes diagnosis and management. This guide covers interpretation, limitations, and optimal targets.',
    tags: ['HbA1c', 'Diabetes', 'Blood Sugar', 'Glycation', 'Metabolic Health'],
  },
  'immune-senescence-aging-immunity': {
    category: 'immune-support',
    coverImage: '/images/posts/immune-aging.svg',
    title: 'Immune Senescence: How Your Immune System Ages and What to Do',
    summary: 'Immunosenescence — the age-related decline of immune function — increases susceptibility to infection, cancer, and autoimmunity. Lifestyle interventions that measurably slow immune aging.',
    tags: ['Immunosenescence', 'Immune Aging', 'T Cells', 'Inflammation', 'Immunity'],
  },
  'importance-vitamin-d-screening': {
    category: 'clinical-testing',
    coverImage: '/images/posts/vitamin-d-test.svg',
    title: 'Vitamin D Screening: Why Testing Matters More Than You Think',
    summary: 'Over 40% of adults are vitamin D deficient, yet most never get tested. This review explains optimal 25-OH vitamin D levels, testing protocols, and the downstream health implications.',
    tags: ['Vitamin D', 'Testing', 'Deficiency', 'Screening', '25-OH Vitamin D'],
  },
  'inflammation-silent-killer-chronic-disease': {
    category: 'early-signs',
    coverImage: '/images/posts/inflammation.svg',
    title: 'Chronic Inflammation: The Silent Driver of Modern Disease',
    summary: 'Low-grade chronic inflammation underlies heart disease, diabetes, cancer, and neurodegeneration. A review of inflammatory biomarkers, dietary triggers, and anti-inflammatory strategies.',
    tags: ['Chronic Inflammation', 'hs-CRP', 'IL-6', 'Inflammatory Markers', 'Anti-Inflammatory'],
  },
  'insulin-resistance-early-warning': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/insulin-resistance.svg',
    title: 'Insulin Resistance: Early Warning Signs and How to Reverse It',
    summary: 'Insulin resistance develops silently for years before diabetes diagnosis. The earliest biomarkers — fasting insulin, triglyceride:HDL ratio, and waist circumference — that reveal it early.',
    tags: ['Insulin Resistance', 'Pre-Diabetes', 'Metabolic Syndrome', 'Fasting Insulin', 'HOMA-IR'],
  },
  'intermittent-fasting-complete-guide': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/fasting-autophagy.svg',
    title: 'Intermittent Fasting: The Complete Evidence-Based Guide',
    summary: 'A comprehensive review of every major intermittent fasting protocol — 16:8, 5:2, OMAD, and extended fasting — with clinical evidence on metabolic health, longevity, and cognitive function.',
    tags: ['Intermittent Fasting', '16:8', 'Metabolic Health', 'Weight Loss', 'Autophagy'],
  },
  'iron-profile-ferritin-testing': {
    category: 'clinical-testing',
    coverImage: '/images/posts/iron-ferritin.svg',
    title: 'Iron Profile & Ferritin Testing: The Complete Interpretation Guide',
    summary: 'Ferritin is both a storage marker and an acute phase reactant. This guide explains how to correctly interpret the full iron panel including serum iron, TIBC, and transferrin saturation.',
    tags: ['Ferritin', 'Iron', 'TIBC', 'Transferrin', 'Anemia'],
  },
  'keeping-brain-sharp-early-memory-changes': {
    category: 'early-signs',
    coverImage: '/images/posts/brain-diet.svg',
    title: 'Keeping Your Brain Sharp: Early Signs of Cognitive Decline',
    summary: 'Cognitive decline begins decades before dementia symptoms appear. The early neurological signs — word-finding difficulty, processing speed changes — and the interventions that reverse them.',
    tags: ['Cognitive Decline', 'Memory', 'Brain Health', 'Dementia Prevention', 'Neuroplasticity'],
  },
  'keeping-immune-system-young': {
    category: 'immune-support',
    coverImage: '/images/posts/immune-aging.svg',
    title: 'Keeping Your Immune System Young: Evidence-Based Strategies',
    summary: 'Thymic involution, chronic viral infections, and inflammation accelerate immune aging. Research-backed interventions including exercise, diet, and targeted supplementation that preserve immune youth.',
    tags: ['Immune Health', 'Immunosenescence', 'Thymus', 'Vaccines', 'Longevity'],
  },
  'kidney-function-tests-creatinine-egfr': {
    category: 'clinical-testing',
    coverImage: '/images/posts/kidney-test.svg',
    title: 'Kidney Function Tests: Understanding Creatinine, eGFR, and BUN',
    summary: 'Kidney function declines silently and is often not caught until significant damage is done. A guide to interpreting creatinine, eGFR, BUN/creatinine ratio, and cystatin-C.',
    tags: ['Kidney Function', 'eGFR', 'Creatinine', 'BUN', 'Renal Health'],
  },
};

const postMeta6 = {
  'kidney-health-simple-urine-test': {
    category: 'clinical-testing',
    coverImage: '/images/posts/kidney-test.svg',
    title: 'Kidney Health: What a Simple Urine Test Reveals',
    summary: 'A basic urinalysis and urine albumin-creatinine ratio can detect early kidney damage years before serum creatinine rises. Learn what to look for in your urine test results.',
    tags: ['Urine Test', 'Kidney Health', 'Albumin', 'Proteinuria', 'Renal Function'],
  },
  'lipid-profile-beyond-cholesterol': {
    category: 'clinical-testing',
    coverImage: '/images/posts/cholesterol.svg',
    title: 'Beyond Cholesterol: Getting the Full Lipid Profile',
    summary: 'Standard cholesterol tests miss critical cardiovascular risk. Advanced lipid profiling including ApoB, ApoA1, Lp(a), and oxidized LDL provides the complete picture.',
    tags: ['Lipid Profile', 'ApoB', 'LDL', 'Lp(a)', 'Cardiovascular Risk'],
  },
  'liver-function-tests-explained': {
    category: 'clinical-testing',
    coverImage: '/images/posts/liver-test.svg',
    title: 'Liver Function Tests Explained: ALT, AST, GGT, and More',
    summary: 'Liver function tests reveal hepatic stress before symptoms appear. This comprehensive guide explains every liver enzyme and protein marker with clinical reference ranges and causes of elevation.',
    tags: ['Liver Function', 'ALT', 'AST', 'GGT', 'Hepatic Health'],
  },
  'living-longer-science-slowing-aging': {
    category: 'preventive-health',
    coverImage: '/images/posts/longevity.svg',
    title: 'The Science of Living Longer: How to Slow Biological Aging',
    summary: 'Aging is programmable, not inevitable. A comprehensive review of the hallmarks of aging — senescence, telomere shortening, proteostasis — and the interventions with the strongest evidence.',
    tags: ['Longevity', 'Anti-Aging', 'Hallmarks of Aging', 'Healthspan', 'Lifespan'],
  },
  'magnesium-deficiency-health-effects': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/magnesium.svg',
    title: 'Magnesium Deficiency: The Widespread Mineral Shortage Affecting Your Health',
    summary: 'Magnesium is involved in over 300 enzymatic reactions yet 50% of adults are deficient. Symptoms, testing, the best forms for supplementation, and clinical evidence reviewed.',
    tags: ['Magnesium', 'Mineral Deficiency', 'Sleep', 'Muscle Function', 'Cardiovascular'],
  },
  'meditation-brain-neuroscience': {
    category: 'mental-awareness',
    coverImage: '/images/posts/meditation-brain.svg',
    title: 'Meditation and the Brain: What Neuroscience Shows',
    summary: 'fMRI and EEG research on long-term meditators reveals measurable changes in gray matter density, default mode network activity, and stress reactivity. The science behind mindfulness.',
    tags: ['Meditation', 'Neuroscience', 'Brain', 'Mindfulness', 'Gray Matter'],
  },
  'mental-health-executive-performance': {
    category: 'mental-awareness',
    coverImage: '/images/posts/executive-mental.svg',
    title: 'Mental Health and Executive Performance: The High-Performer\'s Guide',
    summary: 'High-achieving professionals face unique psychological stressors including decision fatigue, imposter syndrome, and perfectionism. Evidence-based mental performance optimization strategies.',
    tags: ['Executive Health', 'Mental Performance', 'Burnout', 'Cognitive Load', 'Peak Performance'],
  },
  'micronutrient-deficiencies-fatigue': {
    category: 'early-signs',
    coverImage: '/images/posts/nutrients-deficiency.svg',
    title: 'Micronutrient Deficiencies and Fatigue: The Hidden Connections',
    summary: 'Persistent fatigue unrelated to sleep is often a micronutrient issue. A systematic review of iron, B12, vitamin D, magnesium, and thyroid deficiencies as overlooked causes of chronic tiredness.',
    tags: ['Fatigue', 'Micronutrient Deficiency', 'Iron', 'B12', 'Vitamin D'],
  },
  'mindfulness-anxiety-clinical-evidence': {
    category: 'mental-awareness',
    coverImage: '/images/posts/mindfulness.svg',
    title: 'Mindfulness for Anxiety: What Clinical Trials Actually Show',
    summary: 'MBSR (Mindfulness-Based Stress Reduction) has the strongest clinical evidence of any mind-body intervention for anxiety and depression. An analysis of the major RCTs.',
    tags: ['Mindfulness', 'Anxiety', 'MBSR', 'Depression', 'Mental Health'],
  },
  'multivitamin-evidence-who-needs-it': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/multivitamin.svg',
    title: 'Multivitamins: Who Actually Needs Them According to the Evidence',
    summary: 'Large RCTs on multivitamins have produced mixed results. This review identifies the specific populations who benefit most and explains why food-first nutrition remains the gold standard.',
    tags: ['Multivitamin', 'Supplementation', 'Micronutrients', 'Evidence-Based', 'Prevention'],
  },
};

const postMeta7 = {
  'multivitamin-evidence-who-needs-one': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/multivitamin.svg',
    title: 'Multivitamin Evidence: Who Needs One and Who Doesn\'t',
    summary: 'A clinical analysis of the multivitamin literature separating marketing from evidence, identifying the gap-filling value of specific nutrients in specific populations.',
    tags: ['Multivitamin', 'Supplementation', 'Deficiency Prevention', 'Nutrition', 'Vitamins'],
  },
  'omega-3-brain-heart-science': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/omega3.svg',
    title: 'Omega-3 Fatty Acids: The Science for Brain and Heart Health',
    summary: 'EPA and DHA omega-3 fatty acids have the most robust evidence base of any supplement for cardiovascular and neurological health. A comprehensive review of mechanisms and dosing.',
    tags: ['Omega-3', 'EPA', 'DHA', 'Fish Oil', 'Brain Health', 'Cardiovascular'],
  },
  'physical-fitness-longevity-exercise-science': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/vo2max.svg',
    title: 'Physical Fitness and Longevity: What Exercise Science Tells Us',
    summary: 'Cardiorespiratory fitness is the single strongest predictor of all-cause mortality — stronger than smoking, obesity, or diabetes. The exercise science of lifespan optimization.',
    tags: ['Fitness', 'Longevity', 'VO2 Max', 'Exercise Science', 'Healthspan'],
  },
  'plant-based-diet-benefits-limits': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/plant-based.svg',
    title: 'Plant-Based Diet: Evidence-Based Benefits and Real Limitations',
    summary: 'Plant-based diets reduce chronic disease risk but carry specific nutritional risks if not carefully planned. An objective review of the benefits, limitations, and critical nutrients to monitor.',
    tags: ['Plant-Based Diet', 'Vegan', 'Vegetarian', 'B12', 'Iron', 'Nutrition'],
  },
  'posture-back-pain-sedentary-fix': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/posture-body.svg',
    title: 'Posture, Back Pain, and the Sedentary Fix: What the Evidence Shows',
    summary: 'Sitting is not the enemy — sustained static loading is. The biomechanics of spinal loading, evidence-based postural corrections, and movement strategies for desk workers.',
    tags: ['Posture', 'Back Pain', 'Sedentary', 'Ergonomics', 'Movement'],
  },
  'pre-diabetes-catching-sugar-problems-early': {
    category: 'early-signs',
    coverImage: '/images/posts/blood-sugar.svg',
    title: 'Pre-Diabetes: Catching Blood Sugar Problems Before They Progress',
    summary: 'Pre-diabetes affects 1 in 3 adults and can be completely reversed with early action. The diagnostic criteria, screening tests, and lifestyle interventions with the strongest evidence.',
    tags: ['Pre-Diabetes', 'Blood Sugar', 'Insulin Resistance', 'Prevention', 'Glucose'],
  },
  'preparation-blood-tests-fasting-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/blood-tests.svg',
    title: 'How to Prepare for Blood Tests: The Complete Fasting Guide',
    summary: 'Improper preparation invalidates many blood tests. A definitive guide to which tests require fasting, for how long, what can be consumed, and how to ensure accurate results.',
    tags: ['Blood Tests', 'Fasting', 'Lab Preparation', 'Accuracy', 'Diagnostics'],
  },
  'protein-muscle-aging-sarcopenia': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/protein-muscle.svg',
    title: 'Protein, Muscle, and Aging: Preventing Sarcopenia',
    summary: 'Sarcopenia — age-related muscle loss — begins in the 30s and accelerates without intervention. Protein requirements change with age, and the evidence on leucine, timing, and resistance training.',
    tags: ['Protein', 'Sarcopenia', 'Muscle Loss', 'Aging', 'Resistance Training'],
  },
  'red-light-therapy-boosting-energy': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/red-light.svg',
    title: 'Red Light Therapy: Evidence for Energy, Recovery, and Skin',
    summary: 'Photobiomodulation (red and near-infrared light) stimulates mitochondrial cytochrome c oxidase, increasing ATP production. A critical review of the clinical evidence for therapeutic applications.',
    tags: ['Red Light Therapy', 'Photobiomodulation', 'Mitochondria', 'Recovery', 'Skin Health'],
  },
  'role-of-magnesium-body-systems': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/magnesium.svg',
    title: 'The Role of Magnesium in the Body: Every System It Affects',
    summary: 'Magnesium is required for ATP synthesis, DNA repair, nerve conduction, and muscle contraction. A comprehensive overview of magnesium\'s role in every major body system.',
    tags: ['Magnesium', 'ATP', 'Nerve Function', 'Cardiovascular', 'Supplementation'],
  },
};

const postMeta8 = {
  'routine-health-checkup-tests-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/blood-tests.svg',
    title: 'Routine Health Checkup Tests: The Complete Annual Panel Guide',
    summary: 'Annual blood work is your health insurance policy. A structured guide to the complete preventive screening panel — stratified by age and risk — with optimal reference ranges.',
    tags: ['Annual Blood Work', 'Health Checkup', 'Preventive Screening', 'Lab Tests', 'Biomarkers'],
  },
  'sauna-benefits-heat-heart-cells': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/sauna-heat.svg',
    title: 'Sauna Benefits: The Evidence for Heart Health and Cellular Repair',
    summary: 'Finnish sauna research spanning 30 years shows dose-dependent reductions in cardiovascular mortality. A review of heat shock proteins, cardiovascular adaptations, and longevity pathways.',
    tags: ['Sauna', 'Heat Therapy', 'Heart Health', 'HSP', 'Longevity'],
  },
  'science-zombie-cells-stay-young': {
    category: 'preventive-health',
    coverImage: '/images/posts/senescent-cells.svg',
    title: 'Zombie Cells (Senescent Cells): The Science of Staying Young',
    summary: 'Senescent cells accumulate with age, secreting inflammatory signals that corrupt neighboring tissue. Senolytics — drugs and natural compounds that clear zombie cells — represent the frontier of rejuvenation.',
    tags: ['Senescence', 'Senolytics', 'Zombie Cells', 'SASP', 'Anti-Aging'],
  },
  'sleep-brain-deep-sleep-cleaning': {
    category: 'sleep-recovery',
    coverImage: '/images/posts/sleep-brain.svg',
    title: 'Sleep and the Brain: How Deep Sleep Cleans Your Mind',
    summary: 'The glymphatic system — active only during deep NREM sleep — flushes amyloid-beta and tau proteins from the brain. Disrupted sleep is now firmly linked to Alzheimer\'s risk.',
    tags: ['Sleep', 'Glymphatic System', 'Amyloid', 'Deep Sleep', 'Brain Health'],
  },
  'sleep-quality-circadian-rhythm-optimization': {
    category: 'sleep-recovery',
    coverImage: '/images/posts/sleep-circadian.svg',
    title: 'Sleep Architecture: Optimizing Your Circadian Rhythm for Peak Performance',
    summary: 'Sleep quality is determined by circadian alignment, not just duration. The biology of sleep stages, circadian disruption consequences, and evidence-based protocols for restorative sleep.',
    tags: ['Sleep', 'Circadian Rhythm', 'Circadian Biology', 'Performance', 'Recovery'],
  },
  'sleep-sunlight-aligning-body-clock': {
    category: 'sleep-recovery',
    coverImage: '/images/posts/sleep-sunlight.svg',
    title: 'Sunlight, Darkness, and Sleep: Aligning Your Body Clock',
    summary: 'Morning sunlight exposure and evening light blocking are the two most powerful circadian regulators available. The photobiology behind light exposure and its effects on sleep quality.',
    tags: ['Circadian Rhythm', 'Sunlight', 'Melatonin', 'Blue Light', 'Sleep Quality'],
  },
  'somatic-breathwork-simple-breathing': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/breathwork.svg',
    title: 'Somatic Breathwork: Simple Breathing Techniques with Clinical Benefits',
    summary: 'Somatic breathing practices regulate the autonomic nervous system, reduce cortisol, and improve HRV. A clinical guide to techniques with measurable physiological outcomes.',
    tags: ['Somatic Breathwork', 'Breathing Techniques', 'Nervous System', 'Cortisol', 'HRV'],
  },
  'strength-training-after-40': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/strength-training.svg',
    title: 'Strength Training After 40: The Science of Building Muscle as You Age',
    summary: 'Hormonal changes after 40 make muscle-building harder but not impossible. Evidence-based adjustments to volume, intensity, recovery, and protein intake for older athletes.',
    tags: ['Strength Training', 'Aging', 'Testosterone', 'Hypertrophy', 'Sarcopenia Prevention'],
  },
  'strength-training-benefits-myokines': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/strength-training.svg',
    title: 'Strength Training Benefits: The Myokine Revolution in Exercise Science',
    summary: 'Skeletal muscle is an endocrine organ secreting myokines — signaling molecules with systemic anti-inflammatory and neuroprotective effects. The science of resistance exercise beyond muscle.',
    tags: ['Strength Training', 'Myokines', 'Irisin', 'Anti-Inflammatory', 'Exercise Science'],
  },
  'stress-cortisol-adrenal-function': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/cortisol-stress.svg',
    title: 'Stress, Cortisol, and Adrenal Function: What the Science Shows',
    summary: 'Chronic cortisol elevation reshapes the brain, disrupts metabolism, and accelerates aging. A clinical review of the HPA axis, cortisol dysregulation, and evidence-based stress management.',
    tags: ['Cortisol', 'Stress', 'HPA Axis', 'Adrenal', 'Chronic Stress'],
  },
};

const postMeta9 = {
  'sugar-hidden-sources-metabolic-damage': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/sugar-damage.svg',
    title: 'Hidden Sugar Sources and Metabolic Damage: What You\'re Not Seeing',
    summary: 'Added sugars hide in 74% of packaged foods under 61 different names. The mechanisms of fructose metabolism, AGE formation, and insulin-independent glucose toxicity reviewed.',
    tags: ['Sugar', 'Hidden Sugar', 'Metabolic Damage', 'Fructose', 'AGEs'],
  },
  'telomeres-aging-lifestyle-protection': {
    category: 'personalized-medicine',
    coverImage: '/images/posts/telomeres.svg',
    title: 'Telomeres and Aging: How Lifestyle Protects Your DNA',
    summary: 'Telomere length is a genomic aging clock. Lifestyle factors — exercise, stress, diet, sleep — measurably influence telomerase activity and telomere attrition rate in human studies.',
    tags: ['Telomeres', 'Telomerase', 'DNA Aging', 'Epigenetics', 'Biological Age'],
  },
  'testosterone-optimization-men': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/testosterone.svg',
    title: 'Testosterone Optimization in Men: What Actually Works',
    summary: 'Total testosterone is declining 1% per year across generations. This review covers lifestyle optimization — sleep, weight training, diet, and stress — as the first-line approach before hormone therapy.',
    tags: ['Testosterone', 'Hormone Optimization', 'Male Health', 'TRT', 'Androgen'],
  },
  'thyroid-function-energy-metabolism': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/thyroid-hormones.svg',
    title: 'Thyroid Function and Energy Metabolism: Understanding the Connection',
    summary: 'The thyroid gland regulates metabolic rate, heart function, body temperature, and bone density. How thyroid dysfunction presents early and what the optimal testing panel looks like.',
    tags: ['Thyroid', 'Metabolism', 'Energy', 'Hypothyroidism', 'TSH'],
  },
  'thyroid-profile-full-panel-guide': {
    category: 'clinical-testing',
    coverImage: '/images/posts/thyroid-test.svg',
    title: 'The Full Thyroid Panel: TSH, T3, T4, and Antibodies Explained',
    summary: 'TSH alone misses significant thyroid dysfunction. A complete guide to the full thyroid panel including free T3, free T4, reverse T3, and thyroid antibodies with optimal reference ranges.',
    tags: ['Thyroid Panel', 'TSH', 'T3', 'T4', 'Hashimoto\'s'],
  },
  'understanding-burnout-stress-focus': {
    category: 'mental-awareness',
    coverImage: '/images/posts/burnout-stress.svg',
    title: 'Understanding Burnout: The Neuroscience of Chronic Stress and Recovery',
    summary: 'Clinical burnout is a neurobiological condition, not a weakness. The evidence on prefrontal cortex shrinkage, HPA axis dysregulation, and evidence-based recovery protocols.',
    tags: ['Burnout', 'Chronic Stress', 'HPA Axis', 'Recovery', 'Mental Health'],
  },
  'understanding-leaky-gut-chronic-inflammation': {
    category: 'immune-support',
    coverImage: '/images/posts/leaky-gut.svg',
    title: 'Leaky Gut and Chronic Inflammation: The Evidence-Based Overview',
    summary: 'Intestinal permeability is measurable and linked to a spectrum of conditions from IBS to autoimmune disease. What the clinical evidence says about zonulin, tight junctions, and dietary triggers.',
    tags: ['Leaky Gut', 'Intestinal Permeability', 'Chronic Inflammation', 'Zonulin', 'Gut Health'],
  },
  'understanding-thyroid-function-test-results': {
    category: 'clinical-testing',
    coverImage: '/images/posts/thyroid-test.svg',
    title: 'Understanding Thyroid Function Test Results: A Patient Guide',
    summary: 'Most patients are handed thyroid results without adequate interpretation. A plain-language guide to understanding TSH, T3, T4, and antibody results with clinical reference ranges.',
    tags: ['Thyroid Tests', 'TSH', 'Hypothyroidism', 'Hashimoto\'s', 'Lab Interpretation'],
  },
  'uric-acid-gout-metabolic-risk': {
    category: 'clinical-testing',
    coverImage: '/images/posts/uric-acid.svg',
    title: 'Uric Acid, Gout, and Metabolic Risk: Beyond Joint Pain',
    summary: 'Elevated uric acid is not just a gout risk marker — it independently predicts cardiovascular disease, kidney damage, and insulin resistance. Optimal targets and dietary management reviewed.',
    tags: ['Uric Acid', 'Gout', 'Metabolic Risk', 'Fructose', 'Kidney Health'],
  },
  'vitamin-a-retinol-vision-immunity': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-a.svg',
    title: 'Vitamin A and Retinol: Vision, Immunity, and the Toxicity Line',
    summary: 'Vitamin A is essential for vision, epithelial integrity, and immune function — but is one of the most toxic vitamins when over-supplemented. The clinical evidence on dosing, forms, and testing.',
    tags: ['Vitamin A', 'Retinol', 'Vision', 'Immunity', 'Beta-Carotene'],
  },
};

const postMeta10 = {
  'vitamin-a-vision-immune-skin': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-a.svg',
    title: 'Vitamin A for Vision, Immunity, and Skin: A Clinical Review',
    summary: 'Retinol and beta-carotene serve different physiological roles. This review covers vitamin A\'s mechanisms in rhodopsin synthesis, mucosal immunity, and skin cell turnover.',
    tags: ['Vitamin A', 'Vision', 'Immunity', 'Skin Health', 'Retinol'],
  },
  'vitamin-b12-deficiency-symptoms-fix': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-b12.svg',
    title: 'Vitamin B12 Deficiency: Symptoms, Testing, and How to Fix It',
    summary: 'B12 deficiency causes neurological damage that can become irreversible if untreated. The hidden risk groups — vegans, metformin users, elderly — and the most effective supplementation forms.',
    tags: ['Vitamin B12', 'Deficiency', 'Neurological', 'Methylcobalamin', 'Supplementation'],
  },
  'vitamin-b12-deficiency-symptoms-testing': {
    category: 'clinical-testing',
    coverImage: '/images/posts/vitamin-b12.svg',
    title: 'Vitamin B12 Deficiency Testing: What Labs to Order and Why',
    summary: 'Serum B12 alone misses 50% of functional B12 deficiency. The case for testing methylmalonic acid and homocysteine as functional markers of B12 adequacy.',
    tags: ['B12 Testing', 'Methylmalonic Acid', 'Homocysteine', 'Deficiency', 'Lab Tests'],
  },
  'vitamin-c-health-benefits-immune': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-c.svg',
    title: 'Vitamin C: The Evidence for Immune Health and Beyond',
    summary: 'Vitamin C is far more than an immune supplement. A review of its role in collagen synthesis, iron absorption, antioxidant function, and high-dose IV therapy research.',
    tags: ['Vitamin C', 'Ascorbic Acid', 'Immunity', 'Collagen', 'Antioxidant'],
  },
  'vitamin-c-immune-collagen-science': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-c.svg',
    title: 'Vitamin C, Immunity, and Collagen: The Complete Science',
    summary: 'Ascorbic acid is essential for hydroxylation reactions in collagen synthesis and functions as a critical aqueous-phase antioxidant. The science behind dosing, timing, and bioavailability.',
    tags: ['Vitamin C', 'Collagen', 'Immunity', 'Antioxidant', 'Skin Health'],
  },
  'vitamin-d-immune-function-sun': {
    category: 'nutrition-supplements',
    coverImage: '/images/posts/vitamin-d.svg',
    title: 'Vitamin D, Immunity, and Sun Exposure: The Research Overview',
    summary: 'Vitamin D is a hormone affecting over 2,000 genes. This review covers its role in innate and adaptive immunity, cancer prevention, mood regulation, and safe sun exposure protocols.',
    tags: ['Vitamin D', 'Immunity', 'Sun Exposure', 'Deficiency', 'Supplementation'],
  },
  'vitamin-d-test-optimal-levels': {
    category: 'clinical-testing',
    coverImage: '/images/posts/vitamin-d-test.svg',
    title: 'Vitamin D Testing: Optimal Levels and What Your Result Means',
    summary: '25-OH vitamin D is the standard test, but interpretation varies significantly. A guide to optimal versus deficient levels, testing frequency, and how supplementation dose affects test results.',
    tags: ['Vitamin D', '25-OH', 'Testing', 'Optimal Levels', 'Supplementation'],
  },
  'vo2-max-explained-long-life': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/vo2max.svg',
    title: 'VO2 Max Explained: Why It\'s the Best Predictor of Long Life',
    summary: 'Low cardiorespiratory fitness is a more powerful predictor of mortality than smoking. What VO2 max measures, how to test it, and evidence-based training protocols to improve it.',
    tags: ['VO2 Max', 'Cardiorespiratory Fitness', 'Longevity', 'Zone 2', 'Exercise'],
  },
  'weight-loss-science-metabolism': {
    category: 'hormones-metabolism',
    coverImage: '/images/posts/weight-loss.svg',
    title: 'Weight Loss and Metabolism: What the Science Actually Says',
    summary: 'Energy balance is necessary but not sufficient for sustainable weight loss. The roles of hormonal adaptation, gut microbiome, sleep, and metabolic rate in long-term body composition management.',
    tags: ['Weight Loss', 'Metabolism', 'Leptin', 'Hormones', 'Body Composition'],
  },
  'yoga-longevity-flexibility-science': {
    category: 'wellness-somatics',
    coverImage: '/images/posts/yoga-flexibility.svg',
    title: 'Yoga and Longevity: What the Flexibility Science Shows',
    summary: 'Regular yoga practice measurably reduces inflammatory markers, improves autonomic function, and enhances flexibility. A review of clinical evidence for yoga as a longevity tool.',
    tags: ['Yoga', 'Flexibility', 'Longevity', 'Inflammation', 'Stress Reduction'],
  },
  'zone-2-cardio-energy-metabolism': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/zone2-training.svg',
    title: 'Zone 2 Cardio and Energy Metabolism: The Science of Fat Burning',
    summary: 'Zone 2 training maximizes mitochondrial biogenesis and fat oxidation capacity. The metabolic physiology of low-intensity cardio and why it outperforms high-intensity training for metabolic health.',
    tags: ['Zone 2', 'Fat Burning', 'Metabolism', 'Mitochondria', 'Cardio'],
  },
  'zone-2-training-mitochondria': {
    category: 'fitness-metabolic',
    coverImage: '/images/posts/zone2-training.svg',
    title: 'Zone 2 Training and Mitochondrial Health: The Foundation of Metabolic Fitness',
    summary: 'Zone 2 cardiovascular training builds the metabolic foundation that makes all other health pursuits more effective. A deep dive into mitochondrial biogenesis and fat oxidation physiology.',
    tags: ['Zone 2', 'Mitochondria', 'VO2 Max', 'Metabolic Health', 'Cardio'],
  },
};

// Merge all meta objects
const ALL_META = Object.assign(
  {}, postMeta, postMeta2, postMeta3, postMeta4, postMeta5,
  postMeta6, postMeta7, postMeta8, postMeta9, postMeta10
);

const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'));

let updated = 0;
let skipped = 0;

files.forEach(file => {
  const slug = file.replace('.mdx', '');
  const meta = ALL_META[slug];
  const fullPath = path.join(postsDir, file);
  const raw = fs.readFileSync(fullPath, 'utf8');

  // Parse existing frontmatter (handles both LF and CRLF)
  const normalised = raw.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const fmMatch = normalised.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) { console.log(`SKIP (no frontmatter): ${file}`); skipped++; return; }
  const raw2 = normalised;

  const fmRaw = fmMatch[1];
  const body = raw2.slice(fmMatch[0].length);

  // Extract existing values
  const getVal = (key) => {
    const m = fmRaw.match(new RegExp(`${key}:\\s*"([^"]+)"`));
    return m ? m[1] : null;
  };

  const newTitle = meta ? meta.title : getVal('title');
  const newSummary = meta ? meta.summary : getVal('summary');
  const newCategory = meta ? meta.category : getVal('category');
  const newCoverImage = meta ? meta.coverImage : getVal('coverImage');
  const newTagsArr = meta ? meta.tags : [];
  const newTagsStr = meta ? `[${meta.tags.map(t => `"${t}"`).join(', ')}]` : getVal('tags') || '[]';

  // Preserve existing fields we do not override
  const preserveLines = [];
  const overrideKeys = ['title', 'summary', 'category', 'coverImage', 'tags'];
  fmRaw.split('\n').forEach(line => {
    const key = line.match(/^(\w[\w-]*):/)?.[1];
    if (key && !overrideKeys.includes(key)) {
      preserveLines.push(line);
    }
  });

  const newFm = [
    `title: "${newTitle}"`,
    ...preserveLines,
    `category: "${newCategory}"`,
    `tags: ${newTagsStr}`,
    `coverImage: "${newCoverImage}"`,
    `summary: "${newSummary}"`,
  ].join('\n');

  const newContent = `---\n${newFm}\n---${body}`;
  fs.writeFileSync(fullPath, newContent, 'utf8');
  updated++;
  console.log(`✅ Updated: ${file}`);
});

console.log(`\nDone: ${updated} updated, ${skipped} skipped.`);
