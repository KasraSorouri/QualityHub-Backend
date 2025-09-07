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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const dataProcessor_1 = require("../utils/dataProcessor");
// Define Station query
const query = {
    attributes: { exclude: [] },
};
// Get all Stations
const getAllStations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stations = yield models_1.Station.findAll(query);
        return stations;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Get a Station based on ID
const getStation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const station = yield models_1.Station.findByPk(id, query);
    if (!station) {
        throw new Error('the station not found');
    }
    return station;
});
// Create a new Station
const createStation = (stationData) => __awaiter(void 0, void 0, void 0, function* () {
    const newStationData = (0, dataProcessor_1.stationProcessor)(stationData);
    try {
        const station = yield models_1.Station.create(newStationData);
        return station;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update an Station
const updateStation = (id, stationData) => __awaiter(void 0, void 0, void 0, function* () {
    const newStationData = (0, dataProcessor_1.stationProcessor)(stationData);
    try {
        const station = yield models_1.Station.findByPk(id);
        if (!station) {
            throw new Error('Station not found!');
        }
        const updatedStation = yield station.update(newStationData);
        return updatedStation;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllStations,
    getStation,
    createStation,
    updateStation,
};
