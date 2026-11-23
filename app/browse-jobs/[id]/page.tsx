import { getDetailsId } from '@/app/lip/actions/jobs';
import type { EmployerJob } from "@/components/employer/manage-jobs/ts/employer-job"

const BrowseJobsDeatailsPage = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    // console.log('details id',id)
    const details = await getDetailsId(id)
    // console.log(details)
    return (
        <div>
            <h2>{details.title}</h2>
        </div>
    );
};

export default BrowseJobsDeatailsPage;