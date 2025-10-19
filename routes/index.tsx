import ChatClient from "../islands/ChatClient.tsx"

export default function Home(){
  return(
    <div class="flex flex-col items-center font-sans h-screen">
      <div>
        <h1 class="text-5xl font-bold text-gray-400">Live Chat Demo</h1>
        <div class="flex h-full">
          <ChatClient/>
        </div>
      </div> 
    </div>
  )
}
