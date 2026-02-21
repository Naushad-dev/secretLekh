import Link from 'next/link';
import { UI_CONFIG } from '@/lib/config/ui';

export default function HomePage() {
  const { home, app } = UI_CONFIG;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient blob */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-violet-900/20 blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-24 sm:py-36 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-800/60 bg-violet-950/40 px-4 py-1.5 text-xs font-semibold text-violet-300 mb-8 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            {app.tagline}
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-none mb-6">
            {home.hero.title}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {home.hero.brand}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {home.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-base font-semibold text-white hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-violet-900/40 hover:shadow-violet-700/60"
            >
              {home.hero.cta} →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-gray-900 px-8 py-3.5 text-base font-semibold text-gray-200 hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
            >
              {home.hero.signin}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {home.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-gray-900/60 border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200 group"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
                {f.icon}
              </div>
              <h3 className="font-bold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-600">
        {home.footer.text.replace('{year}', new Date().getFullYear().toString())}
      </footer>
    </div>
  );
}
