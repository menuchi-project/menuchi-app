import createServer from "./server";

const app = createServer();
const PORT = Number(process.env.PORT!);
app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT}.`));