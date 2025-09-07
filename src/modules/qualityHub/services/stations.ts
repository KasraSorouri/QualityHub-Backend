import { Station, StationQuery } from '../../../models';
import { StationData } from '../types';
import { stationProcessor } from '../utils/dataProcessor';

// Define Station query

const query: StationQuery = {
  attributes: { exclude: [] },
};

// Get all Stations
const getAllStations = async (): Promise<Station[]> => {
  try {
    const stations = await Station.findAll(query);
    return stations;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a Station based on ID
const getStation = async (id: number): Promise<Station> => {
  const station = await Station.findByPk(id, query);

  if (!station) {
    throw new Error('the station not found');
  }
  return station;
};

// Create a new Station
const createStation = async (stationData: unknown): Promise<Station> => {
  const newStationData: StationData = stationProcessor(stationData);

  try {
    const station = await Station.create(newStationData);
    return station;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Update an Station
const updateStation = async (id: number, stationData: unknown): Promise<Station> => {
  const newStationData = stationProcessor(stationData);

  try {
    const station = await Station.findByPk(id);
    if (!station) {
      throw new Error('Station not found!');
    }
    const updatedStation = await station.update(newStationData);
    return updatedStation;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

export default {
  getAllStations,
  getStation,
  createStation,
  updateStation,
};
