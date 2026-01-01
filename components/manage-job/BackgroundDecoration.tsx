import React from "react";

export function BackgroundDecoration() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
    );
}
