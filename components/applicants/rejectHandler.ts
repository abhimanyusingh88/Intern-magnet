import { toast } from "sonner";

export async function handleRejection(email: string, id: string, setOpen: (open: boolean) => void, setSaving: (saving: boolean) => void, queryClient: any) {
    try {
        setSaving(true);
        const res = await fetch(`/api/reject/${id}/${email}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }

        })
        const result = await res.json();
        if (!res.ok) {
            toast.error(result.message);
        }
        else {
            queryClient.invalidateQueries({ queryKey: ["appliedList", id] })

            toast.success(result.message);
        }
        setSaving(false);
        setOpen(false);
    }
    catch (err) {
        setSaving(false);
        setOpen(false);
        toast.error("Something went wrong while updating the status!!")
        throw new Error(err instanceof Error ? err.message : "something went wrong !!")
    }
}