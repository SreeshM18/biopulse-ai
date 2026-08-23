import { 
  CareGuideSymptomRecord,
  ContraceptionMethodRecord,
  SexualHealthTopicRecord,
  BodyPartSystemRecord,
  ComprehensiveClinicalMonograph,
  PharmaDosageForm,
  PharmaAdministrationRoute
} from '../types/biotech';
import { calculateLevenshteinDistance } from './medSearchEngine';

/* =========================================================================
   1. COMMON SYMPTOMS & CLINICAL CARE GUIDES
   ========================================================================= */

export const CAREGUIDE_SYMPTOMS_DATABASE: CareGuideSymptomRecord[] = [
  {
    id: 'sym-fever',
    symptomName: 'Fever (Pyrexia / Elevated Body Temp)',
    aliases: ['fever', 'i have fever', 'high temperature', 'feeling hot and chills', 'feverish', 'pyrexia', 'body heat'],
    category: 'General / Pain / Fever',
    briefOverview: 'A temporary rise in body temperature (usually >38°C / 100.4°F) commonly triggered by the immune response to viral, bacterial, or inflammatory causes.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Antipyretics & Analgesics (Oral / Syrup / IV)',
        pharmacologicalRole: 'Inhibits hypothalamic prostaglandin E2 (PGE2) synthesis to lower the thermoregulatory set-point and relieve associated malaise.',
        representativeExamples: ['Paracetamol / Acetaminophen', 'Ibuprofen (NSAID)'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Oral Rehydration Electrolyte Solutions',
        pharmacologicalRole: 'Prevents dehydration caused by increased insensible fluid loss during sweating and hyperthermia.',
        representativeExamples: ['WHO-Formula ORS', 'Electrolyte fluids'],
        prescriptionRequirement: 'OTC'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Maintain liberal hydration with water, clear broths, or oral rehydration solution (ORS).',
      'Rest in a comfortably cool, well-ventilated room wearing lightweight clothing.',
      'Lukewarm sponge bath if uncomfortable (avoid ice-cold water or alcohol rubs as they cause shivering).'
    ],
    pediatricCareNotes: 'In children and infants, doses MUST be strictly calculated by body weight (e.g. Paracetamol 10-15 mg/kg Q4-6H; Ibuprofen 5-10 mg/kg Q6-8H). NEVER administer Aspirin to anyone under 19 due to the fatal risk of Reye’s syndrome.',
    pregnancyCareNotes: 'Paracetamol is the first-line antipyretic recommended in pregnancy when clinically necessary at the lowest effective dose. Avoid NSAIDs (Ibuprofen) especially in the 3rd trimester.',
    emergencyRedFlagsChecklist: [
      'Temperature > 103°F (39.4°C) unresponsive to antipyretics or lasting > 3 consecutive days.',
      'Stiff neck (nuchal rigidity), inability to touch chin to chest, or photophobia (Meningism).',
      'New non-blanching petechial or purpuric rash (glass test positive).',
      'Acute shortness of breath, cyanosis, confusion, or extreme lethargy.',
      'Febrile seizure or altered mental status.'
    ]
  },
  {
    id: 'sym-cold-cough',
    symptomName: 'Common Cold, Cough & Upper Respiratory Congestion',
    aliases: ['cold', 'headache and cold', 'cough and cold', 'runny nose', 'nasal congestion', 'blocked nose', 'sore throat and cold', 'flu'],
    category: 'Respiratory / ENT',
    briefOverview: 'Acute viral upper respiratory tract infection (Rhinovirus, Coronavirus, RSV) characterized by nasal congestion, sneezing, sore throat, and productive or dry cough.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Nasal Decongestants & Hypertonic Saline',
        pharmacologicalRole: 'Sympathomimetic vasoconstriction of nasal mucosal arterioles reducing airway resistance, plus saline mucociliary clearance.',
        representativeExamples: ['Oxymetazoline 0.05% Nasal Spray', 'Xylometazoline', 'Isotonic/Hypertonic Saline Spray'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Antihistamines & Decongestant Combos',
        pharmacologicalRole: 'Blocks H1 receptors to curb rhinorrhea, sneezing, and ocular tearing.',
        representativeExamples: ['Cetirizine', 'Loratadine', 'Chlorpheniramine'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Expectorants & Mucolytics',
        pharmacologicalRole: 'Decreases mucus viscosity and increases respiratory tract fluid secretion to facilitate productive expectoration.',
        representativeExamples: ['Guaifenesin', 'Ambroxol', 'N-Acetylcysteine'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Antitussives (Dry Cough Suppressants)',
        pharmacologicalRole: 'Centrally suppresses the medullary cough center for exhausting, non-productive hacking coughs.',
        representativeExamples: ['Dextromethorphan'],
        prescriptionRequirement: 'OTC'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Warm steam inhalation and honey with warm water for soothing throat irritation (honey for age >1 year only).',
      'Frequent saline nasal irrigation to clear viscous viral secretions.',
      'Elevate head of bed during sleep to mitigate post-nasal drip.'
    ],
    pediatricCareNotes: 'Avoid multi-ingredient OTC cough & cold syrups in children under 6 years without pediatric prescription. Limit topical decongestant sprays to maximum 3-5 days to avoid rebound rhinitis (rhinitis medicamentosa).',
    emergencyRedFlagsChecklist: [
      'Stridor, audible wheezing, or respiratory rate > 25 breaths/min (tachypnea).',
      'Hemoptysis (coughing up blood or rust-colored sputum).',
      'Persistent high fever lasting > 4 days or sudden secondary clinical deterioration (bacterial superinfection).',
      'Chest pain with inspiration or inability to speak in full sentences.'
    ]
  },
  {
    id: 'sym-headache',
    symptomName: 'Headache (Tension, Migraine & Sinus Discomfort)',
    aliases: ['headache', 'head pain', 'migraine', 'head ache', 'temple throbbing', 'tension headache', 'severe headache'],
    category: 'General / Pain / Fever',
    briefOverview: 'Cranial or facial pain arising from muscular tension, vascular vasodilation (migraine), sinonasal pressure, or neurovascular activation.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Non-Opioid Analgesics & NSAIDs',
        pharmacologicalRole: 'Inhibits peripheral and central prostaglandin synthesis to attenuate nociceptive pain signals.',
        representativeExamples: ['Paracetamol 500-1000mg', 'Ibuprofen 400mg', 'Naproxen 250-500mg'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: '5-HT1B/1D Receptor Agonists (Triptans)',
        pharmacologicalRole: 'Selective cranial vasoconstriction and inhibition of calcitonin gene-related peptide (CGRP) release for acute migraine attacks.',
        representativeExamples: ['Sumatriptan 50-100mg', 'Zolmitriptan'],
        prescriptionRequirement: 'Prescription'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Rest in a quiet, dark room with a cool compress across forehead or temples.',
      'Drink 500-1000 mL of water (dehydration is one of the most common reversible triggers).',
      'Gentle neck and shoulder stretching.'
    ],
    emergencyRedFlagsChecklist: [
      '⚡ "Thunderclap" headache: Instantaneous peak intensity within seconds ("worst headache of life") $\rightarrow$ Subarachnoid Hemorrhage rule-out.',
      'Headache accompanied by focal neurological deficits (unilateral weakness, slurred speech, facial droop, vision loss).',
      'New headache onset with systemic fever and neck stiffness.',
      'Headache following head trauma with progressive somnolence.'
    ]
  },
  {
    id: 'sym-acidity-gerd',
    symptomName: 'Acidity, Heartburn & Acid Reflux (GERD)',
    aliases: ['acidity', 'heartburn', 'acid reflux', 'gerd', 'burning chest stomach', 'sour burps', 'indigestion', 'gas and acidity'],
    category: 'Gastrointestinal',
    briefOverview: 'Retro-sternal burning sensation and acid regurgitation caused by gastric acid refluxing through an incompetent lower esophageal sphincter (LES).',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Fast-Acting Antacid Oral Suspensions / Chewables',
        pharmacologicalRole: 'Chemical neutralization of gastric hydrochloric acid (HCl) within minutes, providing rapid symptomatic relief.',
        representativeExamples: ['Magnesium Hydroxide + Aluminium Hydroxide + Simethicone', 'Sodium Alginate'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'H2 Receptor Antagonists (H2RAs)',
        pharmacologicalRole: 'Reversibly blocks histamine H2 receptors on parietal cells, reducing basal and nocturnal acid secretion for 8-12 hours.',
        representativeExamples: ['Famotidine 20-40mg'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Proton Pump Inhibitors (PPIs)',
        pharmacologicalRole: 'Irreversibly inhibits the H+/K+ ATPase enzyme system for potent 24-hour gastric acid suppression.',
        representativeExamples: ['Omeprazole 20mg', 'Pantoprazole 40mg', 'Esomeprazole 40mg'],
        prescriptionRequirement: 'OTC'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Avoid lying flat for at least 2-3 hours after meals.',
      'Elevate head of bed by 6 inches with a wedge pillow.',
      'Avoid known trigger foods (deep fried, high fat, chocolate, coffee, alcohol, citrus, spicy peppers).'
    ],
    emergencyRedFlagsChecklist: [
      'Chest pressure or burning radiating to left arm, neck, or jaw associated with diaphoresis (Must exclude Acute Myocardial Infarction).',
      'Dysphagia (difficulty swallowing) or Odynophagia (painful swallowing).',
      'Unexplained progressive weight loss or persistent vomiting.',
      'Hematemesis (coffee-ground vomiting) or melena (black tarry stools).'
    ]
  },
  {
    id: 'sym-period-pain',
    symptomName: 'Period Pain & Menstrual Cramps (Dysmenorrhea)',
    aliases: ['period pain', 'period cramps', 'menstrual pain', 'dysmenorrhea', 'menstrual cramps', 'pain during period', 'stomach cramps period'],
    category: 'Women’s Health & Reproductive',
    briefOverview: 'Pelvic and lower abdominal cramping pain caused by endometrial prostaglandin F2-alpha (PGF2α) hypersecretion inducing intense uterine myometrial contractions and localized ischemia.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Prostaglandin-Inhibiting NSAIDs',
        pharmacologicalRole: 'Blocks cyclooxygenase (COX-1/COX-2) enzymes to dramatically reduce endometrial prostaglandin synthesis.',
        representativeExamples: ['Mefenamic Acid 250-500mg', 'Ibuprofen 400mg', 'Naproxen Sodium 275-550mg'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Antispasmodic Smooth-Muscle Relaxants',
        pharmacologicalRole: 'Relaxes smooth muscle spasm in pelvic visceral structures.',
        representativeExamples: ['Drotaverine Hydrochloride 40-80mg', 'Dicyclomine'],
        prescriptionRequirement: 'Prescription'
      },
      {
        categoryName: 'Hormonal Contraceptive Suppression',
        pharmacologicalRole: 'Suppresses ovulation and thins the endometrial lining, drastically reducing prostaglandin production.',
        representativeExamples: ['Combined Oral Contraceptive Pills (COCs)', 'Levonorgestrel IUS'],
        prescriptionRequirement: 'Prescription'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Apply a continuous local heat pad or hot water bottle to lower abdomen (proven equivalent to OTC analgesics in clinical trials).',
      'Gentle aerobic activity and pelvic stretches.',
      'Adequate hydration and magnesium-rich nutrition.'
    ],
    emergencyRedFlagsChecklist: [
      'Sudden severe unilateral pelvic pain with dizziness or syncope (Ectopic Pregnancy or Ovarian Torsion emergency).',
      'Abnormally heavy bleeding (soaking >2 sanitary pads per hour for 2+ consecutive hours).',
      'Fever, foul-smelling vaginal discharge, and severe pelvic tenderness (Pelvic Inflammatory Disease).',
      'Progressively worsening pain unresponsive to maximum OTC therapy.'
    ]
  },
  {
    id: 'sym-allergy',
    symptomName: 'Allergies, Hay Fever & Urticaria (Hives)',
    aliases: ['allergy', 'allergic reaction', 'hives', 'urticaria', 'hay fever', 'itching', 'skin allergy', 'dust allergy', 'pollen allergy'],
    category: 'General / Pain / Fever',
    briefOverview: 'Immune-mediated hypersensitivity characterized by mast cell histamine release causing pruritus, sneezing, rhinorrhea, conjunctival erythema, and urticarial wheals.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Non-Sedating 2nd-Generation Oral Antihistamines',
        pharmacologicalRole: 'Selective peripheral H1-receptor antagonism without significant blood-brain barrier penetration or sedation.',
        representativeExamples: ['Cetirizine 10mg', 'Loratadine 10mg', 'Fexofenadine 120-180mg', 'Bilastine 20mg'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Intranasal Corticosteroid Sprays',
        pharmacologicalRole: 'Potent local anti-inflammatory downregulation of inflammatory cytokines and eosinophil migration.',
        representativeExamples: ['Fluticasone Furoate', 'Mometasone Furoate', 'Budesonide'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Ophthalmic Antihistamine / Mast Cell Stabilizer Drops',
        pharmacologicalRole: 'Topical ocular dual-action H1 blockade and mast cell membrane stabilization for itchy, watery eyes.',
        representativeExamples: ['Olopatadine 0.1%', 'Ketotifen 0.025%'],
        prescriptionRequirement: 'OTC'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Identify and minimize exposure to specific allergens (pollen, dust mites, pet dander).',
      'Cool compresses on urticarial skin lesions to relieve itching.',
      'Saline nasal rinse after outdoor exposure.'
    ],
    emergencyRedFlagsChecklist: [
      '🚨 ANAPHYLAXIS EMERGENCY: Any lip swelling, tongue edema, difficulty breathing, stridor, or lightheadedness $\rightarrow$ Inject Epinephrine (EpiPen) & Call Emergency Services immediately.',
      'Widespread blistering skin eruption with mucosal involvement (mouth/eyes) $\rightarrow$ Stevens-Johnson Syndrome alert.',
      'Severe wheezing unresponsive to inhalers.'
    ]
  },
  {
    id: 'sym-fungal-skin',
    symptomName: 'Fungal Skin Infections (Tinea, Athlete’s Foot, Ringworm)',
    aliases: ['fungal skin infection', 'fungal infection', 'ringworm', 'athletes foot', 'jock itch', 'tinea', 'skin fungus', 'fungus'],
    category: 'Dermatology',
    briefOverview: 'Superficial dermatophyte fungal colonization of keratinized epidermal layers causing ring-shaped scaling plaques, maceration, and intense pruritus.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Topical Allylamine & Azole Antifungal Creams / Gels',
        pharmacologicalRole: 'Inhibits fungal squalene epoxidase or lanosterol 14-alpha demethylase, disrupting ergosterol synthesis and fungal cell membrane integrity.',
        representativeExamples: ['Terbinafine 1% Cream', 'Clotrimazole 1% Cream', 'Ketoconazole 2% Cream', 'Miconazole'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Antifungal Absorbent Dusting Powders',
        pharmacologicalRole: 'Maintains skin dryness in intertriginous skin folds while delivering antimicrobial active agent.',
        representativeExamples: ['Clotrimazole 1% Absorbent Powder'],
        prescriptionRequirement: 'OTC'
      },
      {
        categoryName: 'Oral Systemic Antifungals (Widespread / Resistant)',
        pharmacologicalRole: 'Systemic distribution into skin, hair, and nails for extensive or recalcitrant fungal infections.',
        representativeExamples: ['Fluconazole 150mg', 'Itraconazole 100-200mg', 'Terbinafine Oral'],
        prescriptionRequirement: 'Prescription'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Keep affected area clean and completely dry (dry thoroughly with a clean dedicated towel after bathing).',
      'Wear loose, breathable 100% cotton clothing; change socks daily.',
      'Continue applying topical antifungal for 1-2 weeks AFTER clinical lesions resolve to prevent recurrence.'
    ],
    emergencyRedFlagsChecklist: [
      'Spreading erythema, warmth, severe pain, or purulent drainage indicative of secondary bacterial cellulitis.',
      'Involvement in an immunocompromised patient or diabetic foot ulceration.',
      'Rapidly disseminating lesions with systemic fever.'
    ]
  },
  {
    id: 'sym-asthma',
    symptomName: 'Asthma & Bronchospasm (Wheezing & Airway Constriction)',
    aliases: ['asthma', 'wheezing', 'inhaler', 'breathing difficulty asthma', 'bronchospasm', 'chest tightness wheeze'],
    category: 'Respiratory / ENT',
    briefOverview: 'Chronic inflammatory disorder of the airways characterized by bronchial hyper-responsiveness, smooth muscle bronchoconstriction, and excessive mucus production.',
    commonlyUsedMedicineCategories: [
      {
        categoryName: 'Short-Acting Beta-2 Agonists (SABA Reliever Inhalers)',
        pharmacologicalRole: 'Stimulates airway beta-2 adrenergic receptors on bronchial smooth muscle, producing rapid bronchodilation within 3-5 minutes.',
        representativeExamples: ['Salbutamol / Albuterol 100mcg MDI', 'Levosalbutamol'],
        prescriptionRequirement: 'Prescription'
      },
      {
        categoryName: 'Inhaled Corticosteroid (ICS Maintenance Controllers)',
        pharmacologicalRole: 'Downregulates airway eosinophilic inflammation and prevents exacerbation frequency.',
        representativeExamples: ['Fluticasone Propionate', 'Budesonide', 'Beclomethasone'],
        prescriptionRequirement: 'Prescription'
      },
      {
        categoryName: 'ICS + Long-Acting Beta Agonist (LABA) Combinations',
        pharmacologicalRole: 'Dual synergistic anti-inflammatory and sustained 12-24 hour bronchodilation (SMART protocol).',
        representativeExamples: ['Formoterol + Budesonide', 'Salmeterol + Fluticasone'],
        prescriptionRequirement: 'Prescription'
      }
    ],
    evidenceBasedSelfCareMeasures: [
      'Always carry prescribed rapid-acting reliever inhaler at all times with a spacer device.',
      'Rinse mouth thoroughly with water and spit out after using steroid inhalers to prevent oral candidiasis (thrush).',
      'Monitor personal Peak Expiratory Flow (PEF) and follow personalized written Asthma Action Plan.'
    ],
    emergencyRedFlagsChecklist: [
      '🚨 RED ZONE ASTHMA ATTACK: Severe breathlessness, inability to complete sentences in one breath, accessory muscle use (intercostal retractions).',
      'Peak Flow < 50% of personal best.',
      'Reliever inhaler (Salbutamol 4-8 puffs) produces no clinical improvement within 10 minutes $\rightarrow$ EMERGENCY ROOM IMMEDIATELY.',
      'Cyanosis of lips or fingernails, drowsiness, or exhaustion.'
    ]
  }
];

/* =========================================================================
   2. SEXUAL HEALTH, CONTRACEPTION & EMERGENCY PROTOCOL DATABASE
   ========================================================================= */

export const CONTRACEPTION_METHODS_DATABASE: ContraceptionMethodRecord[] = [
  {
    id: 'contra-barrier-external-condom',
    methodName: 'External (Male) Condom',
    category: 'Barrier',
    howItWorks: 'Sheath made of latex, polyurethane, or polyisoprene fitted over the erect penis before any genital contact, physically trapping ejaculate and preventing sperm from entering the vagina.',
    pregnancyPreventionRate: '98% with perfect use; 87-93% with typical real-world use',
    providesStiProtection: true,
    stiProtectionExplanation: 'YES — Highly effective at reducing the transmission risk of HIV, Chlamydia, Gonorrhea, Trichomoniasis, and significantly lowers HPV and HSV transmission where skin is covered.',
    durationOfEfficacy: 'Single-use per sexual act',
    advantages: [
      'Dual protection: Prevents both pregnancy AND sexually transmitted infections (STIs).',
      'Widely accessible OTC without medical prescription or clinic appointment.',
      'Non-hormonal: Zero systemic side effects, drug interactions, or impact on future fertility.',
      'Immediate efficacy and immediate reversibility.'
    ],
    disadvantages: [
      'Requires correct application every single time before genital contact.',
      'Risk of breakage or slippage if sized incorrectly or used with incompatible oil-based lubricants.'
    ],
    commonSideEffects: ['Rare contact dermatitis in individuals with natural latex allergy (use Polyisoprene or Polyurethane condoms instead).'],
    seriousWarnings: ['NEVER use oil-based lubricants (Vaseline, baby oil, cooking oils) with latex condoms as oil degrades latex within 60 seconds.'],
    whoMayNeedMedicalReview: 'Individuals with suspected latex hypersensitivity or recurrent slippage issues.',
    prescriptionRequirement: 'OTC / Non-Prescription'
  },
  {
    id: 'contra-barrier-internal-condom',
    methodName: 'Internal (Female) Condom',
    category: 'Barrier',
    howItWorks: 'Flexible, lubricated nitrile or polyurethane sheath with flexible rings at both ends inserted into the vagina (or anus) before sexual activity, providing an internal barrier against fluid exchange.',
    pregnancyPreventionRate: '95% with perfect use; 79-88% with typical real-world use',
    providesStiProtection: true,
    stiProtectionExplanation: 'YES — Provides significant protection against HIV and bacterial/viral STIs, covering internal vaginal walls and external genitalia.',
    durationOfEfficacy: 'Single-use per sexual act (can be inserted up to 8 hours in advance)',
    advantages: [
      'Dual protection against pregnancy and STIs.',
      'Can be inserted hours prior to sexual activity, not dependent on immediate male erection.',
      'Latex-free (compatible with all water- and silicone-based lubricants).'
    ],
    disadvantages: [
      'Requires practice for comfortable insertion.',
      'Less widely available in some retail stores.'
    ],
    commonSideEffects: ['Mild local friction if insufficiently lubricated.'],
    seriousWarnings: ['Do NOT use an internal condom simultaneously with an external male condom (friction causes tearing).'],
    whoMayNeedMedicalReview: 'Anyone needing guidance on correct placement and ring orientation.',
    prescriptionRequirement: 'OTC / Non-Prescription'
  },
  {
    id: 'contra-emergency-levonorgestrel',
    methodName: 'Emergency Contraceptive Pill (Levonorgestrel 1.5mg)',
    category: 'Emergency Contraception',
    howItWorks: 'High-dose progestin that prevents or delays the luteinizing hormone (LH) surge, stopping the ovary from releasing an egg. If ovulation has already occurred, it is significantly less effective.',
    pregnancyPreventionRate: 'Reduces risk of pregnancy by 85-95% when taken within 24 hours; efficacy drops if delayed up to 72 hours',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Emergency contraceptive pills provide ZERO protection against HIV, HPV, Chlamydia, or other STIs.',
    durationOfEfficacy: 'Single emergency incident (does not protect against subsequent unprotected acts in the same cycle)',
    advantages: [
      'Available OTC in many countries without a doctor prescription.',
      'Safe and effective single-dose oral tablet.',
      'Does NOT interrupt or terminate an established implanted pregnancy.'
    ],
    disadvantages: [
      'Must be taken as soon as possible after unprotected intercourse (ideally <24 hours, max 72 hours).',
      'Reduced efficacy in individuals with BMI > 25-30 kg/m2 (Ulipristal or Copper IUD preferred).'
    ],
    commonSideEffects: ['Nausea (14-23%)', 'Fatigue', 'Headache', 'Temporary alteration of next menstrual period timing (may arrive a few days early or late)'],
    seriousWarnings: ['Emergency contraception is NOT an abortion pill. It will NOT terminate an established implanted pregnancy. If vomiting occurs within 2 hours of ingestion, a repeat dose is required.'],
    whoMayNeedMedicalReview: 'Patients with severe hepatic impairment, unexplained vaginal bleeding, or taking hepatic enzyme inducers (Efavirenz, Carbamazepine, St. John’s Wort).',
    prescriptionRequirement: 'OTC / Non-Prescription'
  },
  {
    id: 'contra-emergency-ulipristal',
    methodName: 'Emergency Contraceptive Pill (Ulipristal Acetate 30mg)',
    category: 'Emergency Contraception',
    howItWorks: 'Selective Progesterone Receptor Modulator (SPRM) that prevents or delays ovulation even after the LH surge has started, remaining effective up to 120 hours (5 days) post-intercourse.',
    pregnancyPreventionRate: 'Reduces risk of pregnancy by ~98% throughout the entire 120-hour window (superior efficacy to Levonorgestrel in later hours)',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Zero protection against STIs.',
    durationOfEfficacy: 'Single emergency episode',
    advantages: [
      'Maintains consistent high efficacy up to 120 hours (5 days) post-incident.',
      'More effective than Levonorgestrel for individuals with higher body mass.'
    ],
    disadvantages: [
      'May require a medical prescription or pharmacist consultation in certain jurisdictions.',
      'Must avoid starting progestin-containing regular hormonal contraception for 5 days after taking Ulipristal (they interfere with each other).'
    ],
    commonSideEffects: ['Headache', 'Dysmenorrhea', 'Abdominal pain', 'Nausea'],
    seriousWarnings: ['Do NOT use if already pregnant. Not recommended in patients with severe uncontrolled asthma or severe liver disease.'],
    whoMayNeedMedicalReview: 'Patients breastfeeding (pump and discard milk for 1 week) or taking CYP3A4 inducers.',
    prescriptionRequirement: 'Prescription Only'
  },
  {
    id: 'contra-combined-pill',
    methodName: 'Combined Oral Contraceptive Pill (COC - Estrogen + Progestin)',
    category: 'Combined Oral Contraception',
    howItWorks: 'Suppresses pituitary gonadotropins (FSH/LH) to prevent ovulation, thickens cervical mucus to impede sperm penetration, and atrophies endometrial lining.',
    pregnancyPreventionRate: '99.7% with perfect daily use; 91% with typical use',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Does not protect against any STIs.',
    durationOfEfficacy: 'Daily oral tablet regimen (21/7 or 28-day packs)',
    advantages: [
      'Highly effective, discreet, and non-invasive.',
      'Regulates menstrual cycles, reduces dysmenorrhea, and improves acne.',
      'Rapid return to fertility upon discontinuation.'
    ],
    disadvantages: [
      'Requires strict daily compliance at the same time every day.',
      'Small increased risk of venous thromboembolism (blood clots).'
    ],
    commonSideEffects: ['Nausea during first 1-3 months', 'Breast tenderness', 'Breakthrough spotting', 'Mild mood fluctuations'],
    seriousWarnings: ['CONTRAINDICATED in smokers aged ≥35 years, history of DVT/PE, migraine with aura, uncontrolled hypertension, or ischemic heart disease.'],
    whoMayNeedMedicalReview: 'Patients with elevated blood pressure, cardiovascular disease risk, or liver adenoma.',
    prescriptionRequirement: 'Prescription Only'
  },
  {
    id: 'contra-progestin-only-pill',
    methodName: 'Progestin-Only Pill (POP / Mini-Pill)',
    category: 'Progestin-Only Pills',
    howItWorks: 'Thickens cervical mucus to prevent sperm entry and thins the endometrium; desogestrel/drospirenone POPs also consistently suppress ovulation.',
    pregnancyPreventionRate: '99% with perfect use; 91% with typical use',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Does not protect against STIs.',
    durationOfEfficacy: 'Continuous daily oral tablet without pill-free intervals',
    advantages: [
      'Estrogen-free: Safe for breastfeeding mothers, smokers ≥35, and individuals with cardiovascular/DVT contraindications to estrogen.',
      'No increased risk of thromboembolism.'
    ],
    disadvantages: [
      'Traditional levonorgestrel/norethindrone POPs have a strict 3-hour daily dosing window (Desogestrel has a 12-hour window).',
      'Irregular bleeding or amenorrhea is common.'
    ],
    commonSideEffects: ['Irregular spotting', 'Amenorrhea (absence of periods)', 'Acne in some users'],
    seriousWarnings: ['If a pill is delayed beyond the allowed window, use backup barrier contraception (condoms) for 48 hours.'],
    whoMayNeedMedicalReview: 'Patients taking anticonvulsants or rifampin.',
    prescriptionRequirement: 'Prescription Only'
  },
  {
    id: 'contra-iud-copper',
    methodName: 'Copper Intrauterine Device (Copper T 380A / Non-Hormonal IUD)',
    category: 'IUD / IUS',
    howItWorks: 'T-shaped device placed in uterine cavity; continuously releases copper ions which exert a potent spermicidal cytotoxic effect, preventing fertilization. Also serves as the most effective emergency contraception if inserted within 5 days.',
    pregnancyPreventionRate: '>99.2% (Top-tier "Get-it-and-forget-it" efficacy)',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Zero STI protection.',
    durationOfEfficacy: 'Approved for up to 10 to 12 years of continuous protection',
    advantages: [
      '100% Hormone-free: No systemic metabolic or mood side effects.',
      'Most effective emergency contraceptive method available (>99.9% efficacy up to 5 days).',
      'Immediate return of fertility upon removal.'
    ],
    disadvantages: [
      'Requires in-clinic insertion and removal by a trained healthcare professional.',
      'May increase menstrual bleeding volume and cramping during the first 3-6 months.'
    ],
    commonSideEffects: ['Heavier periods', 'Intermenstrual spotting during initial months'],
    seriousWarnings: ['Contraindicated in Wilson’s disease, active pelvic infection (PID), or severe uterine cavity distortion.'],
    whoMayNeedMedicalReview: 'Individuals with baseline heavy menorrhagia or unexplained pelvic pain.',
    prescriptionRequirement: 'Clinic / Procedure Required'
  },
  {
    id: 'contra-iud-hormonal-mirena',
    methodName: 'Levonorgestrel Intrauterine System (LNG-IUS / Mirena / Kyleena)',
    category: 'IUD / IUS',
    howItWorks: 'Releases a continuous low microgram dose of levonorgestrel locally into the uterine cavity, thickening cervical mucus, atrophying the endometrium, and reducing menstrual flow by up to 90%.',
    pregnancyPreventionRate: '>99.8% (More effective than tubal ligation)',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Zero STI protection.',
    durationOfEfficacy: 'Approved for 5 to 8 years depending on model',
    advantages: [
      'Drastically reduces menstrual pain and heavy bleeding (FDA-approved for treating menorrhagia).',
      'Extremely high efficacy with zero daily adherence required.',
      'Minimal systemic hormone absorption compared to oral pills.'
    ],
    disadvantages: [
      'Requires clinic insertion procedure.',
      'Irregular spotting during the first 3-6 months before periods become very light or cease.'
    ],
    commonSideEffects: ['Amenorrhea (desired by many users)', 'Initial irregular spotting', 'Ovarian follicular cysts (usually asymptomatic and resolve spontaneously)'],
    seriousWarnings: ['Rare risk of uterine perforation during insertion (1 per 1000 insertions) or expulsion (2-5%).'],
    whoMayNeedMedicalReview: 'Active PID, purulent cervicitis, or progestin-sensitive malignancies.',
    prescriptionRequirement: 'Clinic / Procedure Required'
  },
  {
    id: 'contra-implant',
    methodName: 'Contraceptive Subdermal Implant (Etonogestrel Nexplanon 68mg)',
    category: 'Implants',
    howItWorks: 'Single flexible 4cm rod inserted subdermally in the inner upper arm, releasing continuous etonogestrel to inhibit ovulation and thicken cervical mucus.',
    pregnancyPreventionRate: '>99.95% (The most effective reversible contraceptive in medicine)',
    providesStiProtection: false,
    stiProtectionExplanation: 'NO — Zero STI protection.',
    durationOfEfficacy: 'Up to 3 to 5 years',
    advantages: [
      'Highest efficacy rate of any reversible contraceptive method.',
      'Completely independent of user memory or sexual coitus.',
      'Safe during breastfeeding.'
    ],
    disadvantages: [
      'Requires minor in-clinic subdermal insertion under local anesthesia.',
      'Unpredictable bleeding patterns (frequent light spotting or complete amenorrhea).'
    ],
    commonSideEffects: ['Irregular bleeding pattern', 'Mild headache', 'Acne in predisposed individuals'],
    seriousWarnings: ['Must be properly palpated beneath the skin after insertion; use imaging if not palpable.'],
    whoMayNeedMedicalReview: 'Patients on strong hepatic enzyme-inducing medications (Carbamazepine, Phenytoin).',
    prescriptionRequirement: 'Clinic / Procedure Required'
  }
];

export const SEXUAL_HEALTH_TOPICS_DATABASE: SexualHealthTopicRecord[] = [
  {
    id: 'sh-precautions-guide',
    topicTitle: 'Sexual Health & Protection: Essential Precautions Guide',
    slug: 'having-sex-precautions',
    shortSummary: 'Comprehensive clinical guide covering STI prevention, pregnancy prevention, condom dynamics, compatible lubricants, regular contraception, and consent.',
    keyPillars: [
      {
        title: '1. Dual Protection Strategy',
        content: 'Combining a barrier method (External or Internal Condom) with an effective regular contraceptive (Pill, IUD, or Implant) provides optimal protection: condoms prevent STI transmission while hormonal/IUD methods offer >99% pregnancy protection.'
      },
      {
        title: '2. Compatible Lubrication Science',
        content: 'Friction increases the risk of micro-tears in mucous membranes and condom breakage. ALWAYS use Water-Based or Silicone-Based lubricants with latex condoms. NEVER use oil-based products (Vaseline, lotions, coconut oil) as they degrade latex in seconds.'
      },
      {
        title: '3. STI Screening & Testing Timelines',
        content: 'Regular STI screening is recommended for all sexually active individuals. Window periods: HIV (14-45 days for 4th-gen Ag/Ab tests), Chlamydia/Gonorrhea (1-2 weeks for NAAT urine/swab), Syphilis (2-4 weeks).'
      },
      {
        title: '4. HIV Pre-Exposure Prophylaxis (PrEP) & PEP',
        content: 'PrEP (Tenofovir/Emtricitabine) taken daily reduces sexual HIV transmission risk by >99%. PEP (Post-Exposure Prophylaxis) must be initiated within 72 hours of high-risk exposure and continued for 28 days.'
      }
    ],
    emergencyProtocol: {
      triggerEvent: 'Condom broke, slipped, or unprotected intercourse occurred',
      timeCriticalWindow: 'Act within 24 to 72 hours (up to 120 hours for Ulipristal / Copper IUD)',
      recommendedActionSteps: [
        '1. Do NOT panic or douche (vaginal douching does NOT prevent pregnancy and increases infection risk).',
        '2. Obtain Emergency Contraceptive Pill: Levonorgestrel 1.5mg (effective up to 72h) or Ulipristal Acetate 30mg (effective up to 120h). The earlier taken, the higher the efficacy.',
        '3. If exposure involved HIV risk, consult an emergency room or clinic within 72 hours for HIV Post-Exposure Prophylaxis (PEP).',
        '4. Perform a high-sensitivity urine pregnancy test 14 to 21 days after the incident to confirm status.',
        '5. Schedule STI screening (Chlamydia, Gonorrhea, HIV, Syphilis) in 2 to 4 weeks.'
      ],
      distinctionVsAbortion: '⚠️ CLINICAL DISTINCTION: Emergency contraception prevents or delays ovulation and fertilization. It CANNOT terminate an established, implanted pregnancy and is NOT an abortion medication (Mifepristone / Misoprostol).'
    }
  }
];

/* =========================================================================
   3. BODY PART & ORGAN SYSTEM NAVIGATOR
   ========================================================================= */

export const BODY_PARTS_DATABASE: BodyPartSystemRecord[] = [
  {
    id: 'organ-eye',
    organName: 'Eye & Vision (Ophthalmology)',
    aliases: ['eye', 'eyes', 'vision', 'ophthalmology', 'conjunctivitis', 'eye drops', 'dry eyes', 'cornea'],
    icon: '👁️',
    commonConditions: ['Bacterial / Viral Conjunctivitis', 'Dry Eye Syndrome', 'Glaucoma', 'Allergic Keratoconjunctivitis', 'Corneal Abrasion'],
    keyMedicineCategories: [
      {
        categoryName: 'Ophthalmic Antibiotics',
        primaryFormulations: ['Eye Drops (0.3% - 0.5%)', 'Eye Ointments (0.5% - 1%)'],
        commonDrugs: ['Ciprofloxacin 0.3%', 'Moxifloxacin 0.5%', 'Tobramycin 0.3%']
      },
      {
        categoryName: 'Artificial Tears & Ocular Lubricants',
        primaryFormulations: ['Preservative-Free Single-Dose Vials', 'Multi-Dose Gel Drops'],
        commonDrugs: ['Carboxymethylcellulose 0.5%', 'Sodium Hyaluronate 0.1% - 0.18%']
      },
      {
        categoryName: 'Intraocular Pressure-Lowering (Glaucoma)',
        primaryFormulations: ['Ophthalmic Solutions'],
        commonDrugs: ['Latanoprost 0.005%', 'Timolol 0.5%', 'Brimonidine 0.2%']
      }
    ],
    emergencyRedFlags: [
      'Sudden partial or complete loss of vision.',
      'Severe, deep, throbbing eye pain with nausea and halo around lights (Acute Angle-Closure Glaucoma).',
      'Chemical splash in the eye $\rightarrow$ Irrigate with copious water for 15-20 min and go to Emergency Room immediately.',
      'Foreign body sensation with visible corneal laceration.'
    ]
  },
  {
    id: 'organ-ear',
    organName: 'Ear & Hearing (Otic / Otolaryngology)',
    aliases: ['ear', 'ears', 'hearing', 'ear ache', 'ear pain', 'ear drops', 'tinnitus', 'otitis'],
    icon: '👂',
    commonConditions: ['Otitis Externa (Swimmer’s Ear)', 'Acute Otitis Media', 'Cerumen (Earwax) Impaction', 'Tinnitus', 'Eustachian Tube Dysfunction'],
    keyMedicineCategories: [
      {
        categoryName: 'Otic Antibiotic + Corticosteroid Drops',
        primaryFormulations: ['Otic Solutions / Suspensions'],
        commonDrugs: ['Ciprofloxacin + Dexamethasone Drops', 'Ofloxacin 0.3% Otic']
      },
      {
        categoryName: 'Cerumenolytics (Earwax Softeners)',
        primaryFormulations: ['Otic Drops'],
        commonDrugs: ['Carbamide Peroxide 6.5%', 'Docusate Sodium']
      }
    ],
    emergencyRedFlags: [
      'Sudden sensorineural hearing loss within 72 hours (Medical Emergency requiring immediate ENT steroids).',
      'Bloody or clear CSF discharge from ear canal following head injury (Basilar skull fracture).',
      'Severe pain, erythema, and swelling behind the ear over the mastoid bone (Mastoiditis).'
    ]
  },
  {
    id: 'organ-nose-throat',
    organName: 'Nose & Sinuses (Rhinology)',
    aliases: ['nose', 'nasal', 'sinus', 'sinusitis', 'nasal spray', 'blocked nose', 'nosebleed', 'epistaxis'],
    icon: '👃',
    commonConditions: ['Allergic Rhinitis', 'Acute Sinusitis', 'Epistaxis (Nosebleeds)', 'Nasal Polyposis'],
    keyMedicineCategories: [
      {
        categoryName: 'Intranasal Corticosteroid Sprays',
        primaryFormulations: ['Metered Nasal Sprays (mcg/spray)'],
        commonDrugs: ['Fluticasone Furoate 27.5mcg/spray', 'Mometasone 50mcg/spray']
      },
      {
        categoryName: 'Nasal Decongestant Sprays',
        primaryFormulations: ['Aqueous Nasal Sprays (0.05% - 0.1%)'],
        commonDrugs: ['Oxymetazoline 0.05%', 'Xylometazoline 0.1%']
      }
    ],
    emergencyRedFlags: [
      'Severe posterior nosebleed not stopping after 15-20 minutes of direct pressure on soft nostrils.',
      'Periorbital cellulitis (swelling, redness around the eye accompanying sinus infection).'
    ]
  },
  {
    id: 'organ-heart',
    organName: 'Heart & Circulatory System (Cardiology)',
    aliases: ['heart', 'cardiac', 'blood pressure', 'hypertension', 'angina', 'chest pain', 'palpitations'],
    icon: '❤️',
    commonConditions: ['Hypertension', 'Coronary Artery Disease / Angina', 'Heart Failure (HFrEF/HFpEF)', 'Atrial Fibrillation', 'Hyperlipidemia'],
    keyMedicineCategories: [
      {
        categoryName: 'ACE Inhibitors & ARBs',
        primaryFormulations: ['Oral Tablets (2.5mg - 40mg)'],
        commonDrugs: ['Lisinopril', 'Telmisartan', 'Losartan', 'Ramipril']
      },
      {
        categoryName: 'HMG-CoA Reductase Inhibitors (Statins)',
        primaryFormulations: ['Oral Tablets (10mg - 80mg)'],
        commonDrugs: ['Atorvastatin 10-80mg', 'Rosuvastatin 5-40mg']
      },
      {
        categoryName: 'Nitrate Vasodilators (Acute Angina Relief)',
        primaryFormulations: ['Sublingual Tablets (0.3mg - 0.6mg)', 'Transdermal Patches'],
        commonDrugs: ['Nitroglycerin SL 0.4mg', 'Isosorbide Mononitrate']
      }
    ],
    emergencyRedFlags: [
      '🚨 ACUTE CORONARY SYNDROME: Crushing substernal chest pressure, radiation to left arm/jaw, diaphoresis, dyspnea $\rightarrow$ CALL 911 / EMERGENCY SERVICES IMMEDIATELY.',
      'Syncope with palpitations or sudden unresponsiveness.'
    ]
  },
  {
    id: 'organ-lungs',
    organName: 'Lungs & Respiratory System (Pulmonology)',
    aliases: ['lungs', 'respiratory', 'breathing', 'asthma', 'copd', 'bronchitis', 'inhaler', 'pneumonia'],
    icon: '🫁',
    commonConditions: ['Asthma', 'COPD', 'Acute Bronchitis', 'Pneumonia', 'Pulmonary Embolism'],
    keyMedicineCategories: [
      {
        categoryName: 'Bronchodilators & Relievers',
        primaryFormulations: ['Metered Dose Inhalers (MDI)', 'Dry Powder Inhalers (DPI)', 'Nebulizer Solutions'],
        commonDrugs: ['Salbutamol 100mcg/puff', 'Ipratropium Bromide 20mcg/puff']
      },
      {
        categoryName: 'Inhaled Anti-Inflammatory Corticosteroids',
        primaryFormulations: ['MDI / DPI Inhalers'],
        commonDrugs: ['Budesonide 100-400mcg', 'Fluticasone Propionate']
      }
    ],
    emergencyRedFlags: [
      'Acute severe dyspnea, blue lips/fingers (cyanosis), inability to speak words.',
      'Sudden pleuritic chest pain with hemoptysis and leg swelling (Pulmonary Embolism).'
    ]
  },
  {
    id: 'organ-stomach',
    organName: 'Stomach & Digestive Tract (Gastroenterology)',
    aliases: ['stomach', 'digestive', 'gut', 'gastro', 'intestine', 'liver', 'gerd', 'acidity', 'diarrhea', 'constipation'],
    icon: '🫄',
    commonConditions: ['GERD / Peptic Ulcers', 'Irritable Bowel Syndrome (IBS)', 'Acute Gastroenteritis', 'Constipation', 'Ulcerative Colitis'],
    keyMedicineCategories: [
      {
        categoryName: 'Proton Pump Inhibitors (PPIs)',
        primaryFormulations: ['Delayed-Release Capsules / Tablets', 'IV Vials'],
        commonDrugs: ['Omeprazole 20-40mg', 'Pantoprazole 40mg']
      },
      {
        categoryName: 'Oral Rehydration & Antidiarrheals',
        primaryFormulations: ['Sachets (ORS)', 'Oral Capsules'],
        commonDrugs: ['WHO-Formula ORS Sachets', 'Loperamide 2mg']
      }
    ],
    emergencyRedFlags: [
      'Acute "board-like" rigid abdomen with agonizing pain (Perforated viscus / Peritonitis).',
      'Vomiting frank red blood or coffee-ground emesis.',
      'Inability to tolerate any fluids for >24 hours with severe postural dizziness.'
    ]
  },
  {
    id: 'organ-kidney',
    organName: 'Kidneys & Urinary Tract (Nephrology / Urology)',
    aliases: ['kidney', 'renal', 'urinary', 'bladder', 'urine', 'uti', 'kidney stone', 'creatinine', 'egfr'],
    icon: '🫘',
    commonConditions: ['Urinary Tract Infections (UTI)', 'Kidney Stones (Nephrolithiasis)', 'Chronic Kidney Disease (CKD)', 'Acute Kidney Injury'],
    keyMedicineCategories: [
      {
        categoryName: 'Urinary Anti-Infectives',
        primaryFormulations: ['Oral Tablets / Capsules'],
        commonDrugs: ['Nitrofurantoin 100mg Modified-Release', 'Fosfomycin 3g Sachet']
      },
      {
        categoryName: 'Urinary Alkalinizers & Analgesics',
        primaryFormulations: ['Oral Liquid Solutions', 'Tablets'],
        commonDrugs: ['Potassium Citrate + Citric Acid', 'Phenazopyridine']
      }
    ],
    emergencyRedFlags: [
      'Total inability to pass urine (Acute Urinary Retention) with painful distended bladder.',
      'High fever with shaking chills and severe flank/back pain (Acute Pyelonephritis).',
      'Gross macroscopic hematuria with blood clots.'
    ]
  },
  {
    id: 'organ-skin',
    organName: 'Skin & Hair (Dermatology)',
    aliases: ['skin', 'dermatology', 'rash', 'eczema', 'psoriasis', 'acne', 'cream', 'ointment', 'fungus'],
    icon: '🧴',
    commonConditions: ['Atopic Dermatitis / Eczema', 'Plaque Psoriasis', 'Acne Vulgaris', 'Fungal Tinea Infections', 'Urticaria'],
    keyMedicineCategories: [
      {
        categoryName: 'Topical Corticosteroids (Mild to Ultra-High Potency)',
        primaryFormulations: ['Creams (O/W)', 'Ointments (W/O)', 'Lotions'],
        commonDrugs: ['Hydrocortisone 1% (Mild)', 'Betamethasone Dipropionate 0.05% (Potent)', 'Clobetasol Propionate 0.05% (Superpotent)']
      },
      {
        categoryName: 'Topical Retinoids & Antimicrobial Acne Agents',
        primaryFormulations: ['Gels', 'Creams', 'Foams'],
        commonDrugs: ['Adapalene 0.1% Gel', 'Benzoyl Peroxide 2.5% - 5%', 'Clindamycin 1% Gel']
      }
    ],
    emergencyRedFlags: [
      'Rapidly spreading tender erythema with crepitus, skin bullae, or purple necrosis (Necrotizing Fasciitis $\rightarrow$ Immediate Surgical Emergency).',
      'Skin detachment > 10% body surface area with mucosal erosions (Toxic Epidermal Necrolysis / TEN).'
    ]
  }
];

/* =========================================================================
   4. VERIFIED CLINICAL MONOGRAPHS WITH REAL DATABASE STRENGTHS
   ========================================================================= */

export const COMPREHENSIVE_MONOGRAPHS_DATABASE: ComprehensiveClinicalMonograph[] = [
  {
    id: 'mono-sildenafil',
    brandNames: ['Viagra', 'Revatio', 'Manforce', 'Cenforce', 'Kamagra', 'Silagra'],
    genericName: 'Sildenafil Citrate',
    activeIngredient: 'Sildenafil Citrate',
    chemicalClass: 'Pyrazolopyrimidinone Derivative',
    drugClass: 'Phosphodiesterase-5 (PDE-5) Inhibitor',
    medicalSpecialties: ['Urology', 'Cardiology / Pulmonary Vascular Medicine', 'Men’s Sexual Health'],
    approvedUses: [
      'Treatment of Erectile Dysfunction (ED) in adult males.',
      'Pulmonary Arterial Hypertension (PAH - WHO Group 1) to improve exercise capacity (Revatio brand).'
    ],
    offLabelUses: ['Severe Raynaud’s Phenomenon refractory to calcium channel blockers.'],
    formulations: [
      {
        dosageForm: 'Tablets',
        route: 'Oral',
        availableStrengths: [
          { strengthValue: 25, unit: 'mg', displayLabel: '25 mg Tablet', standardDoseDescription: 'Initial dose for elderly (≥65y), hepatic impairment, or severe renal impairment.' },
          { strengthValue: 50, unit: 'mg', displayLabel: '50 mg Tablet', standardDoseDescription: 'Standard initial recommended dose taken approximately 60 minutes before sexual activity.' },
          { strengthValue: 100, unit: 'mg', displayLabel: '100 mg Tablet', standardDoseDescription: 'Maximum single recommended dose based on individual clinical efficacy and tolerability.' }
        ],
        typicalOnsetTime: '30 to 60 minutes (delayed if taken with high-fat meal)',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Take with a glass of water approximately 1 hour before sexual activity. Sexual stimulation is required for therapeutic response.'
      },
      {
        dosageForm: 'Oral solutions',
        route: 'Oral',
        availableStrengths: [
          { strengthValue: 10, unit: 'mg/mL', displayLabel: '10 mg/mL Suspension', standardDoseDescription: 'Primarily used for pediatric and adult pulmonary arterial hypertension (Revatio formulation).' }
        ],
        typicalOnsetTime: '20 to 45 minutes',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Shake bottle vigorously for 10 seconds before dosing using measuring syringe.'
      },
      {
        dosageForm: 'Injections',
        route: 'Intravenous (IV)',
        availableStrengths: [
          { strengthValue: 10, unit: 'mg/100 mL', displayLabel: '10 mg / 12.5 mL IV Vial', standardDoseDescription: 'Hospital ICU administration for pulmonary hypertension when oral route unavailable.' }
        ],
        typicalOnsetTime: '5 to 15 minutes',
        typicalDuration: '4 hours',
        administrationInstructions: 'Administer as intravenous bolus three times daily.'
      }
    ],
    pharmacodynamicsMechanism: 'Selective inhibitor of cyclic guanosine monophosphate (cGMP)-specific phosphodiesterase type 5 (PDE-5). During sexual arousal, local nitric oxide (NO) release in the corpus cavernosum stimulates guanylate cyclase, increasing cGMP. Sildenafil blocks PDE-5 degradation of cGMP, causing smooth muscle relaxation, arterial inflow, and penile erection.',
    clinicalBenefits: [
      'Over 80% clinical efficacy rate in improving erectile rigidity and sexual intercourse completion.',
      'Rapid onset within 30-60 minutes.',
      'Non-hormonal mechanism: Does not alter testosterone levels or create hormonal dependency.'
    ],
    clinicalLimitations: [
      'Requires intact sexual arousal and stimulation to function; not an aphrodisiac.',
      'Does not prevent pregnancy or protect against sexually transmitted infections (STIs).',
      'Delayed absorption and reduced peak concentration if taken with heavy, high-fat meals.'
    ],
    commonSideEffects: ['Headache (16%)', 'Facial Flushing (10%)', 'Dyspepsia / Indigestion (7%)', 'Nasal Congestion (4%)', 'Transient Visual Color Distortion / Cyanopsia (blue-tinged vision, 3%)'],
    seriousAdverseEffects: [
      '🚨 Profound refractory hypotension & cardiovascular collapse when co-administered with Nitrates.',
      'Priapism: Prolonged erection > 4 hours requiring urgent urological aspiration to prevent permanent tissue fibrosis.',
      'Non-Arteritic Anterior Ischemic Optic Neuropathy (NAION) - sudden unilateral vision loss.',
      'Sudden sensorineural hearing loss.'
    ],
    allergyInformation: 'Hypersensitivity to sildenafil or any inactive excipients (rash, urticaria, facial angioedema).',
    contraindications: [
      'CONCOMITANT USE OF ORGANIC NITRATES (Nitroglycerin, Isosorbide, Amyl Nitrite "Poppers") in any form $\rightarrow$ ABSOLUTELY CONTRAINDICATED.',
      'Co-administration with Guanylate Cyclase Stimulators (Riociguat).',
      'Severe cardiovascular instability (unstable angina, severe heart failure NYHA IV, recent myocardial infarction or stroke within 6 months).',
      'Known hereditary degenerative retinal disorders (Retinitis Pigmentosa).'
    ],
    drugInteractionsSummary: 'Strong CYP3A4 inhibitors (Ketoconazole, Itraconazole, Ritonavir, Clarithromycin) increase sildenafil AUC by 300-1000%; reduce starting dose to 25mg. Alpha-blockers (Tamsulosin, Doxazosin) require caution due to additive orthostatic hypotension.',
    alcoholInteraction: {
      severity: 'CAUTION',
      guidance: 'Alcohol acts as a systemic vasodilator and central nervous system depressant. Consuming substantial alcohol with sildenafil increases the risk of orthostatic dizziness, syncope, and paradoxically worsens erectile performance.'
    },
    foodInteractions: ['Grapefruit juice inhibits intestinal CYP3A4, increasing sildenafil plasma levels; avoid high intake.', 'High-fat meals delay time to peak concentration (Tmax) by ~60 minutes.'],
    diseaseInteractions: [
      { disease: 'Coronary Artery Disease / Angina', risk: 'CONTRAINDICATED', explanation: 'If patient requires emergency nitrates, lethal hypotension can occur.' },
      { disease: 'Severe Hepatic Impairment (Child-Pugh C)', risk: 'CAUTION', explanation: 'Sildenafil clearance is reduced; initiate with lowest 25mg dose.' },
      { disease: 'Severe Renal Impairment (CrCl < 30 mL/min)', risk: 'CAUTION', explanation: 'Clearance reduced; initiate with 25mg.' }
    ],
    pregnancyGuidance: {
      fdaCategoryOrTrimesterRule: 'FDA Category B (Not indicated for females in ED form; Revatio indicated for PAH in pregnancy under specialist oversight)',
      isCompatible: false,
      clinicalDetail: 'Not approved for women for sexual indications. Used for pulmonary hypertension under maternal-fetal specialist supervision.'
    },
    breastfeedingGuidance: 'Limited data; not indicated for nursing mothers for erectile dysfunction.',
    pediatricGuidance: 'Not indicated for pediatric erectile dysfunction. FDA warning against chronic use in pediatric PAH due to mortality data.',
    geriatricBeersGuidance: 'Elderly patients (≥65 years) have decreased sildenafil clearance (40% higher free plasma levels); initiate therapy at 25 mg dose.',
    renalDoseAdjustment: 'eGFR > 30: No initial adjustment. eGFR < 30 mL/min: Start with 25 mg.',
    hepaticDoseAdjustment: 'Cirrhosis / Hepatic impairment: Start with 25 mg.',
    cardiacBloodPressureConsiderations: 'Causes mild, transient decreases in supine systolic (8.4 mmHg) and diastolic (5.5 mmHg) blood pressure. Monitor in patients with baseline resting hypotension (BP < 90/50 mmHg).',
    diabetesBloodSugarConsiderations: 'Safe in diabetic neuropathy-induced ED; efficacy is ~60% in diabetics versus 80% in non-diabetics.',
    overdoseWarningAndAntidote: 'In overdose (up to 800mg), adverse events resemble standard side effects but with heightened frequency and severity (severe hypotension, priapism, visual disturbances). Standard supportive measures; hemodialysis is NOT effective (96% protein bound).',
    storageConditions: 'Store at 20°C to 25°C (68°F to 77°F). Protect from moisture.',
    legalPrescriptionClassification: 'Prescription',
    primaryManufacturers: ['Pfizer Inc.', 'Viatris', 'Teva Pharmaceuticals', 'Sun Pharma', 'Cipla'],
    references: ['FDA DailyMed Sildenafil Labeling NDA 020895', 'RxNorm 36141', 'DrugBank DB00203', 'American Urological Association (AUA) ED Guidelines']
  },
  {
    id: 'mono-paracetamol',
    brandNames: ['Dolo 650', 'Crocin', 'Calpol', 'Panadol', 'Tylenol', 'Paracip', 'Acetaminophen'],
    genericName: 'Paracetamol / Acetaminophen',
    activeIngredient: 'Paracetamol / Acetaminophen (N-acetyl-p-aminophenol)',
    chemicalClass: 'Para-Aminophenol Derivative',
    drugClass: 'Non-Opioid Analgesic / Antipyretic',
    medicalSpecialties: ['General Medicine', 'Pediatrics', 'Anesthesiology', 'Emergency Medicine', 'Rheumatology'],
    approvedUses: [
      'Relief of mild to moderate pain (headache, toothache, dysmenorrhea, muscular aches, osteoarthritis).',
      'Reduction of fever (pyrexia) associated with infections in adults and children.'
    ],
    formulations: [
      {
        dosageForm: 'Tablets',
        route: 'Oral',
        availableStrengths: [
          { strengthValue: 500, unit: 'mg', displayLabel: '500 mg Tablet', standardDoseDescription: 'Standard adult dose: 1-2 tablets every 4-6 hours (max 4000 mg/day).' },
          { strengthValue: 650, unit: 'mg', displayLabel: '650 mg Tablet (Dolo / Crocin 650)', standardDoseDescription: 'Widely prescribed antipyretic dose: 1 tablet every 6 hours (max 3900 mg/day).' },
          { strengthValue: 1000, unit: 'mg', displayLabel: '1000 mg Extended-Release', standardDoseDescription: '1 tablet every 8 hours for continuous pain relief (max 3000-4000 mg/day).' }
        ],
        typicalOnsetTime: '15 to 30 minutes',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Take with or without food with a glass of water. Do not exceed 4000 mg in any 24-hour window.'
      },
      {
        dosageForm: 'Syrups',
        route: 'Oral',
        availableStrengths: [
          { strengthValue: 120, unit: 'mg/5 mL', displayLabel: '120 mg / 5 mL Pediatric Suspension', standardDoseDescription: 'Infant formulation: dose 10-15 mg/kg body weight Q4-6H.' },
          { strengthValue: 250, unit: 'mg/5 mL', displayLabel: '250 mg / 5 mL DS (Double Strength)', standardDoseDescription: 'Children formulation (>5 years): dose by weight.' }
        ],
        typicalOnsetTime: '15 to 20 minutes',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Always measure with calibrated oral syringe or measuring cup. Never use household kitchen spoons.'
      },
      {
        dosageForm: 'Drops',
        route: 'Oral',
        availableStrengths: [
          { strengthValue: 100, unit: 'mg/mL', displayLabel: '100 mg / mL Infant Drops', standardDoseDescription: 'Concentrated infant drops: calibrated oral dropper only.' }
        ],
        typicalOnsetTime: '15 minutes',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Administer directly into infant’s inner cheek.'
      },
      {
        dosageForm: 'Infusions',
        route: 'Intravenous (IV)',
        availableStrengths: [
          { strengthValue: 1000, unit: 'mg/100 mL', displayLabel: '1000 mg / 100 mL IV Bottle (Perfalgan)', standardDoseDescription: 'Hospital post-op analgesia: 15-minute IV infusion Q6H.' }
        ],
        typicalOnsetTime: '5 to 10 minutes',
        typicalDuration: '4 to 6 hours',
        administrationInstructions: 'Infuse over 15 minutes.'
      },
      {
        dosageForm: 'Suppositories',
        route: 'Rectal',
        availableStrengths: [
          { strengthValue: 125, unit: 'mg', displayLabel: '125 mg Pediatric Suppository', standardDoseDescription: 'Rectal administration for vomiting febrile children.' },
          { strengthValue: 250, unit: 'mg', displayLabel: '250 mg Rectal Suppository', standardDoseDescription: 'Rectal administration.' }
        ],
        typicalOnsetTime: '30 to 45 minutes',
        typicalDuration: '6 to 8 hours',
        administrationInstructions: 'Insert rectally with pointed end first.'
      }
    ],
    pharmacodynamicsMechanism: 'Central inhibition of prostaglandin synthesis through potent inhibition of central nervous system cyclooxygenase (COX-3/COX-1 variant). Lacks significant peripheral anti-inflammatory activity, explaining why it does not cause gastric ulceration or platelet dysfunction like classic NSAIDs.',
    clinicalBenefits: [
      'Gastroprotective profile: Does not erode gastric mucosa or induce peptic ulcers.',
      'Safe for patients on anticoagulants (does not impair platelet aggregation).',
      'Gold standard antipyretic/analgesic during pregnancy across all trimesters.',
      'No association with Reye’s syndrome in children.'
    ],
    clinicalLimitations: [
      'Lacks significant peripheral anti-inflammatory action (poor monotherapy for severe inflammatory arthritis like active rheumatoid flare).',
      'Narrow therapeutic index: Doses > 4000 mg/day or accidental duplicate dosing leads to acute liver failure.'
    ],
    commonSideEffects: ['Rare at therapeutic doses; mild nausea or rash in <1% of patients.'],
    seriousAdverseEffects: [
      '🚨 Acute Hepatic Necrosis & Fatal Liver Failure in overdose due to toxic metabolite N-acetyl-p-benzoquinone imine (NAPQI).',
      'Rare severe cutaneous adverse reactions (SCAR): Stevens-Johnson Syndrome (SJS) and Toxic Epidermal Necrolysis (TEN).'
    ],
    allergyInformation: 'Documented paracetamol allergy requires avoidance; cross-reactivity with NSAIDs is extremely rare (<5%).',
    contraindications: [
      'Severe active hepatic impairment or severe active liver disease.',
      'Known hypersensitivity to paracetamol / acetaminophen.'
    ],
    drugInteractionsSummary: 'Warfarin: Chronic daily paracetamol (>2g/day for >3 days) may elevate INR; monitor prothrombin time. Hepatic enzyme inducers (Rifampin, Carbamazepine, Phenytoin) increase NAPQI production.',
    alcoholInteraction: {
      severity: 'HIGH',
      guidance: 'Chronic alcohol intake induces cytochrome CYP2E1 and depletes hepatic glutathione, drastically increasing the formation of hepatotoxic NAPQI. Limit daily dose to maximum 2000 mg in chronic alcohol users.'
    },
    foodInteractions: ['Food may slightly delay absorption rate but does not reduce overall bioavailability.'],
    diseaseInteractions: [
      { disease: 'Chronic Liver Disease / Cirrhosis', risk: 'CAUTION', explanation: 'Reduce maximum daily dose to ≤ 2000 mg/day.' },
      { disease: 'Severe Malnutrition / Chronic Alcoholism', risk: 'CAUTION', explanation: 'Depleted glutathione stores increase hepatotoxicity threshold risk.' }
    ],
    pregnancyGuidance: {
      fdaCategoryOrTrimesterRule: 'FDA Category B / Established safety record',
      isCompatible: true,
      clinicalDetail: 'First-line analgesic/antipyretic in pregnancy. Use at lowest effective dose for shortest duration.'
    },
    breastfeedingGuidance: 'Excreted in breast milk in trace amounts (<2% of maternal dose); compatible with breastfeeding (AAP approved).',
    pediatricGuidance: 'Strictly weight-based dosing: 10-15 mg/kg per dose Q4-6H (maximum 75 mg/kg/day or 5 doses in 24 hours).',
    geriatricBeersGuidance: 'Preferred first-line analgesic over NSAIDs in older adults (no renal or GI bleeding risk of NSAIDs).',
    renalDoseAdjustment: 'eGFR 10-50: Q6H dosing. eGFR < 10 mL/min: Extend dosing interval to Q8H.',
    hepaticDoseAdjustment: 'Mild-moderate hepatic impairment: Max 2000 mg/day. Severe: Contraindicated.',
    cardiacBloodPressureConsiderations: 'No significant acute cardiovascular impact; high sodium content in effervescent tablets should be accounted for in heart failure.',
    diabetesBloodSugarConsiderations: 'Compatible with diabetes; continuous glucose monitors (CGM) with older sensors may report falsely elevated glucose.',
    overdoseWarningAndAntidote: 'TOXICITY ALERT: Single ingestion > 150 mg/kg or > 7.5g in adults saturates glutathione, leading to massive centrilobular hepatic necrosis. SPECIFIC ANTIDOTE: N-Acetylcysteine (NAC / Acetadote) IV or oral protocol; most effective when administered within 8 hours of ingestion.',
    storageConditions: 'Store below 30°C (86°F) in a dry place.',
    legalPrescriptionClassification: 'OTC',
    primaryManufacturers: ['Micro Labs (Dolo)', 'GlaxoSmithKline (Calpol/Crocin)', 'Johnson & Johnson (Tylenol)', 'Sanofi'],
    references: ['FDA DailyMed Acetaminophen Monograph', 'RxNorm 161', 'WHO Model List of Essential Medicines', 'Rumack-Matthew Nomogram Guidelines']
  }
];

/* =========================================================================
   5. NATURAL LANGUAGE "WHAT CAN I TAKE FOR THIS?" INTENT CLASSIFIER
   ========================================================================= */

export type CareGuideIntentType = 
  | 'SYMPTOM_GUIDANCE'
  | 'SEXUAL_HEALTH_OR_CONTRACEPTION'
  | 'DRUG_MONOGRAPH'
  | 'DRUG_SAFETY_INTERACTION'
  | 'BODY_PART_ORGAN'
  | 'GENERAL_DISCOVERY';

export interface CareGuideIntentResult {
  intentType: CareGuideIntentType;
  primaryMatchTitle: string;
  symptomRecord?: CareGuideSymptomRecord;
  contraceptionRecord?: ContraceptionMethodRecord;
  sexualHealthTopic?: SexualHealthTopicRecord;
  bodyPartRecord?: BodyPartSystemRecord;
  monographRecord?: ComprehensiveClinicalMonograph;
  emergencyFailProtocolActive?: boolean;
}

export function parseNaturalCareGuideQuery(rawQuery: string): CareGuideIntentResult {
  const query = rawQuery.toLowerCase().trim();

  // 1. Check for Emergency Contraception / Contraception Failure Triggers
  if (
    query.includes('condom broke') || 
    query.includes('condom slipped') || 
    query.includes('unprotected sex') || 
    query.includes('emergency contraception') || 
    query.includes('morning after') || 
    query.includes('i-pill') || 
    query.includes('plan b')
  ) {
    const topic = SEXUAL_HEALTH_TOPICS_DATABASE.find(t => t.slug === 'having-sex-precautions') || SEXUAL_HEALTH_TOPICS_DATABASE[0];
    const emergencyMethod = CONTRACEPTION_METHODS_DATABASE.find(m => m.id === 'contra-emergency-levonorgestrel');
    return {
      intentType: 'SEXUAL_HEALTH_OR_CONTRACEPTION',
      primaryMatchTitle: 'Emergency Contraception & Failure Protocol',
      sexualHealthTopic: topic,
      contraceptionRecord: emergencyMethod,
      emergencyFailProtocolActive: true
    };
  }

  // 2. Check for General Sexual Health & Protection Triggers
  if (
    query.includes('having sex') || 
    query.includes('sex precaution') || 
    query.includes('contraception') || 
    query.includes('condom') || 
    query.includes('sti') || 
    query.includes('hiv prevention') || 
    query.includes('birth control') || 
    query.includes('female condom')
  ) {
    const topic = SEXUAL_HEALTH_TOPICS_DATABASE[0];
    const barrierMethod = CONTRACEPTION_METHODS_DATABASE[0];
    return {
      intentType: 'SEXUAL_HEALTH_OR_CONTRACEPTION',
      primaryMatchTitle: 'Sexual Health, Protection & Contraception Hub',
      sexualHealthTopic: topic,
      contraceptionRecord: barrierMethod,
      emergencyFailProtocolActive: false
    };
  }

  // 3. Check for Body Part / Organ Navigation
  for (const organ of BODY_PARTS_DATABASE) {
    if (query === organ.organName.toLowerCase() || organ.aliases.some(a => query.includes(a))) {
      return {
        intentType: 'BODY_PART_ORGAN',
        primaryMatchTitle: organ.organName,
        bodyPartRecord: organ
      };
    }
  }

  // 4. Check for Specific Drug Monograph Search (e.g. "what is sildenafil 50 mg", "viagra", "dolo 650")
  for (const mono of COMPREHENSIVE_MONOGRAPHS_DATABASE) {
    if (
      query.includes(mono.genericName.toLowerCase()) || 
      mono.brandNames.some(b => query.includes(b.toLowerCase()))
    ) {
      return {
        intentType: 'DRUG_MONOGRAPH',
        primaryMatchTitle: `${mono.genericName} (${mono.brandNames[0]})`,
        monographRecord: mono
      };
    }
  }

  // 5. Check for Symptom / Disease Problem Queries (e.g. "I have fever", "cold", "period cramps", "acidity")
  for (const sym of CAREGUIDE_SYMPTOMS_DATABASE) {
    if (
      query.includes(sym.symptomName.toLowerCase()) || 
      sym.aliases.some(a => query.includes(a) || calculateLevenshteinDistance(query, a) <= 2)
    ) {
      return {
        intentType: 'SYMPTOM_GUIDANCE',
        primaryMatchTitle: sym.symptomName,
        symptomRecord: sym
      };
    }
  }

  // Fallback to default symptom (Fever)
  return {
    intentType: 'SYMPTOM_GUIDANCE',
    primaryMatchTitle: CAREGUIDE_SYMPTOMS_DATABASE[0].symptomName,
    symptomRecord: CAREGUIDE_SYMPTOMS_DATABASE[0]
  };
}
