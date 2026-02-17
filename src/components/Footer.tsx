const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';

export default function Footer() {
  return (
    <footer className="py-10" style={{ backgroundColor: NAVY }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <span className="text-xl font-bold text-white tracking-tight">KAEL <span style={{ color: GOLD }}>RESEARCH</span></span>
          <p className="text-white/50 text-sm mt-1">&copy; 2026 Kael Research. All rights reserved.</p>
        </div>
        <a href="mailto:kaeltiwari@kaelresearch.com" className="text-white/60 text-sm hover:text-white/80 transition-colors">kaeltiwari@kaelresearch.com</a>
      </div>
    </footer>
  );
}
