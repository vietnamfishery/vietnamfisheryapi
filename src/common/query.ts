import { ActionAssociateDatabase } from './';

/**
 * Chức năng get thông tin user từ username
 * @username
 */
const getUserWithUsername: any = {
    where: {
        username: `nvh`
    }
};

/**
 * Chức năng get ao theo phân quyền user
 * @ userId
 */
const getPondWithRoles: any = {
    include: [
        {
            model: this.pondUserRolesServices.models,
            as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
            attributes: ['rolesId', 'pondId'],
            required: true,
            include: [
                {
                    model: this.userRolesServices.models,
                    include: [
                        {
                            model: (this.models as any).sequelize.models.users,
                            as: ActionAssociateDatabase.USER_ROLES_2_USER,
                            where: {
                                userId: 103
                            }
                        }
                    ],
                    where: {
                        [this.Op.or]: [
                            {
                                roles: 0
                            },
                            {
                                roles: 1
                            }
                        ]
                    }
                }
            ]
        }
    ]
    // attributes: ['pondName']
};

/**
 * Chức năng get ao theo phân quyền user có phân trang
 * @ userId
 */
const getPondWithRolesWithPagination: any = {
    include: [
        {
            model: this.pondUserRolesServices.models,
            as: ActionAssociateDatabase.POND_2_POND_USER_ROLE,
            attributes: ['rolesId', 'pondId'],
            required: true,
            include: [
                {
                    model: this.userRolesServices.models,
                    include: [
                        {
                            model: (this.models as any).sequelize.models.users,
                            as: ActionAssociateDatabase.USER_ROLES_2_USER,
                            where: {
                                userId: 103
                            }
                        }
                    ],
                    where: {
                        [this.Op.or]: [
                            {
                                roles: 0
                            },
                            {
                                roles: 1
                            }
                        ]
                    }
                }
            ]
        },
        // Get theo vụ
        {
            model: this.seasonAndPondServices.models,
            where: {
                order: [
                    ['seasonId', 'DESC']
                ]
            },
            limit: 1
        }
    ],
    offset: 5, // trang 5
    limit: 5, // 5 record
    order: [
        ['pondName', 'ASC'], // sort theo chiều tên ao chiều thuận
        ['pondName', 'DESC'] // sort theo chiều tên ao chiều ngược
    ],
    where: {
        createdDate: {
            [this.Op.between]: ['Ngay bat dau <Date>','Ngay bat dau <Date>'] // Select theo ngay
        }
    }
    // attributes: ['pondName']
};

/**
 * Chức năng get vụ theo user
 */
const getSeasonWithUser: any = {

};
