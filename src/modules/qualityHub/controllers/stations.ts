import stationServices from '../services/stations';
import { Request, Response } from 'express';
import { ExtendedRequest } from '../../usersAndAuthentication/types';


// Get All Stations
const getAllStations = async (_req: Request, res: Response) => {
  try{
    const stations = await stationServices.getAllStations();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: 'No station found' });
  }
};


// Get a Station by Id
const getStation = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const station = await stationServices.getStation(Number(id));
    res.json(station);
  } catch (err) {
    res.status(404).json({ error: 'Station not found' });
  }
};

// Create a New Station
const addStation = async (req: ExtendedRequest, res: Response) => {
  const stationData: unknown = req.body;
  try {
    const result = await stationServices.createStation(stationData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

// Edit an Existing Station
const editStation = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const stationData: unknown = req.body;
  try {
    const result = await stationServices.updateStation(id,stationData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};

export default {
  getAllStations,
  getStation,
  addStation,
  editStation,
};