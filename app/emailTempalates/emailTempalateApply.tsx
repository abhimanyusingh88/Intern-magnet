interface JobApplyEmailProps {
    companyName?: string;
    jobTitle?: string;
}

export function JobApplyEmail({
    companyName,
    jobTitle,
}: JobApplyEmailProps) {
    return (
        <div className="bg-gray-100 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Application delivered successfully
                </h1>

                <p className="text-gray-700 mb-4">
                    Hi, Greetings from InternMagnet!
                </p>

                <p className="text-gray-700 mb-4">
                    Thank you for applying for the{" "}
                    <span className="font-medium">{jobTitle}</span> position at{" "}
                    <span className="font-medium">{companyName}</span>.
                </p>

                <p className="text-gray-700 mb-6">
                    We’ve successfully send your application. The hiring team will
                    review it carefully, and if your profile matches our requirements,
                    they will contact you with the next steps.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">Company:</span> {companyName}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">Position:</span> {jobTitle}
                    </p>
                </div>

                <p className="text-gray-700">
                    We appreciate your interest in joining{" "}
                    <span className="font-medium">{companyName}</span> and wish you the
                    best of luck.
                </p>

                <p className="text-gray-700 mt-8">
                    Best regards,
                    <br />
                    <span className="font-medium">Intern Magnet </span>
                </p>
            </div>
        </div>
    );
}
