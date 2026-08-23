# 🏥 BioPulse AI • NOVA Ecosystem
### Universal Clinical Intelligence, Master Pharmacology Universe, Micro-to-Macro 3D Anatomy Digital Twin & Persistent Clinical Database

[![Production URL](https://img.shields.io/badge/Live%20Production-biopulse--ai--iota.vercel.app-06b6d4.svg?style=for-the-badge&logo=vercel)](https://biopulse-ai-iota.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-SreeshM18%2Fbiopulse--ai-3b82f6.svg?style=for-the-badge&logo=github)](https://github.com/SreeshM18/biopulse-ai)
[![Track](https://img.shields.io/badge/Track-BioTech%20%26%20Computational%20Health-06b6d4.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Vite%208%20%7C%20TailwindCSS-3b82f6.svg)](#)
[![Database](https://img.shields.io/badge/Database-Master%20Persistent%20EHR%20%7C%20PostgreSQL%20%2F%20Supabase-10b981.svg)](#)
[![AI Architecture](https://img.shields.io/badge/Explainable%20AI-TreeSHAP%20%7C%20NEWS2%20%7C%20AlphaFold%203D-8b5cf6.svg)](#)
[![Pharma Universe](https://img.shields.io/badge/NOVA%20Pharma-12%20Legal%20Tiers%20%7C%2041%20Dosage%20Forms-pink.svg)](#)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](#)

---

## 🌐 Live Production Deployment
- **Live Web Application**: [https://biopulse-ai-iota.vercel.app](https://biopulse-ai-iota.vercel.app)
- **GitHub Repository**: [https://github.com/SreeshM18/biopulse-ai](https://github.com/SreeshM18/biopulse-ai)

---

## 🌟 Executive Overview

**BioPulse AI (NOVA Ecosystem)** is an end-to-end, clinical-grade medical intelligence platform unifying continuous multi-organ telemetry, **TreeSHAP explainable AI risk prediction**, bedside **Nurse eMAR administration**, a **Universal Emergency QR Health Passport**, the **NOVA RESCUE emergency dispatch grid**, the **NOVA Anatomy Twin (3D)**, the **NOVA PHARMA Complete Substance Universe**, **NOVA CAREGUIDE**, and a **Master Persistent Clinical Database Engine** across 21 hospital departments and 52 medical specialties.

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                         BIOPULSE AI • THE NOVA ECOSYSTEM                                         │
 ├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
 │                                                                                                                  │
 │   1. 🗄️ MASTER CLINICAL DB  ──► Persistent Storage for Users, Patients EHR, Invoices Billing & Audit Trails     │
 │   2. 💊 NOVA PHARMA UNIVERSE──► 12 Legal/Safety Tiers, 41 Dosage Subtypes, Real Commercial Strengths & Units   │
 │   3. 🩺 NOVA CAREGUIDE AI   ──► "What can I take for this?" NLP Guidance, 10 Contraception Tiers & Failure Prot │
 │   4. 👤 4-PERSONA PROFILES  ──► Dedicated Identity Portals: Doctor, Patient EHR, SOS Paramedic, Hospital Admin│
 │   5. 🔒 LOGOUT TERMINATION  ──► Cryptographic Session Audit Hash + DB State Commitment + Auto-Redirect Timer     │
 │   6. 🧬 NOVA ANATOMY TWIN   ──► Micro-to-Macro 3D Digital Avatar (Body ➔ Organ ➔ Cell ➔ Microstructure ➔ DNA)    │
 │   7. 🛡️ NOVA SENTINEL AI    ──► Continuous Inpatient Telemetry + TreeSHAP Deterioration Risk Prediction          │
 │   8. 🚨 NOVA RESCUE         ──► Universal SOS + Smart Ambulance Fleet + Hospital Emergency Capability Match      │
 │   9. 🪪 EMERGENCY QR PASS   ──► 2-Second Scannable QR Emergency Passport + Break-Glass Clinical Override       │
 │  10. 📱 DEVICE SIMULATOR    ──► Pixel-Perfect iPhone, Android, iPad, Laptop, Desktop & Quad-Screen Live Grid     │
 │                                                                                                                  │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Master Persistent Clinical Database Engine & Studio

BioPulse AI features a full-fledged client/cloud persistent database engine (`src/services/clinicalDatabaseService.ts`) paired with an interactive **Database Studio Modal** (`src/components/DatabaseAdminModal.tsx`) and production PostgreSQL / Supabase migration schema (`supabase/migrations/20260824_biopulse_master_schema.sql`):

### 1. Database Collections:
- **`users`**: User accounts, encrypted passwords, roles (`doctor`, `patient`, `hospital`, `emergency`), medical licenses, and 2FA OTP tokens.
- **`patients`**: Master patient records, MRNs, bed assignments, admission vitals, allergies, conditions, and real-time telemetry history.
- **`invoices`**: Itemized hospital billing, payment statuses (`PAID`, `PENDING_INSURANCE`), payment methods, and live payment processing (`Mark Paid` generating verifiable transaction hashes).
- **`appointments`**: Clinical bookings and teleconsultation appointments.
- **`audit_logs`**: Immutable, cryptographic audit trails for all clinical and administrative actions.

### 2. Studio Features:
- **Real-Time Inspection**: Live search, filtering, and row deletion across all database tables.
- **JSON Backup Export & Import**: 1-click full database state backup and restore.
- **Factory Reset**: Re-seed database with gold-standard verified clinical records.

---

## 💊 NOVA PHARMA — Complete Medicine Universe

A pharmaceutical knowledge universe categorizing substances across **12 legal and safety tiers**, **41 dosage forms and release kinetics**, verified commercial strengths, an **Injections 10-Route Parenteral Hub**, **NOVA TOX / Forensic Drug Database**, and **Counterfeit Watch**:

### 1. 🏷️ The 12 NOVA Legal / Safety Tiers:
| Tier | NOVA Status | Description & Examples |
|---|---|---|
| 🟢 | **`OTC`** | Non-prescription medicines where permitted (Paracetamol 500/650 mg, Antacids). |
| 🔵 | **`Prescription`** | Requires authorized medical prescriber (Amlodipine, Salbutamol, Antibiotics). |
| 🟡 | **`Pharmacist / Specialist`** | Additional professional oversight (Viagra Connect UK, Specialist Oncology). |
| 🟠 | **`High Alert`** | Legal but high risk of catastrophic harm if misused (Epinephrine, IV Heparin, Insulin). |
| 🔴 | **`Controlled`** | Restricted due to abuse/dependence risk (Fentanyl Transdermal C-II, Morphine, Benzodiazepines). |
| 🟣 | **`Hospital Only`** | Restricted to ICU/inpatient settings (Meropenem IV, General Anesthetics, Neuromuscular Blockers). |
| 🧬 | **`Biologic`** | Monoclonals, recombinant peptides, vaccines, gene therapies (Semaglutide, Trastuzumab). |
| 🧪 | **`Investigational`** | Clinical-trial authorized substances under active evaluation. |
| ⚫ | **`Illicit`** | Prohibited street substances / forensic registry (Street Fentanyl, Crystal Meth, MDMA). |
| 🚫 | **`Banned / Withdrawn`** | Removed by regulators for safety reasons. |
| ⚠️ | **`Counterfeit / Falsified`** | Fake/adulterated pharmaceutical lots with active recall warnings. |
| ☠️ | **`Toxic Chemical`** | Industrial toxins, venoms, and forensic toxicology entries. |

### 2. 🔬 Strict Commercial Strength Verification (No Hallucinations):
- **Amlodipine**: `2.5 mg`, `5 mg`, `10 mg` Tablets (Conventional Compressed, IR).
- **Sildenafil**: `25 mg`, `50 mg`, `100 mg` Tablets (Film-Coated) & `20 mg` Tablets / `10 mg/12.5 mL` IV (Revatio).
- **Paracetamol**: `500 mg`, `650 mg` Scored Tablets, `120 mg/5 mL` & `250 mg/5 mL` Suspensions, `1000 mg/100 mL` IV Infusions.
- **Levothyroxine**: `25 mcg`, `50 mcg`, `75 mcg`, `88 mcg`, `100 mcg`, `112 mcg`, `125 mcg`, `150 mcg`, `200 mcg` Tablets (in micrograms).
- **Salbutamol**: `100 mcg/actuation` MDI Inhalers, `2.5 mg/2.5 mL` Nebulizer Respules.
- **Fentanyl**: `12.5 mcg/hr`, `25 mcg/hr`, `50 mcg/hr`, `100 mcg/hr` Transdermal Patches.
- **Semaglutide**: `0.25 mg`, `0.5 mg`, `1.0 mg`, `2.0 mg`, `2.4 mg` Auto-Injectors; `3 mg`, `7 mg`, `14 mg` Oral Tablets.
- **Meropenem**: `500 mg`, `1000 mg` Sterile Powder IV Vials.
- **Epinephrine**: `0.3 mg` & `0.15 mg` Auto-Injectors, `1 mg/mL` (1:1,000) IM, `0.1 mg/mL` (1:10,000) IV Cardiac Syringes.

### 3. 💉 41 Dosage Forms & Injections 10-Route Hub:
- **Tablets (18 Subtypes + 7 Kinetics)**: Conventional compressed, Uncoated, Film-coated, Sugar-coated, Enteric-coated, Chewable, Dispersible, Soluble, Effervescent, Orodispersible (ODT), Sublingual, Buccal, Scored, Bilayer, Multilayer, Matrix, Tablet-in-tablet, Mini-tablet; paired with IR, DR, ER/XR, SR, CR, MR, PR.
- **Injections (10 Distinct Routes)**: Intravenous (IV), Intramuscular (IM), Subcutaneous (SC), Intradermal (ID), Intra-articular, Intrathecal, Epidural, Intraosseous (IO), Intravitreal, Intralesional.
- **Inhalers & Nebulizers**: MDI (`mcg/actuation`), DPI, Soft-mist, and Nebulizer Respules (`mg/2.5 mL`).
- **Transdermal Patches**: Rate-controlled delivery (`mcg/hr`, `mg/24hr`).
- **Syrups & Suspensions**: Concentration-based (`mg/5 mL`) with reconstitution instructions.

### 4. ⚫ Forensic Toxicology & 🚫 Counterfeit Watch:
- **NOVA TOX Hub**: Separated forensic database documenting street aliases, chemical classes, toxicity profiles, dependence risk scores, overdose warning signs, and emergency **Naloxone Reversal Protocols** (with strict safeguards preventing synthesis or recreational dosing).
- **Counterfeit Watch**: Real-time regulatory watch tracking falsified Ozempic pens containing unlabeled insulin, fentanyl-pressed counterfeit Xanax, and toxic industrial Diethylene Glycol (DEG) contaminated pediatric syrups.

---

## 🩺 NOVA CAREGUIDE — "What Can I Take for This?"

A natural language clinical guidance layer assisting with symptoms, regular contraception, and emergency protocols:
- **Symptom Routing**: Inputting `"I have fever"`, `"headache and cold"`, or `"period cramps"` returns evidence-based self-care, red flags, and first-line medicines with pediatric weight calculations.
- **10 Contraception Tiers**: Barrier methods, Combined Oral Pills, Progestin-Only (Mini-Pill), Patches, Rings, Injections (Depo), LNG-IUD, Copper IUD, Subdermal Implants (Nexplanon >99.95%), and Emergency Pills.
- **Emergency Contraception Protocol**: Triggered on `"condom broke"`, `"unprotected sex"`, or `"morning after pill"` — outlining the 24-72h Levonorgestrel 1.5mg, 120h Ulipristal Acetate 30mg, and HIV PEP 72h window.
- **Body Part & Organ Navigator**: Navigate ocular, otic, nasal, pulmonary, cardiovascular, GI, renal, and dermatological conditions.

---

## 👤 4-Persona Clinical Profile Hub & Dedicated Logout Screen

### 1. 👥 Unified 4-Persona Profiles (`src/components/UserProfileHub.tsx`):
- 🩺 **Doctor / Physician Profile** (`Dr. Sarah Lin, MD, FACC`): License `MD-94820-LIC-NY`, NPI `1948204918`, Board Certifications, ICU Privileges, Digital Prescribing Signature Key, CME Credits, and Active Inpatient Rounds list.
- 👤 **Patient EHR & Demographics Profile** (`Robert Vance`): `MRN-784920`, ABHA ID, Blood Group `O+`, Organ Donor status, Severe Allergies (Penicillin Anaphylaxis), Insurance Policy, Live IoT Wearables (Apple Watch Ultra 2 ECG, Dexcom G7 CGM), and Emergency QR link.
- 🚑 **SOS / Emergency Paramedic Profile** (`Paramedic Alex Morgan, NRP, FP-C`): NREMT-P Registry, Ambulance Unit `MEDIC-04`, Radio Channel `VHF-MED-12`, Rig Equipment Checklist (Lucas 3 CPR, Zoll Defibrillator, Glidescope, Narcan, Epi syringes), and NOVA RESCUE dispatch link.
- 🏥 **Hospital Administrator Profile** (`St. Jude Memorial Health Center`): JCI/NABH A++ Accreditation, 150 Bed Telemetry (92% Occupancy), 4/4 Operating Theaters, $148,200 cleared daily revenue, Clinical Departments roster, and Inpatient Bed Management.

### 2. 🔒 Dedicated Session Termination & Logout Screen (`src/components/LogoutScreen.tsx`):
- **Cryptographic Session Audit**: Displays logged-out user name, role badge, session duration summary, and cryptographic audit hash (`0x7f8a...`).
- **Database Commitment Guarantee**: Confirms that all EHR patient vitals, telemetry, prescriptions, and billing entries have been encrypted and saved to `clinicalDb`.
- **Auto-Redirect Timer**: 12-second countdown bar that automatically navigates back to the Login Portal (with Pause/Resume controls).
- **1-Click Role Switcher**: Quick buttons to immediately sign in under any of the 4 roles (**Doctor**, **Patient**, **SOS Paramedic**, or **Hospital Admin**).

---

## 🧬 NOVA Anatomy Twin (3D): Micro-to-Macro Digital Avatar

The **NOVA Anatomy Twin** enables clinicians to zoom across 7 biological scales with real-time in-silico telemetry:

```
Human Body (Multi-layered Humanoid Avatar)
   │
   ▼
Body System (Nervous, Cardiovascular, Respiratory, Musculoskeletal, Digestive, Renal)
   │
   ▼
Individual Organ (Brain, Heart, Lungs, Kidneys, Eye, Ear, Liver, Bone)
   │
   ▼
Tissue Level (Myocardium, Cerebral Cortex, Renal Glomerulus)
   │
   ▼
Cellular Unit (Pyramidal Neuron, Cardiomyocyte, Podocyte, Type I/II Pneumocyte)
   │
   ▼
Microstructure (Synaptic Cleft with PSD-95, 0.5 µm Alveolar Blood-Air Barrier)
   │
   ▼
DNA Molecule (Watson-Crick Antiparallel Double Helix with A=T, G≡C Base Pairs)
```

---

## 📱 Pixel-Perfect Multi-Device Viewport Engine

BioPulse AI features an integrated hardware device simulator enabling judges and clinicians to experience the platform across native device form factors:

| Preset | Target Device | Resolution | Hardware Features |
|---|---|---|---|
| **🌊 Fluid Responsive** | Universal Web | $100\%$ Fluid | Fluid layout adapting dynamically to any display. |
| **📱 Apple iPhone** | iPhone 16 Pro | $393 \times 852\text{ px}$ | Titanium frame, Dynamic Island capsule with live SOS telemetry, iOS status bar, and home indicator. |
| **🤖 Samsung Android** | Galaxy S24 Ultra | $412 \times 915\text{ px}$ | High-aspect chassis, centered punch-hole camera, 5G status bar, and Android navigation gesture pill. |
| **📟 iPad Bedside Tab** | iPad Pro 11" | $820 \times 1080\text{ px}$ | Aluminium tablet frame, top camera sensor, and touch-optimized Nurse eMAR. |
| **💻 MacBook Laptop** | MacBook Pro 14" | $1280 \times 832\text{ px}$ | macOS window chrome with traffic light controls. |
| **🖥️ Desktop 4K** | Clinical Workstation | $1440 \times 900\text{ px}$ | Browser address bar with secure clinical URL and 126-bed overview. |
| **⚡ Multi-Screen Grid** | Quad Synchronized View | Multi-Grid | **4 synchronized screens side-by-side**: Doctor Desktop + iPad Nurse eMAR + iPhone Patient SOS QR! |

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite 8 |
| **Styling & Aesthetics** | TailwindCSS, Glassmorphism, CSS Custom Properties |
| **Database & Persistence** | PostgreSQL / Supabase, LocalStorage In-Memory Sync Engine |
| **Device Simulator** | Native Hardware CSS Chassis (iPhone 16 Pro, Galaxy S24, iPad Pro, MacBook) |
| **Icons & Visuals** | Lucide React, HTML5 Canvas 3D Engine, 3D WebGL Protein Renderer |
| **Data Visualization** | Recharts (Continuous 24h Vitals, SHAP waterfall plots, Telemetry streams) |
| **Standards & Payloads** | HL7 FHIR payloads, ICD-10 Coding, LOINC diagnostics, SNOMED CT |

---

## 💻 Local Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/SreeshM18/biopulse-ai.git
cd biopulse-ai

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev

# 4. Access the application in your browser
http://localhost:5173/
```

---

## 📦 GitHub Ecosystem Files

| File | Purpose |
|---|---|
| [`.github/workflows/ci.yml`](.github/workflows/ci.yml) | Automated Node.js 20 build and TypeScript compilation on Push/PR |
| [`.github/ISSUE_TEMPLATE/bug_report.md`](.github/ISSUE_TEMPLATE/bug_report.md) | Standardized bug tracking template |
| [`.github/ISSUE_TEMPLATE/feature_request.md`](.github/ISSUE_TEMPLATE/feature_request.md) | Clinical decision support & feature suggestions |
| [`supabase/migrations/20260824_biopulse_master_schema.sql`](supabase/migrations/20260824_biopulse_master_schema.sql) | Production PostgreSQL schema with RLS policies |
| [`LICENSE`](LICENSE) | Standard MIT License |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution standards and branching workflow |

---
*BioPulse AI • NOVA Ecosystem — Advancing Computational Health, Micro-to-Macro Digital Twins, Pharmacology Intelligence & Emergency Medicine.*
