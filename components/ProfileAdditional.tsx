import SideEditable from "./SideEditable"

type Props = {
    open: string | null
    setOpen: (v: string | null) => void
    savedData: {
        address: string
        dob: string
        gender: string
    }
}

export default function ProfileAdditionalDetails({
    open,
    setOpen,
    savedData,
}: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl border border-white/5 bg-zinc-950/30">
            <SideEditable
                label="Address"
                name="address"
                value={savedData.address}
                open={open === "address"}
                onOpen={() => setOpen("address")}
                onClose={() => setOpen(null)}
                placeholder="Add address"
            />
            <SideEditable
                label="Date of birth"
                name="dob"
                value={savedData.dob}
                open={open === "dob"}
                onOpen={() => setOpen("dob")}
                onClose={() => setOpen(null)}
                placeholder="Add Birthday"
            />
            <SideEditable
                label="Gender"
                name="gender"
                value={savedData.gender}
                open={open === "gender"}
                onOpen={() => setOpen("gender")}
                onClose={() => setOpen(null)}
                placeholder="Add gender"
            />
        </div>
    )
}
