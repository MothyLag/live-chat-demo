import {useEffect,useState} from "preact/hooks"
import UseAPI from "../hooks/api.ts";
import { MessageBubble } from "../components/MessageBubble.tsx";

export interface Message{
  idUser: string;
  message: string;
}

export default function ChatClient(){
  const [messages,setMessages] = useState<Message[]>([]);
  const [idUser,setIdUser] = useState<string>(null);
  const [input, setInput] = useState("");
  const ws = new WebSocket("wss://live-chat-demo.mothylag.deno.net/ws");
  const [_isLoading,setIsLoading] = useState(false);
  const {createUser} = UseAPI(setIsLoading)
  useEffect(()=>{
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data)
      setMessages((prev) => data.idUser != idUser ? [...prev, data] : [...prev])
    }
    return ()=>{ws.close()}
  },[idUser])

  const send = () =>{
    ws.send(JSON.stringify({idUser, message:input}));
    setMessages((prev)=>[...prev,{idUser:'you', message:input}]);
    setInput("")
  }

  return (
    <div class="font-semibold  h-full w-full">
      <div class="mt-5 mb-5 pt-5 pb-5 p-5 h-72 overflow-y-auto bg-gradient-to-b from-green-200 to-green-300 rounded-es-xl rounded-ee-xl w-full h-[600px] "> 
        <ul>{messages.length === 0 ? <p class="text-slate-400">No messages just say hi 👋</p> : messages.map((msg)=><li class="flex"><MessageBubble message={msg.message} sender={msg.idUser} own={msg.idUser === "you"} /></li>)}</ul>
      </div>
      <input class="border-slate-600 border-solid rounded-sm border mr-3" value={input} onInput={(e)=>setInput(e.currentTarget.value)} placeholder={idUser ? 'write your message' : 'create your user'}/>
      {idUser ? <button type="button" onClick={send}>Send</button>
      : <button type="button" onClick={async ()=>{
        const created = await createUser(input);
        console.log(created)
        if(!created.success){
          alert(created.error) 
          return
        }
        setIdUser(input)
        setInput("")
      }}>Register</button>
      }
</div>
  )
}
