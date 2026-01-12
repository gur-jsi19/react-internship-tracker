import { useEffect, useState } from "react";
import { loadApplications, saveApplications } from "../utils/storage";

export default function useApplications() {

    const[applications, setApplications] = useState(() => loadApplications())

    useEffect(() => {
        saveApplications(applications)
    }, [applications])

    useEffect(() => {
        function onStorage(e) {
            if(e.key === "internship-tracker.applications") {
                setApplications(loadApplications());
            }
        }

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage)
    }, []);

    function addApplication(app) {
        setApplications((prev) => [app, ...prev])
    }

    function deleteApplication(id) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
    }

    function getApplicationById(id) {
        return applications.find((a) => a.id === id) || null;
    }

    function updateApplication(id, updates) {
        setApplications((prev) =>
            prev.map((a) => (a.id === id ? {...a, ...updates} : a))
        );
    }

    function refreshApplications() {
        setApplications(loadApplications());
    }

    return {applications, addApplication, deleteApplication, getApplicationById, updateApplication, refreshApplications
    }
}