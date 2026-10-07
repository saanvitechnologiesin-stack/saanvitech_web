'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface DrawerMenuProps {
  children: React.ReactNode;
  cls?: string;
}

const DrawerMenu = ({ children, cls = '' }: DrawerMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const windowWidth = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const pathname = usePathname(); // will change when navigating

  const toggle = useCallback((event: Event) => {
    const target = event.target as HTMLElement;
    if (!menuRef.current) return;

    windowWidth.current = window.innerWidth;
    if (windowWidth.current > 991) return;

    const button = target.closest('.menu-accrodion') as HTMLElement | null;
    if (!button) return;

    const sibling = button.nextElementSibling as HTMLElement | null;
    if (!sibling) return;

    event.preventDefault();
    button.classList.toggle('active');

    const hasGrandmenu = sibling.querySelector<HTMLElement>('.header-grandmenu');
    if (button.classList.contains('active')) {
      sibling.style.maxHeight = hasGrandmenu
        ? `${sibling.scrollHeight + hasGrandmenu.scrollHeight}px`
        : `${sibling.scrollHeight}px`;
    } else {
      sibling.style.maxHeight = '';
    }
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const buttons = menu.querySelectorAll<HTMLElement>('.menu-accrodion');
    buttons.forEach((btn) => btn.addEventListener('click', toggle));

    const handleResize = () => {
      windowWidth.current = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      buttons.forEach((btn) => btn.removeEventListener('click', toggle));
      window.removeEventListener('resize', handleResize);
    };
  }, [toggle]);

  // Close drawer whenever the route changes (pathname update)
  useEffect(() => {
    const overlay = document.querySelector<HTMLElement>('#drawer-overlay');
    const drawerMenu = document.querySelector<HTMLElement>('.drawer-menu');

    if (drawerMenu?.classList.contains('show')) {
      drawerMenu.classList.remove('show');
      document.body.classList.remove('scroll-lock');
    }

    if (overlay?.classList.contains('show')) {
      overlay.classList.remove('show');
      overlay.removeAttribute('data-drawer');
    }
  }, [pathname]); // Runs automatically on route change

  return (
    <div ref={menuRef} className={`${cls}`}>
      {children}
    </div>
  );
};

export default DrawerMenu;
