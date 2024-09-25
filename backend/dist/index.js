"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Create an express app
const app = (0, express_1.default)();
// Setup CORS to allow requests from any origin
app.use((0, cors_1.default)());
// Make express parse JSON bodies & URL encoded bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// No route found
app.use((_req, res) => {
    res.status(404).send('404 Not Found');
});
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Backend Server is running on http://localhost:${port}`);
});
