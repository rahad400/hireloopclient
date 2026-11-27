const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"


const getUsersPremium = async  (userId:string) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/premium`,{
        method:'GET',
        cache:'no-cache'
    });
    return await res.json()
};

export default getUsersPremium;