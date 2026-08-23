import { 
  UniversalSubstanceRecord,
  ForensicToxRecord,
  CounterfeitIntelligenceRecord,
  NovaSubstanceLegalStatus,
  TabletSubtype,
  CapsuleSubtype,
  ReleaseKineticsType,
  UniversalStrengthUnit,
  PharmaDosageForm,
  PharmaAdministrationRoute
} from '../types/biotech';

/* =========================================================================
   1. MASTER UNIVERSAL SUBSTANCE DATABASE (VERIFIED COMMERCIAL RECORDS)
   ========================================================================= */

export const UNIVERSAL_SUBSTANCES_DATABASE: UniversalSubstanceRecord[] = [
  // 1. Amlodipine Besylate
  {
    id: 'sub-amlodipine',
    genericName: 'Amlodipine Besylate',
    brandNames: ['Norvasc', 'Amlovas', 'Amlong', 'Istin', 'Amlo'],
    aliases: ['amlodipine', 'norvasc', 'amlovas', 'amlong'],
    activeIngredients: ['Amlodipine Besylate'],
    casNumber: '111470-99-6',
    atcCode: 'C08CA01',
    therapeuticClass: 'Antihypertensive / Antianginal',
    pharmacologicClass: 'Dihydropyridine Calcium Channel Blocker (CCB)',
    primaryLegalStatus: 'Prescription',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States (FDA)', status: 'Prescription', scheduleDesignation: 'Rx Only', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India (CDSCO)', status: 'Prescription', scheduleDesignation: 'Schedule H', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom (MHRA)', status: 'Prescription', scheduleDesignation: 'POM', prescriptionRequired: true }
    ],
    dosageForm: 'Tablets',
    dosageSubtype: 'Conventional Compressed',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Oral',
    allAvailableRoutes: ['Oral'],
    strengthValue: 5,
    strengthUnit: 'mg',
    concentrationDisplay: '2.5 mg, 5 mg, 10 mg Tablets',
    approvedUses: ['Essential Hypertension in adults and children ≥6y', 'Chronic Stable Angina Pectoris', 'Vasospastic (Prinzmetal’s) Angina'],
    medicalSpecialties: ['Cardiology', 'Internal Medicine'],
    mechanismOfAction: 'Inhibits transmembrane influx of extracellular calcium ions across voltage-gated L-type calcium channels in vascular smooth muscle and myocardium, causing peripheral arteriolar vasodilation and reduced systemic vascular resistance.',
    clinicalBenefits: ['Gradual onset of action with zero reflex tachycardia', 'Long terminal half-life permitting once-daily dosing', 'Proven reduction in stroke and cardiovascular events in ALLHAT trial'],
    clinicalLimitations: ['Does not provide immediate acute blood pressure lowering (peaks over days)', 'Lacks renal antiproteinuric benefit compared to ACE inhibitors'],
    commonSideEffects: ['Dose-dependent peripheral ankle edema (10%)', 'Facial flushing', 'Headache', 'Dizziness', 'Palpitations'],
    seriousAdverseEffects: ['Severe peripheral edema with venous stasis', 'Worsening myocardial ischemia in patients with severe obstructive CAD upon initiation'],
    contraindications: ['Known hypersensitivity to dihydropyridines', 'Severe hypotension (SBP < 90 mmHg)', 'Cardiogenic shock', 'Severe aortic stenosis'],
    allergyInformation: 'Cross-reactivity within dihydropyridine class (Nifedipine, Felodipine) is possible.',
    drugInteractionsSummary: 'Strong CYP3A4 inhibitors (Ketoconazole, Clarithromycin) increase amlodipine exposure. Simvastatin daily dose must not exceed 20 mg when co-prescribed with amlodipine.',
    alcoholInteractionSummary: 'Alcohol potentiates amlodipine-induced vasodilation, increasing orthostatic hypotension and syncope risk.',
    foodInteractions: ['Grapefruit juice may slightly increase amlodipine bioavailability, but clinical effect is modest.'],
    diseaseInteractions: ['Severe Hepatic Impairment: Clearance is decreased; start at 2.5 mg.', 'Heart Failure: Generally safe (PRAISE trial), but monitor for fluid retention.'],
    pregnancySafetyGuidance: 'FDA Category C. Limited data; preferred alternatives include Labetalol, Nifedipine, or Methyldopa.',
    breastfeedingGuidance: 'Present in human milk in small amounts; generally compatible under pediatrician review.',
    pediatricGuidance: 'Approved for hypertension in pediatric patients aged 6 to 17 years (starting dose 2.5 mg QD).',
    geriatricBeersGuidance: 'Decreased clearance in elderly; initial starting dose should be 2.5 mg QD.',
    renalAdjustment: 'No dose adjustment required across all stages of CKD or hemodialysis.',
    hepaticAdjustment: 'Severe hepatic impairment: Initiate therapy at 2.5 mg QD.',
    cardiacConsiderations: 'Causes peripheral arterial dilation with no negative inotropic cardiac depression at therapeutic doses.',
    diabetesConsiderations: 'Metabolically neutral; does not affect glycemic control or lipid profiles.',
    admeAbsorption: 'Oral bioavailability is 64-90%; peak plasma concentrations reached in 6-12 hours.',
    admeDistribution: 'Volume of distribution is ~21 L/kg; 97.5% plasma protein bound.',
    admeMetabolism: 'Extensively metabolized by hepatic CYP3A4 into inactive metabolites (90%).',
    admeExcretion: '60% urinary excretion, 20-25% feces (mostly inactive metabolites).',
    admeHalfLife: '30 to 50 hours (terminal elimination half-life).',
    primaryManufacturers: ['Pfizer', 'Mylan / Viatris', 'Cipla', 'Sun Pharma'],
    storageAndColdChain: 'Store between 15°C to 30°C (59°F to 86°F). Protect from light and moisture.'
  },

  // 2. Levothyroxine Sodium
  {
    id: 'sub-levothyroxine',
    genericName: 'Levothyroxine Sodium',
    brandNames: ['Synthroid', 'Eltroxin', 'Thyronorm', 'Levoxyl', 'Tirosint'],
    aliases: ['levothyroxine', 'synthroid', 'eltroxin', 'thyronorm', 't4'],
    activeIngredients: ['Levothyroxine Sodium (Synthetic T4)'],
    casNumber: '25416-65-3',
    atcCode: 'H03AA01',
    therapeuticClass: 'Thyroid Hormone Replacement',
    pharmacologicClass: 'Synthetic L-Triiodothyronine / Thyroxine Analogue',
    primaryLegalStatus: 'Prescription',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Prescription', scheduleDesignation: 'Rx Narrow Therapeutic Index', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'Prescription', scheduleDesignation: 'Schedule H', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'Prescription', scheduleDesignation: 'POM', prescriptionRequired: true }
    ],
    dosageForm: 'Tablets',
    dosageSubtype: 'Scored',
    releaseType: 'Immediate Release (IR)',
    primaryRoute: 'Oral',
    allAvailableRoutes: ['Oral', 'Intravenous (IV)'],
    strengthValue: 50,
    strengthUnit: 'mcg',
    concentrationDisplay: '25 mcg, 50 mcg, 75 mcg, 88 mcg, 100 mcg, 112 mcg, 125 mcg, 150 mcg, 200 mcg Tablets',
    approvedUses: ['Primary, Secondary & Tertiary Hypothyroidism', 'Pituitary TSH Suppression in Thyroid Carcinoma management'],
    medicalSpecialties: ['Endocrinology', 'General Medicine'],
    mechanismOfAction: 'Synthetic isomer of levothyroxine (T4) identical to endogenously secreted hormone; converted peripherally by 5\'-deiodinase to active triiodothyronine (T3), binding to nuclear thyroid hormone receptors to regulate metabolic rate, gene expression, and organ development.',
    clinicalBenefits: ['Reverses systemic hypometabolic symptoms (fatigue, cold intolerance, weight gain, constipation)', 'Normalizes serum TSH and free T4 levels with predictable pharmacokinetics'],
    clinicalLimitations: ['Narrow therapeutic index: Minor dose variations lead to subclinical or overt hyperthyroidism/hypothyroidism', 'Absorption highly vulnerable to co-administered food and polyvalent cations'],
    commonSideEffects: ['Generally absent at euthyroid replacement dose; hyperthyroid symptoms in overtreatment (tachycardia, tremors, anxiety, insomnia, weight loss)'],
    seriousAdverseEffects: ['Atrial Fibrillation and cardiac arrhythmias in elderly overtreatment', 'Accelerated bone mineral density loss / Osteoporosis from suppressed TSH', 'Precipitation of Acute Adrenal Crisis in undiagnosed adrenal insufficiency'],
    contraindications: ['Uncorrected subclinical/overt thyrotoxicosis', 'Uncorrected acute adrenal cortical insufficiency', 'Acute Myocardial Infarction'],
    allergyInformation: 'Synthetic molecule; reactions are usually due to tablet binders/dyes (Tirosint gel caps are dye/gluten free).',
    drugInteractionsSummary: 'Calcium carbonate, Ferrous sulfate, Aluminium antacids, PPIs, and Cholestyramine dramatically impair oral absorption; separate administration by at least 4 hours. Warfarin anticoagulant effect is enhanced when initiating levothyroxine.',
    alcoholInteractionSummary: 'No direct metabolic interaction; heavy alcohol intake may impair peripheral T4-to-T3 conversion.',
    foodInteractions: ['Soy products, dietary fiber, walnuts, and espresso coffee impair absorption. MUST BE TAKEN ON AN EMPTY STOMACH with water 30-60 minutes before breakfast.'],
    diseaseInteractions: ['Coronary Artery Disease: Start low (12.5 - 25 mcg) to avoid unmasking myocardial ischemia.', 'Diabetes: Thyroid replacement may increase insulin requirements.'],
    pregnancySafetyGuidance: 'FDA Category A. CRITICAL IN PREGNANCY: Fetal brain development depends on maternal T4. Dosage requirements typically increase by 25-50% during pregnancy; monitor TSH every 4 weeks.',
    breastfeedingGuidance: 'Minimally excreted in human milk; compatible and essential for maternal health.',
    pediatricGuidance: 'Congenital Hypothyroidism is a pediatric emergency; initiate 10-15 mcg/kg/day within the first 2 weeks of life to prevent irreversible cretinism/intellectual disability.',
    geriatricBeersGuidance: 'Start with lower initial dose (12.5 to 25 mcg/day) in patients ≥65 years, titrating by 12.5 mcg increments every 6-8 weeks based on serum TSH.',
    renalAdjustment: 'No dose adjustment required.',
    hepaticAdjustment: 'No dose adjustment required.',
    cardiacConsiderations: 'Increases myocardial oxygen consumption; monitor resting heart rate and ECG in CAD patients.',
    diabetesConsiderations: 'Normalizing hypothyroidism may restore glucose clearance and modify antidiabetic regimens.',
    admeAbsorption: 'Oral bioavailability is 40-80%; optimized in fasting state (acidic gastric pH required).',
    admeDistribution: '>99% bound to plasma proteins (Thyroxine-Binding Globulin [TBG], transthyretin, albumin).',
    admeMetabolism: 'Deiodinated in peripheral tissues (liver, kidneys) to active T3 and inactive reverse T3 (rT3).',
    admeExcretion: 'Eliminated primarily by kidneys as conjugated metabolites.',
    admeHalfLife: '6 to 7 days in euthyroid patients (prolonged to 9-10 days in hypothyroidism).',
    primaryManufacturers: ['AbbVie (Synthroid)', 'Abbott (Thyronorm)', 'Aspen (Eltroxin)', 'IBSA (Tirosint)'],
    storageAndColdChain: 'Store at 20°C to 25°C. Protect from light and heat.'
  },

  // 3. Fentanyl Transdermal System
  {
    id: 'sub-fentanyl-transdermal',
    genericName: 'Fentanyl Transdermal System',
    brandNames: ['Duragesic', 'Matrifen', 'Durogesic', 'Fendol'],
    aliases: ['fentanyl patch', 'duragesic', 'matrifen'],
    activeIngredients: ['Fentanyl Base'],
    casNumber: '437-38-7',
    atcCode: 'N01AH01',
    therapeuticClass: 'Potent Opioid Analgesic',
    pharmacologicClass: 'Synthetic Phenylpiperidine Mu-Opioid Receptor Agonist',
    primaryLegalStatus: 'Controlled',
    controlledSchedule: 'Schedule II (US) / Controlled Narcotic',
    isHighAlert: true,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Controlled', scheduleDesignation: 'Schedule II Narcotic (C-II)', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'Controlled', scheduleDesignation: 'NDPS Essential Narcotic Drug', prescriptionRequired: true },
      { countryCode: 'UK', countryName: 'United Kingdom', status: 'Controlled', scheduleDesignation: 'CD Schedule 2 POM', prescriptionRequired: true }
    ],
    dosageForm: 'Transdermal patches',
    releaseType: 'Extended Release (ER/XR)',
    primaryRoute: 'Transdermal',
    allAvailableRoutes: ['Transdermal', 'Intravenous (IV)', 'Sublingual', 'Buccal'],
    strengthValue: 25,
    strengthUnit: 'mcg/hr',
    deliveryRateDisplay: '12.5 mcg/hr, 25 mcg/hr, 50 mcg/hr, 75 mcg/hr, 100 mcg/hr Transdermal Patch',
    approvedUses: ['Management of severe, chronic cancer pain and persistent intractable pain in opioid-tolerant patients requiring continuous around-the-clock opioid analgesia.'],
    medicalSpecialties: ['Pain Medicine', 'Oncology / Palliative Care', 'Anesthesiology'],
    mechanismOfAction: 'Selective high-affinity agonist at Mu-opioid receptors in the central nervous system; inhibits adenylate cyclase, closes N-type voltage-operated calcium channels, and opens calcium-dependent inwardly rectifying potassium channels, hyperpolarizing neuronal membranes and blocking nociceptive transmission.',
    clinicalBenefits: ['Consistent 72-hour continuous systemic drug delivery', 'Non-oral route ideal for patients with severe dysphagia, bowel obstruction, or severe nausea', 'Potency is 50 to 100 times greater than morphine'],
    clinicalLimitations: ['STRICTLY CONTRAINDICATED in opioid-naive patients (causes fatal respiratory depression)', 'Slow onset (12-24 hours to reach peak therapeutic effect); cannot be used for acute or PRN pain'],
    commonSideEffects: ['Constipation (universal; requires prophylactic bowel regimen)', 'Nausea', 'Somnolence', 'Pruritus', 'Application-site erythema'],
    seriousAdverseEffects: ['🚨 Fatal Respiratory Depression and Hypoventilation', 'Severe Sedation, Coma, and Death with co-administered Benzodiazepines / Alcohol', 'Serotonin Syndrome when combined with serotonergic antidepressants'],
    contraindications: ['Opioid-naive patients', 'Acute or post-operative pain', 'Mild or intermittent pain', 'Severe respiratory depression or severe acute asthma', 'Paralytic ileus'],
    allergyInformation: 'Phenylpiperidine structure; does not cross-react with natural phenanthrene opioids (Morphine, Codeine).',
    drugInteractionsSummary: 'Strong CYP3A4 inhibitors (Ritonavir, Ketoconazole, Clarithromycin) block fentanyl clearance, precipitating fatal overdose. Benzodiazepines and CNS depressants cause synergistic respiratory arrest.',
    alcoholInteractionSummary: 'ABSOLUTELY CONTRAINDICATED. Alcohol causes additive central nervous system and medullary respiratory depression resulting in coma and fatal asphyxiation.',
    foodInteractions: ['External heat sources (heating pads, hot tubs, high fever) dramatically increase transdermal release rate by up to 300%, causing fatal overdose.'],
    diseaseInteractions: ['Severe Hepatic/Renal Failure: Fentanyl clearance is impaired; dose titrations must be conservative.', 'Severe COPD / Sleep Apnea: Decreased respiratory drive.'],
    pregnancySafetyGuidance: 'FDA Category C. Chronic maternal use leads to Neonatal Opioid Withdrawal Syndrome (NOWS); requires specialized NICU monitoring.',
    breastfeedingGuidance: 'Excreted in breast milk; can cause dangerous sedation and respiratory depression in nursing infant.',
    pediatricGuidance: 'Transdermal patches contraindicated in children under 2 years; approved in opioid-tolerant pediatric cancer patients ≥2 years under specialist supervision.',
    geriatricBeersGuidance: 'High risk of falls, delirium, and severe respiratory depression; Beers Criteria high-risk medication.',
    renalAdjustment: 'Reduce starting dose by 25-50% in severe renal impairment (eGFR < 30 mL/min).',
    hepaticAdjustment: 'Reduce starting dose by 50% in severe hepatic cirrhosis.',
    cardiacConsiderations: 'Can produce bradycardia via central vagal stimulation; monitor in sick sinus syndrome.',
    diabetesConsiderations: 'Compatible with diabetes; monitor for delayed gastric emptying affecting bowel motility.',
    admeAbsorption: 'Continuous transdermal absorption through skin depot; peak serum concentration at 24-72 hours.',
    admeDistribution: 'Highly lipophilic; volume of distribution is 4 to 6 L/kg; 80-85% plasma protein bound.',
    admeMetabolism: 'Extensively metabolized by hepatic CYP3A4 into inactive norfentanyl via N-dealkylation.',
    admeExcretion: '75% excreted in urine (primarily inactive metabolites), 10% in feces.',
    admeHalfLife: 'Apparent transdermal terminal elimination half-life is 17 to 24 hours (due to continuous skin depot release).',
    primaryManufacturers: ['Janssen Pharmaceuticals (Duragesic)', 'Sandoz', 'Mylan', 'Lupin'],
    storageAndColdChain: 'Store at 20°C to 25°C. Strictly locked controlled substance storage. Fold patch adhesive-to-adhesive and dispose safely to prevent accidental child/pet ingestion.',
    overdoseWarningSigns: ['Pinpoint Pupils (Miosis)', 'Severe Respiratory Depression (RR < 8 breaths/min)', 'Cyanosis of lips/fingertips', 'Profound Unresponsiveness / Coma'],
    specificAntidote: 'Naloxone Hydrochloride (Narcan) 0.4 mg to 2 mg IV, IM, or Intranasal; repeat every 2-3 minutes as needed. Note: Fentanyl transdermal depot requires extended Naloxone observation/infusion.'
  },

  // 4. Semaglutide Subcutaneous & Oral
  {
    id: 'sub-semaglutide-master',
    genericName: 'Semaglutide',
    brandNames: ['Ozempic', 'Wegovy', 'Rybelsus'],
    aliases: ['semaglutide', 'ozempic', 'wegovy', 'rybelsus', 'glp1'],
    activeIngredients: ['Semaglutide (Recombinant GLP-1 Analogue)'],
    casNumber: '910463-68-2',
    atcCode: 'A10BJ06',
    therapeuticClass: 'Antidiabetic / Anti-Obesity Biologic',
    pharmacologicClass: 'Long-Acting Glucagon-Like Peptide-1 (GLP-1) Receptor Agonist',
    primaryLegalStatus: 'Biologic',
    isHighAlert: false,
    isHospitalOnly: false,
    countryLegalClassifications: [
      { countryCode: 'US', countryName: 'United States', status: 'Biologic', scheduleDesignation: 'Rx Biologic BLA', prescriptionRequired: true },
      { countryCode: 'IN', countryName: 'India', status: 'Biologic', scheduleDesignation: 'Schedule H / Specialist Prescription', prescriptionRequired: true },
      { countryCode: 'EU', countryName: 'European Union (EMA)', status: 'Biologic', scheduleDesignation: 'Centralized Prescription Biologic', prescriptionRequired: true }
    ],
    dosageForm: 'Auto-injectors',
    releaseType: 'Prolonged Release (PR)',
    primaryRoute: 'Subcutaneous (SC)',
    allAvailableRoutes: ['Subcutaneous (SC)', 'Oral'],
    strengthValue: 1,
    strengthUnit: 'mg',
    concentrationDisplay: '0.25 mg, 0.5 mg, 1.0 mg, 2.0 mg, 2.4 mg Prefilled Auto-Injectors; 3 mg, 7 mg, 14 mg Oral Tablets (Rybelsus)',
    approvedUses: [
      'Type 2 Diabetes Mellitus glycemic control alongside diet and exercise (Ozempic / Rybelsus).',
      'Major Adverse Cardiovascular Events (MACE) risk reduction in T2D with established CVD (SUSTAIN-6 trial).',
      'Chronic Weight Management in adult obesity (BMI ≥30) or overweight (BMI ≥27) with weight-related comorbidity (Wegovy).',
      'Cardiovascular death reduction in overweight adults with established CVD (SELECT trial).'
    ],
    medicalSpecialties: ['Endocrinology', 'Cardiology', 'Bariatric Medicine', 'Primary Care'],
    mechanismOfAction: 'Selective agonist of human GLP-1 receptors, engineered with a C18 fatty di-acid chain that binds to albumin, prolonging half-life to 1 week. Stimulates glucose-dependent insulin secretion from pancreatic beta cells, suppresses inappropriate glucagon secretion, and delays gastric emptying, promoting central hypothalamic satiety.',
    clinicalBenefits: ['Potent HbA1c reduction (1.5 - 2.0%)', 'Substantial, sustained weight reduction (up to 15-18% of baseline body weight)', 'Demonstrated 26% reduction in cardiovascular death, nonfatal MI, and nonfatal stroke', 'Renal protection reducing progression to end-stage kidney disease (FLOW trial)'],
    clinicalLimitations: ['Requires weekly subcutaneous self-injection or strict fasting oral dosing (Rybelsus with 120mL plain water 30 min before food)', 'High incidence of transient gastrointestinal adverse effects during dose escalation'],
    commonSideEffects: ['Nausea (20-40%)', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal pain', 'Dyspepsia', 'Eructation (sulfur burps)'],
    seriousAdverseEffects: [
      '🚨 Acute Pancreatitis (persistent severe epigastric pain radiating to back)',
      'Acute Gallbladder Disease (Cholelithiasis, Cholecystitis)',
      'Severe Dehydration predisposing to Acute Kidney Injury (AKI)',
      'Worsening of Diabetic Retinopathy complications in patients with pre-existing proliferative disease upon rapid glucose reduction',
      'FDA Boxed Warning: Thyroid C-cell Tumors / Medullary Thyroid Carcinoma (in rodent studies)'
    ],
    contraindications: [
      'Personal or family history of Medullary Thyroid Carcinoma (MTC)',
      'Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)',
      'Known hypersensitivity to semaglutide',
      'Prior history of severe pancreatitis triggered by GLP-1 RAs'
    ],
    allergyInformation: 'Recombinant peptide; rare injection-site reactions and anaphylaxis reported.',
    drugInteractionsSummary: 'Delayed gastric emptying may slow oral absorption of co-administered medications. Co-administration with Insulin or Sulfonylureas increases hypoglycemia risk; reduce insulin/sulfonylurea dose upon initiation.',
    alcoholInteractionSummary: 'Alcohol impairs hepatic gluconeogenesis, increasing severe hypoglycemia risk when taking antidiabetic therapy. Chronic binge drinking also increases acute pancreatitis risk.',
    foodInteractions: ['Oral tablets (Rybelsus) MUST be swallowed whole on waking with ≤120 mL of plain water; wait 30 minutes before eating, drinking, or taking other oral medications.'],
    diseaseInteractions: [
      'Diabetic Gastroparesis: May worsen severe gastric retention and nausea.',
      'Active Proliferative Retinopathy: Monitor fundus exams carefully during rapid glycemic improvement.'
    ],
    pregnancySafetyGuidance: 'Contraindicated in pregnancy; potential fetal harm reported in animal reproductive studies. Discontinue at least 2 months prior to a planned pregnancy due to long washout period.',
    breastfeedingGuidance: 'Unknown if excreted in human milk; use with caution or consider alternatives during lactation.',
    pediatricGuidance: 'Wegovy approved for weight management in pediatric patients aged ≥12 years with initial BMI ≥95th percentile for age and sex.',
    geriatricBeersGuidance: 'No starting dose adjustment required; monitor hydration status and weight loss velocity to prevent sarcopenia.',
    renalAdjustment: 'No dose adjustment required across all stages of CKD (including eGFR < 15 mL/min); beneficial renal protection demonstrated in FLOW trial.',
    hepaticAdjustment: 'No dose adjustment required.',
    cardiacConsiderations: 'Causes mild increase in resting heart rate (1-3 bpm); proven MACE cardiovascular benefit.',
    diabetesConsiderations: 'Significantly improves fasting and postprandial glucose with low intrinsic risk of hypoglycemia as monotherapy.',
    admeAbsorption: 'Subcutaneous absolute bioavailability is 89%; peak concentration in 1 to 3 days.',
    admeDistribution: 'Extensively bound to plasma albumin (>99%).',
    admeMetabolism: 'Proteolytic cleavage of the peptide backbone and beta-oxidation of the fatty acid side chain.',
    admeExcretion: 'Eliminated via renal (3% unchanged) and fecal pathways as peptide fragments.',
    admeHalfLife: 'Approximately 1 week (168 hours), permitting convenient once-weekly subcutaneous dosing.',
    primaryManufacturers: ['Novo Nordisk'],
    storageAndColdChain: 'Cold Chain Required: Store unused pens refrigerated at 2°C to 8°C (36°F to 46°F). Once in use, pens can be kept at room temperature (below 30°C / 86°F) for up to 56 days.'
  }
];

