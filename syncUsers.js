import { createClient } from '@supabase/supabase-js';
import {config} from "dotenv";
config();

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL , import.meta.env.VITE_SUPABASE_KEY)

const token = import.meta.env.VITE_PERMIT_TOKEN;

//getting data of all the users in supabase

const { data: users, error } = await supabase.from("profiles").select("*");

console.log(users);

//adding all the users to permit.io directory

async function syncAllUsers(){
    for(let user of users){
        const res_1 = await fetch(`https://api.permit.io/v2/facts/${process.env.PERMIT_PROJECT_ID}/${process.env.PERMIT_ENV_ID}/tenants/todo-tenant/users` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                key : user.id,
                email : user.email
            })
        })

        const response = await res_1.json();
        console.log(response);
    }
    
    
    
    for(let user of users){
        const res_2 = await fetch(`https://api.permit.io/v2/facts/${process.env.PERMIT_PROJECT_ID}/${process.env.PERMIT_ENV_ID}/role_assignments` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                user : user.id,
                tenant: "todo-tenant",
                role: "Employee"
            })
        })
    
        const response = await res_2.json();
        console.log(response);
    
    }
}


syncAllUsers();
