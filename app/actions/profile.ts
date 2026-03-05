

export async function updateProfile(
    formData: FormData
): Promise<string | { success: boolean; message: string } | undefined> {
    const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {

        return { success: false, message: "Something went wrong while updating the profile" };
    }

    const data = await res.json();


    if (data === null) return undefined;

    if (typeof data === "string") return data;

    if (typeof data === "object" && "success" in data) {
        return data as { success: boolean; message: string };
    }

    return undefined;
}
