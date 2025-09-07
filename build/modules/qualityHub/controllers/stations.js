"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stations_1 = __importDefault(require("../services/stations"));
// Get All Stations
const getAllStations = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stations = yield stations_1.default.getAllStations();
        res.json(stations);
    }
    catch (err) {
        res.status(500).json({ error: 'No station found' });
    }
});
// Get a Station by Id
const getStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const station = yield stations_1.default.getStation(Number(id));
        res.json(station);
    }
    catch (err) {
        res.status(404).json({ error: 'Station not found' });
    }
});
// Create a New Station
const addStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const stationData = req.body;
    try {
        const result = yield stations_1.default.createStation(stationData);
        res.status(201).json(result);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += err.message;
        }
        res.status(409).json({ error: `${errorMessage}` });
    }
});
// Edit an Existing Station
const editStation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (!((req.decodedToken && id === req.decodedToken.id) || req.permited)) {
        res.status(401).json({ error: 'Operation not allowed' });
    }
    const stationData = req.body;
    try {
        const result = yield stations_1.default.updateStation(id, stationData);
        res.status(201).json(result);
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += err.message;
        }
        res.status(409).json({ error: `${errorMessage}` });
    }
});
exports.default = {
    getAllStations,
    getStation,
    addStation,
    editStation,
};
