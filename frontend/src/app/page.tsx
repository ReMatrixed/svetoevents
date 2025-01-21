import { PageFooter } from "@/components/homepage/PageFooter";
import { PageHeader } from "@/components/homepage/PageHeader";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <PageHeader />
      <PageFooter />
    </div>
  );
}
