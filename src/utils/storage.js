const STORAGE_KEY = "internship-tracker.applications"

export function loadApplications() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw) return []

        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function saveApplications(apps) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
}

export function seedApplicationsIfEmpty(seedApps) {
    const existing = loadApplications();
    if(existing.length > 0) return

    saveApplications(seedApps)
}