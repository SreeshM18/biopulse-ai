export type AnatomyHierarchyLevel = 'Human Body' | 'Body System' | 'Organ' | 'Tissue' | 'Cell' | 'Microstructure' | 'DNA Molecule';

export interface AnatomyEntity {
  id: string;
  name: string;
  latinName: string;
  category: 'Body' | 'Brain' | 'Neuron' | 'Heart' | 'Lungs' | 'Eye' | 'Ear' | 'Skeleton' | 'Muscles' | 'Kidney' | 'Digestive' | 'Liver' | 'Endocrine' | 'Fetal' | 'Cell & DNA';
  hierarchyLevel: AnatomyHierarchyLevel;
  system: string;
  layer: 'Skin' | 'Muscles' | 'Skeleton' | 'Vessels' | 'Nerves' | 'Lymphatics' | 'Organs' | 'Endocrine';
  description: string;
  microMacroPath: string[];
  anatomicalStructures: {
    name: string;
    function: string;
    clinicalSignificance: string;
  }[];
  healthyVsDisease: {
    healthyState: string;
    diseaseState: string;
    diseaseName: string;
    icd10: string;
    diagnostics: string[];
    treatment: string;
  };
  digitalTwinTelemetry: {
    metric: string;
    value: string;
    unit: string;
    status: 'Optimal' | 'Normal' | 'Elevated' | 'Critical';
  }[];
  molecularBiomarkers: string[];
}

