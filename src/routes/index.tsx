import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() => import('@/modules/home/routes').then((m) => ({ default: m.HomePage })));
const MenuPage = lazy(() => import('@/modules/menu/routes').then((m) => ({ default: m.MenuPage })));
const AboutPage = lazy(() =>
  import('@/modules/about/routes').then((m) => ({ default: m.AboutPage })),
);
const GalleryPage = lazy(() =>
  import('@/modules/gallery/routes').then((m) => ({ default: m.GalleryPage })),
);
const ContactPage = lazy(() =>
  import('@/modules/contact/routes').then((m) => ({ default: m.ContactPage })),
);
const ReservationPage = lazy(() =>
  import('@/modules/reservation/routes').then((m) => ({ default: m.ReservationPage })),
);
const NotFoundPage = lazy(() =>
  import('@/modules/notFound/routes').then((m) => ({ default: m.NotFoundPage })),
);

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner label="Loading…" fullScreen />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