/* =========================================================================
   2. NOVA TOX / FORENSIC DRUG DATABASE (SEPARATED ILLICIT / FORENSIC SECTION)
   ========================================================================= */

export const NOVA_FORENSIC_TOX_DATABASE: ForensicToxRecord[] = [
  {
    id: 'tox-illicit-fentanyl',
    substanceName: 'Illicit Fentanyl & Fentanyl Analogues (Carfentanil, Acetylfentanyl)',
    streetAliases: ['Street Fentanyl', 'China White', 'Apache', 'Dance Fever', 'Murder 8', 'Fetty', 'Blues'],
    substanceCategory: 'Illicit Opioid',
    chemicalClass: 'Synthetic Phenylpiperidine',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'None for illicitly manufactured street powder/counterfeit pills (prescription fentanyl exists for severe surgical/cancer pain).',
    primaryMechanism: 'Ultra-high potency Mu-opioid receptor full agonist. Crosses blood-brain barrier almost instantaneously, causing profound inhibition of medullary respiratory pacemaker neurons.',
    toxicityProfile: 'Lethal dose is approximately 2 milligrams (equivalent to a few grains of salt). 50x more potent than heroin, 100x more potent than morphine. Carfentanil is 10,000x more potent than morphine.',
    dependenceRiskScore: 99,
    majorHealthEffects: [
      'Rapid catastrophic respiratory arrest within 60-120 seconds of exposure.',
      'Profound anoxic brain injury and irreversible encephalopathy.',
      'Wooden Chest Syndrome (severe thoracic muscle rigidity preventing manual ventilation).',
      'Severe non-cardiogenic pulmonary edema with foam cone formation.'
    ],
    overdoseWarningSigns: [
      'Pinpoint non-reactive pupils.',
      'Gurgling / Snoring sounds ("Death Rattle").',
      'Blue / Ash-gray lips, fingernails, or skin.',
      'Total unresponsiveness to physical sternal rub.',
      'Respiratory rate < 4 breaths/min or complete apnea.'
    ],
    forensicDetectionMarkers: [
      'Norfentanyl (primary urinary metabolite)',
      '4-ANPP (precursor and synthetic intermediate marker)',
      'Despropionylfentanyl',
      'Carfentanil blood concentrations (pg/mL range by LC-MS/MS)'
    ],
    reversalAntidoteProtocol: '🚨 NALOXONE PROTOCOL: Administer Naloxone 4 mg Intranasal (or 0.4-2 mg IV/IM). Repeat every 2-3 minutes if no response. Multiple doses (up to 8-12 mg) often mandatory due to extreme receptor binding affinity. Initiate rescue breathing immediately.',
    ghsHazardClass: '☠️ GHS Fatal if Inhaled / Swallowed / In Contact with Skin'
  },
  {
    id: 'tox-methamphetamine',
    substanceName: 'Methamphetamine Hydrochloride (Illicit Crystal)',
    streetAliases: ['Crystal Meth', 'Ice', 'Glass', 'Tina', 'Shabu', 'Speed', 'Chalk'],
    substanceCategory: 'Illicit Stimulant',
    chemicalClass: 'Substituted Amphetamine',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'None for illicit d-methamphetamine crystal (Desoxyn brand exists in strict micro-doses for refractory narcolepsy/ADHD).',
    primaryMechanism: 'Reverses the dopamine transporter (DAT), norepinephrine transporter (NET), and serotonin transporter (SERT), releasing massive surges of vesicular catecholamines into synaptic clefts while inhibiting MAO breakdown.',
    toxicityProfile: 'Severe hyper-adrenergic surge predisposing to intracranial hemorrhage, malignant hyperthermia, aortic dissection, and acute paranoid psychosis.',
    dependenceRiskScore: 96,
    majorHealthEffects: [
      'Severe neurotoxicity with degeneration of dopaminergic axon terminals.',
      'Amphetamine-induced acute paranoid psychosis with tactile hallucinations (formication / "meth bugs").',
      'Accelerated cardiovascular disease (Methamphetamine-associated cardiomyopathy / biventricular failure).',
      'Severe dental decay and enamel loss ("Meth mouth") from xerostomia and bruxism.'
    ],
    overdoseWarningSigns: [
      'Extreme hyperthermia (Core temp > 40°C / 104°F).',
      'Malignant tachycardia (HR > 160-180 bpm) and severe hypertension.',
      'Refractory seizures and status epilepticus.',
      'Acute delirium with violent psychomotor agitation and delirium tremens-like exhaustion.'
    ],
    forensicDetectionMarkers: [
      'd-Methamphetamine in urine (persists 3-5 days)',
      'Amphetamine (active metabolite)',
      'Hair follicle testing (positive for up to 90 days)'
    ],
    reversalAntidoteProtocol: 'Supportive Care: Aggressive active cooling for hyperthermia. High-dose IV Benzodiazepines (Diazepam 10-20 mg IV or Lorazepam 2-4 mg IV) to control central sympathomimetic storm and seizures. Vasodilators (Nitroprusside or Phentolamine) for severe hypertensive emergency. Avoid pure beta-blockers due to unopposed alpha-vasoconstriction.',
    ghsHazardClass: '☠️ GHS Toxic Substance'
  },
  {
    id: 'tox-mdma-ecstasy',
    substanceName: '3,4-Methylenedioxymethamphetamine (MDMA / Ecstasy / Molly)',
    streetAliases: ['Molly', 'Ecstasy', 'XTC', 'E', 'Mandy', 'Adam'],
    substanceCategory: 'Novel Psychoactive Substance (NPS)',
    chemicalClass: 'Ring-Substituted Amphetamine / Entactogen',
    legalClassification: '⚫ Illicit (Schedule I / Prohibited)',
    medicalUseIfAny: 'Under active investigational clinical trials for PTSD psychotherapy (FDA Breakthrough status under study; street pills are illicit).',
    primaryMechanism: 'Massive reversal of the serotonin transporter (SERT), causing acute vesicular serotonin flooding alongside moderate dopamine/norepinephrine release and oxytocin secretion.',
    toxicityProfile: 'Risk of lethal Serotonin Syndrome, fatal exercise-induced hyperthermia, and acute dilutional hyponatremic encephalopathy from excessive water drinking and drug-induced SIADH.',
    dependenceRiskScore: 70,
    majorHealthEffects: [
      'Life-threatening Serotonin Syndrome (hyperthermia, clonus, autonomic instability).',
      'Acute dilutional hyponatremia and cerebral edema (seizures, coma, brainstem herniation).',
      'Acute hepatic failure and centrilobular necrosis.',
      'Mid-week depressive crash ("Suicide Tuesday") from transient brain serotonin depletion.'
    ],
    overdoseWarningSigns: [
      'Hyperthermia > 41°C (106°F).',
      'Spontaneous or inducible ocular/ankle clonus and hyperreflexia.',
      'Confusion, severe hyponatremic seizures, and obtundation.',
      'Disseminated Intravascular Coagulation (DIC) and acute rhabdomyolysis.'
    ],
    forensicDetectionMarkers: [
      'MDMA in urine / blood',
      'MDA (3,4-Methylenedioxyamphetamine - active metabolite)',
      'HMMA (4-hydroxy-3-methoxymethamphetamine)'
    ],
    reversalAntidoteProtocol: 'Serotonin Antagonist: Cyproheptadine (12 mg oral initial, followed by 2 mg Q2H) for serotonin syndrome. Rapid external cooling. Hypertonic 3% Saline (100 mL bolus) for acute symptomatic hyponatremic seizures with cerebral edema. IV Benzodiazepines for agitation.',
    ghsHazardClass: '⚠️ GHS Acute Toxicity / Hazard'
  }
];

