import {
  Material,
  NokDismantleMaterials,
  NokRework,
  Recipe,
  RecipeBoms,
  RwDismantledMaterials,
  Station,
  WorkShift,
} from '../../../models';
import { ClaimStatus, DismantledMaterialData, ProductStatus, ReworkStatus } from '../types';
import { reworkDataProcessor } from '../utils/nokDataProcessor';
import nokDetects from './nokDetects';

// Define Rework query
const query = {
  attributes: { exclude: [] },
  include: [
    {
      model: NokDismantleMaterials,
      attributes: { exclude: [] },
      include: [
        {
          model: Material,
          as: 'material',
          attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
        },
        {
          model: RwDismantledMaterials,
          as: 'rwDismantledMaterial',
          attributes: { exclude: ['id', 'reworkId', 'recipeBomId'] },
        },
        {
          model: RecipeBoms,
          as: 'recipeBom',
          attributes: { exclude: ['id', 'recipeId', 'materialId'] },
          include: [
            {
              model: Recipe,
              as: 'recipe',
              attributes: ['id', 'recipeCode', 'description', 'recipeType'],
            },
          ],
        },
      ],
    },
    {
      model: WorkShift,
      as: 'reworkShift',
    },
    {
      model: Recipe,
    },
    {
      model: Station,
      as: 'reworkStation',
    },
  ],
};

// Get all Reworks
const getAllReworks = async (): Promise<NokRework[]> => {
  try {
    const reworks = await NokRework.findAll();

    return reworks;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Get a Rework based on ID
const getRework = async (id: number): Promise<NokRework> => {
  const rework = await NokRework.findByPk(id);

  if (!rework) {
    throw new Error('the rework not found');
  }
  return rework;
};

// Get Reworks by Nok ID
const getReworksByNok = async (nokId: number): Promise<NokRework> => {
  try {
    const reworks = await NokRework.findAll({
      where: { nokId },
      attributes: query.attributes,
      include: query.include,
    });

    const result = reworks[0];
    return result;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

// Create Or Update a Rework
const createRework = async (reworkData: unknown): Promise<NokRework> => {
  const newReworkData = reworkDataProcessor(reworkData);

  try {
    const [rework] = await NokRework.upsert(newReworkData);
    if (!rework) {
      throw new Error('Rework not Saved - Call Administrator!');
    }
    // Update Nok Data
    const nok = await nokDetects.getNokDetect(rework.nokId);

    // Update Nok Product Status
    nok.productStatus =
      rework.reworkStatus === ReworkStatus.COMPLETED ? ProductStatus.REWORKED : ProductStatus.REWORK_INPROGRESS;
    await nok.update({ productStatus: nok.productStatus });

    if (rework.id && 'dismantledMaterials' in newReworkData && newReworkData.dismantledMaterials) {
      await handleDismantledMaterials(rework.id, newReworkData.dismantledMaterials);
    }
    return rework;
  } catch (err: unknown) {
    let errorMessage = '';
    if (err instanceof Error) {
      errorMessage += ' Error: ' + err.message;
    }
    throw new Error(errorMessage);
  }
};

const handleDismantledMaterials = async (
  reworkId: number,
  dismantledMaterialData: DismantledMaterialData[],
): Promise<NokRework> => {
  const rework = await NokRework.findByPk(reworkId);

  if (rework) {
    // delete previous rework Boms
    await NokDismantleMaterials.destroy({ where: { rework_id: rework.id } });

    for (const item of dismantledMaterialData) {
      const dismantled = {
        nokId: rework.nokId,
        reworkId: rework.id,
        materialId: item.material,
        recipeBomId: item.recipeBomId,
        reusable: item.reusable,
        actualDismantledQty: item.actualDismantledQty,
        materialStatus: item.materialStatus,
        ClaimStatus: ClaimStatus.PENDING,
        rwDismantledMaterialId: item.rwDismantledMaterialId,
      };
      await NokDismantleMaterials.create(dismantled);
    }
    try {
      const result = await NokRework.findByPk(reworkId);

      if (!result) {
        throw new Error('Rework not found!');
      }

      return result;
    } catch (err: unknown) {
      let errorMessage = '';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    }
  } else {
    throw new Error('Rework not found!');
  }
};

export default {
  getAllReworks,
  getRework,
  getReworksByNok,
  createRework,
};
