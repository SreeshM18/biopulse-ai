import { ClinicalTrial } from '../types/biotech';

export const CLINICAL_TRIALS_DATABASE: ClinicalTrial[] = [
  {
    nctId: 'NCT04975256',
    title: 'Phase 1/2 Study of MRTX1133 in Patients With Advanced Solid Tumors Harboring a KRAS G12D Mutation',
    phase: 'Phase 1/2',
    status: 'Recruiting',
    cancerType: 'Pancreatic Cancer / Colorectal / NSCLC',
    biomarkers: ['KRAS G12D', 'Solid Tumors'],
    leadSponsor: 'Mirati Therapeutics / Bristol Myers Squibb',
    locations: ['Memorial Sloan Kettering (NY)', 'MD Anderson Cancer Center (TX)', 'Mayo Clinic (MN)', 'Dana-Farber Cancer Institute (MA)', 'Gustave Roussy (France)'],
    enrollment: 380,
    primaryDrug: 'MRTX1133 (Selective KRAS G12D Inhibitor)',
    matchScore: 98,
    eligibilityCriteria: [
      'Documented KRAS G12D mutation verified via NGS or liquid biopsy ctDNA',
      'Histologically confirmed locally advanced or metastatic solid tumor',
      'ECOG Performance Status 0-1',
      'Adequate organ function and bone marrow reserve',
      'Progression on or intolerance to prior standard systemic chemotherapy'
    ],
    briefSummary: 'A multi-center, open-label trial evaluating safety, tolerability, pharmacokinetics, and clinical activity of MRTX1133 in patients with KRAS G12D mutations across pancreatic ductal adenocarcinoma and colorectal tumors.',
    startDate: '2022-01-15'
  },
  {
    nctId: 'NCT03785249',
    title: 'CodeBreaK 100: Study of AMG 510 (Sotorasib) in Solid Tumors With KRAS G12C Mutation',
    phase: 'Phase 2',
    status: 'Active, not recruiting',
    cancerType: 'Non-Small Cell Lung Cancer',
    biomarkers: ['KRAS G12C'],
    leadSponsor: 'Amgen',
    locations: ['Memorial Sloan Kettering (NY)', 'Johns Hopkins Sidney Kimmel Cancer Center (MD)', 'Stanford Cancer Institute (CA)'],
    enrollment: 174,
    primaryDrug: 'Sotorasib (Lumakras)',
    matchScore: 94,
    eligibilityCriteria: [
      'Locally advanced or metastatic non-small cell lung cancer harboring KRAS p.G12C',
      'Disease progression after previous platinum-based doublet chemotherapy and checkpoint inhibitor',
      'Measurable disease per RECIST v1.1'
    ],
    briefSummary: 'Landmark trial establishing the objective response rate (ORR 37.1%) and duration of response for covalent Switch II KRAS G12C inhibition.',
    startDate: '2019-03-20'
  },
  {
    nctId: 'NCT02296125',
    title: 'AURA3: Phase 3 Study of Osimertinib Versus Platinum-Pemetrexed for EGFR T790M-Positive Advanced NSCLC',
    phase: 'Phase 3',
    status: 'Active, not recruiting',
    cancerType: 'Non-Small Cell Lung Cancer',
    biomarkers: ['EGFR T790M', 'EGFR L858R', 'EGFR Exon 19 del'],
    leadSponsor: 'AstraZeneca',
    locations: ['MD Anderson (TX)', 'Royal Marsden NHS Foundation (UK)', 'Seoul National University Hospital (South Korea)'],
    enrollment: 419,
    primaryDrug: 'Osimertinib (Tagrisso 80mg daily)',
    matchScore: 96,
    eligibilityCriteria: [
      'Locally advanced or metastatic NSCLC with confirmed central T790M resistance mutation after 1st-line TKI',
      'Asymptomatic CNS metastases permitted if stable',
      'World Health Organization (WHO) performance status 0-1'
    ],
    briefSummary: 'Global Phase 3 randomized study demonstrating significantly prolonged progression-free survival (10.1 months vs 4.4 months) with CNS disease penetration.',
    startDate: '2014-08-01'
  },
  {
    nctId: 'NCT03905148',
    title: 'Trial of Next-Generation 4th-Line Allosteric EGFR Inhibitors (BLU-945) in C797S Triple-Mutant NSCLC',
    phase: 'Phase 1/2',
    status: 'Recruiting',
    cancerType: 'Non-Small Cell Lung Cancer',
    biomarkers: ['EGFR C797S', 'EGFR T790M', 'EGFR Exon 19 del'],
    leadSponsor: 'Blueprint Medicines',
    locations: ['Memorial Sloan Kettering (NY)', 'Massachusetts General Hospital (MA)', 'UCLA Health (CA)', 'Karolinska University Hospital (Sweden)'],
    enrollment: 210,
    primaryDrug: 'BLU-945 + Osimertinib Combination',
    matchScore: 91,
    eligibilityCriteria: [
      'Progression on 3rd-generation TKI with acquired C797S mutation',
      'Evaluable disease by RECIST v1.1',
      'No history of interstitial lung disease'
    ],
    briefSummary: 'Investigating reversible allosteric kinase inhibition capable of overcoming Osimertinib-resistant C797S tertiary mutations without off-target wild-type EGFR toxicity.',
    startDate: '2021-06-10'
  },
  {
    nctId: 'NCT04543188',
    title: 'Precision PARP1-Selective Inhibitor (Saruparib / AZD5305) in HRD and BRCA1/2-Deficient Malignancies',
    phase: 'Phase 2',
    status: 'Recruiting',
    cancerType: 'Breast / Ovarian / Prostate / Pancreatic',
    biomarkers: ['BRCA1 Inactivating', 'BRCA2 Mutation', 'HRD Positive'],
    leadSponsor: 'AstraZeneca',
    locations: ['Mayo Clinic Rochester (MN)', 'Fred Hutchinson Cancer Center (WA)', 'University of Texas MD Anderson (TX)', 'Princess Margaret Cancer Centre (Canada)'],
    enrollment: 320,
    primaryDrug: 'Saruparib (AZD5305 PARP1 Selective Trapper)',
    matchScore: 95,
    eligibilityCriteria: [
      'Germline or somatic pathogenic BRCA1/2 or PALB2 mutation',
      'Prior PARP inhibitor naïve or refractory depending on sub-cohort',
      'ECOG 0-2'
    ],
    briefSummary: 'Next-generation next-to-zero hematologic toxicity PARP1-selective inhibitor trial showing expanded therapeutic index in BRCA-driven solid tumors.',
    startDate: '2021-11-20'
  }
];
