import { slugify } from '../utils/slug'

/** Papers shown per page — a 4-column x 3-row grid. */
export const PAPERS_PER_PAGE = 12

const raw = [
  {
    title: 'Thermal Drift Compensation in Distributed Sensor Networks',
    authors: 'Placeholder Author One, Placeholder Author Two, Placeholder Author Three',
    journal: 'Journal of Placeholder Sensing',
    year: '2026',
    featured: true,
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. This study presents a distributed compensation scheme for thermal drift across heterogeneous sensor arrays, reducing aggregate measurement error by a substantial margin under sustained load.',
  },
  {
    title: 'A Bayesian Framework for Sparse Signal Reconstruction',
    authors: 'Placeholder Author Four, Placeholder Author Five',
    journal: 'Placeholder Statistical Letters',
    year: '2026',
    abstract:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. We formulate a hierarchical Bayesian prior for sparse recovery and evaluate the posterior convergence properties on synthetic and partially observed data.',
  },
  {
    title: 'Catalytic Pathways of Low-Temperature Synthesis in Perovskite Materials',
    authors: 'Placeholder Author Six et al.',
    journal: 'Annals of Placeholder Chemistry',
    year: '2026',
    abstract:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Low-temperature routes to perovskite phases are mapped through a network of competing catalytic pathways, with activation barriers estimated across a range of precursor chemistries.',
  },
  {
    title: 'Deep Residual Learning for Gravitational Wave Classification',
    authors: 'Placeholder Author Seven, Placeholder Author Eight, Placeholder Author Nine',
    journal: 'Placeholder Astrophysics Review',
    year: '2025',
    abstract:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. We adapt a deep residual architecture to transient signal classification and report performance across simulated detector noise configurations.',
  },
  {
    title: 'Microbial Community Dynamics in Coastal Sediment Gradients',
    authors: 'Placeholder Author Ten, Placeholder Author Eleven',
    journal: 'Journal of Placeholder Ecology',
    year: '2025',
    abstract:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Community composition was profiled along a salinity gradient, revealing pronounced turnover between adjacent sampling sites.',
  },
  {
    title: 'Quantum Error Mitigation Using Probabilistic Circuit Knitting',
    authors: 'Placeholder Author Twelve et al.',
    journal: 'Placeholder Quantum Reports',
    year: '2025',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. A knitting-based mitigation strategy is applied to near-term circuits, with logical error rates compared against zero-noise extrapolation baselines.',
  },
  {
    title: 'Adaptive Mesh Refinement Strategies for Multiphase Flow Simulation',
    authors: 'Placeholder Author Thirteen, Placeholder Author Fourteen',
    journal: 'Placeholder Computational Fluids',
    year: '2025',
    abstract:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Three refinement criteria are benchmarked for interface-capturing accuracy against a fixed-grid reference solution at equivalent computational cost.',
  },
  {
    title: 'Machine Learning-Based Protein Folding Energy Estimation',
    authors: 'Placeholder Author Fifteen, Placeholder Author Sixteen',
    journal: 'Journal of Placeholder Bioinformatics',
    year: '2025',
    abstract:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. A learned scoring function is trained on a curated structural subset and evaluated for its ability to rank candidate conformations by free energy.',
  },
  {
    title: 'Photoluminescence Tuning of Doped Wide-Bandgap Semiconductors',
    authors: 'Placeholder Author Seventeen et al.',
    journal: 'Placeholder Materials Letters',
    year: '2024',
    abstract:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Dopant concentration and host composition are varied systematically to map emission peak positions across the visible range.',
  },
  {
    title: 'Stability Analysis of Consensus Protocols in Multi-Agent Networks',
    authors: 'Placeholder Author Eighteen, Placeholder Author Nineteen',
    journal: 'Annals of Placeholder Control',
    year: '2024',
    abstract:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sufficient conditions for consensus under bounded communication delay are derived and verified numerically.',
  },
  {
    title: 'Chromatic Aberration Correction for Wide-Field Microscopy',
    authors: 'Placeholder Author Twenty, Placeholder Author Twenty-One',
    journal: 'Placeholder Optics Journal',
    year: '2024',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. A post-processing correction pipeline restores broadband fidelity across a wide field of view without additional optical elements.',
  },
  {
    title: 'Sustainable Synthesis of Biodegradable Polyesters from Renewable Feedstocks',
    authors: 'Placeholder Author Twenty-Two, Placeholder Author Six',
    journal: 'Journal of Placeholder Polymers',
    year: '2024',
    abstract:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Catalytic routes to polyester synthesis are evaluated using agricultural feedstocks, with molecular weight and degradation profiles characterised.',
  },
  {
    title: 'Seismic Wave Inversion with Sparse Prior Regularization',
    authors: 'Placeholder Author Twenty-Three et al.',
    journal: 'Placeholder Geophysical Reports',
    year: '2024',
    abstract:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sparse prior constraints are imposed on the velocity model, stabilising inversion in low-signal regions.',
  },
  {
    title: 'Enzyme Kinetics Modeling of High-Temperature Industrial Processes',
    authors: 'Placeholder Author Twenty-Four, Placeholder Author Twenty-Five',
    journal: 'Placeholder Biotechnology Letters',
    year: '2023',
    abstract:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. Reaction parameters are fitted to industrial reactor data, and the resulting model is extrapolated across an extended operating range.',
  },
  {
    title: 'Anomaly Detection in IoT Sensor Networks Using Temporal Graphs',
    authors: 'Placeholder Author Twenty-Six, Placeholder Author Twenty-Seven',
    journal: 'Journal of Placeholder Networking',
    year: '2023',
    abstract:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. A temporal graph formulation captures inter-device dependencies, improving early detection of faulty readings.',
  },
  {
    title: 'Neutron Scattering Signatures of Antiferromagnetic Ordering',
    authors: 'Placeholder Author Twenty-Eight et al.',
    journal: 'Placeholder Condensed Matter',
    year: '2023',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magnetic ordering transitions are identified through momentum-transfer analysis across a range of sample temperatures.',
  },
  {
    title: 'Automated Optimization of Vascular Stent Geometry',
    authors: 'Placeholder Author Twenty-Nine, Placeholder Author Thirty',
    journal: 'Placeholder Biomedical Engineering',
    year: '2023',
    abstract:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A parametric optimisation workflow is applied to strut patterns, balancing compliance against radial force constraints.',
  },
  {
    title: 'Epidemiological Modeling of Vector-Borne Disease Transmission',
    authors: 'Placeholder Author Thirty-One, Placeholder Author Eleven',
    journal: 'Journal of Placeholder Public Health',
    year: '2023',
    abstract:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. A compartmental model is parameterised from field surveillance data to project transmission under varying intervention scenarios.',
  },
]

