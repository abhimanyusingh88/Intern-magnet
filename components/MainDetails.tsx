
import DisplayField from "./DisplayField";

export default function MainDetails({ currentData }: { currentData: any }) {
    return (
        <div className="flex-1 max-w-[full] w-full space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DisplayField label="College" value={currentData.college} />
                <DisplayField label="Course" value={currentData.course} />
            </div>

            <div className="h-px bg-white/5 w-full my-2" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <DisplayField label="Name" value={currentData.name} />
                <DisplayField label="Email" value={currentData.email} />
                <DisplayField label="Phone" value={currentData.phone} />
            </div>
        </div>
    )
}
