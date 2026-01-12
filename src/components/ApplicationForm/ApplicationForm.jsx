import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApplications from "../../hooks/useApplications";


function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}


function makeId() {
  return `app_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ApplicationForm({ mode }) {
  const isEdit = mode === "edit";

  const navigate = useNavigate();
  const { id } = useParams(); 
  const { addApplication, updateApplication, getApplicationById } =
    useApplications();

 
  const existing = isEdit ? getApplicationById(id) : null;

 
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: todayISO(),
    notes: "",
  });

  
  useEffect(() => {
    if (!isEdit) return; 
    if (!existing) return; 

    setForm({
      company: existing.company ?? "",
      role: existing.role ?? "",
      status: existing.status ?? "Applied",
      appliedDate: existing.appliedDate ?? todayISO(),
      notes: existing.notes ?? "",
    });
  }, [isEdit, existing]);

  // ----- HANDLE INPUT CHANGES -----
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ----- HANDLE FORM SUBMIT -----
  function handleSubmit(e) {
    e.preventDefault();

    
    if (!form.company.trim() || !form.role.trim()) {
      alert("Company and Role are required");
      return;
    }

    if (isEdit) {
 
      updateApplication(id, {
        company: form.company.trim(),
        role: form.role.trim(),
        status: form.status,
        appliedDate: form.appliedDate,
        notes: form.notes.trim(),
      });

      navigate(`/applications/${id}`);
      return;
    }

    // Create new record
    const newApplication = {
      id: makeId(),
      company: form.company.trim(),
      role: form.role.trim(),
      status: form.status,
      appliedDate: form.appliedDate,
      notes: form.notes.trim(),
    };

    addApplication(newApplication);
    navigate("/");
  }

  // If user visits edit page with a bad id
  if (isEdit && !existing) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Not found</h1>
        <p className="text-gray-600 dark:text-zinc-400">
          No application exists with ID: <span className="font-medium">{id}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div>
        <h1 className="text-2xl font-bold">
          {isEdit ? "Edit Application" : "New Application"}
        </h1>
        <p className="text-gray-600 dark:text-zinc-400">
          {isEdit
            ? "Update the details and save changes."
            : "Enter internship details below."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* COMPANY */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Company *</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            placeholder="Shopify"
          />
        </div>

        {/* ROLE */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Role *</label>
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            placeholder="Software Engineering Intern"
          />
        </div>

        {/* STATUS */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
          >
            <option>Wishlist</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        {/* APPLIED DATE */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
          />
        </div>

        {/* NOTES */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            placeholder="Interview prep, referral, links, etc."
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
        >
          {isEdit ? "Save Changes" : "Save Application"}
        </button>
      </form>
    </div>
  );
}
