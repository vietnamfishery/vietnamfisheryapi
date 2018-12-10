export const ContentType = {
    Gzip: 'application/gzip',
    Json: 'application/json',
    JsonUtf8: 'application/json; charset=utf8',
};

export const apig = {
    logLevel: 'INFO',
    metricsEnabled: true,
    origin: '*',
};

export const AccessExposeHeaders = 'X-Pagination-Index,X-Pagination-Size,X-Pagination-TotalCount';

export interface IOptionsHttpResponse {
    err?: any;
    message?: any;
    data?: any;
    status?: number;
    excludeStack?: any;
    code?: string;
    details?: any;
}

export const IdDataTypes = {
    Integer: 'Integer',
    UuidV1: 'UuidV1',
    UuidV4: 'UuidV4',
};

export enum folderDrive {
    uploadImageVNF = '1zh74DklADISZbcEYVix2nDDKd5wtt0-Z'
}

export enum defaultImage {
    userImage = '1pL4I4TNcKOf5kD2YTNXXJjuWtyJSBDE2',
    pondImage = '1EVRh5NePZkOBxfKFDAD1RZ3AjHSWJ12W'
}

export const isUUId4: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export interface ISearchOptions {
    pageSizes?: string;
    pageIndex?: string;
    // order?: Array<[]>;
    orderBy?: string;
    orderType?: string;
    between?: string[];
    count?: string;
    userId?: string;
}

/**
 * Những hạng mục đã được đánh dấu [✔] vui lòng không sửa đổi,
 * Nếu không sẽ xảy ra lỗi rất nghiêm trọng không fix nổi
 */
export enum ActionAssociateDatabase {

    BOUGHT_BREED_DETAIL_2_COUPON = 'coupon', // ✔
    BOUGHT_BREED_DETAIL_2_BREED = 'breed', // ✔

    BOUGHT_BREED_2_BOUGHT_BREED_DETAIL = 'boughtbreedsToBoughtBreedDetails',
    BOUGHT_BREED_2_USER = 'users',
    BOUGHT_BREED_2_SEASON = 'season',

    BREED_2_BOUGHT_BREED_DETAIL = 'boughBreedDetail',
    BREED_2_STOKING_DETAIL = 'stockingDetails',
    BREED_2_OWNER_BREED = 'owner',

    COST_2_POND_PREPARE = 'costs',

    COUPON_2_MATERIAL = 'materials',
    COUPON_2_BOUGHT_BREED_DETAILS = 'boughtBreedDetails', // ✔
    COUPON_2_SEASON = 'season', // ✔
    COUPON_2_USER = 'user',

    DIED_FISHERY_2_SEASON_AND_POND = 'seasonAndPond',

    DISTRICT_2_USER = 'districtsToUser',

    GROWTH_2_SEASON_AND_POND = 'seasonAndPond',

    HARVEST_DETAIL_2_HARVEST = 'harvest', // ✔

    HARVEST_2_HARVEST_DETAILS = 'details',
    HARVEST_2_SEASON_AND_POND = 'harvestsnp', // ✔

    MATERIAL_2_COUPON = 'coupon',
    MATERIAL_2_POND_PREPARE = 'materialToPondPrepare',
    MATERIAL_2_STORAGE = 'storage', // ✔
    MATERIAL_2_USING_FOOD = 'usingFoods',
    MATERIAL_2_USING_VETERINARY = 'usingVeterinay',

    POND_DIARY_2_SEASON_AND_POND = 'snp', // ✔

    POND_ENVIRONMENT_2_SEASON_AND_POND = 'environments',

    POND_PREPARE_2_SEASON_AND_POND = 'seasonAndPond',
    POND_PREPARE_2_COST = 'pondPrepare',
    POND_PREPARE_2_POND_PREPARE_DETAILS = 'details',
    POND_PREPARE_2_INCURREDS = 'incurreds',

    POND_PREPARE_DETAIL_2_POND_PREPARE = 'pondPrepare',
    POND_PREPARE_DETAIL_2_STORAGE = 'storages',
    POND_PREPARE_DETAIL_2_COST = 'detailCost',

    INCURREDS_TO_POND_PREPARE = 'pondPrepare',
    INCURREDS_TO_USER = 'user',

