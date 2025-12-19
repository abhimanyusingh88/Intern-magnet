import BackGroundGlow from "@/components/BackGroundGlow";
import DownProfileComponent from "@/components/DownProfileComponent";
import ProfileMain from "@/components/ProfileMain";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
    const session = await auth();

    return (
        <div className="relative w-full">

            <BackGroundGlow />

            <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



                <div>
                    {/* Add profile content here */}
                    <ProfileMain session={session} />

                </div>




                <div>
                    <DownProfileComponent />
                    {/* profile specifications here */}



                    {   /*
                      Preferences
                      Education
                      Key skills
                      Languages
                      Internships
                      Projects
                      Profile summary
                      Add
                      Accomplishments
                      Competitive exams
                      Employment
                      Academic achievements
                      Resume */}
                </div>

            </div>
        </div>
    )
}