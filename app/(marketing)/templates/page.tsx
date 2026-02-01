import TemplateGallery from "@/components/templates/TemplateGallery";

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Template library</h1>
        <p className="text-neutral-600">Search, filter by category, then use Brand Kit inside the editor to match your style.</p>
      </div>
      <div className="mt-6">
        <TemplateGallery />
      </div>
    </div>
  );
}
