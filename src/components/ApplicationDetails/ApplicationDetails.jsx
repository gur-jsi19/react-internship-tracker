import { Link, useParams } from "react-router-dom";
import useApplications from "../../hooks/useApplications";

export default function ApplicationDetails() {
  const { id } = useParams();
  const { getApplicationById, deleteApplication } = useApplications();

  const app = getApplicationById(id);

  if(!app) {
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold">Not found</h1>
            <p className="text-gray-600 dark:text-zinc-400">
                No application exists with ID: <span className="font-medium">{id}</span>
            </p>
            <Link className="underline" to="/">
                Back to Dashboard
            </Link>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{app.company}</h1>
          <p className="text-gray-600 dark:text-zinc-400">{app.role}</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/applications/${app.id}/edit`}
            className="px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-zinc-900"
          >
            Edit
          </Link>

          <button
            onClick={() => {
              deleteApplication(app.id);
            }}
            className="px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-zinc-950 dark:border-zinc-800">
        <div className="p-4 space-y-2">
          <div className="flex justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-zinc-400">Status</p>
            <p className="font-medium">{app.status}</p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-zinc-400">Applied date</p>
            <p className="font-medium">{app.appliedDate}</p>
          </div>

          <div className="pt-2">
            <p className="text-sm text-gray-600 dark:text-zinc-400">Notes</p>
            <p className="mt-1">{app.notes || "—"}</p>
          </div>
        </div>
      </div>

      <Link className="underline" to="/">
        Back to Dashboard
      </Link>
    </div>
  );
}