export const MASTER_ANATOMY_ENTITIES: AnatomyEntity[] = [
  {
    id: 'neuron-synapse',
    name: '3D Neuron & Synaptic Cleft',
    latinName: 'Neuronum multipolare & Synapsis chemica',
    category: 'Neuron',
    hierarchyLevel: 'Microstructure',
    system: 'Nervous System',
    layer: 'Nerves',
    description: 'Electrically excitable neural cell with dendritic arborization, myelinated axon, and chemical neurotransmitter release vesicles.',
    microMacroPath: ['Human Body', 'Nervous System', 'Brain & Spinal Cord', 'Grey Matter', 'Pyramidal Neuron', 'Synaptic Bouton', 'PSD-95 Receptor Cluster'],
    anatomicalStructures: [
      { name: 'Soma & Nucleus', function: 'Metabolic engine containing chromatin, nucleolus, and protein synthesis ribosomes.', clinicalSignificance: 'Target of neurofibrillary tau tangles.' },
      { name: 'Axon Hillock', function: 'Integrates EPSPs and IPSPs to trigger all-or-nothing action potentials.', clinicalSignificance: 'Site of voltage-gated Na+ channel concentration (Nav1.6).' },
      { name: 'Myelin Sheath & Nodes of Ranvier', function: 'Lipid insulation facilitating saltatory high-speed impulse propagation (120 m/s).', clinicalSignificance: 'Autoimmune demyelination in Multiple Sclerosis.' },
      { name: 'Synaptic Vesicles (VAMP/Synaptotagmin)', function: 'Contains 5,000 neurotransmitter molecules per vesicle released via Ca2+ exocytosis.', clinicalSignificance: 'Target of botulinum and tetanus neurotoxins.' },
      { name: 'Post-Synaptic Density (AMPA/NMDA)', function: 'Ionotropic glutamate receptors mediating rapid excitatory neurotransmission.', clinicalSignificance: 'Excitotoxic Ca2+ overload in ischemic stroke.' }
    ],
    healthyVsDisease: {
      healthyState: 'Synchronized action potential propagation at 118 m/s with rapid astrocytic glutamate clearance.',
      diseaseState: 'Severe myelin loss with impaired conduction and excitotoxic glutamate accumulation in synaptic cleft.',
      diseaseName: 'Multiple Sclerosis & Excitotoxic Neurodegeneration',
      icd10: 'G35',
      diagnostics: ['High-Field 3T Brain MRI (Demyelinating Dawson Fingers)', 'Lumbar Puncture (CSF Oligoclonal Bands)', 'Visual Evoked Potentials (VEP)'],
      treatment: 'High-Dose IV Methylprednisolone + Ocrelizumab Biologic'
    },
    digitalTwinTelemetry: [
      { metric: 'Resting Membrane Potential', value: '-70.2', unit: 'mV', status: 'Normal' },
      { metric: 'Action Potential Amplitude', value: '+105', unit: 'mV', status: 'Optimal' },
      { metric: 'Axonal Conduction Velocity', value: '118.4', unit: 'm/s', status: 'Optimal' },
      { metric: 'Synaptic Cleft Delay', value: '0.45', unit: 'ms', status: 'Normal' }
    ],
    molecularBiomarkers: ['Neurofilament Light Chain (NfL)', 'Glial Fibrillary Acidic Protein (GFAP)', 'Synaptotagmin-1', 'PSD-95']
  },
  {
    id: 'brain-cerebrum',
    name: '3D Human Brain & Deep Nuclei',
    latinName: 'Cerebrum, Diencephalon & Truncus Encephali',
    category: 'Brain',
    hierarchyLevel: 'Organ',
    system: 'Nervous System',
    layer: 'Organs',
    description: 'The master organ of consciousness, voluntary motor control, cognitive executive processing, and autonomic regulation.',
    microMacroPath: ['Human Body', 'Nervous System', 'Central Nervous System', 'Brain (Cerebrum & Cerebellum)', 'Cerebral Cortex (Brodmann Areas)', 'Cortical Column', 'Neuron'],
    anatomicalStructures: [
      { name: 'Frontal Lobe & Prefrontal Cortex', function: 'Executive planning, personality, working memory, and Broca speech production.', clinicalSignificance: 'Abulia, motor aphasia, or disinhibition in frontal strokes.' },
      { name: 'Parietal & Somatosensory Cortex', function: 'Spatial proprioception, 2-point discrimination, and sensory integration.', clinicalSignificance: 'Hemispatial neglect in right parietal strokes.' },
      { name: 'Temporal Lobe & Hippocampus', function: 'Auditory processing, Wernicke language comprehension, and declarative memory consolidation.', clinicalSignificance: 'Early atrophy in Alzheimer dementia.' },
      { name: 'Occipital Lobe (V1 Cortex)', function: 'Primary visual processing from retinogeniculate projections.', clinicalSignificance: 'Cortical blindness and homonymous hemianopia.' },
      { name: 'Circle of Willis & Basilar Artery', function: 'Arterial collateral ring preventing cerebral ischemia during vascular stenosis.', clinicalSignificance: 'Aneurysmal subarachnoid hemorrhage & MCA stroke.' }
    ],
    healthyVsDisease: {
      healthyState: 'Uniform cerebral perfusion with intact auto-regulation and dominant 10 Hz Alpha EEG rhythm.',
      diseaseState: 'Middle Cerebral Artery (MCA) thromboembolic occlusion with ischemic penumbra salvageable via recanalization.',
      diseaseName: 'Acute Ischemic Cerebral Infarction (MCA Territory)',
      icd10: 'I63.9',
      diagnostics: ['Non-Contrast Head CT (Aspects Score)', 'CT Perfusion (Mismatch Penumbra)', 'CT Angiography Neck/Head'],
      treatment: 'Emergency IV Alteplase (tPA < 4.5h) + Endovascular Catheter Thrombectomy (< 24h)'
    },
    digitalTwinTelemetry: [
      { metric: 'Intracranial Pressure (ICP)', value: '11.4', unit: 'mmHg', status: 'Normal' },
      { metric: 'Cerebral Perfusion Pressure (CPP)', value: '76.2', unit: 'mmHg', status: 'Optimal' },
      { metric: 'EEG Rhythm', value: 'Alpha 10.2', unit: 'Hz', status: 'Normal' },
      { metric: 'Glasgow Coma Scale (GCS)', value: '15 / 15', unit: 'Score', status: 'Optimal' }
    ],
    molecularBiomarkers: ['S100B', 'GFAP', 'UCH-L1', 'Neuron-Specific Enolase (NSE)']
  },
  {
    id: 'heart-cardio',
    name: '3D Heart & Coronary Circulation',
    latinName: 'Cor, Valvae Cordis & Arteriae Coronariae',
    category: 'Heart',
    hierarchyLevel: 'Organ',
    system: 'Cardiovascular System',
    layer: 'Organs',
    description: 'Four-chambered muscular muscular pump generating continuous systemic and pulmonary arterial circulation with intrinsic conduction.',
    microMacroPath: ['Human Body', 'Circulatory System', 'Heart', 'Left Ventricular Myocardium', 'Intercalated Disc', 'Cardiomyocyte', 'Sarcomere (Actin/Myosin)'],
    anatomicalStructures: [
      { name: 'Left Ventricle (LV)', function: 'High-pressure muscular chamber generating systolic ejection (SV ~70 mL).', clinicalSignificance: 'Left ventricular remodeling & heart failure with reduced EF (HFrEF).' },
      { name: 'Coronary Arteries (LAD & LCx)', function: 'Perfuses oxygenated blood to myocardium during ventricular diastole.', clinicalSignificance: 'Atherosclerotic plaque rupture causing acute STEMI.' },
      { name: 'Cardiac Valves (Aortic, Mitral, Tricuspid)', function: 'Fibrous endocardial cusps maintaining forward unidirectional blood flow.', clinicalSignificance: 'Calcific aortic stenosis & mitral regurgitation murmur.' },
      { name: 'SA & AV Nodes (Conduction System)', function: 'Pacemaker cells generating spontaneous electrical rhythm conducted via Purkinje fibers.', clinicalSignificance: 'Atrial fibrillation with rapid ventricular response (RVR).' },
      { name: 'Pericardium', function: 'Fibroserous double-layered protective sac containing 20 mL serous fluid.', clinicalSignificance: 'Cardiac tamponade with Beck triad.' }
    ],
    healthyVsDisease: {
      healthyState: 'Normal sinus rhythm 74 bpm, ejection fraction 62%, stroke volume 75 mL with no regional wall motion abnormality.',
      diseaseState: 'Acute anterior wall STEMI due to 100% proximal LAD thrombosis with ST-elevation and cardiogenic shock risk.',
      diseaseName: 'Acute ST-Elevation Myocardial Infarction (STEMI)',
      icd10: 'I21.0',
      diagnostics: ['12-Lead Continuous ECG (ST Elevation V1-V4)', 'High-Sensitivity Troponin I', 'Emergency Coronary Angiogram'],
      treatment: 'Emergency Primary Percutaneous Coronary Intervention (PCI < 90 min) + Dual Antiplatelets'
    },
    digitalTwinTelemetry: [
      { metric: 'Heart Rate', value: '74', unit: 'BPM', status: 'Normal' },
      { metric: 'Cardiac Output', value: '5.2', unit: 'L/min', status: 'Optimal' },
      { metric: 'Ejection Fraction (LVEF)', value: '62', unit: '%', status: 'Normal' },
      { metric: 'Troponin I (hs-cTnI)', value: '< 0.01', unit: 'ng/mL', status: 'Optimal' }
    ],
    molecularBiomarkers: ['hs-cTnI', 'NT-proBNP', 'CK-MB', 'Myoglobin']
  },
  {
    id: 'lungs-respiratory',
    name: '3D Lungs & Alveolar Capillary Bed',
    latinName: 'Pulmones, Arbor Bronchialis & Alveoli',
    category: 'Lungs',
    hierarchyLevel: 'Organ',
    system: 'Respiratory System',
    layer: 'Organs',
    description: 'Bilateral respiratory organs executing gas exchange across 300 million alveolar sacs with a 0.5 µm blood-air barrier.',
    microMacroPath: ['Human Body', 'Respiratory System', 'Lungs', 'Secondary Bronchiole', 'Alveolar Duct', 'Alveolar Sac', 'Type I/II Pneumocyte'],
    anatomicalStructures: [
      { name: 'Trachea & Primary Carina', function: 'Cartilaginous airway bifurcating into right and left mainstem bronchi.', clinicalSignificance: 'Endotracheal tube depth positioning.' },
      { name: 'Bronchioles & Smooth Muscle', function: 'Airway resistance regulation via beta-2 adrenergic receptors.', clinicalSignificance: 'Severe bronchoconstriction in asthma flare.' },
      { name: 'Alveoli & Blood-Air Barrier (0.5 µm)', function: 'Diffusion of O2 into pulmonary capillaries and exhalation of metabolic CO2.', clinicalSignificance: 'Alveolar capillary leakage in ARDS.' },
      { name: 'Type II Pneumocytes & Surfactant', function: 'Synthesizes dipalmitoylphosphatidylcholine to lower alveolar surface tension.', clinicalSignificance: 'Neonatal respiratory distress syndrome.' },
      { name: 'Pulmonary Arteries', function: 'Carries deoxygenated blood from right ventricle to alveolar capillary plexus.', clinicalSignificance: 'Saddle pulmonary embolism causing acute right heart failure.' }
    ],
    healthyVsDisease: {
      healthyState: 'Clear bilateral lung fields, normal compliance 52 mL/cmH2O, PaO2/FiO2 ratio 385 with no diffuse infiltrates.',
      diseaseState: 'Severe hypoxemic ARDS with diffuse bilateral alveolar damage, protein-rich exudate, and P/F ratio dropped to 168.',
      diseaseName: 'Acute Respiratory Distress Syndrome (Severe ARDS)',
      icd10: 'J80',
      diagnostics: ['Arterial Blood Gas (PaO2/FiO2 < 200)', 'Chest X-Ray / CT Chest (Diffuse Bilateral Infiltrates)', 'Echocardiogram (Rule out Cardiogenic Edema)'],
      treatment: 'Lung-Protective Ventilation (6 mL/kg PBW, PEEP titration) + Neuromuscular Blockade / Prone Positioning'
    },
    digitalTwinTelemetry: [
      { metric: 'Oxygen Saturation (SpO2)', value: '98', unit: '%', status: 'Normal' },
      { metric: 'PaO2 / FiO2 Ratio', value: '385', unit: 'P/F Ratio', status: 'Optimal' },
      { metric: 'Respiratory Rate', value: '14', unit: 'breaths/min', status: 'Normal' },
      { metric: 'Dynamic Compliance', value: '52.4', unit: 'mL/cmH2O', status: 'Optimal' }
    ],
    molecularBiomarkers: ['Surfactant Protein-D (SP-D)', 'Angiopoietin-2', 'KL-6', 'D-Dimer']
  },
  {
    id: 'eye-optics',
    name: '3D Eye & Retinal Photoreceptor Layer',
    latinName: 'Oculus, Retina & Nervus Opticus',
    category: 'Eye',
    hierarchyLevel: 'Organ',
    system: 'Sensory & Nervous System',
    layer: 'Organs',
    description: 'Specialized optical refractive sensory organ focusing photons onto 120 million rod and 6 million cone photoreceptors.',
    microMacroPath: ['Human Body', 'Sensory Nervous System', 'Eye', 'Retina', 'Fovea Centralis', 'Cone Photoreceptor', 'Rhodopsin / Photopigment'],
    anatomicalStructures: [
      { name: 'Cornea & Lens', function: 'Primary refractive elements focusing incoming light waves onto the retina.', clinicalSignificance: 'Nuclear sclerotic cataract & corneal dystrophy.' },
      { name: 'Iris & Pupil', function: 'Muscular diaphragm regulating optical aperture and retinal illumination.', clinicalSignificance: 'Marcus Gunn afferent pupillary defect.' },
      { name: 'Retina & Fovea Centralis', function: 'High-acuity phototransduction layer converting photons to neural action potentials.', clinicalSignificance: 'Rhegmatogenous retinal detachment & macular degeneration.' },
      { name: 'Optic Nerve (Cranial Nerve II)', function: 'Transmits 1.2 million axonal fibers to lateral geniculate nucleus and visual cortex.', clinicalSignificance: 'Glaucomatous optic cupping & optic neuritis.' },
      { name: 'Ciliary Body & Trabecular Meshwork', function: 'Produces and drains aqueous humor maintaining intraocular pressure (10-21 mmHg).', clinicalSignificance: 'Acute angle-closure glaucoma.' }
    ],
    healthyVsDisease: {
      healthyState: 'Clear optical media, normal intraocular pressure 14 mmHg, intact foveal reflex with 20/20 visual acuity.',
      diseaseState: 'Severe rhegmatogenous retinal tear with subretinal fluid detachment causing sudden painless peripheral visual field loss.',
      diseaseName: 'Rhegmatogenous Retinal Detachment',
      icd10: 'H33.0',
      diagnostics: ['Dilated Fundus Examination (Indirect Ophthalmoscopy)', 'Optical Coherence Tomography (OCT)', 'B-Scan Ocular Ultrasound'],
      treatment: 'Urgent Pars Plana Vitrectomy (PPV) + Endolaser Photocoagulation + Gas Tamponade'
    },
    digitalTwinTelemetry: [
      { metric: 'Intraocular Pressure (IOP)', value: '14.2', unit: 'mmHg', status: 'Normal' },
      { metric: 'Visual Acuity', value: '20 / 20', unit: 'Snellen', status: 'Optimal' },
      { metric: 'Foveal Central Thickness', value: '245', unit: 'µm', status: 'Normal' },
      { metric: 'Cup-to-Disc Ratio', value: '0.3', unit: 'Ratio', status: 'Optimal' }
    ],
    molecularBiomarkers: ['VEGF-A', 'Glaucoma Myocilin (MYOC)', 'Rhodopsin', 'Complement Factor H (CFH)']
  },
  {
    id: 'skeleton-bones',
    name: '3D Skeleton & Cortical Bone Matrix',
    latinName: 'Skeleton humanum & Osteon',
    category: 'Skeleton',
    hierarchyLevel: 'Body System',
    system: 'Musculoskeletal System',
    layer: 'Skeleton',
    description: '206 articulated bones providing rigid structural leverage, vital organ protection, calcium mineral homeostasis, and hematopoiesis.',
    microMacroPath: ['Human Body', 'Musculoskeletal System', 'Axial & Appendicular Skeleton', 'Femur / Vertebra', 'Cortical Osteon', 'Haversian Canal', 'Osteocyte'],
    anatomicalStructures: [
      { name: 'Cranium & Axial Spine (C1-L5)', function: 'Encloses brain and spinal cord; structural weight-bearing column.', clinicalSignificance: 'Traumatic vertebral burst fractures & herniated discs.' },
      { name: 'Thoracic Ribcage & Sternum', function: 'Dynamic skeletal bellows shielding cardiopulmonary structures.', clinicalSignificance: 'Flail chest in blunt trauma polytrauma.' },
      { name: 'Pelvic Girdle & Acetabulum', function: 'High-strength ring transmitting load to lower kinetic chain.', clinicalSignificance: 'Open-book pelvic fractures with retroperitoneal hematoma.' },
      { name: 'Femur & Haversian Canals', function: 'Major weight-bearing long bone with cylindrical cortical bone architecture.', clinicalSignificance: 'Femoral neck fracture requiring arthroplasty.' },
      { name: 'Trabecular Cancellous Bone & Red Marrow', function: 'Spongy porous network site of active hematopoietic stem cell lineages.', clinicalSignificance: 'Osteoporotic compression fractures & multiple myeloma.' }
    ],
    healthyVsDisease: {
      healthyState: 'Normal bone mineral density DEXA T-score -0.4, balanced osteoblast/osteoclast coupling with no microfractures.',
      diseaseState: 'Severe osteoporosis with trabecular microarchitectural deterioration and acute L1 vertebral compression fracture.',
      diseaseName: 'Postmenopausal Osteoporotic Vertebral Fracture',
      icd10: 'M80.08XA',
      diagnostics: ['DEXA Dual-Energy X-Ray Absorptiometry (T-score < -2.5)', 'Spine Plain Radiographs (AP/Lateral)', 'Thoracolumbar Spine MRI'],
      treatment: 'Percutaneous Balloon Kyphoplasty + Teriparatide / Bisphosphonate Therapy'
    },
    digitalTwinTelemetry: [
      { metric: 'DEXA Bone Mineral T-Score', value: '-0.4', unit: 'T-Score', status: 'Optimal' },
      { metric: 'Serum Ionized Calcium', value: '1.22', unit: 'mmol/L', status: 'Normal' },
      { metric: 'Alkaline Phosphatase (ALP)', value: '68', unit: 'IU/L', status: 'Normal' },
      { metric: '25-OH Vitamin D', value: '44.8', unit: 'ng/mL', status: 'Optimal' }
    ],
    molecularBiomarkers: ['CTX (C-Telopeptide)', 'P1NP (Procollagen Type 1)', 'Osteocalcin', 'Sclerostin']
  },
  {
    id: 'kidney-nephron',
    name: '3D Kidneys & Glomerular Filtration Nephron',
    latinName: 'Renes & Nephronum',
    category: 'Kidney',
    hierarchyLevel: 'Organ',
    system: 'Urinary & Excretory System',
    layer: 'Organs',
    description: 'Bilateral retroperitoneal organs containing 1 million nephrons each, executing plasma ultrafiltration, acid-base balance, and renin-angiotensin-aldosterone signaling.',
    microMacroPath: ['Human Body', 'Urinary System', 'Kidney', 'Renal Cortex', 'Glomerulus & Bowman Capsule', 'Podocyte Filtration Slit', 'Nephrin Molecular Filter'],
    anatomicalStructures: [
      { name: 'Glomerulus & Podocyte Slit Diaphragm', function: 'High-pressure capillary tuft filtering 180 L of plasma daily while retaining albumin.', clinicalSignificance: 'Nephrotic syndrome with massive proteinuria.' },
      { name: 'Proximal Convoluted Tubule (PCT)', function: 'Reabsorbs 65% of filtered Na+, water, glucose, and amino acids via SGLT2.', clinicalSignificance: 'Acute tubular necrosis (ATN) in sepsis.' },
      { name: 'Loop of Henle & Countercurrent Multiplier', function: 'Generates medullary hyperosmolar gradient (1200 mOsm) via NKCC2 cotransporters.', clinicalSignificance: 'Site of action for loop diuretics (Furosemide).' },
      { name: 'Distal Tubule & Juxtaglomerular Apparatus', function: 'Secretes renin in response to decreased renal perfusion pressure.', clinicalSignificance: 'Renovascular hypertension.' },
      { name: 'Collecting Duct & Aquaporin-2', function: 'Regulates water excretion in response to Antidiuretic Hormone (ADH/Vasopressin).', clinicalSignificance: 'Syndrome of Inappropriate ADH (SIADH).' }
    ],
    healthyVsDisease: {
      healthyState: 'Normal glomerular filtration rate eGFR 104 mL/min/1.73m2, serum creatinine 0.85 mg/dL with zero albuminuria.',
      diseaseState: 'Severe sepsis-induced Acute Kidney Injury (AKI Stage 3) with oliguria, creatinine spike to 3.4 mg/dL, and hyperkalemia.',
      diseaseName: 'Acute Kidney Injury (AKI / ATN)',
      icd10: 'N17.9',
      diagnostics: ['Serum Creatinine & Blood Urea Nitrogen (BUN)', 'Urinary Fractional Excretion of Sodium (FeNa)', 'Renal Ultrasound with Doppler'],
      treatment: 'Continuous Renal Replacement Therapy (CVVH) + Isotonic Crystalloids Resuscitation'
    },
    digitalTwinTelemetry: [
      { metric: 'eGFR Filtration Rate', value: '104', unit: 'mL/min/1.73m²', status: 'Optimal' },
      { metric: 'Serum Creatinine', value: '0.85', unit: 'mg/dL', status: 'Normal' },
      { metric: 'Urine Output Rate', value: '1.2', unit: 'mL/kg/hr', status: 'Optimal' },
      { metric: 'Serum Potassium (K+)', value: '4.1', unit: 'mmol/L', status: 'Normal' }
    ],
    molecularBiomarkers: ['NGAL (Neutrophil Gelatinase-Associated Lipocalin)', 'KIM-1', 'Cystatin C', 'TIMP-2 * IGFBP7']
  },
  {
    id: 'cell-dna',
    name: '3D Human Cell & Double-Helix DNA',
    latinName: 'Cellula humana & Acidum desoxyribonucleicum',
    category: 'Cell & DNA',
    hierarchyLevel: 'DNA Molecule',
    system: 'Molecular & Genetic System',
    layer: 'Endocrine',
    description: 'The fundamental microscopic unit of human life containing organelle machinery and 3 billion base pairs of genomic double helix.',
    microMacroPath: ['Human Body', 'Cellular Matrix', 'Eukaryotic Cell', 'Nucleus', 'Chromosome 12', 'KRAS Gene Locus', 'Double Helix DNA (Adenine-Thymine-Cytosine-Guanine)'],
    anatomicalStructures: [
      { name: 'Phospholipid Bilayer Membrane', function: 'Selective fluid mosaic barrier with embedded transport channels and receptor kinases.', clinicalSignificance: 'Target of drug permeability and liposomal delivery.' },
      { name: 'Mitochondria (Inner Cristae)', function: 'Cellular powerhouse generating ATP via oxidative phosphorylation and apoptosis regulation.', clinicalSignificance: 'Mitochondrial myopathies and Warburg effect in cancer.' },
      { name: 'Nucleus & Nuclear Pores', function: 'Encloses genomic chromatin and coordinates RNA transcription and ribosomal assembly.', clinicalSignificance: 'Nuclear atypia and pleomorphism in malignancy.' },
      { name: 'Endoplasmic Reticulum & Golgi', function: 'Translates nascent polypeptides and executes post-translational glycosylation.', clinicalSignificance: 'ER stress and unfolded protein response.' },
      { name: 'Double-Helix DNA (Watson-Crick)', function: 'Antiparallel sugar-phosphate backbone with hydrogen-bonded complementary base pairs (A=T, G≡C).', clinicalSignificance: 'Point mutations (KRAS G12D) driving oncogenesis.' }
    ],
    healthyVsDisease: {
      healthyState: 'Wild-type KRAS proto-oncogene with normal GTPase molecular switch cycling between GDP and GTP.',
      diseaseState: 'Constitutively locked GTP-bound KRAS G12D driver mutation causing relentless downstream MAPK/ERK hyper-proliferation.',
      diseaseName: 'Oncogenic Driver Somatic Mutation (KRAS G12D)',
      icd10: 'C25.0',
      diagnostics: ['Next-Generation DNA/RNA Sequencing (NGS 500-Gene Panel)', 'Liquid Biopsy ctDNA (Droplet Digital PCR)', 'Structural AlphaFold Binding Modeling'],
      treatment: 'Selective KRAS G12D Small-Molecule Inhibitor (MRTX1133) + Immunotherapy'
    },
    digitalTwinTelemetry: [
      { metric: 'GTP Hydrolysis Rate', value: '0.04', unit: 'sec⁻¹', status: 'Normal' },
      { metric: 'DNA Replication Fidelity', value: '99.9999', unit: '%', status: 'Optimal' },
      { metric: 'Mitochondrial Membrane Potential', value: '-140', unit: 'mV', status: 'Optimal' },
      { metric: 'Telomere Length Relative Index', value: '1.14', unit: 'T/S Ratio', status: 'Normal' }
    ],
    molecularBiomarkers: ['ctDNA VAF Fraction', 'KRAS G12D Allele', 'p53 Phospho-Ser15', 'Cleaved Caspase-3']
  }
];
