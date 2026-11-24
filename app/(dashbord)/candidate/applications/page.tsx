import { getApplyToJob } from "@/app/lip/actions/aplication"

const ApplicationJobsPage = async () => {
  const apply = await getApplyToJob()
  console.log(apply)
  return (
    <div>
      {apply.map((job) => (
        <li key={job._id}>{job.jobTitle}</li>
      ))}
    </div>
  )
}

export default ApplicationJobsPage
