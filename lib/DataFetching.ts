export const fetchProfileData = async () => {
    const res = await fetch("/api/profile");

    if (!res.ok) {
        throw new Error("Failed to fetch profile data");
    }

    const data = await res.json();
    // API returns null for new users (not an error)
    return data;
};

export const fetchRecruiterProfileData = async () => {
    const res = await fetch("/api/profile/recruiter");

    if (!res.ok) {
        throw new Error("Failed to fetch recruiter profile data");
    }

    const data = await res.json();
    // API returns null for new recruiters (not an error)
    return data;
};