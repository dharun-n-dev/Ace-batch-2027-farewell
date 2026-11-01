import { useEffect, useRef } from 'react';
import { CloseIcon } from './Icons.jsx';

// Accessible dialog: focus moves in, Tab is trapped, Escape closes, focus returns, page scroll is locked.
export default function Modal({ children, onClose, label, className = '', dismissOnBackdrop = true }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (ref.current.querySelector('[data-autofocus]') || ref.current).focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current?.(); return; }
      if (e.key !== 'Tab') return;
      const f = [...ref.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),textarea,select,video[controls],[tabindex]:not([tabindex="-1"])')];
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, []);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (dismissOnBackdrop && e.target === e.currentTarget) onClose?.(); }}>
      <div ref={ref} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={`modal ${className}`}>
        {onClose && (
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon width={18} height={18} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
