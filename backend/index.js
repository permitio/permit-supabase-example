import { Permit } from "permitio";
import express from "express";
import cors from "cors";
import {config} from "dotenv";
config();

const app = express();


const token = process.env.VITE_PERMIT_TOKEN;
const permit = new Permit({
    // your API Key
    token: process.env.VITE_PERMIT_TOKEN,
    pdp: "https://cloudpdp.api.permit.io",

});

app.use(cors());
app.use(express.json());

//create a tenant
app.post("/create-tenant" , async (req , res) => {
    
    const data = req.body.data;

    try{
            //create a tenant
    const res_1 = await fetch(`https://api.permit.io/v2/facts/${PERMIT_PROJECT_ID}/${PERMIT_ENV_ID}/tenants/todo-tenant/users` , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`
        },
        body : JSON.stringify({
          "key": data.user.id,
          "email": data.user.email,
        })

        
      })

      console.log(res_1);
      const response = await res_1.json();
      console.log("response" , response);

      //assign a role
      const res_2 = await fetch(`https://api.permit.io/v2/facts/${PERMIT_PROJECT_ID}/${PERMIT_ENV_ID}/role_assignments` , {
          method : "POST",
          headers : {
              "Content-Type" : "application/json",
              "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
              user : data.user.id,
              tenant: "todo-tenant",
              role: "Employee"
          })
      })
      
      const response_2 = await res_2.json();
      console.log(response_2);

      res.status(200).json({
        msg : "tenant with employee role created successfully"
      })
    }catch(err){
      console.log(err);
      res.status(500).json({
         error : err
      })  
    }
    

})


//sync all supabase users

app.post("/sync-all-users", async (req , res) => {
    
    const users = req.body.users;
    
    for(let user of users){
        const res_1 = await fetch(`https://api.permit.io/v2/facts/${PERMIT_PROJECT_ID}/${PERMIT_ENV_ID}/tenants/todo-tenant/users` , {
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
        const res_2 = await fetch(`https://api.permit.io/v2/facts/${PERMIT_PROJECT_ID}/${PERMIT_ENV_ID}/role_assignments` , {
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
})

//check for permissions
app.get("/check-permission/:id/:operation" , async(req , res) => {


    const id = req.params.id;
    const operation = req.params.operation;
    console.log(id);
    console.log(operation);
    try{
        const permitted = await permit.check( String(id) , String(operation) , {
            type: "todo",
            tenant: "todo-tenant",
          });
        if (permitted) {
            res.status(200).json({
                "status" : "permitted"
            })
        } else {
            res.status(200).json({
                "status" : "not-permitted"
            })
        }
    }catch(err){
        res.status(500).json({
            "problem": "internal server error",
            "error" : err
        })
    }
})
app.listen(3000 , () => {console.log("app listening on port 3000")});