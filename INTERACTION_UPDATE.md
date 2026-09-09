# Interaction Update — v2.2.0

This pass implements the requested interactive UI refinements:

1. Seamless ticker with repeated tracks so the marquee never exposes an empty gap.
2. PharmaLink Live Architecture nodes are interactive; API, AUTH, WS, and DB can each become the single active service. The active path, status, packet motion, and log panel update with the selection.
3. Lung Cancer Classification model pipeline now cycles through IMAGE → FEATURES → MODEL → CLASS with a live status, scanning target, activity waveform, and runtime panel.
4. Backend Identity metric numbers were reduced slightly at desktop and mobile sizes.
5. Technology Constellation skills now use deterministic positions within each category and support hover, focus, and click activation with an active-node readout.

Accessibility:
- Interactive architecture and skill nodes are native buttons.
- Active states use `aria-pressed`.
- Dynamic status regions use polite live announcements where appropriate.
- Continuous decorative motion is disabled under `prefers-reduced-motion`.
