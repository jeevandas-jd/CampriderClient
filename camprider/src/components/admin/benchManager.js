import React, { use } from "react";
import { useState ,useEffect} from "react";
import { getPilotById } from "../../api/admin/adminClient";
const BenchManager=(userIDs)=>{
    const [users,setUsers]=useState([]);
    const [onBenchUsers,setOnBenchUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    useEffect(()=>{
        if(!userIDs) return;
        console.log("userIDs",userIDs);
        //fetch user details for each ID and display
    }
    ,[userIDs])

    const fetchUsersOnBench=async()=>{
        try{
            const response=await getPilotById(userIDs);
            setUsers(response.data);
        }catch(err){
            setError(err.response?.data?.message || "Failed to fetch users on bench");
        }finally{
            setLoading(false);
        }
    }
    const getOnBenchUsers=async()=>{
        try{
            const response=users;
            const onBench=response.filter(user=>user.onBench);
            setOnBenchUsers(onBench);
        }catch(err){
            setError(err.response?.data?.message || "Failed to fetch users on bench");
        }finally{
            setLoading(false);
        }
    }
    if(loading) return <div>Loading users on bench...</div>;
    if(error) return <div>Error:{error}</div>;
    if(onBenchUsers.length===0) return <div>No users currently on bench.</div>;
    console.log("onBenchUsers",onBenchUsers);

    return(<div>Bench Manager Component</div>
    )
}

export default BenchManager;