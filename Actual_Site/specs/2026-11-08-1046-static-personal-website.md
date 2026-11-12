# Static personal website

This first version turns the supplied sketch into a responsive, single-page personal website. It includes the six content sections, a Projects panel that scrolls internally, and a desktop navigation wheel that turns as the reader moves between sections.

## Scope

- Build on `Actual_Site/index.html` with vanilla HTML, CSS, and JavaScript. Keep the frontend assets in `Actual_Site/` and use relative paths so the page can be opened directly in a browser.
- Use the sketch as the layout reference. Stack rounded content panels in the main column, with the navigation wheel beside them on desktop. Use simple styling and clearly labeled placeholders until the user supplies content.
- Keep this feature frontend-only. Express routing, deployment, and the site's other pages are outside this feature's scope.

## Phase 1 — Page structure and responsive layout

Add a simple header above the following six sections, in this order. Give each section a stable anchor for navigation.

| Section | First-version content |
| --- | --- |
| Intro | A name placeholder, an optional photo area represented by a placeholder, and room for a two-sentence summary. |
| About Me | Space for a short biography. |
| Projects | Placeholder project cards with room for a title and short description. |
| Strengths | A vertical list of placeholder strengths, laid out as rows. |
| Awards, Diplomas, and Education | Placeholder cards for credentials and education, arranged side by side where space allows. |
| Contact | Space for contact details and profile links, with clearly labeled placeholders until real details are supplied. |

Use a main content column with room for navigation on desktop. On narrower screens, stack the content in one column and show compact section links in normal page flow. Start with ordinary anchor links so section navigation works before the wheel is added and when JavaScript is unavailable.

**Acceptance check.** Open the page directly in a browser. Confirm the header and all six sections appear in order, section links work, and the layout fits desktop and narrow screens without horizontal page scrolling.

## Phase 2 — Scrollable Projects panel

Arrange cards in two columns on desktop and one column on narrow screens. Keep the Projects heading above the card area and cap the height of the card area so readers can scroll to additional cards within the panel. Use enough placeholder cards to demonstrate the overflow in the first version. Make the scroll area keyboard-focusable with an accessible name, and keep the page itself independently scrollable.

**Acceptance check.** Reach every card using a mouse or trackpad, touch, and the keyboard. Confirm the heading stays in place while the card area scrolls and that readers can continue down the main page. Verify both column layouts.

## Phase 3 — Rotating navigation wheel

- On desktop, place a sticky wheel to the right of the content. It stays visible from Intro through Contact as the reader scrolls. Give it six labeled, keyboard-operable segments in page order, each linked to its section. On narrower screens, keep the compact section links from Phase 1.
- Give the wheel a fixed active position facing the content. Start with Intro active on a fresh visit at the top of the page. Rotate the wheel to bring the active segment to that position and highlight the segment. Keep segment labels readable at every resting position and provide a visible keyboard focus indicator.
- When someone activates a segment, animate the wheel to that segment and smoothly scroll the main page to the matching section. Keep the selected segment active throughout the scroll so intermediate sections do not take over. A new selection supersedes the previous one. If the reader interrupts the scroll, resume tracking their position.
- During manual page scrolling, animate the wheel when the active section changes. Determine the active section by the latest section whose top has passed a reading line one-third of the way down the viewport. Treat Intro as active at the top and Contact as active at the bottom. Apply the same rule when scrolling back up. Scrolling within the Projects card area alone leaves the wheel on its current section.
- Keep section navigation usable when JavaScript is disabled. Respect the reader's reduced-motion preference by updating the active segment and moving to the target without animation.

**Acceptance check.** Activate all six segments by pointer and keyboard and verify that each reaches and highlights the matching section. Scroll manually in both directions and check that the wheel stays visible and turns as sections become active. Check the page top and bottom, rapid successive clicks, interrupted smooth scrolling, scrolling within Projects, mobile section links, reduced motion, and navigation with JavaScript disabled.

## Verification and approval

After each phase, run three verifier agents covering correctness, code cleanliness and documentation, and adherence to this spec. Each verifier reads any relevant skill documentation. Review their findings and stop for the user's phase review unless the user explicitly requests a one-shot implementation.

After Phase 3, run all three verifier reviews again against the complete feature. Summarize what was delivered, what verification found, any approved extra work, and any remaining quirks or limitations.