    POND_2_POND_USER_ROLE = 'pondUserRoles', // ✔
    POND_2_SEASON = 'seasons',
    POND_2_USER = 'user', // ✔
    POND_2_EMPLOYEE_MAYNY_ROLES = 'users',
    POND_2_SEASON_AND_POND = 'seasonsnp', // ✔

    POND_USER_ROLE_2_USER = 'user', // ✔
    POND_USER_ROLE_2_USER_ROLE = 'userRole',
    POND_USER_ROLE_2_POND = 'pond',

    PRICE_2_SEASON = 'prices',

    PROVINCE_2_USER = 'provinces',

    SEASON_AND_POND_2_SEASON = 'seasons',
    SEASON_AND_POND_2_POND = 'ponds',
    SEASON_AND_POND_2_GROWTH = 'seasonNPondToGrowth',
    SEASON_AND_POND_2_DIED_FISH = 'diedFishSeason',
    SEASON_AND_POND_2_HARVEST = 'toHarvests',
    SEASON_AND_POND_2_POND_DIARY = 'seasonWithDiary',
    SEASON_AND_POND_2_POND_PREPARE = 'withPondPrepare',
    SEASON_AND_POND_2_TAKE_CARE = 'takeCares',
    SEASON_AND_POND_2_STOCKING = 'stocking',
    SEASON_AND_POND_2_POND_ENV = 'seasonWithEnvironment',

    SEASON_2_BOUGHT_BREED = 'boughtBreed',
    SEASON_2_PRICE = 'price',
    SEASON_2_COUPON = 'coupon',
    SEASON_2_USER = 'user', // ✔
    SEASON_2_USER_ROLES = 'roles',
    SEASON_2_POND = 'ponds',
    SEASON_2_SEASON_AND_POND = 'seasonToSeasonNPond',
    SEASON_2_STORAGE = 'storage',

    STOCKING_2_STOCKING_DETAILS = 'details',
    STOCKING_2_SEASON_AND_POND = 'seasonAndPond',

    STOCKING_DETAILS_2_STOCKING = 'stocking',
    STOCKING_DETAILS_2_BREED = 'breed',

    STORAGE_2_POND_PREPARE_DETAILS = 'pondPrepareDetails', // ✔
    STORAGE_2_MATERIAL = 'materials',
    STORAGE_2_SEASON = 'storagesToSeason',
    STORAGE_2_PRICE = 'storagesToPrices',
    STORAGE_2_USING_FOOD = 'usingFoods',
    STORAGE_2_USING_VETERINARY = 'usingveterinary',
    STORAGE_2_OWNER = 'owner',

    OWNER_TO_STORAGE = 'storages',
    OWNER_TO_USER = 'user',

    OWNER_BREED_TO_BREED = 'breeds',
    OWNER_BREED_TO_USER = 'user',

    TAKE_CARE_2_USING_FOOD = 'usingFoods',
    TAKE_CARE_2_USING_VETERINARY = 'usingVeterinary',
    TAKE_CARE_2_SEASON_AND_POND = 'seasonAndPond',

    USER_ROLES_2_USER = 'userInfo',
    USER_ROLES_2_SEASON = 'seasonRoles',
    USER_ROLES_2_USER_BOSS = 'employees', // ✔
    USER_ROLES_2_POND_USER_ROLE = 'pondUserRoles', // ✔

    USER_2_ROLES_USER = 'roles', // ✔
    USER_2_POND = 'ponds',
    USER_2_POND_MANY_ROLES = 'pondsBy',
    USER_2_COUPON = 'coupons',
    USER_2_SEASON = 'seasons', // ✔
    USER_2_BOUGHT_BREED = 'userToBoughtBreeds',
    USER_2_PRO = 'provinces',
    USER_2_DIS = 'districts',
    USER_2_WAR = 'wards',
    USER_2_ROLES_GET_EMPLOYEES = 'employees', // ✔
    USER_2_POND_USER_ROLE = 'pondUserRole',
    USER_2_OWNER_STORAGE = 'user',
    USER_2_OWNER_BREED = 'ownerBreed',
    USER_2_INCURREDS = 'incurreds',

    USING_FOOD_2_STORAGE = 'storages',
    USING_FOOD_2_TAKE_CARE = 'usingFoods',

    USING_VETERINARY_2_STORAGE = 'storages',
    USING_VETERINARY_2_TAKE_CARE = 'usingVeterinaryTakeCare',

    WARD_2_USER = 'wards',
}
