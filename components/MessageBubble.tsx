import { JSX } from "preact";
export interface MessageBubbleProps{
  message: string;
  sender: string;
  me:boolean;
}

export function MessageBubble(props: JSX.HTMLAttributes<HTMLDivElement>){
  const {message,sender,own} = props;
  return(
    <div
    class={`flex ${own ? 'justify-end':'justify-start'} w-full`}
    {...props}
    >
      <div class={`flex flex-col p-5 mb-3 text-white  bg-gradient-to-b w-32 max-w-32 flex-wrap break-all ${own ? 'from-teal-500 to-teal-600 rounded-s-xl rounded-ee-xl' : 'from-orange-500 to-orange-600 rounded-e-xl rounded-es-xl'} w-auto`}>
        <h1 class="flex font-bold">{sender}</h1>
        <text class="font-sans font-thin">{message}</text>
      </div>
    </div>
  )
}
