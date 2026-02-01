import PageShell from "@/components/marketing/PageShell";
import TemplateGallery from "@/components/templates/TemplateGallery";

export default function TemplatesPage() {
  return (
    <PageShell
      title="Template library"
      subtitle="Search, filter by category, and preview backgrounds. Apply Brand Kit inside the editor to match your style."
      cta={{ label: "Start a project", href: "/tool/new" }}
    >
      <TemplateGallery />
    </PageShell>
  );
}
