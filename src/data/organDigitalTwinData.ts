export interface AnatomicalOrganModel {
  id: string;
  name: string;
  category: 'Neuron' | 'Brain' | 'Heart' | 'Lungs' | 'Skeletal' | 'Whole Body' | 'Liver & GI' | 'Kidneys';
  latinName: string;
  icon: string;
  system: string;
  physiologicalTelemetry: {
    label: string;
    value: string;
    status: 'Normal' | 'Elevated' | 'Critical Alert' | 'Optimal';
    unit: string;
  }[];
  anatomicalStructures: {
    name: string;
    role: string;
    clinicalSignificance: string;
  }[];
  pathologyHotspots: {
    condition: string;
    location: string;
    riskScore: number;
    description: string;
  }[];
  molecularBiomarkers: string[];
}

export const ORGAN_MODELS_DATA: AnatomicalOrganModel[] = [
  {
    id: 'neuron-3d',
    name: 'Neuron & Synaptic Cleft 3D',
    category: 'Neuron',
    latinName: 'Neuronum multipolare & Synapsis',
    icon: 'Zap',
    system: 'Central Nervous System (Micro-Architecture)',
    physiologicalTelemetry: [
      { label: 'Resting Membrane Potential', value: '-70.2', status: 'Normal', unit: 'mV' },
      { label: 'Action Potential Peak', value: '+34.8', status: 'Normal', unit: 'mV' },
      { label: 'Conduction Velocity', value: '118.4', status: 'Optimal', unit: 'm/s' },
      { label: 'Synaptic Cleft Delay', value: '0.48', status: 'Normal', unit: 'ms' },
      { label: 'Dopamine / Glutamate Vesicles', value: '42,000', status: 'Optimal', unit: 'vesicles/terminal' }
    ],
    anatomicalStructures: [
      { name: 'Soma (Cell Body)', role: 'Houses nucleus and Nissl bodies; metabolic center of the neuron.', clinicalSignificance: 'Target of neurofibrillary tangles in Alzheimer’s.' },
      { name: 'Axon Hillock & Axon', role: 'Generates and propagates electrical all-or-nothing action potentials.', clinicalSignificance: 'Site of initial depolarization trigger.' },
      { name: 'Myelin Sheath & Nodes of Ranvier', role: 'Oligodendrocyte insulation enabling saltatory high-speed conduction.', clinicalSignificance: 'Demyeilnating autoimmune attack in Multiple Sclerosis.' },
      { name: 'Synaptic Bouton & Vesicles', role: 'Contains voltage-gated Ca2+ channels triggering neurotransmitter exocytosis.', clinicalSignificance: 'Modulated by antiepileptic & anesthetic agents.' },
      { name: 'Post-Synaptic Density (PSD-95)', role: 'Ionotropic AMPA/NMDA receptor clusters receiving neurotransmitter signals.', clinicalSignificance: 'Excitotoxicity target in stroke ischemia.' }
    ],
    pathologyHotspots: [
      { condition: 'Excitotoxic Glutamate Surge', location: 'Synaptic Cleft', riskScore: 84, description: 'Failure of astrocytic reuptake causing lethal Ca2+ influx.' },
      { condition: 'Demyelination Plaque', location: 'Internodal Axon', riskScore: 68, description: 'Loss of saltatory conduction leading to motor weakness.' }
    ],
    molecularBiomarkers: ['Neurofilament Light Chain (NfL)', 'Synaptotagmin-1', 'PSD-95', 'Tau Protein']
  },
  {
    id: 'brain-3d',
    name: 'Brain & Cerebrovascular 3D',
    category: 'Brain',
    latinName: 'Encephalon & Circulus Willisii',
    icon: 'Brain',
    system: 'Central Nervous System',
    physiologicalTelemetry: [
      { label: 'Intracranial Pressure (ICP)', value: '11.4', status: 'Normal', unit: 'mmHg' },
      { label: 'Cerebral Perfusion Pressure (CPP)', value: '76.2', status: 'Optimal', unit: 'mmHg' },
      { label: 'EEG Dominant Rhythm', value: 'Alpha (10.2)', status: 'Normal', unit: 'Hz' },
      { label: 'Brain Tissue Oxygen (PbtO2)', value: '28.4', status: 'Optimal', unit: 'mmHg' },
      { label: 'Glasgow Coma Scale (GCS)', value: '15 / 15', status: 'Normal', unit: 'Score' }
    ],
    anatomicalStructures: [
      { name: 'Frontal & Motor Cortex', role: 'Executive decision making, motor planning (Brodmann 4), and Broca’s speech.', clinicalSignificance: 'Contralateral hemiparesis in MCA stroke.' },
      { name: 'Temporal & Parietal Lobes', role: 'Auditory processing, Wernicke language comprehension, somatosensory cortex.', clinicalSignificance: 'Receptive aphasia and spatial neglect.' },
      { name: 'Occipital Lobe', role: 'Primary visual cortex (V1) processing retinal input.', clinicalSignificance: 'Homonymous hemianopia in PCA stroke.' },
      { name: 'Cerebellum', role: 'Coordinates motor timing, fine motor synergy, and vestibular balance.', clinicalSignificance: 'Ataxia, dysmetria, and intention tremor.' },
      { name: 'Circle of Willis & Basilar Artery', role: 'Arterial anastomotic collateral ring supplying whole brain.', clinicalSignificance: 'Berry aneurysms and subarachnoid hemorrhage.' }
    ],
    pathologyHotspots: [
      { condition: 'Middle Cerebral Artery (MCA) Ischemia', location: 'Left Sylvian Fissure', riskScore: 92, description: 'Hypoperfused penumbra salvageable with IV tPA / thrombectomy.' },
      { condition: 'Elevated ICP (> 20 mmHg)', location: 'Ventricular System', riskScore: 78, description: 'Risk of uncal or subfalcine herniation.' }
    ],
    molecularBiomarkers: ['S100B', 'Glial Fibrillary Acidic Protein (GFAP)', 'NSE', 'UCH-L1']
  },
  {
    id: 'heart-3d',
    name: 'Heart & Coronary Circulation 3D',
    category: 'Heart',
    latinName: 'Cor & Arteriae Coronariae',
    icon: 'Heart',
    system: 'Cardiovascular System',
    physiologicalTelemetry: [
      { label: 'Heart Rate', value: '74', status: 'Normal', unit: 'BPM' },
      { label: 'Cardiac Output', value: '5.2', status: 'Optimal', unit: 'L/min' },
      { label: 'Left Ventricular Ejection Fraction', value: '62', status: 'Normal', unit: '%' },
      { label: 'Mean Arterial Pressure (MAP)', value: '88', status: 'Optimal', unit: 'mmHg' },
      { label: 'High-Sensitivity Troponin I', value: '< 0.01', status: 'Normal', unit: 'ng/mL' }
    ],
    anatomicalStructures: [
      { name: 'Left Ventricle & Myocardium', role: 'High-pressure muscular pump supplying systemic arterial circulation.', clinicalSignificance: 'Left ventricular hypertrophy & ischemic infarction.' },
      { name: 'Left Anterior Descending (LAD) Artery', role: 'Supplies anterior septum and LV apex ("The Widowmaker").', clinicalSignificance: 'Primary target in emergency STEMI catheterization.' },
      { name: 'Aortic & Mitral Valves', role: 'Unidirectional fibrous valves preventing retrograde systolic regurgitation.', clinicalSignificance: 'Aortic stenosis & mitral valve prolapse.' },
      { name: 'SA Node & AV Conduction System', role: 'Intrinsic pacemaker generating 60-100 bpm electrical impulses.', clinicalSignificance: 'Sick sinus syndrome & 3rd degree heart block.' },
      { name: 'Pericardial Sac', role: 'Double-walled fibroserous protective sac with lubricating fluid.', clinicalSignificance: 'Cardiac tamponade with Beck’s triad.' }
    ],
    pathologyHotspots: [
      { condition: 'Proximal LAD Atheroma', location: 'Anterior Interventricular Sulcus', riskScore: 89, description: 'Critical 90% stenosis requiring drug-eluting stent (DES).' },
      { condition: 'Aortic Regurgitation Wave', location: 'Aortic Root', riskScore: 45, description: 'Diastolic backflow causing widened pulse pressure.' }
    ],
    molecularBiomarkers: ['hs-cTnI', 'NT-proBNP', 'CK-MB', 'Myoglobin']
  },
  {
    id: 'lungs-3d',
    name: 'Lungs & Alveolar Gas Exchange 3D',
    category: 'Lungs',
    latinName: 'Pulmones & Arbor Bronchialis',
    icon: 'Wind',
    system: 'Respiratory System',
    physiologicalTelemetry: [
      { label: 'SpO2 Oxygen Saturation', value: '98', status: 'Normal', unit: '%' },
      { label: 'PaO2 / FiO2 Ratio', value: '385', status: 'Normal', unit: 'P/F Ratio' },
      { label: 'Respiratory Rate', value: '14', status: 'Optimal', unit: 'breaths/min' },
      { label: 'Dynamic Lung Compliance', value: '52.4', status: 'Optimal', unit: 'mL/cmH2O' },
      { label: 'Dead Space Fraction (Vd/Vt)', value: '0.28', status: 'Normal', unit: 'ratio' }
    ],
    anatomicalStructures: [
      { name: 'Trachea & Primary Carina', role: 'C-shaped cartilaginous airway conducting inspired air to lungs.', clinicalSignificance: 'Intubation positioning and endotracheal tube depth.' },
      { name: 'Bronchial Tree & Terminal Bronchioles', role: 'Branching airway network with smooth muscle regulation.', clinicalSignificance: 'Bronchospasm in asthma and COPD.' },
      { name: 'Alveoli & Blood-Air Barrier (0.5 µm)', role: 'Type I & II pneumocytes with surfactant preventing alveolar collapse.', clinicalSignificance: 'Diffuse alveolar damage and hyaline membranes in ARDS.' },
      { name: 'Pulmonary Arteries & Capillary Bed', role: 'Carries deoxygenated venous blood from RV for gas exchange.', clinicalSignificance: 'Saddle pulmonary embolism causing acute cor pulmonale.' },
      { name: 'Pleural Cavity & Diaphragm', role: 'Negative-pressure thoracic space driving inspiratory expansion.', clinicalSignificance: 'Tension pneumothorax & pleural effusion.' }
    ],
    pathologyHotspots: [
      { condition: 'Bilateral ARDS Infiltrates', location: 'Lower Lobes (Bilateral)', riskScore: 91, description: 'Protein-rich capillary leak reducing P/F ratio < 200.' },
      { condition: 'Segmental Thromboembolism', location: 'Right Main Pulmonary Artery', riskScore: 76, description: 'Ventilation-perfusion (V/Q) mismatch with elevated D-Dimer.' }
    ],
    molecularBiomarkers: ['Surfactant Protein-D (SP-D)', 'Angiopoietin-2', 'KL-6', 'D-Dimer']
  },
  {
    id: 'skeletal-3d',
    name: 'Skeletal & Bone Matrix 3D',
    category: 'Skeletal',
    latinName: 'Skeleton humanum & Osteon',
    icon: 'Bone',
    system: 'Musculoskeletal System',
    physiologicalTelemetry: [
      { label: 'Bone Mineral Density (DEXA T-Score)', value: '-0.4', status: 'Optimal', unit: 'T-Score' },
      { label: 'Serum Calcium (Ionized)', value: '1.22', status: 'Normal', unit: 'mmol/L' },
      { label: 'Alkaline Phosphatase (ALP)', value: '68', status: 'Normal', unit: 'IU/L' },
      { label: '25-OH Vitamin D', value: '44.8', status: 'Optimal', unit: 'ng/mL' },
      { label: 'Osteocalcin', value: '18.2', status: 'Normal', unit: 'ng/mL' }
    ],
    anatomicalStructures: [
      { name: 'Cranium & Axial Spine (C1-L5)', role: 'Protects brain and spinal cord; load-bearing vertical column.', clinicalSignificance: 'Herniated nucleus pulposus & spinal stenosis.' },
      { name: 'Thoracic Ribcage & Sternum', role: 'Encloses heart/lungs; expands with intercostal respiration.', clinicalSignificance: 'Flail chest in blunt thoracic polytrauma.' },
      { name: 'Pelvic Girdle & Acetabulum', role: 'Transfers upper body weight to lower extremities.', clinicalSignificance: 'Open-book pelvic fractures causing massive retroperitoneal bleed.' },
      { name: 'Femur & Cortical Haversian Canals', role: 'Strongest long bone with rich vascular endosteum.', clinicalSignificance: 'Femoral neck fracture requiring hemiarthroplasty.' },
      { name: 'Trabecular Cancellous Bone', role: 'Spongy porous lattice with hematopoietic red marrow.', clinicalSignificance: 'Primary site of osteoporotic microarchitectural deterioration.' }
    ],
    pathologyHotspots: [
      { condition: 'Vertebral Compression Wedge Fracture', location: 'L1 Lumbar Vertebra', riskScore: 62, description: 'Axial load collapse requiring percutaneous vertebroplasty.' },
      { condition: 'Acetabular Cortical Fissure', location: 'Right Hip Joint', riskScore: 48, description: 'Micro-fracture with joint space narrowing.' }
    ],
    molecularBiomarkers: ['CTX (C-Telopeptide)', 'P1NP', 'Osteocalcin', 'Sclerostin']
  },
  {
    id: 'wholebody-3d',
    name: 'Whole-Body Holographic Digital Twin 3D',
    category: 'Whole Body',
    latinName: 'Systema Corporis Humani Integratum',
    icon: 'Users',
    system: 'Integrated Multi-Organ System Avatar',
    physiologicalTelemetry: [
      { label: 'Homeostatic Allostatic Load', value: '14 / 100', status: 'Optimal', unit: 'Score' },
      { label: 'Systemic Vascular Resistance', value: '1,040', status: 'Normal', unit: 'dynes·s/cm5' },
      { label: 'Basal Metabolic Rate', value: '1,720', status: 'Normal', unit: 'kcal/day' },
      { label: 'Total Body Water (TBW)', value: '42.8', status: 'Optimal', unit: 'L' },
      { label: 'Systemic Inflammatory Index', value: '0.8', status: 'Normal', unit: 'NLR Ratio' }
    ],
    anatomicalStructures: [
      { name: 'Central & Peripheral Nervous System', role: 'Master regulatory network transmitting electrical neural telemetry.', clinicalSignificance: 'Whole-body motor & sensory integration.' },
      { name: 'Cardiovascular Arterial & Venous Tree', role: 'Distributes oxygenated hemoglobin across 100,000 km of vessels.', clinicalSignificance: 'Systemic vascular tone & shock states.' },
      { name: 'Respiratory Tracheobronchial Unit', role: 'Inspiratory oxygen uptake and carbonic acid metabolic exhalation.', clinicalSignificance: 'Acid-base respiratory compensation.' },
      { name: 'Gastrointestinal & Hepatosplenic Core', role: 'Nutrient absorption, hepatic xenobiotic detoxification, and immune spleen.', clinicalSignificance: 'Portal hypertension & gut barrier integrity.' },
      { name: 'Renal Excretory & Electrolyte Unit', role: 'Filters 180 L of plasma daily, regulating blood pressure via RAAS.', clinicalSignificance: 'Acute tubular necrosis & metabolic acidosis.' }
    ],
    pathologyHotspots: [
      { condition: 'Multisystem Organ Dysfunction (MODS)', location: 'Whole Body Core', riskScore: 88, description: 'Cascade of simultaneous lung, kidney, and circulatory failure.' },
      { condition: 'Sepsis Capillary Leak Syndrome', location: 'Systemic Microvasculature', riskScore: 91, description: 'Endothelial disruption causing distributive septic shock.' }
    ],
    molecularBiomarkers: ['Procalcitonin', 'Serum Lactate', 'Interleukin-6 (IL-6)', 'High-Sensitivity CRP']
  }
];
