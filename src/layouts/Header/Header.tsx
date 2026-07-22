import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { CloseIcon, MenuIcon, PhoneIcon } from '@/shared/assets/icons';
import logo from '@/shared/assets/images/logo.jpg';
import { navLinks, siteInfo } from '@/shared/constants/site';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll';
import { useScrolled } from '@/shared/hooks/useScrolled';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/lib/cn';
import styles from './Header.module.css';

export function Header() {
  const scrolled = useScrolled();
  const isMobileNavOpen = useUiStore((state) => state.isMobileNavOpen);
  const openMobileNav = useUiStore((state) => state.openMobileNav);
  const closeMobileNav = useUiStore((state) => state.closeMobileNav);

  useLockBodyScroll(isMobileNavOpen);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      <Container>
        <div className={styles.bar}>
          <NavLink to="/" className={styles.logoLink} aria-label={`${siteInfo.name} home`}>
            <img className={styles.logoImg} src={logo} alt="" />
            <span className={styles.logoText}>
              <span className={styles.logoTitle}>{siteInfo.name}</span>
              <span className={cn(styles.logoSubtitle, 'lang-mr')}>{siteInfo.nameDevanagari}</span>
            </span>
          </NavLink>

          <nav className={styles.nav} aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <a className={styles.callLink} href={`tel:${siteInfo.phone.replace(/\s+/g, '')}`}>
              <PhoneIcon width={18} height={18} />
              {siteInfo.phone}
            </a>
            <Button as={Link} to="/reservation" size="sm">
              Reserve a Table
            </Button>
            <button
              type="button"
              className={styles.menuToggle}
              aria-label="Open menu"
              aria-expanded={isMobileNavOpen}
              onClick={openMobileNav}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </Container>

      <div
        className={cn(styles.mobilePanel, isMobileNavOpen && styles.mobilePanelOpen)}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className={styles.mobilePanelHead}>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label="Close menu"
            onClick={closeMobileNav}
          >
            <CloseIcon />
          </button>
        </div>
        <nav className={styles.mobileNav} aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={styles.mobileNavLink}
              onClick={closeMobileNav}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <a
            className={styles.callLink}
            style={{ display: 'inline-flex' }}
            href={`tel:${siteInfo.phone.replace(/\s+/g, '')}`}
          >
            <PhoneIcon width={18} height={18} />
            {siteInfo.phone}
          </a>
          <Button as={Link} to="/reservation" onClick={closeMobileNav} fullWidth>
            Reserve a Table
          </Button>
        </div>
      </div>
    </header>
  );
}
