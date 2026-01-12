export default function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="border-t bg-white dark:bg-zinc-950 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {year} Internship Tracker</p>
          <p className="text-gray-600 dark:text-zinc-400">
            Built with React, React Router, and Tailwind
          </p>
        </div>
      </footer>
    );
  }
  