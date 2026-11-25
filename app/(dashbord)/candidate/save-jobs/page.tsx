import { getSaveJobs } from "@/app/lip/actions/save";


const SaveJobsPage = async () => {
    const svae = await getSaveJobs()
    return (
        <div>
            {
            svae.map((job)=> (<li key={job._id}>{job.title}</li>) )
            }
        </div>
    );
};

export default SaveJobsPage;