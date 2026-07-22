import { Outlet } from 'react-router-dom';
import { Footer } from '@/layouts/Footer';
import { Header } from '@/layouts/Header';
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import styles from './MainLayout.module.css';

export function MainLayout() {
  useScrollToTop();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
