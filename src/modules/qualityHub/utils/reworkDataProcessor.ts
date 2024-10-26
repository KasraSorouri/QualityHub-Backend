import { parseDate, parseId } from "../../../utils/dataValidator";
import { NewReworkData, NewRwDismantledMaterialData } from "../types";
import { parseActive, parseDescription, parseOrder, parseQty } from "./dataProcessor";

const parseRecipeData = async (recipeData: unknown) : Promise<number[]> => {
  if (!recipeData ||  !Array.isArray(recipeData) ) {
    console.log('++ Data processing Error 1');
    throw new Error('Incorrect or missing Data **!');
  }
  const recipeIds : number[] = [];
  for (const recipe of recipeData) {
    recipeIds.push(parseId(recipe));
  }
  console.log(' Parse Recipes : ', recipeIds);
  
  return recipeIds;
}

const parseDismantlesMaterial = async (dismantlesMaterialData: unknown) : Promise<NewRwDismantledMaterialData[]> => {
  if (!dismantlesMaterialData || !Array.isArray(dismantlesMaterialData)) {
    console.log('++ Data processing Error 2');

    throw new Error('Incorrect or missing Data **!');
  }
  const dismantledMaterials : NewRwDismantledMaterialData[] = [];
  for (const dismantledItem of dismantlesMaterialData) {
    if (!dismantledItem || typeof dismantledItem !== 'object') {
      console.log('++ Data processing Error 3');

      throw new Error('Incorrect or missing Data **!');
    }
    if ('recipeBom' in dismantledItem && typeof dismantledItem.recipeBom === 'object' && 'dismantledQty' in dismantledItem ){
          console.log('+++ corect Dismantled Material Data');
          
      const dismantledmaterial = { 
        recipeBomId: parseId(dismantledItem.recipeBom.id), 
        dismantledQty: parseQty(dismantledItem.dismantledQty),
        note: 'note' in dismantledItem ? parseDescription(dismantledItem.note) : '',
        mandatoryRemove: 'mandatoryRemove' in dismantledItem ? parseActive(dismantledItem.mandatoryRemove) : false,
      }
      dismantledMaterials.push(dismantledmaterial)
    } else {
      console.log('+++ Incorrect Dismantled Material Data');
    }
  }
  return dismantledMaterials;
}



const reworkDataProcessor = async ( reworkData: unknown) : Promise<NewReworkData> => {
  if (!reworkData || typeof reworkData !== 'object') {
    console.log('Incorrect or missing Data **! 1');
    
    throw new Error('Incorrect or missing Data **!');
  }
  if ( 'productId' in reworkData &&
    'stationId' in reworkData &&
    'nokCodeId' in reworkData &&
    'reworkShortDesc' in reworkData &&
    'order' in reworkData
  ) {
      console.log('Rework Data:', reworkData );

      console.log('Correct Data');
      const reworkDataToReturn : NewReworkData = {
        productId: parseId(reworkData.productId),
        stationId: parseId(reworkData.stationId),
        nokCodeId: parseId(reworkData.nokCodeId), 
        reworkShortDesc: parseDescription(reworkData.reworkShortDesc),
        description: 'description' in reworkData ? parseDescription(reworkData.description) : '',
        order: parseOrder(Number(reworkData.order)),
        timeDuration: 'timeDuration' in reworkData ? parseQty(reworkData.timeDuration) : 0,
        active: 'active' in reworkData ? parseActive(reworkData.active) : true,
        deprecated: 'deprecated' in reworkData ? parseActive(reworkData.deprecated) : false,
        reworkRecipes: 'reworkRecipes' in reworkData ? await parseRecipeData(reworkData.reworkRecipes) : [],
        affectedRecipes: 'affectedRecipes' in reworkData ? await parseRecipeData(reworkData.affectedRecipes) : [],
        creationDate: new Date(),
        deprecatedDate: 'deprecatedDate' in reworkData ? parseDate(reworkData.deprecatedDate): undefined,
        dismantledMaterials: 'rwDismantledMaterials' in reworkData ? await parseDismantlesMaterial(reworkData.rwDismantledMaterials) : []
      }
      console.log('*Rework Data Processing - reworkDataToReturn', reworkDataToReturn);
      
      return reworkDataToReturn
    } else {
      console.log('Incorrect or missing Data **! 2');

      throw new Error('Incorrect or missing data --+-+!');
    
    }
  }

export { reworkDataProcessor }