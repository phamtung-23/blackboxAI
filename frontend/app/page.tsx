import { SiteHeader } from "@/components/site/site-header";
import { SiteHero } from "@/components/site/site-hero";
import { SiteTicker } from "@/components/site/site-ticker";
import { SiteStats } from "@/components/site/site-stats";
import { SiteTeams } from "@/components/site/site-teams";
import { SiteStandings } from "@/components/site/site-standings";
import { SiteSpotlight } from "@/components/site/site-spotlight";
import { SiteLocker } from "@/components/site/site-locker";
import { SiteFixtures } from "@/components/site/site-fixtures";
import { SiteNewsletter } from "@/components/site/site-newsletter";
import { SiteDock } from "@/components/site/site-dock";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main>
        <SiteHero />
        <SiteTicker />
        <SiteStats />
        <SiteTeams />
        <SiteFixtures />
        <SiteSpotlight />
        <SiteStandings />
        <SiteLocker />
        <SiteNewsletter />
      </main>
      <SiteFooter />
      <SiteDock />
    </div>
  );
}
