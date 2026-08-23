import { ProteinStructure } from '../types/biotech';

export const PROTEIN_STRUCTURES: ProteinStructure[] = [
  {
    id: 'kras',
    gene: 'KRAS',
    name: 'GTPase KRas (Oncoprotein)',
    uniprotId: 'P01116',
    pdbId: '6OIM', // KRAS G12C/G12D crystal structure with inhibitor
    description: 'Master signaling switch in the MAPK/ERK pathway. Mutated in ~90% of pancreatic cancers, ~45% of colorectal cancers, and ~30% of lung adenocarcinomas.',
    length: 189,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '1.45 Å',
    cancerTypes: ['Pancreatic Adenocarcinoma', 'Colorectal Cancer', 'Non-Small Cell Lung Cancer'],
    structureUrl: 'https://files.rcsb.org/download/6OIM.pdb',
    defaultMutationResidue: 12,
    mutationHotspots: [
      { residue: 12, wildtype: 'G (Glycine)', mutant: 'D (Aspartate) / C (Cysteine)', name: 'G12D / G12C', clinicalImpact: 'Pathogenic', frequency: '83% of KRAS mutations', description: 'Locks GTPase in permanent active state, driving uncontrolled oncogenic proliferation.' },
      { residue: 13, wildtype: 'G (Glycine)', mutant: 'D (Aspartate)', name: 'G13D', clinicalImpact: 'Pathogenic', frequency: '12% of KRAS mutations', description: 'Impairs GAP-mediated GTP hydrolysis, leading to hyperactive downstream signaling.' },
      { residue: 61, wildtype: 'Q (Glutamine)', mutant: 'H (Histidine)', name: 'Q61H', clinicalImpact: 'Pathogenic', frequency: '4% of KRAS mutations', description: 'Disrupts the catalytic water coordination required for GTP cleavage.' }
    ],
    activePockets: [
      { name: 'Switch II Allosteric Pocket', residues: [12, 13, 60, 61, 62, 68, 69, 70, 95, 96, 99, 102], color: '#f43f5e', description: 'Targeted by covalent Switch II pocket inhibitors like Sotorasib and Adagrasib.' },
      { name: 'GTP/GDP Nucleotide Binding Site', residues: [10, 15, 16, 17, 28, 29, 30, 31, 32, 116, 117, 119], color: '#00f2fe', description: 'High-affinity catalytic cleft for phosphate binding.' }
    ]
  },
  {
    id: 'egfr',
    gene: 'EGFR',
    name: 'Epidermal Growth Factor Receptor Kinase Domain',
    uniprotId: 'P00533',
    pdbId: '2J6M', // EGFR kinase domain with Osimertinib / Gefitinib
    description: 'Receptor tyrosine kinase controlling cell growth and survival. Canonical target in non-small cell lung cancer (NSCLC).',
    length: 1210,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '1.90 Å',
    cancerTypes: ['Non-Small Cell Lung Cancer', 'Glioblastoma', 'Head & Neck Squamous'],
    structureUrl: 'https://files.rcsb.org/download/2J6M.pdb',
    defaultMutationResidue: 790,
    mutationHotspots: [
      { residue: 790, wildtype: 'T (Threonine)', mutant: 'M (Methionine)', name: 'T790M Gatekeeper', clinicalImpact: 'Pathogenic', frequency: '50-60% of 1st-gen resistance', description: 'Steric gatekeeper mutation that prevents 1st/2nd-gen TKIs (Gefitinib/Erlotinib) from binding while preserving ATP affinity.' },
      { residue: 858, wildtype: 'L (Leucine)', mutant: 'R (Arginine)', name: 'L858R Exon 21', clinicalImpact: 'Pathogenic', frequency: '40% of sensitizing mutations', description: 'Destabilizes the inactive kinase conformation, locking EGFR into a constitutively active state.' },
      { residue: 797, wildtype: 'C (Cysteine)', mutant: 'S (Serine)', name: 'C797S', clinicalImpact: 'Pathogenic', frequency: 'Major 3rd-gen resistance', description: 'Abolishes covalent bond formation with 3rd-generation irreversible inhibitors like Osimertinib.' }
    ],
    activePockets: [
      { name: 'ATP-Binding Pocket & Gatekeeper Cleft', residues: [718, 719, 745, 766, 790, 791, 792, 797, 855], color: '#9d4edd', description: 'Catalytic cleft where ATP and competitive tyrosine kinase inhibitors bind.' },
      { name: 'Activation Loop (A-Loop)', residues: [855, 858, 860, 863, 865, 870], color: '#10b981', description: 'Dynamic regulatory segment that governs kinase phosphorylation state.' }
    ]
  },
  {
    id: 'tp53',
    gene: 'TP53',
    name: 'Cellular Tumor Antigen p53 (Guardian of the Genome)',
    uniprotId: 'P04637',
    pdbId: '1TUP', // p53 core DNA-binding domain
    description: 'The most frequently mutated tumor suppressor in human cancer (>50%). Transcribes genes for cell-cycle arrest, DNA repair, and apoptosis.',
    length: 393,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '2.20 Å',
    cancerTypes: ['Ovarian Serous Carcinoma', 'Triple-Negative Breast Cancer', 'Colorectal', 'Lung Adenocarcinoma'],
    structureUrl: 'https://files.rcsb.org/download/1TUP.pdb',
    defaultMutationResidue: 273,
    mutationHotspots: [
      { residue: 273, wildtype: 'R (Arginine)', mutant: 'H (Histidine) / C (Cysteine)', name: 'R273H / R273C Contact Mutant', clinicalImpact: 'Pathogenic', frequency: 'Primary hotspot (9.2%)', description: 'Directly disrupts electrostatic contact with DNA phosphate backbone without unfolding the protein.' },
      { residue: 175, wildtype: 'R (Arginine)', mutant: 'H (Histidine)', name: 'R175H Structural Mutant', clinicalImpact: 'Pathogenic', frequency: 'Second hotspot (6.8%)', description: 'Disrupts zinc coordination sphere, causing large-scale thermodynamic destabilization of the DNA-binding domain.' },
      { residue: 248, wildtype: 'R (Arginine)', mutant: 'W (Tryptophan) / Q (Glutamine)', name: 'R248W / R248Q Contact Mutant', clinicalImpact: 'Pathogenic', frequency: 'Hotspot (8.5%)', description: 'Loss of minor groove DNA intercalation, extinguishing transcriptional transactivation.' }
    ],
    activePockets: [
      { name: 'DNA Binding Interface & Zinc Finger', residues: [175, 176, 179, 238, 242, 248, 273, 280, 282], color: '#00f2fe', description: 'Direct contact surface for minor and major groove DNA recognition.' }
    ]
  },
  {
    id: 'braf',
    gene: 'BRAF',
    name: 'Serine/Threonine-Protein Kinase B-Raf',
    uniprotId: 'P15056',
    pdbId: '4MNE', // BRAF kinase domain with Dabrafenib
    description: 'Key kinase in the RAS-RAF-MEK-ERK signaling cascade. V600 mutations confer ~500-fold kinase activity elevation independent of RAS activation.',
    length: 766,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '2.40 Å',
    cancerTypes: ['Cutaneous Melanoma', 'Papillary Thyroid Carcinoma', 'Colorectal Adenocarcinoma', 'Hairy Cell Leukemia'],
    structureUrl: 'https://files.rcsb.org/download/4MNE.pdb',
    defaultMutationResidue: 600,
    mutationHotspots: [
      { residue: 600, wildtype: 'V (Valine)', mutant: 'E (Glutamate) / K (Lysine)', name: 'V600E / V600K Exon 15', clinicalImpact: 'Pathogenic', frequency: '>90% of BRAF mutations', description: 'Introduces negative charge in activation loop mimicking regulatory phosphorylation, causing monomeric hyperactivation.' },
      { residue: 597, wildtype: 'L (Leucine)', mutant: 'V (Valine)', name: 'L597V', clinicalImpact: 'Pathogenic', frequency: '3% of BRAF mutations', description: 'Class 2 mutation that promotes RAS-independent dimerization.' }
    ],
    activePockets: [
      { name: 'Kinase Catalytic Cleft & DFG Motif', residues: [468, 470, 501, 505, 594, 595, 596, 600], color: '#f59e0b', description: 'Target binding pocket for RAF inhibitors (Vemurafenib, Dabrafenib, Encorafenib).' }
    ]
  },
  {
    id: 'brca1',
    gene: 'BRCA1',
    name: 'BRCA1 BRCT Repeat Domain',
    uniprotId: 'P38398',
    pdbId: '1JNX', // BRCA1 BRCT domain
    description: 'Tumor suppressor essential for Homologous Recombination (HR) DNA repair. Inactivating mutations cause synthetic lethality with PARP inhibitors.',
    length: 1863,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '2.50 Å',
    cancerTypes: ['Hereditary Breast & Ovarian Cancer', 'Prostate Cancer', 'Pancreatic Cancer'],
    structureUrl: 'https://files.rcsb.org/download/1JNX.pdb',
    defaultMutationResidue: 1775,
    mutationHotspots: [
      { residue: 1775, wildtype: 'M (Methionine)', mutant: 'R (Arginine)', name: 'M1775R BRCT Domain', clinicalImpact: 'Pathogenic', frequency: 'Founder mutation', description: 'Destroys phosphopeptide-binding pocket in BRCT domain, blocking Abraxas/BACH1 partner interaction.' }
    ],
    activePockets: [
      { name: 'Phosphopeptide Recognition Cleft', residues: [1699, 1700, 1703, 1775, 1833, 1837], color: '#10b981', description: 'Critical interface for binding phosphorylated repair mediators (pSer-X-X-Phe).' }
    ]
  },
  {
    id: 'her2',
    gene: 'ERBB2',
    name: 'Receptor Tyrosine-Protein Kinase erbB-2 (HER2)',
    uniprotId: 'P04626',
    pdbId: '1N8Z', // HER2 extracellular domain with Trastuzumab Fab
    description: 'Orphan receptor tyrosine kinase amplified in ~20% of breast and gastric cancers, driving rapid metastatic progression.',
    length: 1255,
    organism: 'Homo sapiens',
    source: 'RCSB PDB',
    resolution: '2.50 Å',
    cancerTypes: ['HER2+ Breast Cancer', 'Gastric & Gastroesophageal Junction Adenocarcinoma'],
    structureUrl: 'https://files.rcsb.org/download/1N8Z.pdb',
    defaultMutationResidue: 557,
    mutationHotspots: [
      { residue: 755, wildtype: 'L (Leucine)', mutant: 'S (Serine)', name: 'L755S Kinase Domain', clinicalImpact: 'Pathogenic', frequency: 'Major lapatinib resistance hotspot', description: 'Promotes active kinase state and creates resistance to reversible TKIs.' }
    ],
    activePockets: [
      { name: 'Domain IV Trastuzumab Binding Interface', residues: [557, 561, 570, 579, 583, 593], color: '#9d4edd', description: 'Epitope recognized with sub-nanomolar affinity by Trastuzumab monoclonal antibody.' }
    ]
  }
];
