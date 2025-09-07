import { Material, NokDetect, NokDismantleMaterials, Product, WorkShift } from '../../../models';
import { MaterialStatus } from '../types';
import { parseMaterialStatus } from '../utils/nokDataProcessor';

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
      as: 'nokDetect',
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
        },
      ],
    },
  ],
};

// Get All IQCs
const getAllIQCs = async (): Promise<NokDismantleMaterials[]> => {
  console.log('get All IQCs');
  try {
    const iqcs = await NokDismantleMaterials.findAll({
      attributes: query.attributes,
      include: query.include,
    });
    console.log('*** IQC Manager * IQCs -> ', iqcs);
    return iqcs;
  } catch (err) {
    console.log('!!! IQC Manager * Error -> ', err);
    throw new Error('No IQC found');
  }
};

// Get all Pending IQCs
const getPendingIQCs = async (): Promise<NokDismantleMaterials[]> => {
  console.log('get All IQCs');
  try {
    const iqcs = await NokDismantleMaterials.findAll({
      where: {
        materialStatus: 'IQC',
      },
      attributes: query.attributes,
      include: query.include,
      logging: console.log,
    });
    console.log('*** IQC Manager * IQCs -> ', iqcs);
    return iqcs;
  } catch (err) {
    console.log('!!! IQC Manager * Error -> ', err);
    throw new Error('No IQC found');
  }
};

// Update Material Status
const updateMaterialStatus = async (id: number, materialStatusData: string): Promise<NokDismantleMaterials> => {
  console.log('update Material Status * id ->', id, ' Material status ->', materialStatusData);

  const newMaterialStatus: MaterialStatus = parseMaterialStatus(materialStatusData);
  try {
    const material = await NokDismantleMaterials.findByPk(id);
    console.log('IQC Manager * service * Update * material by Id ->', material);

    if (!material) {
      throw new Error('Material not found');
    }
    material.materialStatus = newMaterialStatus;
    await material.save();
    return material;
  } catch (err) {
    console.log('!!! IQC Manager * Error -> ', err);
    throw new Error('IQC not found');
  }
};

export default {
  getAllIQCs,
  getPendingIQCs,
  updateMaterialStatus,
};
