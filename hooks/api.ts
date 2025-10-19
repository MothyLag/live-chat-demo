import { Dispatch } from "preact/hooks/src/index.d.ts";

export interface CreateUserResponse{
  success: boolean;
  error?: string;
}
function createUserWrapper(setLoading:Dispatch<SetStateAction<boolean>>){
  return async (idUser:string): Promise<CreateUserResponse>=>{
    setLoading(true)
    const response = await fetch("/api/user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({idUser}),
    });

    setLoading(false)
    if(response.ok){
      return {success:true,error:""}
    }else{
      const data = await response.json();
      return {success:false,error:data.error}
    }
  }
}
export default function UseAPI(setLoading:Dispatch<SetStateAction<boolean>>){
  return {createUser:createUserWrapper(setLoading)}
}
