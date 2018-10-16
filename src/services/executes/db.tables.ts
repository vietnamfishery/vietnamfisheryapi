// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  boughtbreeds:def.boughtbreedsModel;
  boughtbreeddetails:def.boughtbreeddetailsModel;
  costs:def.costsModel;
  breeds:def.breedsModel;
  coupon:def.couponModel;
  diedfisherys:def.diedfisherysModel;
  district:def.districtModel;
  harvests:def.harvestsModel;
  harvestdetails:def.harvestdetailsModel;
  growths:def.growthsModel;
  material:def.materialModel;
  ponddiary:def.ponddiaryModel;
  pondprepare:def.pondprepareModel;
  pondenvironments:def.pondenvironmentsModel;
  pondpreparedetails:def.pondpreparedetailsModel;
  ponds:def.pondsModel;
  ponduserroles:def.ponduserrolesModel;
  prices:def.pricesModel;
  province:def.provinceModel;
  season:def.seasonModel;
  stockingdetails:def.stockingdetailsModel;
  storages:def.storagesModel;
  stocking:def.stockingModel;
  userroles:def.userrolesModel;
  users:def.usersModel;
  takecare:def.takecareModel;
  usingveterinary:def.usingveterinaryModel;
  usingfoods:def.usingfoodsModel;
  ward:def.wardModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    boughtbreeds: seq.import(path.join(__dirname, './boughtbreeds')),
    boughtbreeddetails: seq.import(path.join(__dirname, './boughtbreeddetails')),
    costs: seq.import(path.join(__dirname, './costs')),
    breeds: seq.import(path.join(__dirname, './breeds')),
    coupon: seq.import(path.join(__dirname, './coupon')),
    diedfisherys: seq.import(path.join(__dirname, './diedfisherys')),
    district: seq.import(path.join(__dirname, './district')),
    harvests: seq.import(path.join(__dirname, './harvests')),
    harvestdetails: seq.import(path.join(__dirname, './harvestdetails')),
    growths: seq.import(path.join(__dirname, './growths')),
    material: seq.import(path.join(__dirname, './material')),
    ponddiary: seq.import(path.join(__dirname, './ponddiary')),
    pondprepare: seq.import(path.join(__dirname, './pondprepare')),
    pondenvironments: seq.import(path.join(__dirname, './pondenvironments')),
    pondpreparedetails: seq.import(path.join(__dirname, './pondpreparedetails')),
    ponds: seq.import(path.join(__dirname, './ponds')),
    ponduserroles: seq.import(path.join(__dirname, './ponduserroles')),
    prices: seq.import(path.join(__dirname, './prices')),
    province: seq.import(path.join(__dirname, './province')),
    season: seq.import(path.join(__dirname, './season')),
    stockingdetails: seq.import(path.join(__dirname, './stockingdetails')),
    storages: seq.import(path.join(__dirname, './storages')),
    stocking: seq.import(path.join(__dirname, './stocking')),
    userroles: seq.import(path.join(__dirname, './userroles')),
    users: seq.import(path.join(__dirname, './users')),
    takecare: seq.import(path.join(__dirname, './takecare')),
    usingveterinary: seq.import(path.join(__dirname, './usingveterinary')),
    usingfoods: seq.import(path.join(__dirname, './usingfoods')),
    ward: seq.import(path.join(__dirname, './ward')),
  };
  return tables;
};
