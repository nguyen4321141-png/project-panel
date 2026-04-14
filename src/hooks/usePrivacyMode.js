import { useEffect, useRef } from 'react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

/**
 * usePrivacyMode
 *
 * Registers global keyboard listeners for the "panic" triggers:
 *   • Alt + X  → togglePrivacy()
 *   • Esc × 2  → activatePrivacy()  (instant lock, no toggle)
 *
 * Capture-phase listener ensures it fires even when focus is inside
 * an iframe (e.g., the embedded player).
 */
export function usePrivacyMode() {
  const { togglePrivacy, activatePrivacy } = usePrivacy();

  // Keep stable refs so the listener never needs to be re-registered
  const toggleRef  = useRef(togglePrivacy);
  const activateRef = useRef(activatePrivacy);
  useEffect(() => { toggleRef.current  = togglePrivacy;  }, [togglePrivacy]);
  useEffect(() => { activateRef.current = activatePrivacy; }, [activatePrivacy]);

  useEffect(() => {
    let escCount = 0;
    let escTimer = null;

    const handleKeyDown = (e) => {
      // ── Alt + X ──────────────────────────────────────────────
      if (e.altKey && (e.key === 'x' || e.key === 'X')) {
        e.preventDefault();
        e.stopPropagation();
        toggleRef.current();
        return;
      }

      // ── Double Escape (≤ 350 ms window) ──────────────────────
      if (e.key === 'Escape') {
        escCount += 1;
        clearTimeout(escTimer);

        if (escCount >= 2) {
          escCount = 0;
          activateRef.current();  // hard lock — never toggles back
        } else {
          escTimer = setTimeout(() => { escCount = 0; }, 350);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      clearTimeout(escTimer);
    };
  }, []); // intentionally empty — uses stable refs above
}
