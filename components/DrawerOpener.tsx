'use client';

import { useCallback } from 'react';

interface DrawerOpenerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS selector of the drawer element to toggle, e.g. ".drawer-menu" */
  'data-drawer': string;
  /** Optional children (icons, buttons, etc.) */
  children: React.ReactNode;
  /** Optional additional className */
  cls?: string;
}

/**
 * DrawerOpener replaces the custom element <drawer-opener>
 * and handles modal, drawer, and overlay toggle logic.
 */
const DrawerOpener = ({ children, cls = '', 'data-drawer': drawerSelector, ...rest }: DrawerOpenerProps) => {
  const toggle = useCallback(() => {
    if (!drawerSelector) return;

    const drawerEl = document.querySelector<HTMLElement>(drawerSelector);
    const overlayEl = document.querySelector<HTMLElement>('#drawer-overlay');

    if (!drawerEl) return;

    // Toggle the drawer
    drawerEl.classList.toggle('show');
    document.body.classList.toggle('scroll-lock');

    // Skip overlay logic for search modal
    if (drawerSelector === '.modal-search') return;

    // Handle overlay visibility
    if (!overlayEl) return;
    const isVisible = overlayEl.classList.contains('show');

    if (isVisible) {
      overlayEl.classList.remove('show');
      overlayEl.removeAttribute('data-drawer');
    } else {
      overlayEl.classList.add('show');
      overlayEl.setAttribute('data-drawer', drawerSelector);
    }
  }, [drawerSelector]);

  return (
    <div
        {...rest}
        className={`drawer-opener ${cls}`}
        data-drawer={drawerSelector}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggle()}
    >
        {children}
    </div>
  );
};

export default DrawerOpener;
