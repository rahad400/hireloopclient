import { waitForDebugger } from "inspector"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"
type JobApplication = {
  jobId: string
  userId: string
  email: string
  name: string
  jobTitle: string
  company: string
}

export const applyToJob = async (data: JobApplication): Promise<boolean> => {
  const res = await fetch(`${BASE_URL}/application`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
// console.log('apply to job post data:',data)
// console.log('appply to job res:',res)

  if (!res.ok) {
    throw new Error(
      `Could not apply for this job (${res.status} ${res.statusText}).`
    )
  }
  return true
}

export const getApplyToJob = async () =>{
    const res = await fetch(`${BASE_URL}/application`,{
        method:'GET',
        cache: 'no-store'
    })
    return await res.json()
}