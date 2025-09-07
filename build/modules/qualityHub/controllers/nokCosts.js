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
const nokCosts_1 = __importDefault(require("../services/nokCosts"));
/*
// Get All Costs
const getAllCosts = async (_req: Request, res: Response) => {
  try{
    const costs = await nokCostServices.getAllCosts();
    res.json(costs);
  } catch (err) {
    res.status(500).json({ error: 'No cost found' });
  }
};


// Get a Cost by Id
const getCost = async (req: ExtendedRequest, res: Response)=> {
  const id = req.params.id;
  try {
    const cost = await nokCostServices.getCost(Number(id));
    res.json(cost);
  } catch (err) {
    res.status(404).json({ error: 'Cost not found' });
  }
};*/
// Get Dismantled Material by Nok Id
const getDismantledMaterialByNok = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nokId = Number(req.params.id);
    if (!nokId) {
        res.status(400).json({ error: 'Invalid product id' });
    }
    try {
        const costs = yield nokCosts_1.default.getDismantledMaterialByNok(nokId);
        res.json(costs);
    }
    catch (err) {
        res.status(404).json({ error: 'No cost found' });
    }
});
// Create a New Cost
const addCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const costData = req.body;
    try {
        const result = yield nokCosts_1.default.createNokCost(costData);
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
/*
// Edit an Existing Cost
const editCost = async (req: ExtendedRequest, res: Response) => {
  const id = Number(req.params.id);
  if (!(req.decodedToken && id === req.decodedToken.id || req.permited)) {
    res.status(401).json({ error: 'Operation not allowed' });
  }
  const costData: unknown = req.body;
  try {
    const result = await nokCostServices.updateCost(id,costData);
    res.status(201).json(result);
  } catch(err : unknown) {
    let errorMessage = 'Something went wrong.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    res.status(409).json({ error: `${errorMessage}` });
  }
};
*/
exports.default = {
    //getAllCosts,
    //getCost,
    //getCostsByNok,\
    getDismantledMaterialByNok,
    addCost,
    //editCost,
};
