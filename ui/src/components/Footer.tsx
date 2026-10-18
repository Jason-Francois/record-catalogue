const currentYear = new Date().getFullYear();
const copyright = `Copyright \u00A9 ${currentYear} made by Jason François`;

export default function Footer() {
  return (
    <footer className="text-sm text-muted border-t border-line bg-surface py-4 px-4">
      <p>{copyright}</p>
    </footer>
  );
}
