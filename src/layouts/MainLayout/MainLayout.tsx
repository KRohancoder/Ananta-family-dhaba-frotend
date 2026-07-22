import { Outlet } from 'react-router-dom';
import { Footer } from '@/layouts/Footer';
import { Header } from '@/layouts/Header';
import styles from './MainLayout.module.css';

export function MainLayout() {
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
