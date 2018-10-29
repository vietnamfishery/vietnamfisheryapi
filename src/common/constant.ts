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

export interface ISearchOptions {
    pageSizes?: string;
    pageIndex?: string;
    // order?: Array<[]>;
    orderBy?: string;
    orderType?: string;
    between?: string[];
    count?: string;
    userId?: string;
    method: string;
}

export enum ActionServer {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
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
    BOUGHT_BREED_2_USER = 'users',
    BOUGHT_BREED_2_BREED = 'breed',
    //
    BREED_2_BOUGHT_BREED = 'boughBreed',
    BREED_2_STOKING_DETAIL = 'stockingDetails',
    //
    COST_2_POND_PREPARE = 'costs',
    //
    COUPON_2_MATERIAL = 'material',
    COUPON_2_SEASON = 'season',
    COUPON_2_USER = 'coupons',
    //
    DIED_FISHERY_2_SEASON_AND_POND = 'diedFish',
    //
    DISTRICT_2_USER = 'districtsToUser',
    //
    GROWTH_2_SEASON_AND_POND = 'growths',
    //
    HARVEST_DETAIL_2_HARVEST = 'harvestDetail',
    //
    HARVEST_2_HARVEST_DETAILS = 'harvest',
    HARVEST_2_SEASON_AND_POND = 'harvests',
    //
    MATERIAL_2_COUPON = 'coupon',
    MATERIAL_2_POND_PREPARE = 'materialToPondPrepare',
    MATERIAL_2_STORAGE = 'materialStorages',
    MATERIAL_2_USING_FOOD = 'usingFoods',
    MATERIAL_2_USING_VETERINARY = 'usingVeterinay',
    //
    POND_DIARY_2_SEASON_AND_POND = 'pondDiarys',
    //
    POND_ENVIRONMENT_2_SEASON_AND_POND = 'environments',
    //
    POND_PREPARE_2_SEASON_AND_POND = 'seasonAndPond',
    POND_PREPARE_2_COST = 'pondPrepare',
    POND_PREPARE_2_POND_PREPARE_DETAILS = 'details',
    //
    POND_PREPARE_DETAIL_2_POND_PREPARE = 'pondPrepare',
    POND_PREPARE_DETAIL_2_MATERIAL = 'material',
    POND_PREPARE_DETAIL_2_COST = 'detailCost',
    //
    POND_2_POND_USER_ROLE = 'pondUserRoles',
    POND_2_SEASON = 'pondsToSeason',
    POND_2_USER = 'ponds',
    POND_2_SEASON_AND_POND = 'pondsToSeasonNPond',
    //
    POND_USER_ROLE_2_USER = 'user',
    POND_USER_ROLE_2_POND = 'pond',
    //
    PRICE_2_SEASON = 'prices',
    //
    PROVINCE_2_USER = 'provinces',
    //
    SEASON_AND_POND_2_SEASON = 'seasons',
    SEASON_AND_POND_2_POND = 'ponds',
    SEASON_AND_POND_2_GROWTH = 'seasonNPondToGrowth',
    SEASON_AND_POND_2_DIED_FISH = 'diedFishSeason',
    SEASON_AND_POND_2_HARVEST = 'toHarvests',
    SEASON_AND_POND_2_POND_DIARY = 'seasonWithDiary',
    SEASON_AND_POND_2_POND_PREPARE = 'withPondPrepare',
    SEASON_AND_POND_2_TAKE_CARE = 'takeCares',
    SEASON_AND_POND_2_STOCKING = 'SNPToStocking',
    SEASON_AND_POND_2_POND_ENV = 'seasonWithEnvironment',
    SEASON_2_BOUGHT_BREED = 'boughtBreed',
    SEASON_2_COUPON = 'coupon',
    SEASON_2_PRICE = 'price',
    //
    SEASON_2_USER = 'seasons',
    SEASON_2_SEASON_AND_POND = 'seasonToSeasonNPond',
    SEASON_2_STORAGE = 'storage',
    //
    STOCKING_2_STOCKING_DETAILS = 'stockingDetails',
    STOCKING_2_SEASON_AND_POND = 'stockings',
    //
    STOCKING_DETAILS_2_STOCKING = 'stockingDetails',
    STOCKING_DETAILS_2_BREED = 'stockingDetailsBreeds',
    //
    STORAGE_2_POND_PREPARE_DETAILS = 'storagesToPondpreparedetails',
    STORAGE_2_MATERIAL = 'storagesToMaterial',
    STORAGE_2_SEASON = 'storagesToSeason',
    STORAGE_2_PRICE = 'storagesToPrices',
    STORAGE_2_USING_FOOD = 'storagesToUsingfoods',
    STORAGE_2_USING_VETERINARY = 'storagesToUsingveterinary',
    STORAGE_2_USER = 'storages',
    //
    TAKE_CARE_2_USING_FOOD = 'usingFoods',
    TAKE_CARE_2_USING_VETERINARY = 'takecareToUsingveterinary',
    TAKE_CARE_2_SEASON_AND_POND = 'takecares',
    //
    USER_ROLES_2_USER = 'users',
    USER_ROLES_2_POND_USER_ROLE = 'userRoles',
    //
    USER_2_ROLE_USER = 'users',
    USER_2_POND = 'userToPond',
    USER_2_COUPON = 'userToCoupon',
    USER_2_SEASON = 'userToSeason',
    USER_2_BOUGHT_BREED = 'userToBoughtBreeds',
    USER_2_PRO = 'provinces',
    USER_2_DIS = 'districts',
    USER_2_WAR = 'wards',
    USER_2_STORAGE = 'userToStorage',
    //
    USING_FOOD_2_MATERIAL = 'usingFoodsMaterial',
    USING_FOOD_2_TAKE_CARE = 'usingFoods',
    //
    USING_VETERINARY_2_MATERIAL = 'usingVeterinaryMaterial',
    USING_VETERINARY_2_TAKE_CARE = 'usingVeterinaryTakeCare',
    //
    WARD_2_USER = 'wards',
}

export enum sortType {
    ASC = 'asc',
    DESC = 'desc'
}

export interface IOptionQuery {
    action?: ActionServer;
    data?: any;
    primary?: object; // xác định thực thế chịu tác dụng của hành động
    pagination?: {
        offset: number,
        limit: number
    };
    count?: boolean;
    order?: Array<string | sortType>;
    attributes?: string;
}