/* =========================================================================
   3. COUNTERFEIT & DARK MEDICINE INTELLIGENCE REGISTRY
   ========================================================================= */

export const COUNTERFEIT_INTELLIGENCE_REGISTRY: CounterfeitIntelligenceRecord[] = [
  {
    id: 'fake-ozempic-pens',
    suspectedBrandName: 'Ozempic (Counterfeit Prefilled Pens)',
    falsifiedProductType: 'Wrong Active Ingredient',
    claimedIngredientOnBox: 'Semaglutide 1 mg/dose',
    actualLabDetectedContent: 'Unlabeled High-Dose Fast-Acting Insulin Glulisine / Aspart',
    reportedLotBatch: 'Batch MP5E511 / Lot LP6F123',
    originatingJurisdiction: 'Multiple international retail/online pharmacies (US, UK, Austria, Germany, Middle East)',
    discoveryDate: '2024-Q1 (Ongoing Active WHO Alert)',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Patients taking this counterfeit pen expecting once-weekly semaglutide inadvertently inject massive boluses of fast-acting insulin, causing catastrophic, life-threatening profound hypoglycemic coma, seizures, and permanent brain death within 30-60 minutes.',
    regulatoryAgencyAlert: '🚨 WHO Medical Product Alert No. 3/2024 & FDA Public Notification on Falsified Ozempic Pens.',
    visualAuthenticationTelltales: [
      'Dose counter window does NOT extend smoothly when dial is turned (it extends in length like an insulin pen).',
      'Spelling errors on the outer carton carton (e.g. "Semaglutid" instead of "Semaglutide").',
      'Needles supplied in package are generic 31G insulin needles rather than official NovoFine Plus needles.',
      'QR security code on box does not resolve to the official Novo Nordisk GS1 authentication portal.'
    ]
  },
  {
    id: 'fake-xanax-fentanyl-pressed',
    suspectedBrandName: 'Xanax 2 mg ("Fake Pressed Bars")',
    falsifiedProductType: 'Wrong Active Ingredient',
    claimedIngredientOnBox: 'Alprazolam 2 mg',
    actualLabDetectedContent: 'Illicit Fentanyl 1.8 mg + Bromazolam / Microcrystalline Cellulose',
    reportedLotBatch: 'Street pressed counterfeit (Falsified "XANAX 2" imprint)',
    originatingJurisdiction: 'North America / Illicit online marketplace',
    discoveryDate: '2024 Active Alert',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Purchased by users believing it to be prescription alprazolam for anxiety/insomnia. Contains lethal concentrations of fentanyl, causing instantaneous respiratory arrest and death in opioid-naive individuals.',
    regulatoryAgencyAlert: 'DEA Special Alert: "One Pill Can Kill" Counterfeit Prescription Drug Warning.',
    visualAuthenticationTelltales: [
      'Pill edges are crumbly, chalky, or unevenly beveled compared to pharmaceutical machine-pressed tablets.',
      'Pills easily dissolve into powder upon gentle thumb pressure.',
      'Color tone varies from chalky off-white to yellowish-white.'
    ]
  },
  {
    id: 'fake-cough-syrup-deg-toxin',
    suspectedBrandName: 'Promethazine / Paracetamol Pediatric Syrups',
    falsifiedProductType: 'Contaminated Batch',
    claimedIngredientOnBox: 'Propylene Glycol / Glycerin Pharmaceutical Solvent',
    actualLabDetectedContent: 'Industrial Diethylene Glycol (DEG) & Ethylene Glycol (>15% toxic solvent adulterant)',
    reportedLotBatch: 'Batch N2201 / Lot PG-5541',
    originatingJurisdiction: 'Unregulated industrial solvent supply chains',
    discoveryDate: '2023 - 2024 WHO Alert Series',
    dangerLevel: 'CRITICAL_LETHAL',
    clinicalHazardDescription: 'Industrial diethylene glycol used as a cheaper counterfeit substitute for pharmaceutical-grade propylene glycol. Ingested by febrile children, it metabolizes to oxalic acid and diglycolic acid, causing acute anuric renal failure, metabolic acidosis, cranial nerve palsies, and widespread pediatric death.',
    regulatoryAgencyAlert: 'WHO Global Medical Product Alerts No. 6/2022, 1/2023 & 4/2023 (Substandard & Contaminated Liquid Dosage Forms).',
    visualAuthenticationTelltales: [
      'Syrup lacks authenticated Certificate of Analysis (CoA) for raw solvent batch.',
      'Slightly sweet, viscous odor with absence of manufacturer tamper-evident cap seal.',
      'Batch number not verifiable in national drug regulatory registry.'
    ]
  }
];
