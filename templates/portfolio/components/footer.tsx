import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Your Name</p>
        <div className="flex gap-5">
          <a className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-white" href="#">
            GitHub
            <ArrowUpRightIcon aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          </a>
          <a className="inline-flex items-center gap-1 transition-colors duration-150 hover:text-white" href="#">
            LinkedIn
            <ArrowUpRightIcon aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
