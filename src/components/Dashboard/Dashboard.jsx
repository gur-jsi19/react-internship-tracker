import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useApplications from "../../hooks/useApplications";

const STATUS_OPTIONS = [
  "All",
  "Wishlist",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function statusBadgeClass(status) {
  
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border";

  
  switch (status) {
    case "Wishlist":
      return `${base} bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800`;
    case "Applied":
      return `${base} bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-200 dark:border-blue-900/40`;
    case "Interview":
      return `${base} bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-200 dark:border-yellow-900/40`;
    case "Offer":
      return `${base} bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-200 dark:border-green-900/40`;
    case "Rejected":
      return `${base} bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-200 dark:border-red-900/40`;
    default:
      return `${base} bg-gray-50 text-gray-700 border-gray-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800`;
  }
}


export default function Dashboard() {
  const { applications, deleteApplication } = useApplications();

  
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [query, setQuery] = useState("");

  
  const visibleApplications = useMemo(() => {
    
    let list = [...applications];

  
    if (statusFilter !== "All") {
      list = list.filter((app) => app.status === statusFilter);
    }

   
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((app) => {
        const company = (app.company || "").toLowerCase();
        const role = (app.role || "").toLowerCase();
        return company.includes(q) || role.includes(q);
      });
    }

   
    list.sort((a, b) => {

      const da = new Date(a.appliedDate || "1970-01-01").getTime();
      const db = new Date(b.appliedDate || "1970-01-01").getTime();

      if (sortOrder === "newest") return db - da;
      return da - db;
    });

    return list;
  }, [applications, statusFilter, sortOrder, query]);

  return (
    <div className="space-y-4">
      {/* Top row: title + add button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-zinc-400">
            Track your internship applications in one place.
          </p>
        </div>

        <Link
          to="/applications/new"
          className="px-3 py-2 rounded-lg text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
        >
          + Add Application
        </Link>
      </div>

      {/* Controls: search + filter + sort */}
      <div className="rounded-xl border bg-white dark:bg-zinc-950 dark:border-zinc-800 p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company or role..."
              className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-zinc-400">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 dark:text-zinc-400">
              Sort
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            >
              <option value="newest">Applied date: Newest</option>
              <option value="oldest">Applied date: Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-zinc-400">
        <p>
          Showing <span className="font-medium">{visibleApplications.length}</span> of{" "}
          <span className="font-medium">{applications.length}</span>
        </p>

        <button
          type="button"
          onClick={() => {
            setQuery("");
            setStatusFilter("All");
            setSortOrder("newest");
          }}
          className="underline hover:opacity-80"
        >
          Reset
        </button>
      </div>


      {/* Results */}
      <div className="rounded-xl border bg-white dark:bg-zinc-950 dark:border-zinc-800 overflow-hidden">
        {visibleApplications.length === 0 ? (
          <div className="p-4 text-gray-600 dark:text-zinc-400">
            No applications match your filters.
          </div>
        ) : (
          <ul className="divide-y dark:divide-zinc-800">
            {visibleApplications.map((app) => (
              <li
                key={app.id}
                className="p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1">

                  <p className="font-semibold truncate">{app.company}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                    <span className="truncate">{app.role}</span>

                    <span className="text-gray-300 dark:text-zinc-700">•</span>

                    <span className={statusBadgeClass(app.status)}>{app.status}</span>

                    <span className="text-gray-300 dark:text-zinc-700">•</span>

                    <span className="tabular-nums">{app.appliedDate}</span>
                  </div>

                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/applications/${app.id}`}
                    className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-zinc-900"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
