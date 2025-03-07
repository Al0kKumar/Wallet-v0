import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    
    const fetchUsers = (filter = "") => {
        // Depending on the filter, request all users or filtered users
        const url = filter 
            ? `http://localhost:3000/user/filtername?filter=${filter}` 
            : "http://localhost:3000/user/allusers";

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            const data = response.data;
            if(data.user){
            setUsers(data.user)
            }
            else{
                setUsers(data);
            }  
        })
        .catch(err => {
            console.error("Failed to fetch users", err);
        });
    };

    useEffect(() => {
        // Fetch all users initially
        fetchUsers();
    }, []);

    useEffect(() => {
        // Fetch filtered users whenever the filter changes
        fetchUsers(filter);
    }, [filter]);

    return <>
        <div className="font-bold mt-6 text-lg">
            Users 
        </div>
        <div className="my-2">
            <input  onChange= {e => {setFilter(e.target.value)}} 
            type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
              {users.length ? users.map(user => (
                    <User key={user._id} user={user} />
                )) : <div>No users found</div>}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname +" " + user.lastname);
            }} label={"Send Money"} />
        </div>
    </div>
}