import app, { schema } from "./app.js";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { execute, subscribe } from "graphql";

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: "/graphql" });

useServer({ schema, execute, subscribe }, wsServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server run at http://localhost:${PORT}/graphql`);
  console.log(`🔄 WebSocket run`);
});
