// tslint:disable
import * as Sequelize from 'sequelize';


// table: boughtbreeds
export interface boughtbreedsAttribute {
  boughtBreedId:number;
  boughtBreedUUId:string;
  userId:number;
  boughtBreedName:string;
  createdBy?:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface boughtbreedsInstance extends Sequelize.Instance<boughtbreedsAttribute>, boughtbreedsAttribute { }
export interface boughtbreedsModel extends Sequelize.Model<boughtbreedsInstance, boughtbreedsAttribute> { }

// table: boughtbreeddetails
export interface boughtbreeddetailsAttribute {
  boughtBreedDetailUUId:string;
  boughtBreedId:number;
  breedId:number;
  quantity:number;
  unitPrice:number;
  soldAddress?:string;
  isDeleted:number;
}
export interface boughtbreeddetailsInstance extends Sequelize.Instance<boughtbreeddetailsAttribute>, boughtbreeddetailsAttribute { }
export interface boughtbreeddetailsModel extends Sequelize.Model<boughtbreeddetailsInstance, boughtbreeddetailsAttribute> { }

// table: costs
export interface costsAttribute {
  costId:number;
  costUUId:string;
  pondPrepareId:number;
  label:string;
  value:number;
  responsible:string;
  notes?:string;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface costsInstance extends Sequelize.Instance<costsAttribute>, costsAttribute { }
export interface costsModel extends Sequelize.Model<costsInstance, costsAttribute> { }

// table: breeds
export interface breedsAttribute {
  breedId:number;
  breedUUId:string;
  breedName:string;
  loopOfBreed:number;
  testingAgency?:string;
  descriptions?:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface breedsInstance extends Sequelize.Instance<breedsAttribute>, breedsAttribute { }
export interface breedsModel extends Sequelize.Model<breedsInstance, breedsAttribute> { }

// table: coupon
export interface couponAttribute {
  couponId:number;
  couponUUId:string;
  userId:number;
  couponName:string;
  couponType:number;
  createdDate?:Date;
  updatedDate?:Date;
  isDeleted:number;
}
export interface couponInstance extends Sequelize.Instance<couponAttribute>, couponAttribute { }
export interface couponModel extends Sequelize.Model<couponInstance, couponAttribute> { }

// table: diedfisherys
export interface diedfisherysAttribute {
  diedFisheryId:number;
  diedFisheryUUId:string;
  seasonId:number;
  card:string;
  quantity:number;
  solutions?:string;
  employee?:string;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface diedfisherysInstance extends Sequelize.Instance<diedfisherysAttribute>, diedfisherysAttribute { }
export interface diedfisherysModel extends Sequelize.Model<diedfisherysInstance, diedfisherysAttribute> { }

// table: district
export interface districtAttribute {
  districtid:string;
  name:string;
  type:string;
  location:string;
  provinceid:string;
}
export interface districtInstance extends Sequelize.Instance<districtAttribute>, districtAttribute { }
export interface districtModel extends Sequelize.Model<districtInstance, districtAttribute> { }

// table: harvests
export interface harvestsAttribute {
  harvestId:number;
  harvestUUId:string;
  seasonId:number;
  harvestName:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface harvestsInstance extends Sequelize.Instance<harvestsAttribute>, harvestsAttribute { }
export interface harvestsModel extends Sequelize.Model<harvestsInstance, harvestsAttribute> { }

// table: harvestdetails
export interface harvestdetailsAttribute {
  harvestIdDetailUUId:string;
  harvestId:number;
  breedName:string;
  quantity:number;
  unitPrice:number;
  isDeleted:number;
}
export interface harvestdetailsInstance extends Sequelize.Instance<harvestdetailsAttribute>, harvestdetailsAttribute { }
export interface harvestdetailsModel extends Sequelize.Model<harvestdetailsInstance, harvestdetailsAttribute> { }

// table: growths
export interface growthsAttribute {
  growthId:number;
  growthUUId:string;
  seasonId:number;
  averageDensity:number;
  averageMass:number;
  speedOdGrowth:number;
  livingRatio:number;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface growthsInstance extends Sequelize.Instance<growthsAttribute>, growthsAttribute { }
export interface growthsModel extends Sequelize.Model<growthsInstance, growthsAttribute> { }

// table: material
export interface materialAttribute {
  materialUUId:string;
  couponId:number;
  storageId:number;
  provider?:string;
  providerAddress?:string;
  quantity:number;
  unit?:number;
  unitPrice:number;
  dom?:Date;
  ed?:Date;
  prodcutionBatch:string;
  isDeleted:number;
}
export interface materialInstance extends Sequelize.Instance<materialAttribute>, materialAttribute { }
export interface materialModel extends Sequelize.Model<materialInstance, materialAttribute> { }

// table: ponddiary
export interface ponddiaryAttribute {
  pondDiaryId:number;
  pondDiaryUUId:string;
  seasonId:number;
  fisheryQuantity:number;
  healthOfFishery:string;
  pondVolume:number;
  diedFishery:number;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface ponddiaryInstance extends Sequelize.Instance<ponddiaryAttribute>, ponddiaryAttribute { }
export interface ponddiaryModel extends Sequelize.Model<ponddiaryInstance, ponddiaryAttribute> { }

// table: pondprepare
export interface pondprepareAttribute {
  pondPrepareId:number;
  pondPrepareUUId:string;
  seasonId:number;
  pondprepareName:string;
  notes?:string;
  createdBy:string;
  createdDate?:Date;
  updatedBy:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface pondprepareInstance extends Sequelize.Instance<pondprepareAttribute>, pondprepareAttribute { }
export interface pondprepareModel extends Sequelize.Model<pondprepareInstance, pondprepareAttribute> { }

// table: pondenvironments
export interface pondenvironmentsAttribute {
  pondEnvironmentId:number;
  pondEnvironmentUUId:string;
  seasonId:number;
  oxyMorning?:number;
  oxyAfternoon?:number;
  phMorning?:number;
  phAfternoon?:number;
  transparent?:number;
  salinity?:number;
  h2s?:number;
  nh3?:number;
  bazo?:number;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface pondenvironmentsInstance extends Sequelize.Instance<pondenvironmentsAttribute>, pondenvironmentsAttribute { }
export interface pondenvironmentsModel extends Sequelize.Model<pondenvironmentsInstance, pondenvironmentsAttribute> { }

// table: pondpreparedetails
export interface pondpreparedetailsAttribute {
  pondPrepareDetailUUId:string;
  pondPrepareId:number;
  storageId:number;
  pondPrepareDetailId:number;
  quantity:number;
  createdDate?:Date;
  updatedDate?:Date;
  isDeleted:number;
}
export interface pondpreparedetailsInstance extends Sequelize.Instance<pondpreparedetailsAttribute>, pondpreparedetailsAttribute { }
export interface pondpreparedetailsModel extends Sequelize.Model<pondpreparedetailsInstance, pondpreparedetailsAttribute> { }

// table: ponds
export interface pondsAttribute {
  pondId:number;
  pondUUId:string;
  userId:number;
  pondName:string;
  pondArea:number;
  pondDepth:number;
  createCost:number;
  status:number;
  images?:string;
  pondLatitude?:number;
  pondLongitude?:number;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface pondsInstance extends Sequelize.Instance<pondsAttribute>, pondsAttribute { }
export interface pondsModel extends Sequelize.Model<pondsInstance, pondsAttribute> { }

// table: ponduserroles
export interface ponduserrolesAttribute {
  rolesId:number;
  pondId:number;
}
export interface ponduserrolesInstance extends Sequelize.Instance<ponduserrolesAttribute>, ponduserrolesAttribute { }
export interface ponduserrolesModel extends Sequelize.Model<ponduserrolesInstance, ponduserrolesAttribute> { }

// table: prices
export interface pricesAttribute {
  priceId:number;
  priceUUId:string;
  storageId:number;
  quantity:number;
  unit?:number;
  value:number;
  createdDate?:Date;
  isDeleted:number;
}
export interface pricesInstance extends Sequelize.Instance<pricesAttribute>, pricesAttribute { }
export interface pricesModel extends Sequelize.Model<pricesInstance, pricesAttribute> { }

// table: province
export interface provinceAttribute {
  provinceid:string;
  name:string;
  type:string;
}
export interface provinceInstance extends Sequelize.Instance<provinceAttribute>, provinceAttribute { }
export interface provinceModel extends Sequelize.Model<provinceInstance, provinceAttribute> { }

// table: season
export interface seasonAttribute {
  seasonId:number;
  seasonUUId:string;
  pondId:number;
  seasonName:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface seasonInstance extends Sequelize.Instance<seasonAttribute>, seasonAttribute { }
export interface seasonModel extends Sequelize.Model<seasonInstance, seasonAttribute> { }

// table: stockingdetails
export interface stockingdetailsAttribute {
  stockingDetailUUId:string;
  breedId:number;
  stockingId:number;
  costOfStocking:number;
  stockingQuantity:number;
  phFirst?:number;
  salinityFIRST?:number;
  isDeleted:number;
}
export interface stockingdetailsInstance extends Sequelize.Instance<stockingdetailsAttribute>, stockingdetailsAttribute { }
export interface stockingdetailsModel extends Sequelize.Model<stockingdetailsInstance, stockingdetailsAttribute> { }

// table: storages
export interface storagesAttribute {
  storageId:number;
  storageUUId:string;
  unitName:string;
  unitType:number;
  description?:string;
  createdDate?:Date;
  updatedDate?:Date;
  isDeleted:number;
}
export interface storagesInstance extends Sequelize.Instance<storagesAttribute>, storagesAttribute { }
export interface storagesModel extends Sequelize.Model<storagesInstance, storagesAttribute> { }

// table: stocking
export interface stockingAttribute {
  stockingId:number;
  stockingUUId:string;
  seasonId:number;
  notes?:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface stockingInstance extends Sequelize.Instance<stockingAttribute>, stockingAttribute { }
export interface stockingModel extends Sequelize.Model<stockingInstance, stockingAttribute> { }

// table: userroles
export interface userrolesAttribute {
  rolesId:number;
  userId:number;
  roles:number;
  createdDate:Date;
  updatedBy?:string;
  isDeleted:number;
}
export interface userrolesInstance extends Sequelize.Instance<userrolesAttribute>, userrolesAttribute { }
export interface userrolesModel extends Sequelize.Model<userrolesInstance, userrolesAttribute> { }

// table: users
export interface usersAttribute {
  userId:number;
  userUUId:string;
  firstname:string;
  lastname:string;
  birthday?:Date;
  addressContact?:string;
  username:string;
  password:string;
  town?:string;
  district?:string;
  province?:string;
  status:number;
  phone?:string;
  email?:string;
  images?:string;
  createdBy?:string;
  createdDate?:Date;
  updatedBy?:string;
  updatedDate?:Date;
  isDeleted:number;
}
export interface usersInstance extends Sequelize.Instance<usersAttribute>, usersAttribute { }
export interface usersModel extends Sequelize.Model<usersInstance, usersAttribute> { }

// table: takecare
export interface takecareAttribute {
  takeCareId:number;
  takeCareUUId:string;
  seasonId:number;
  takeCareName:string;
  takeType:number;
  createdDate?:Date;
  isDeleted:number;
}
export interface takecareInstance extends Sequelize.Instance<takecareAttribute>, takecareAttribute { }
export interface takecareModel extends Sequelize.Model<takecareInstance, takecareAttribute> { }

// table: usingveterinary
export interface usingveterinaryAttribute {
  usingVeterinaryUUId:string;
  storageId:number;
  takeCareId:number;
  causesNSymptoms:string;
  averageSize:number;
  totalBiomass:number;
  quantity:number;
  result:string;
  latestHarvestDate?:number;
  mentor?:string;
  createdBy?:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface usingveterinaryInstance extends Sequelize.Instance<usingveterinaryAttribute>, usingveterinaryAttribute { }
export interface usingveterinaryModel extends Sequelize.Model<usingveterinaryInstance, usingveterinaryAttribute> { }

// table: usingfoods
export interface usingfoodsAttribute {
  usingFoodUUId:number;
  storageId:number;
  takeCareId:number;
  massOfFishery:number;
  feedingRate:number;
  totalFood:number;
  createdBy?:string;
  createdDate?:Date;
  isDeleted:number;
}
export interface usingfoodsInstance extends Sequelize.Instance<usingfoodsAttribute>, usingfoodsAttribute { }
export interface usingfoodsModel extends Sequelize.Model<usingfoodsInstance, usingfoodsAttribute> { }

// table: ward
export interface wardAttribute {
  wardid:string;
  name:string;
  type:string;
  location:string;
  districtid:string;
}
export interface wardInstance extends Sequelize.Instance<wardAttribute>, wardAttribute { }
export interface wardModel extends Sequelize.Model<wardInstance, wardAttribute> { }
