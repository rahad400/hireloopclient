import { JobApplication } from "./aplication";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const ALREADY_SAVED_MESSAGE = "You have already saved this job."

type ErrorResponse = {
  error?: string
}

async function getErrorMessage(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as ErrorResponse | null
  return body?.error ?? fallback
}

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
      await getErrorMessage(
        res,
        `Could not save job (${res.status} ${res.statusText}).`
      )
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