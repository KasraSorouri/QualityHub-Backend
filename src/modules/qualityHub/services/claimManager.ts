import { Material, NokDetect, NokDismantleMaterials, Product, WorkShift } from "../../../models";
import Claim from "../../../models/claim";
import { NewClaimData } from "../types";
import { claimStatusProcessor } from "../utils/dataProcessor";

const query = {
  attributes: { exclude: [] },
  include: [
  {
    model: Material,
    as: 'material',
    attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
  },
  {
    model: NokDetect,
    as : 'nokDetect',
    attributes: ['productSN', 'detectTime', 'description', 'productStatus', 'productId', 'detectShiftId'],
    include: [
      {
        model: WorkShift,
        as: 'detectedShift',
        attributes: ['shiftCode'],
      },
      {
        model: Product,
        as: 'product',
        attributes: ['productName', 'productCode'],
      }
    ]
  }
]};


// Get all Claims
const getAllClaims = async(): Promise<NokDismantleMaterials[]> => {
  console.log('getAllClaims');
  try{
    const claims = await NokDismantleMaterials.findAll({
      where: {
        materialStatus: 'CLAIMABLE',
      },
      attributes: query.attributes,
      include: query.include,
      logging: console.log,
    });
    console.log('*** Claims Manager * Claims -> ', claims);
    return claims;
  } catch (err) {
    console.log('!!! Claims Manager * Error -> ', err);
    throw new Error('No Claims found');
  }
}

// Get Pending Claims
const getPendingClaims = async(): Promise<NokDismantleMaterials[]> => {
  console.log('getPendingClaims');
  try{
    const claims = await NokDismantleMaterials.findAll({
      where: {
        materialStatus: 'CLAIMABLE',
        claimStatus: 'PENDING',
      },
      attributes: query.attributes,
      include: query.include,
      logging: console.log,
    });
    console.log('*** Claims Manager * Claims -> ', claims);
    return claims;
  } catch (err) {
    console.log('!!! Claims Manager * Error -> ', err);
    throw new Error('No Claims found');
  }
}

// Update Claim Status
const updateClaimStatus = async (claimId: number, claimData: Claim): Promise<boolean> => {
  console.log('updateClaimStatus * id ->', claimId, ' Claim status ->', claimData);

  const newClaimData: NewClaimData = claimStatusProcessor(claimData)
  try{
    const claimed = await NokDismantleMaterials.findByPk(claimId);
    console.log('Claim Manager * service * Update * claim by Id ->', claimed);
    if (!claimed) {
      throw new Error('Claim not found');
    }
    claimed.claimStatus = newClaimData.claimStatus;
    await claimed.save();

    const { claimStatus, ...claimData } = newClaimData;

    const [claim] = await Claim.upsert(claimData)
    console.log('Claim Manager * service * Update * claim ->', claim);

    return true;
  } catch (err) {
    console.log('!!! Claims Manager * Error -> ', err);
    throw new Error('Claim not found');
  }
}


export default {
  getAllClaims,
  getPendingClaims,
  updateClaimStatus
}


