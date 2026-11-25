import { JobFormValues } from "@/lib/types/job"
import { JobApplication } from "./aplication";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const saveJobs = async (data:JobApplication):Promise<void> => {
const res = await fetch(`${BASE_URL}/save`,{
    method:'POST',
    headers:{
        "content-type":'application/json'
    },
    body:JSON.stringify(data)
});
if (!res.ok) {
    throw new Error(
      `Could not save job (${res.status} ${res.statusText}).`
    )
  }

  return await res.json()
}



export const getSaveJobs = async () => {
    const res = await fetch(`${BASE_URL}/save`,{
        method:'GET',
        cache:'no-cache'
    });
    return await res.json()
}