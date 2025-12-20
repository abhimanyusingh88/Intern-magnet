import EditableRow from "./EditableRows";

export default function MainDetails({ open, setOpen, savedData }: { open: string | null, setOpen: (v: string | null) => void, savedData: any }) {
    return (
        <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableRow
                    label="College"
                    name="college"
                    value={savedData.college}
                    open={open === "college"}
                    onOpen={() => setOpen("college")}
                    onClose={() => setOpen(null)}
                    placeholder="Add college name"
                />
                <EditableRow
                    label="Course"
                    name="course"
                    value={savedData.course}
                    open={open === "course"}
                    onOpen={() => setOpen("course")}
                    onClose={() => setOpen(null)}
                    placeholder="Add course name"
                />
            </div>

            <div className="h-px bg-white/5 w-full my-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <EditableRow
                    label="Name"
                    name="name"
                    value={savedData.name}
                    open={open === "name"}
                    onOpen={() => setOpen("name")}
                    onClose={() => setOpen(null)}
                    placeholder="Add your name"
                />
                <EditableRow
                    label="Email"
                    name="email"
                    value={savedData.email}
                    open={open === "email"}
                    onOpen={() => setOpen("email")}
                    onClose={() => setOpen(null)}
                    placeholder="Add email"
                />
                <EditableRow
                    label="Phone"
                    name="phone"
                    value={savedData.phone}
                    open={open === "phone"}
                    onOpen={() => setOpen("phone")}
                    onClose={() => setOpen(null)}
                    placeholder="Add phone"
                />
            </div>
        </div>
    )
}