/** Placeholder body content, written in Markdown so it can be replaced with real text. */
function buildBody(paper) {
  return `
## 1. Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

This work examines *${paper.title}*. Prior approaches to the problem are reviewed in Section 2, the experimental protocol is described in Section 3, and results are reported in Section 4.

## 2. Background

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

- Lorem ipsum dolor sit amet, consectetur adipiscing elit
- Sed do eiusmod tempor incididunt ut labore et dolore
- Ut enim ad minim veniam, quis nostrud exercitation
- Duis aute irure dolor in reprehenderit in voluptate

> Lorem ipsum dolor sit amet — placeholder quotation for the reading page.

## 3. Methods

The governing quantity is expressed as

$$ F = \\sum_{i=1}^{N} w_i \\, x_i^2 + \\lambda \\lVert \\mathbf{x} \\rVert_1 $$

where the weights $w_i$ are held fixed across all trials and the regularisation parameter $\\lambda$ is swept over a fixed grid. A secondary expression follows from the first:

$$ \\nabla F = 2 \\mathbf{W} \\mathbf{x} + \\lambda \\, \\mathrm{sign}(\\mathbf{x}) $$

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## 4. Results

| Trial | Condition | Metric | Outcome |
| ----- | --------- | ------ | ------- |
| 1     | Baseline  | 0.00   | Placeholder |
| 2     | Adjusted  | 0.00   | Placeholder |
| 3     | Extended  | 0.00   | Placeholder |

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## 5. Discussion

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## 6. Conclusion

Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

## References

1. Placeholder, A., & Placeholder, B. (2024). *Lorem ipsum dolor sit amet*. Journal Press.
2. Placeholder, C. (2023). *Consectetur adipiscing elit*. Academic Review, 12(4), 101–118.
3. Placeholder, D., Placeholder, E., & Placeholder, F. (2022). *Sed do eiusmod tempor*. Conference Proceedings.
`.trim()
}

/** All papers, each with a slug and rendered body. */
export const papers = raw.map((paper, i) => ({
  ...paper,
  id: i + 1,
  slug: slugify(paper.title),
  body: buildBody(paper),
}))

export const pageCount = Math.max(1, Math.ceil(papers.length / PAPERS_PER_PAGE))

/** Look up a single paper by its URL slug. */
export function getPaperBySlug(slug) {
  return papers.find((paper) => paper.slug === slug)
}

/** The slice of papers to show on a given 1-based page. */
export function getPapersForPage(page) {
  const start = (page - 1) * PAPERS_PER_PAGE
  return papers.slice(start, start + PAPERS_PER_PAGE)
}

/** The paper before / after the given slug, for the reading page footer. */
export function getAdjacentPapers(slug) {
  const index = papers.findIndex((paper) => paper.slug === slug)
  return {
    previous: index > 0 ? papers[index - 1] : null,
    next: index >= 0 && index < papers.length - 1 ? papers[index + 1] : null,
  }
}
