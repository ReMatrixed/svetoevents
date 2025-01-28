import { EventCalendar } from "@/components/homepage/EventCalendar";
import { EventDrawer } from "@/components/homepage/EventDrawer";
import { PageFooter } from "@/components/homepage/PageFooter";
import { PageHeader } from "@/components/homepage/PageHeader";
import { UpcomingCarousel } from "@/components/homepage/UpcomingCarousel";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <PageHeader />
      <div className="flex flex-col w-[300px] gap-5 mt-5">
        <UpcomingCarousel />
        <EventCalendar />
      </div>
      <PageFooter />
      <EventDrawer />
    </div>
  );
}
