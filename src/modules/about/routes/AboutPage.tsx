import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { PageMeta } from '@/components/PageMeta';
import { SectionHeading } from '@/components/SectionHeading';
import { FlameIcon, LeafIcon, UsersIcon } from '@/shared/assets/icons';
import logo from '@/shared/assets/images/logo.jpg';
import { siteInfo } from '@/shared/constants/site';
import styles from './AboutPage.module.css';

const values = [
  {
    icon: FlameIcon,
    title: 'Cooked Fresh, Always',
    text: 'Nothing sits under a heat lamp — every order goes on the tawa or into the tandoor when it comes in.',
  },
  {
    icon: UsersIcon,
    title: 'A Family Table',
    text: 'Generous portions and a relaxed dining room built for groups, celebrations, and Sunday lunches.',
  },
  {
    icon: LeafIcon,
    title: 'Veg & Non-Veg, Equally',
    text: 'From Dal Makhani to Chicken Khapsa, both menus get the same care in the kitchen.',
  },
] as const;

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us"
        description={`The story behind ${siteInfo.name} — a family-run dhaba serving authentic Veg, Chicken, Tandoori and Chinese food.`}
      />

      <div className={styles.hero}>
        <Container>
          <SectionHeading
            eyebrow="Our Story"
            title="About Anant Family Dhaba"
            titleDevanagari="अनंत फॅमिली ढाबा बद्दल"
            align="center"
          />
        </Container>
      </div>

      <section className={styles.section}>
        <Container>
          <div className={styles.storyGrid}>
            <div className={styles.imageWrap}>
              <img className={styles.image} src={logo} alt={`${siteInfo.name} logo`} />
            </div>
            <div className={styles.storyText}>
              <p>
                {siteInfo.name} started with a simple idea borrowed from the highway dhabas of
                Maharashtra: cook everything fresh, season it boldly, and serve it in portions
                generous enough for the whole family to share.
              </p>
              <p>
                That philosophy still runs the kitchen today. Our tawa never stops moving through
                service, our tandoor stays lit for kababs and rotis alike, and our Chinese counter
                turns out everything from Schezwan Rice to Chicken Manchurian for guests who want
                something different on the table.
              </p>
              <p>
                Whether you&apos;re stopping in for a quick plate of Dal Tadka and Roti or booking
                the whole dining room for a birthday Khapsa, we cook it the same way: fresh, hot,
                and made to be shared.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.valuesSection}>
        <Container>
          <SectionHeading eyebrow="What We Stand For" title="Our Promise to You" align="center" />
          <div className={styles.valuesGrid}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card hoverable key={value.title}>
                  <Icon width={28} height={28} />
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueText}>{value.text}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <SectionHeading eyebrow="House Rules" title="A Few Things to Know" align="center" />
          <div className={styles.noticesList}>
            {siteInfo.notices.map((notice) => (
              <p className={styles.noticeItem} key={notice}>
                {notice}
              </p>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
