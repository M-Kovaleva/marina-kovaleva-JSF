# AI Usage Log

Tool used: ChatGPT

Date: 15 September 2026
Purpose: Discussed project architecture, file structure, and how to split components/hooks/context to follow DRY principles.
Outcome: Restructured the project into `components/`, `hooks/`, `context/`, `services/`, `types/`, `pages/`. Extracted reusable components 

Date: 18 September 2026
Purpose: Brainstormed how to bring the visual style from a previous, similar project (a custom, hand-written CSS stylesheet) into this project, while properly using Bootstrap instead of just copying the old CSS as-is. Discussed which parts of a hand-written stylesheet map to Bootstrap's built-in utilities and theming system, and which parts are genuinely custom and have no Bootstrap equivalent.
Outcome: Agreed on an approach: go through the old stylesheet rule by rule and, for each one, either (a) replace it with an existing Bootstrap utility class or component (e.g. card/grid layout, `.ratio` for image containers, `.badge`, `.spinner-border`, `.alert`), (b) reimplement it as a Bootstrap CSS variable override scoped to a component (e.g. `--bs-btn-bg`, `--bs-navbar-color`) so the existing theme system carries the styling instead of a separate custom class, or (c) keep it as hand-written CSS only when Bootstrap has no equivalent (hover-lift animation on product cards, the theme's accent colors, the image-hover overlay). I applied this rule-by-rule myself across the whole stylesheet, rather than porting the old CSS wholesale, which is why the current `index.css` is much smaller than the original it was based on and relies on Bootstrap's own variables for most theming.

Date: September 25, 2026
Issue: The dark background behind the mobile menu remained visible after closing the menu by clicking outside its area, even though the menu itself closed correctly.
Result: The root cause was identified (the cleanup code triggered only when closing via a button or link, but not when closing by clicking the background). The issue was resolved by tracking the Bootstrap `hidden.bs.offcanvas` event, which fires regardless of the closing method.

Date: 26 September 2026
Purpose: Explanation ofdifferent ARIA attributes for form validation feedback, and matching button/input styles across pages.
Outcome: The attributes required for my project have been applied

Date: 26 September 2026 
Purpose: Explanation of Prettier and how to integrate it with ESLint without rule conflicts.
Outcome:Set up `.prettierrc.json`, `.prettierignore`, and `format`/`format:check` npm scripts myself.

Date: 26 September 2026
Purpose: Code review of `index.css` for structure
Outcome: Reorganized the stylesheet into commented sections, renamed an ambiguously-named class (`badge-accent` → `badge-cta`), and removed unnecessary `!important` usage by adding a dedicated `.footer-link` class. Applied all changes myself.

Date: 26 September 2026
Purpose: Accessibility review — checked for missing `aria-label`, `alt` text, and `aria-describedby` issues across components.
Outcome: Added `aria-label` to the cart icon link, quantity +/- buttons, and search input