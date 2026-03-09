import { toast } from "sonner";

export async function UpdateProfile({ profileFields, setIsSaving, setError, queryClient, setIsEditModalOpen }: { profileFields: any, setIsSaving: (value: boolean) => void, setError: (value: string) => void, queryClient: any, setIsEditModalOpen: (value: boolean) => void }) {

    setIsSaving(true);
    setError("");
    try {
        const formData = new FormData();
        Object.entries(profileFields).forEach(([k, v]) => {
            if (v !== null && v !== undefined) formData.append(k, String(v));
        });

        const res = await fetch("/api/profile", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
            toast.error("something went wrong while updating the profile!")

            throw new Error(data?.message || "Something went wrong while updating the profile");
        }





        await queryClient.invalidateQueries({ queryKey: ["profileData"] });
        toast.success("Profile updated successfully !")
        setIsEditModalOpen(false);
    } catch (error: any) {
        try {
            const clean = error.message.replace("Error: ", "");
            const issues = JSON.parse(clean);

            if (Array.isArray(issues) && issues.length > 0) {
                setError(issues[0].message);
            } else {
                setError("Invalid input");
            }
        } catch {
            setError(error?.message || "Something went wrong");
        }
        toast.error("Internal server error")
    } finally {
        setIsSaving(false);
    }

}