import { updateProfile } from "@/app/actions/profile";

export async function UpdateProfile({ profileFields, setIsSaving, setError, queryClient, setIsEditModalOpen }: { profileFields: any, setIsSaving: (value: boolean) => void, setError: (value: string) => void, queryClient: any, setIsEditModalOpen: (value: boolean) => void }) {

    setIsSaving(true);
    setError("");
    try {
        const formData = new FormData();
        Object.entries(profileFields).forEach(([k, v]) => {
            if (v !== null && v !== undefined) formData.append(k, String(v));
        });
        await updateProfile(formData);
        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
        setIsEditModalOpen(false);
    } catch (error: any) {
        try {
            // remove "Error: " part
            const clean = error.message.replace("Error: ", "");

            const issues = JSON.parse(clean);

            if (Array.isArray(issues) && issues.length > 0) {
                setError(issues[0].message);
            } else {
                setError("Invalid input");
            }

        } catch {
            setError("Something went wrong");
        }
    } finally {
        setIsSaving(false);
    }

}