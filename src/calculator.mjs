import http from 'node:http';
import CalculatorService from './service/CalculatorService.mjs';
import { operations } from './config/operations.mjs';
import CalculatorView from './view/CalculatorView.mjs';
import RequestHandler from './service/RequestHandler.mjs';

const server = http.createServer();
const PORT = 3500;

new CalculatorService(server, operations);
const view = new CalculatorView();
const requestHandler = new RequestHandler(server, operations, view);

server.on("request", (req, res) => requestHandler.handleRequest(req, res));

server.listen(PORT, () => console.log(`Server is listening on port ${server.address().port}`));