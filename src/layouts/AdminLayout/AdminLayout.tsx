import { Link, NavLink, Outlet } from 'react-router-dom';
import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';
import { ClipboardListIcon, DashboardIcon, TagIcon, UtensilsIcon } from '@/shared/assets/icons';
import { cn } from '@/lib/cn';
import styles from './AdminLayout.module.css';

const adminNavLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/admin/menu', label: 'Menu', icon: UtensilsIcon },
  { to: '/admin/offers', label: 'Offers', icon: TagIcon },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardListIcon },
];

// TODO: gate this layout behind real authentication (e.g. Supabase Auth) once
// a backend is configured — /admin is currently open to anyone with the link.
export function AdminLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Container className={styles.topbarInner}>
          <div className={styles.brand}>
            <span className={styles.brandTitle}>Owner Dashboard</span>
            <Badge tone="accent">Demo Data</Badge>
          </div>

          <nav className={styles.nav} aria-label="Admin">
            {adminNavLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn(styles.navLink, isActive && styles.navLinkActive)}
              >
                <link.icon width={18} height={18} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className={styles.viewSite}>
            View Site
          </Link>
        </Container>
      </header>

      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
