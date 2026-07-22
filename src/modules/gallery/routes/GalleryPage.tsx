import { Container } from '@/components/Container';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { ClockIcon, FlameIcon, LeafIcon, UsersIcon } from '@/shared/assets/icons';
import logo from '@/shared/assets/images/logo.jpg';
import { siteInfo } from '@/shared/constants/site';
import { cn } from '@/lib/cn';
import styles from './GalleryPage.module.css';

const tiles = [
  { icon: FlameIcon, label: 'Tandoor & Kababs' },
  { icon: UsersIcon, label: 'Curries & Handi' },
  { icon: LeafIcon, label: 'Veg Specialties' },
  { icon: ClockIcon, label: 'Chinese Corner' },
  { icon: FlameIcon, label: 'Khapsa Rice' },
  { icon: LeafIcon, label: 'Roti & Naan' },
  { icon: UsersIcon, label: 'Soups & Starters' },
  { icon: ClockIcon, label: 'Rice & Noodles' },
] as const;

const bgClasses = ['bg0', 'bg1', 'bg2', 'bg3'] as const;

export function GalleryPage() {
  return (
    <>
      <PageMeta
        title="Gallery"
        description={`A look at what's cooking at ${siteInfo.name} — Tandoor, curries, Chinese starters and more.`}
      />

      <div className={styles.hero}>
        <Container>
          <SectionHeading eyebrow="A Taste of the Kitchen" title="Gallery" align="center" />
        </Container>
      </div>

      <section className={styles.section}>
        <Container>
          <div className={styles.grid}>
            <div className={cn(styles.tile, styles.logoTile)}>
              <img className={styles.logoImage} src={logo} alt="" />
              <span className={styles.tileLabel}>{siteInfo.name}</span>
            </div>
            {tiles.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <div
                  className={cn(styles.tile, styles[bgClasses[index % bgClasses.length]])}
                  key={tile.label}
                >
                  <Icon className={styles.tileIcon} width={28} height={28} />
                  <span className={styles.tileLabel}>{tile.label}</span>
                </div>
              );
            })}
          </div>
          <p className={styles.note}>
            Full photo gallery coming soon — check back after our next photoshoot!
          </p>
        </Container>
      </section>
    </>
  );
}
