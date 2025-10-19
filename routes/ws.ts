
const clients = new Set<WebSocket>();

export const handler = async (req: Request): Promise<Response> => {
  const {socket,response} = Deno.upgradeWebSocket(req)
  socket.onopen = () =>clients.add(socket);
  socket.onmessage = (e) =>{
    for(const client of clients){
      if(client !== socket) client.send(e.data) 
    }
  };
  socket.onclose = () => clients.delete(socket);
  return response;
}
