import { PoolOptions } from 'sequelize';
import { key } from '../../secretKey/id_rsa';

export const IdDataTypes: any = {
    Integer: 'Integer',
    UuidV1: 'UuidV1',
    UuidV4: 'UuidV4',
};

export enum Dialect {
    mysql = 'mysql',
    sqlite = 'sqlite',
    postgres = 'postgres',
    mssql = 'mssql'
}

export const databaseName: string = 'fisheriesdatabase';

export enum environment {
    development = 'development',
    production = 'production'
}

export const pool: PoolOptions = {
    acquire: 30000,
    idle: 10000,
    max: 5,
    min: 0
};

export const authdb: any = {
    host: 'localhost',
    password: 'J%:dTva*#9c>k@L6',
    username: 'fisherier'
};

export enum actionUserServices {
    REGISTER = 'register',
    ADD_CHILD = 'register-empployees',
    LOGIN = 'login',
    LOGOUT = 'logout',
    UPDATEMYPROFILE = 'updateMyProfile',
    DELETE = 'delete',
    USERINFO = 'getUserInfo',
    CHANGEUSERPASSWORD = 'updateUserPassword',
    UPLOAD_IMAGE = 'uploadImage'
}

export const secret = key;

export enum folderDrive {
    uploadImageVNF = '1zh74DklADISZbcEYVix2nDDKd5wtt0-Z'
}

export enum defaultImage {
    userImage = '1pL4I4TNcKOf5kD2YTNXXJjuWtyJSBDE2',
    pondImage = '1EVRh5NePZkOBxfKFDAD1RZ3AjHSWJ12W'
}

export enum ActionServer {
    GET = 'select',
    AUTH = 'authorzation',
    INSERT = 'insert',
    UPDATE = 'update',
    DELETE = 'delete',
    REGISTER = 'register',
    SIGNIN = 'login',
    SIGNOUT = 'logout',
    ADD_EMPLOYEE = 'registerEmpployees',
    UPLOAD_IMAGE = 'uploadImage'
}

export enum ActionAssociateDatabase {
    //
    BOUGHT_BREED_DETAIL_2_BOUGHT_BREED = 'detailBoughtBreed',
    BOUGHT_BREED_DETAIL_2_BREED = 'detailBreed',
    //
    BOUGHT_BREED_2_BOUGHT_BREED_DETAIL = 'boughtbreedsToBoughtBreedDetails',
    BOUGHT_BREED_2_USER = 'boughtbreedsToUsers',
    //
    BREED_2_BOUGHT_BREED_DETAIL = 'breedsToBoughBreedDetails',
    BREED_2_STOKING_DETAIL = 'breedsToStockingDetails',
    //
    COST_2_POND_PREPARE = 'costs',
    //
    COUPON_2_MATERIAL = 'couponToMaterial',
    COUPON_2_USER = 'coupons',
    //
    DIED_FISHERY_2_SEASON = 'diedFish',
    //
    DISTRICT_2_USER = 'districtToUser',
    //
    GROWTH_2_SEASON = 'growths',
    //
    HARVEST_DETAIL_2_HARVEST = 'detailsHarvest',
    //
    HARVEST_2_HARVEST_DETAILS = 'harvestsToHarvestDetails',
    HARVEST_2_SEASON = 'harvests',
    //
    MATERIAL_2_COUPON = 'materialCoupons',
    MATERIAL_2_STORAGE = 'materialStorages',
    //
    POND_DIARY_2_SEASON = 'pondDiarys',
    //
    POND_ENVIRONMENT_2_SEASON = 'pondEnvironments',
    //
    POND_PREPARE_2_SEASON = 'pondPrepares',
    POND_PREPARE_2_COST = 'pondprepareToCosts',
    //
    POND_PREPARE_DETAIL_2_POND_PREPARE = 'detailPondPrepare',
    POND_PREPARE_DETAIL_2_STORAGE = 'detailStorages',
    //
    POND_2_POND_USER_ROLE = 'pondUserRoles',
    POND_2_SEASON = 'pondsToSeason',
    POND_2_USER = 'ponds',
    POND_2_SEASON_AND_POND = 'pondsToSeasonNPond',
    //
    POND_USER_ROLE_2_USER_ROLE = 'pondUserRoles',
    POND_USER_ROLE_2_POND = 'pondUserRolesPond',
    //
    PRICE_2_STORAGE = 'prices',
    //
    PROVINCE_2_USER = 'provinceToUser',
    //
    SEASON_AND_POND_2_SEASON = 'Seasons',
    SEASON_AND_POND_2_POND = 'Ponds',
    //
    SEASON_2_POND = 'seasons',
    SEASON_2_POND_DIARY = 'seasonToPonddiary',
    SEASON_2_POND_PREPARE = 'seasonToPondprepare',
    SEASON_2_TAKE_CARE = 'seasonToTakecare',
    SEASON_2_GROWTH = 'seasonToGrowths',
    SEASON_2_DIED_FISHERY = 'seasonToDiedfisherys',
    SEASON_2_POND_ENVIRONMENT = 'seasonToPondenvironments',
    SEASON_2_STOCKING = 'seasonToStocking',
    SEASON_2_HARVETS = 'seasonToHarvest',
    SEASON_2_SEASON_AND_POND = 'seasonToSeasonNPond',
    //
    STOCKING_2_STOCKING_DETAILS = 'stockingToStockingdetails',
    STOCKING_2_SEASON = 'stockings',
    //
    STOCKING_DETAILS_2_STOCKING = 'stockingDetails',
    STOCKING_DETAILS_2_BREED = 'stockingDetailsBreeds',
    //
    STORAGE_2_POND_PREPARE_DETAILS = 'storagesToPondpreparedetails',
    STORAGE_2_MATERIAL = 'storagesToMaterial',
    STORAGE_2_PRICE = 'storagesToPrices',
    STORAGE_2_USING_FOOD = 'storagesToUsingfoods',
    STORAGE_2_USING_VETERINARY = 'storagesToUsingveterinary',
    //
    TAKE_CARE_2_USING_FOOD = 'takecareToUsingfoods',
    TAKE_CARE_2_USING_VETERINARY = 'takecareToUsingveterinary',
    TAKE_CARE_2_SEASON = 'takecares',
    //
    USER_ROLES_2_USER = 'userRoles',
    USER_ROLES_2_POND_USER_ROLE = 'userrolesPondUserRoles',
    //
    USER_2_ROLE_USER = 'userToRolesUser',
    USER_2_POND = 'userToPond',
    USER_2_COUPON = 'userToCoupon',
    USER_2_BOUGHT_BREED = 'userToBoughtBreeds',
    USER_2_PRO = 'provinces',
    USER_2_DIS = 'districts',
    USER_2_WAR = 'wards',
    //
    USING_FOOD_2_STORAGE = 'usingFoodsStorages',
    USING_FOOD_2_TAKE_CARE = 'usingFoodsTakeCare',
    //
    USING_VETERINARY_2_STORAGE = 'usingVeterinaryStorages',
    USING_VETERINARY_2_TAKE_CARE = 'usingVeterinaryTakeCare',
    //
    WARD_2_USER = 'wardToUser',
}

export enum sortType {
    ASC = 'asc',
    DESC = 'desc'
}

export interface IOptionQuery {
    action: ActionServer;
    data?: any;
    primary?: object; // xác định thực thế chịu tác dụng của hành động
    pagination?: {
        offset: number,
        limit: number
    };
    count?: boolean;
    order?: Array<string|sortType>;
    attributes?: string;
}
