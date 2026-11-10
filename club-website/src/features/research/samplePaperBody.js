// Shared placeholder text for the paper reader. The template is Markdown with TeX math.
export function buildSamplePaperBody(title) {
  return `
## 1. Introduction

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

This work examines *${title}*. Prior approaches to the problem are reviewed in Section 2, the experimental protocol is described in Section 3, and results are reported in Section 4.

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
