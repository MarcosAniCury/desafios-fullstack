export const applicationJson = 'application/json';

export const URL = {
    base: 'https://localhost:7242/api/',
    user: {
        signup: 'user/signup',
        signin: 'user/signin',
        getById: 'user',
        forgetPassword: 'user/forget-password',
        recoverPassword: 'user/recover-password',
    }, 
    client: {
        getAll: 'client/get',
        create: 'client/create',
        getByNameLike: 'client/get-by-name',
        getByNameLikeAndCollaboratorLike: 'client/get-by-name-and-collaborator'
    },
    quotation: {
        getWithFilter: 'quotation/get-with-filter'
    }
}