import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(234,88,12,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#fff7ed_100%)] text-zinc-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(234,88,12,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.18),_transparent_28%),linear-gradient(135deg,_#09090b_0%,_#111111_100%)] dark:text-white flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-6xl rounded-[2rem] border border-zinc-200/80 bg-white/80 shadow-[0_25px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl overflow-hidden dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] min-h-[720px]">
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-600 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-500 dark:bg-orange-400" />
              404 • Page lost in space
            </div>

            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
              Oops!
              <span className="mt-3 block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-300 dark:via-orange-500 dark:to-amber-200">
                This page vanished.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-zinc-600 leading-relaxed dark:text-zinc-300">
              It looks like this link took a detour, got distracted by a coffee
              break, or decided to become a mysterious myth. Don’t worry — your
              next best move is right here.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400"
              >
                Take me home
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
              >
                Let’s build something
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <Link
                href="/portfolio"
                className="rounded-full border border-zinc-300 px-3 py-2 transition hover:border-orange-400/40 hover:text-orange-600 dark:border-white/10 dark:hover:border-orange-400/40 dark:hover:text-orange-300"
              >
                Portfolio
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-zinc-300 px-3 py-2 transition hover:border-orange-400/40 hover:text-orange-600 dark:border-white/10 dark:hover:border-orange-400/40 dark:hover:text-orange-300"
              >
                Services
              </Link>
              <Link
                href="/reviews"
                className="rounded-full border border-zinc-300 px-3 py-2 transition hover:border-orange-400/40 hover:text-orange-600 dark:border-white/10 dark:hover:border-orange-400/40 dark:hover:text-orange-300"
              >
                Reviews
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-amber-50 p-8 sm:p-12 lg:p-16 dark:from-orange-500/20 dark:via-transparent dark:to-amber-400/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.36),_transparent_55%)] dark:bg-[radial-gradient(circle,_rgba(255,255,255,0.12),_transparent_55%)]" />
            <div className="relative w-full max-w-[440px] rounded-[2rem] border border-zinc-200 bg-white/80 p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-950/70">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm font-mono text-zinc-700 dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-200">
                <div className="text-orange-500 dark:text-orange-400">
                  $ whoops --page-not-found
                </div>
                <div className="mt-3 text-zinc-500 dark:text-zinc-400">
                  Error: The requested page is currently in another universe.
                </div>
                <div className="mt-3 text-zinc-500 dark:text-zinc-400">
                  Suggestion: Try the home page, or ask me to build the missing
                  page.
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm text-zinc-700 dark:border-orange-400/20 dark:bg-orange-500/10 dark:text-zinc-300">
                <div className="font-semibold text-orange-600 dark:text-orange-200">
                  Fun fact:
                </div>
                <p className="mt-2">
                  Even the best websites lose a page now and then. I call it
                  “creative detour mode.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
