const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

export const paymentVerify = async (sessionId:string) => {
  const res = await fetch(`${BASE_URL}/payments/payment-verify`,{
    method:'POST',
    headers:{
        'content-type':'application/json',
    },
    body: JSON.stringify({sessionId})
  });
  return await res.json()
}
