export interface MedicalSpecialty {
  id: string;
  field: string;
  specialistTitle: string;
  scopeOfPractice: string;
  category: 'Primary & General Care' | 'Internal Medicine Subspecialties' | 'Surgical Specialties' | 'Critical & Emergency Care' | 'Diagnostic & Laboratory' | 'Supportive & Preventive Medicine';
  onCallDoctor: string;
  availability: 'Available Now' | 'In Surgery' | 'On Rounds' | 'Available for Teleconsult';
  avatarUrl?: string;
  commonPathologies: string[];
}

export const MASTER_SPECIALIST_DIRECTORY: MedicalSpecialty[] = [
  // 1. Primary & General Care
  {
    id: 'spec-01',
    field: 'General Medicine',
    specialistTitle: 'General Physician / Internist',
    scopeOfPractice: 'Adult diseases, acute fever, diabetes management, hypertension, complex multisystem infections',
    category: 'Primary & General Care',
    onCallDoctor: 'Dr. Arthur Sterling, MD',
    availability: 'Available Now',
    commonPathologies: ['Sepsis', 'Hypertensive Emergency', 'Uncontrolled Diabetes', 'Pyrexia of Unknown Origin']
  },
  {
    id: 'spec-02',
    field: 'Family Medicine',
    specialistTitle: 'Family Physician',
    scopeOfPractice: 'Children + adults + elderly, long-term comprehensive primary care and chronic disease management',
    category: 'Primary & General Care',
    onCallDoctor: 'Dr. Rebecca Moore, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Routine Screening', 'Chronic Disease', 'Preventive Health', 'Pediatric-to-Geriatric Care']
  },
  {
    id: 'spec-03',
    field: 'Pediatrics',
    specialistTitle: 'Pediatrician',
    scopeOfPractice: 'Babies, children, teenagers, childhood infections, developmental milestones and immunizations',
    category: 'Primary & General Care',
    onCallDoctor: 'Dr. Maya Patel, MD',
    availability: 'Available Now',
    commonPathologies: ['Bronchiolitis', 'Febrile Seizures', 'Pediatric Asthma', 'Congenital Conditions']
  },
  {
    id: 'spec-04',
    field: 'Neonatology',
    specialistTitle: 'Neonatologist',
    scopeOfPractice: 'Newborn and premature babies, NICU critical care, congenital anomalies and neonatal jaundice',
    category: 'Primary & General Care',
    onCallDoctor: 'Dr. Julian Ross, MD',
    availability: 'On Rounds',
    commonPathologies: ['Neonatal Respiratory Distress', 'Prematurity', 'Hyperbilirubinemia', 'Neonatal Sepsis']
  },
  {
    id: 'spec-05',
    field: 'Geriatrics',
    specialistTitle: 'Geriatrician',
    scopeOfPractice: 'Elderly patients, polypharmacy management, frailty, dementia and multi-morbidity coordination',
    category: 'Primary & General Care',
    onCallDoctor: 'Dr. Harold Finch, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Polypharmacy Interactions', 'Frailty Syndrome', 'Delirium vs Dementia', 'Fall Risk']
  },

  // 2. Internal Medicine Subspecialties
  {
    id: 'spec-06',
    field: 'Cardiology',
    specialistTitle: 'Cardiologist',
    scopeOfPractice: 'Heart and blood-vessel diseases, arrhythmias, ischemic heart disease, heart failure and hypertension',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Emily Watson, MD',
    availability: 'Available Now',
    commonPathologies: ['Atrial Fibrillation with RVR', 'Acute Coronary Syndrome', 'Congestive Heart Failure', 'Myocarditis']
  },
  {
    id: 'spec-07',
    field: 'Pulmonology',
    specialistTitle: 'Pulmonologist',
    scopeOfPractice: 'Lungs, asthma, COPD, pneumonia, acute respiratory distress syndrome (ARDS) and breathing problems',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Gregory House, MD',
    availability: 'Available Now',
    commonPathologies: ['Severe ARDS', 'Acute Hypoxemic Respiratory Failure', 'COPD Exacerbation', 'Pulmonary Fibrosis']
  },
  {
    id: 'spec-08',
    field: 'Neurology',
    specialistTitle: 'Neurologist',
    scopeOfPractice: 'Brain, spinal cord, peripheral nerves, acute ischemic stroke, epilepsy, neuromuscular disorders',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Christopher Ray, MD',
    availability: 'On Rounds',
    commonPathologies: ['Acute Stroke', 'Encephalopathy', 'Status Epilepticus', 'Parkinsonism', 'Myasthenia Gravis']
  },
  {
    id: 'spec-09',
    field: 'Gastroenterology',
    specialistTitle: 'Gastroenterologist',
    scopeOfPractice: 'Stomach, intestine, liver-related digestive problems, GI bleeding and endoscopy procedures',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. David Cho, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Acute Upper GI Bleeding', 'Inflammatory Bowel Disease', 'Acute Pancreatitis', 'Peptic Ulcers']
  },
  {
    id: 'spec-10',
    field: 'Hepatology',
    specialistTitle: 'Hepatologist',
    scopeOfPractice: 'Liver, gallbladder, biliary tree, hepatitis, cirrhosis, hepatic encephalopathy and liver failure',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Sandra Bell, MD',
    availability: 'Available Now',
    commonPathologies: ['Acute Liver Failure', 'Decompensated Cirrhosis', 'Hepatorenal Syndrome', 'Viral Hepatitis']
  },
  {
    id: 'spec-11',
    field: 'Nephrology',
    specialistTitle: 'Nephrologist',
    scopeOfPractice: 'Kidney disease, acute kidney injury (AKI), electrolyte disturbances, hemodialysis and glomerulonephritis',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Vikram Sethi, MD',
    availability: 'Available Now',
    commonPathologies: ['Acute Kidney Injury', 'Severe Metabolic Acidosis', 'Hyperkalemia', 'End-Stage Renal Disease']
  },
  {
    id: 'spec-12',
    field: 'Endocrinology',
    specialistTitle: 'Endocrinologist',
    scopeOfPractice: 'Hormones, thyroid disorders, diabetes mellitus, adrenal disease and metabolic bone conditions',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Wendy Chen, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Diabetic Ketoacidosis (DKA)', 'Thyroid Storm', 'Adrenal Crisis', 'Pituitary Disorders']
  },
  {
    id: 'spec-13',
    field: 'Rheumatology',
    specialistTitle: 'Rheumatologist',
    scopeOfPractice: 'Autoimmune and inflammatory joint diseases, systemic lupus, vasculitis and rheumatoid arthritis',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Lauren Vance, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Systemic Lupus Erythematosus', 'Severe Vasculitis', 'Rheumatoid Arthritis', 'Scleroderma']
  },
  {
    id: 'spec-14',
    field: 'Hematology',
    specialistTitle: 'Hematologist',
    scopeOfPractice: 'Blood disorders, coagulopathies, sickle cell disease, anemia, leukemias and thrombosis management',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Anthony Fauci, MD',
    availability: 'Available Now',
    commonPathologies: ['Disseminated Intravascular Coagulation (DIC)', 'Deep Vein Thrombosis', 'Thrombocytopenia', 'Aplastic Anemia']
  },
  {
    id: 'spec-15',
    field: 'Oncology',
    specialistTitle: 'Medical Oncologist',
    scopeOfPractice: 'Cancer medicines, targeted chemotherapy, immunotherapy, biomarker profiling and tumor monitoring',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Marcus Vance, MD',
    availability: 'Available Now',
    commonPathologies: ['Febrile Neutropenia', 'Tumor Lysis Syndrome', 'Metastatic Carcinoma', 'Targeted Therapy Resistance']
  },
  {
    id: 'spec-16',
    field: 'Radiation Oncology',
    specialistTitle: 'Radiation Oncologist',
    scopeOfPractice: 'Radiation treatment for cancer, stereotactic radiosurgery and brachytherapy management',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Elena Petrova, MD',
    availability: 'On Rounds',
    commonPathologies: ['Spinal Cord Compression', 'Brain Metastases', 'Localized Solid Tumors']
  },
  {
    id: 'spec-17',
    field: 'Dermatology',
    specialistTitle: 'Dermatologist',
    scopeOfPractice: 'Skin, hair, nails, severe cutaneous drug reactions, melanoma and autoimmune blistering disorders',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Chloe Bennett, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Stevens-Johnson Syndrome / TEN', 'Malignant Melanoma', 'Severe Psoriasis', 'Pemphigus Vulgaris']
  },
  {
    id: 'spec-18',
    field: 'Allergy & Immunology',
    specialistTitle: 'Allergist / Immunologist',
    scopeOfPractice: 'Allergies, anaphylaxis prevention, primary immunodeficiency disorders and hypersensitivity',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Nathan Reed, MD',
    availability: 'Available Now',
    commonPathologies: ['Severe Anaphylaxis', 'Drug Hypersensitivity', 'Angioedema', 'Common Variable Immunodeficiency']
  },
  {
    id: 'spec-19',
    field: 'Infectious Diseases',
    specialistTitle: 'Infectious Disease Specialist',
    scopeOfPractice: 'Serious or unusual multidrug-resistant infections, hospital-acquired bacteremia, HIV/AIDS, tropical medicine',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Simon Cross, MD',
    availability: 'Available Now',
    commonPathologies: ['MRSA Bacteremia', 'Septic Deterioration', 'Multidrug-Resistant Gram-Negative Sepsis', 'Fungal Sepsis']
  },
  {
    id: 'spec-20',
    field: 'Psychiatry',
    specialistTitle: 'Psychiatrist',
    scopeOfPractice: 'Mental health, psychotropic medications, psychiatric disorders, delirium vs psychosis, crisis evaluation',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Claire Underwood, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Acute ICU Delirium', 'Severe Depression', 'Bipolar Disorder', 'Neuroleptic Malignant Syndrome']
  },
  {
    id: 'spec-21',
    field: 'Sleep Medicine',
    specialistTitle: 'Sleep Specialist',
    scopeOfPractice: 'Obstructive sleep apnea, nocturnal hypoxemia, insomnia and narcolepsy management',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Brian Knight, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Obstructive Sleep Apnea (OSA)', 'Central Hypoventilation', 'Circadian Rhythm Disorders']
  },
  {
    id: 'spec-22',
    field: 'Clinical Genetics',
    specialistTitle: 'Geneticist',
    scopeOfPractice: 'Inherited genetic disorders, genomics-guided oncology, variant classification and hereditary syndromes',
    category: 'Internal Medicine Subspecialties',
    onCallDoctor: 'Dr. Hannah Foster, MD, PhD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Hereditary Cancer Syndromes (BRCA/Lynch)', 'AlphaMissense Variant Interpretation', 'Metabolic Errors']
  },

  // 3. Surgical Specialties
  {
    id: 'spec-23',
    field: 'General Surgery',
    specialistTitle: 'General Surgeon',
    scopeOfPractice: 'Abdominal surgery, emergency exploratory laparotomy, appendix, gallbladder, hernia and acute trauma',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. James Thorne, MD',
    availability: 'In Surgery',
    commonPathologies: ['Acute Appendicitis', 'Acute Cholecystitis', 'Perforated Viscus', 'Bowel Obstruction']
  },
  {
    id: 'spec-24',
    field: 'Cardiothoracic Surgery',
    specialistTitle: 'Cardiothoracic Surgeon',
    scopeOfPractice: 'Heart, lung and chest surgery, coronary artery bypass grafting (CABG), valve replacement, aortic repairs',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Robert Mercer, MD',
    availability: 'In Surgery',
    commonPathologies: ['Post-CABG Hemodynamic Instability', 'Aortic Dissection', 'Thoracic Empyema', 'Valvular Disease']
  },
  {
    id: 'spec-25',
    field: 'Neurosurgery',
    specialistTitle: 'Neurosurgeon',
    scopeOfPractice: 'Brain, spine and nervous-system surgery, intracranial hematomas, brain tumors and spinal cord decompression',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Alexander Vance, MD',
    availability: 'In Surgery',
    commonPathologies: ['Epidural/Subdural Hematoma', 'Elevated Intracranial Pressure (ICP)', 'Acute Spinal Cord Injury']
  },
  {
    id: 'spec-26',
    field: 'Orthopedics',
    specialistTitle: 'Orthopedic Surgeon',
    scopeOfPractice: 'Bones, joints, acute traumatic fractures, joint replacements and musculoskeletal reconstruction',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Eric Campbell, MD',
    availability: 'Available Now',
    commonPathologies: ['Open Compound Fractures', 'Compartment Syndrome', 'Septic Arthritis', 'Polytrauma']
  },
  {
    id: 'spec-27',
    field: 'Surgical Oncology',
    specialistTitle: 'Surgical Oncologist',
    scopeOfPractice: 'Complex cancer resections, tumor cytoreduction and lymph node dissections',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Margaret Hale, MD',
    availability: 'In Surgery',
    commonPathologies: ['Malignant Solid Tumors', 'Retroperitoneal Sarcomas', 'Gastrointestinal Malignancies']
  },
  {
    id: 'spec-28',
    field: 'Urology',
    specialistTitle: 'Urologist',
    scopeOfPractice: 'Urinary system, kidney stones, urosepsis, prostate surgery and male reproductive tract',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Walter Bishop, MD',
    availability: 'Available Now',
    commonPathologies: ['Obstructive Urosepsis', 'Acute Nephrolithiasis', 'Acute Urinary Retention', 'Bladder Malignancies']
  },
  {
    id: 'spec-29',
    field: 'Vascular Surgery',
    specialistTitle: 'Vascular Surgeon',
    scopeOfPractice: 'Arteries and veins, ruptured aortic aneurysms, acute limb ischemia and carotid endarterectomy',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Frank Castle, MD',
    availability: 'Available Now',
    commonPathologies: ['Abdominal Aortic Aneurysm (AAA)', 'Acute Arterial Occlusion', 'Diabetic Limb Salvage']
  },
  {
    id: 'spec-30',
    field: 'Plastic Surgery',
    specialistTitle: 'Plastic Surgeon',
    scopeOfPractice: 'Reconstructive surgery, major burn management, complex wound coverage and microsurgery',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Julia Ward, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Severe Burn Trauma', 'Soft Tissue Necrosis', 'Microvascular Free Flaps']
  },
  {
    id: 'spec-31',
    field: 'Oral & Maxillofacial Surgery',
    specialistTitle: 'Maxillofacial Surgeon',
    scopeOfPractice: 'Face, jaw and mouth surgery, complex facial fractures, temporomandibular disorders',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Daniel Sterling, DDS, MD',
    availability: 'On Rounds',
    commonPathologies: ['Complex Le Fort Fractures', 'Ludwig Angina Airway Compromise', 'Maxillofacial Trauma']
  },
  {
    id: 'spec-32',
    field: 'ENT',
    specialistTitle: 'Otolaryngologist',
    scopeOfPractice: 'Ear, nose, throat, acute airway obstruction, neck masses and vocal cord pathologies',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Timothy Hayes, MD',
    availability: 'Available Now',
    commonPathologies: ['Acute Epiglottitis Airway Emergency', 'Peritonsillar Abscess', 'Severe Epistaxis']
  },
  {
    id: 'spec-33',
    field: 'Ophthalmology',
    specialistTitle: 'Ophthalmologist',
    scopeOfPractice: 'Eyes, acute ocular emergencies, retinal detachment, glaucoma and ophthalmic microsurgery',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Serena Vance, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Acute Angle-Closure Glaucoma', 'Retinal Detachment', 'Orbital Cellulitis']
  },
  {
    id: 'spec-34',
    field: 'Obstetrics',
    specialistTitle: 'Obstetrician',
    scopeOfPractice: 'Pregnancy, high-risk labor & delivery, eclampsia, postpartum hemorrhage and fetal monitoring',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Rachel Green, MD',
    availability: 'On Rounds',
    commonPathologies: ['Severe Pre-Eclampsia / HELLP', 'Postpartum Hemorrhage', 'Fetal Distress']
  },
  {
    id: 'spec-35',
    field: 'Gynecology',
    specialistTitle: 'Gynecologist',
    scopeOfPractice: 'Female reproductive health, pelvic inflammatory disease, ectopic pregnancy and gynecologic oncology',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Natalie Portman, MD',
    availability: 'Available Now',
    commonPathologies: ['Ruptured Ectopic Pregnancy', 'Severe Pelvic Inflammatory Disease', 'Ovarian Torsion']
  },
  {
    id: 'spec-36',
    field: 'Reproductive Medicine',
    specialistTitle: 'Fertility Specialist',
    scopeOfPractice: 'Infertility workup, in-vitro fertilization (IVF), reproductive endocrinology and gamete preservation',
    category: 'Surgical Specialties',
    onCallDoctor: 'Dr. Liam Neeson, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Ovarian Hyperstimulation Syndrome (OHSS)', 'Recurrent Pregnancy Loss', 'Infertility']
  },

  // 4. Critical & Emergency Care
  {
    id: 'spec-37',
    field: 'Emergency Medicine',
    specialistTitle: 'Emergency Physician',
    scopeOfPractice: 'Accidents, acute trauma, emergency resuscitation, cardiac arrest and immediate triage',
    category: 'Critical & Emergency Care',
    onCallDoctor: 'Dr. Mark Sloan, MD',
    availability: 'Available Now',
    commonPathologies: ['Cardiac Arrest / ACLS', 'Severe Trauma Resuscitation', 'Acute Undifferentiated Shock']
  },
  {
    id: 'spec-38',
    field: 'Critical Care',
    specialistTitle: 'Intensivist',
    scopeOfPractice: 'ICU patients, mechanical ventilation management, septic shock, invasive hemodynamics and multi-organ failure',
    category: 'Critical & Emergency Care',
    onCallDoctor: 'Dr. Sarah Lin, MD (Chief Intensivist)',
    availability: 'Available Now',
    commonPathologies: ['Refractory Septic Shock', 'Acute Multi-Organ Dysfunction (MODS)', 'Severe Hypoxemic ARDS']
  },
  {
    id: 'spec-39',
    field: 'Anesthesiology',
    specialistTitle: 'Anesthesiologist',
    scopeOfPractice: 'Perioperative anesthesia, difficult airway management, critical care and invasive central line placement',
    category: 'Critical & Emergency Care',
    onCallDoctor: 'Dr. Kevin Zhang, MD',
    availability: 'In Surgery',
    commonPathologies: ['Difficult Airway / Cricothyroidotomy', 'Malignant Hyperthermia', 'Perioperative Hemodynamics']
  },
  {
    id: 'spec-40',
    field: 'Pain Medicine',
    specialistTitle: 'Pain Specialist',
    scopeOfPractice: 'Chronic and complex pain management, regional nerve blocks and palliative analgesia',
    category: 'Critical & Emergency Care',
    onCallDoctor: 'Dr. Sean Miller, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Intractable Cancer Pain', 'Complex Regional Pain Syndrome (CRPS)', 'Refractory Neuropathic Pain']
  },

  // 5. Diagnostic & Laboratory
  {
    id: 'spec-41',
    field: 'Radiology',
    specialistTitle: 'Radiologist',
    scopeOfPractice: 'Diagnostic imaging interpretation for X-Ray, CT, MRI, ultrasound and emergency trauma scans',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Katherine Wu, MD',
    availability: 'Available Now',
    commonPathologies: ['Pneumothorax / Consolidation', 'Intracranial Hemorrhage on CT', 'Acute Appendicitis on US']
  },
  {
    id: 'spec-42',
    field: 'Interventional Radiology',
    specialistTitle: 'Interventional Radiologist',
    scopeOfPractice: 'Minimally invasive image-guided procedures, arterial embolization for bleeding and thrombectomy',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Marcus Drake, MD',
    availability: 'Available Now',
    commonPathologies: ['Catheter-Directed Thrombolysis', 'Active Arterial Hemorrhage Embolization', 'Biliary Drainage']
  },
  {
    id: 'spec-43',
    field: 'Nuclear Medicine',
    specialistTitle: 'Nuclear Medicine Physician',
    scopeOfPractice: 'Radioisotope imaging (PET/SPECT), radioactive iodine therapy and radiopharmaceutical targeting',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Anthony Stark, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['PET-CT Staging', 'Thyroid Carcinoma Radioiodine', 'V/Q Lung Scans for PE']
  },
  {
    id: 'spec-44',
    field: 'Pathology',
    specialistTitle: 'Pathologist',
    scopeOfPractice: 'Laboratory tissue diagnosis, histology, frozen section biopsy interpretation and hematopathology',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Jennifer Hayes, MD',
    availability: 'Available Now',
    commonPathologies: ['Malignant Biopsy Confirmation', 'Bone Marrow Aspirate Evaluation', 'Sepsis Blood Smear']
  },
  {
    id: 'spec-45',
    field: 'Clinical Microbiology',
    specialistTitle: 'Microbiologist',
    scopeOfPractice: 'Identification of bacteria, viruses, fungi, antibiotic resistance testing and antibiogram generation',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Leonard McCoy, PhD',
    availability: 'Available Now',
    commonPathologies: ['Blood Culture Speciation', 'Carbapenem-Resistant Enterobacteriaceae (CRE)', 'Viral PCR Panels']
  },
  {
    id: 'spec-46',
    field: 'Forensic Medicine',
    specialistTitle: 'Forensic Physician',
    scopeOfPractice: 'Medico-legal examinations, cause-of-death determination, toxicology and legal documentation',
    category: 'Diagnostic & Laboratory',
    onCallDoctor: 'Dr. Bruce Banner, MD, PhD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Medico-Legal Causality', 'Forensic Toxicology', 'Chain of Custody Verification']
  },

  // 6. Supportive, Physical & Preventive Medicine
  {
    id: 'spec-47',
    field: 'Sports Medicine',
    specialistTitle: 'Sports Medicine Physician',
    scopeOfPractice: 'Sports injuries, musculoskeletal rehabilitation, concussion protocols and biomechanical performance',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Travis Knight, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Acute Concussion Protocol', 'Tendon Ruptures', 'Ligamentous Injuries']
  },
  {
    id: 'spec-48',
    field: 'Physical Medicine',
    specialistTitle: 'PM&R / Physiatrist',
    scopeOfPractice: 'Comprehensive rehabilitation, stroke recovery, spinal cord injury rehab and functional mobility',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Charles Xavier, MD',
    availability: 'Available Now',
    commonPathologies: ['Post-Stroke Neuro-Rehab', 'Spinal Cord Injury Functional Recovery', 'Amputee Mobility']
  },
  {
    id: 'spec-49',
    field: 'Palliative Medicine',
    specialistTitle: 'Palliative Care Physician',
    scopeOfPractice: 'Symptom relief, pain optimization, goal-of-care discussions in advanced serious illness and end-of-life care',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Mary Oliver, MD',
    availability: 'Available Now',
    commonPathologies: ['End-Stage Symptom Burden', 'Refractory Dyspnea in Terminal Illness', 'Goals of Care Alignment']
  },
  {
    id: 'spec-50',
    field: 'Preventive Medicine',
    specialistTitle: 'Preventive Medicine Physician',
    scopeOfPractice: 'Disease prevention strategies, lifestyle risk reduction, cardiovascular prophylaxis and immunization schedules',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Oliver Queen, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Cardiovascular Risk Stratification', 'Vaccine Strategies', 'Metabolic Syndrome Prevention']
  },
  {
    id: 'spec-51',
    field: 'Occupational Medicine',
    specialistTitle: 'Occupational Physician',
    scopeOfPractice: 'Workplace health hazards, toxic exposures, ergonomic evaluations and return-to-work certifications',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Arthur Dent, MD',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Toxic Inhalation Injury', 'Occupational Asthma', 'Repetitive Strain Disorders']
  },
  {
    id: 'spec-52',
    field: 'Community Medicine',
    specialistTitle: 'Public Health Physician',
    scopeOfPractice: 'Population health epidemiology, outbreak containment, disease surveillance and healthcare policy',
    category: 'Supportive & Preventive Medicine',
    onCallDoctor: 'Dr. Jonathan Snow, MD, MPH',
    availability: 'Available for Teleconsult',
    commonPathologies: ['Nosocomial Outbreak Surveillance', 'Epidemic Contact Tracing', 'Community Health Equity']
  }
];
