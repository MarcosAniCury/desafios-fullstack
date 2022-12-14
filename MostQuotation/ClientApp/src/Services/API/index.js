import { URL } from './settings';
import axios from 'axios';

export const API = {
    signin: async (username, password) => {
        const params = {
            'name': username,
            'password': password,
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.signin}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    signup: async (username, email, password, type) => {
        const params = {
            'name': username,
            'email': email,
            'password': password,
            'type': type
        }

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.signup}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    getUserById: async (userId, access_token) => {
        let responseAxios = {};

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        await axios.get(`${URL.base}${URL.user.getById}/${userId}`, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    forgetPassword: async (username, email) => {
        const params = {
            'name': username,
            'email': email,
        }
            
        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.forgetPassword}`, params).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    recoverPassword: async (password, passwordConfirm, access_token) => {
        const params = {
            'password': password,
            'passwordConfirm': passwordConfirm
        }

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.user.recoverPassword}`, params, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    createClient: async (name, email, rg, dateOfBirth, documentFront, documentBack, selfie, userName, access_token) => {
        const params = {
            'name': name,
            'password': Math.random().toString(16),
            'email': email,
            'rg': rg,
            'dateOfBirth': dateOfBirth,
            'documentFront': documentFront,
            'documentBack': documentBack,
            'selfie': selfie,
            'collaborator': userName, 
        }

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.client.create}`, params, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    getClientByNameLike: async (research, pageIndex, access_token) => {
        const params = {
            'PageIndex': pageIndex
        };

        if (research && research != '') {
            params['Research'] = research;
        }

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.client.getByNameLike}`, params, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    getClientByNameLikeAndCollaboratorLike: async (name, collaborator, pageIndex, access_token) => {
        const params = {
            'pageIndex': pageIndex
        };

        if (name && name != '') {
            params['name'] = name;
        }

        if (collaborator && collaborator != '') {
            params['collaborator'] = collaborator;
        }

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.client.getByNameLikeAndCollaboratorLike}`, params, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    },
    getQuotationWithFilter: async (initialDate, finalDate, pageIndex, access_token) => {
        const params = {
            'initialDate': initialDate,
            'finalDate': finalDate,
            'pageIndex': pageIndex,
        };

        const config = {
            headers: { 'Authorization': `Bearer ${access_token}` }
        };

        let responseAxios = {};

        await axios.post(`${URL.base}${URL.quotation.getWithFilter}`, params, config).then((response) => {
            responseAxios = response.data;
        }).catch((error) => {
            responseAxios = error.response;
            responseAxios['success'] = false;
        });

        return { ...responseAxios };
    }
}