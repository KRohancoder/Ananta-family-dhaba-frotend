import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AdminLayout } from '@/layouts/AdminLayout';
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

const DashboardPage = lazy(() =>
  import('@/modules/admin/routes').then((m) => ({ default: m.DashboardPage })),
);
const AdminMenuPage = lazy(() =>
  import('@/modules/admin/routes').then((m) => ({ default: m.AdminMenuPage })),
);
const AdminOffersPage = lazy(() =>
  import('@/modules/admin/routes').then((m) => ({ default: m.AdminOffersPage })),
);
const AdminOrdersPage = lazy(() =>
  import('@/modules/admin/routes').then((m) => ({ default: m.AdminOrdersPage })),
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

        {/* TODO: wrap this block in a RequireAuth guard once real authentication
            (e.g. Supabase Auth) is wired up — /admin is currently open to
            anyone with the link. */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="menu" element={<AdminMenuPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
