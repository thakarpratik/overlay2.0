export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600">
        © {new Date().getFullYear()} OverlayTool. All rights reserved.
      </div>
    </footer>
  );
}
