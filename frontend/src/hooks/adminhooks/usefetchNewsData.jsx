import axios from "axios"
import { useEffect, useState } from "react"

export const useFetchNewsData = (refetch,setNewsData) =>{
    
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        console.log("ge")
        axios.get(`${import.meta.env.VITE_BASE_URL}/admin/get-news-data`)
        .then((res)=>{
            if(res.data.success){
                console.log(res.data)
                setNewsData(res.data.newsData)
            }
        })

        setLoading(false)

    },[refetch])

    return {loading}

}