import DisplayField from "../DisplayField";

export default function ProfileAdditionalDetails({ currentData }: { currentData: any }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/30">
            <DisplayField label="Address" value={currentData.address} />
            <DisplayField label="Date of birth" value={currentData.dob} />
            <DisplayField label="Gender" value={currentData.gender} />
        </div>
    )
}
