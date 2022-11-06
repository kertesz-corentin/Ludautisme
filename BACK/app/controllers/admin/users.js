/* eslint-disable camelcase */
const bcrypt = require('bcrypt');

const saltRounds = 10;

const ApiError = require('../../errors/apiError');
const { usersDataMapper } = require('../../models/admin');

//  Enable it when Post, update...
//  const { ApiError } = require('../../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const users = await usersDataMapper.findAll();
        return res.json(users);
    },
    async getById(req, res) {
        const user = await usersDataMapper.findById(req.params.id);
        if (user.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }
        return res.json(user);
    },
    async getFiltered(req, res) {
        //  Avoid injection on column
        const columns = ['id', 'member_number', 'email', 'first_name', 'last_name', 'archived', 'phone'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (index < 0) {
                throw new ApiError(400, 'Impossible de chercher par cette propriété (non reconnue ou non implémentée)');
            }
            if (['id', 'member_number'].includes(columns[index]) && typeof value !== 'number') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            if (['archived'].includes(columns[index]) && typeof value !== 'boolean') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
            }
            arr.push({ [columns[index]]: value });
        });
        const user = await usersDataMapper.findFiltered(arr);
        if (user.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }

        return res.json(user);
    },
    async create(req, res) {
        const user = await usersDataMapper.findFiltered([
            { member_number: Number(req.body.member_number) },
            { email: req.body.email },
        ]);
        const {
            id_role, email, member_number, adress_number, adress_street,
        } = req.body;
        if (!id_role || !email || !member_number || !adress_number || !adress_street) {
            throw new ApiError(400, 'Les informations minimum n\'ont pas été réceptionnées');
        }
        if (user.length > 0) {
            throw new ApiError(400, 'Un utilisateur avec le même email ou numéro de membre existe déjà');
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }
        const newUser = await usersDataMapper.addUser(req.body);
        return res.json(newUser);
    },
    async update(req, res) {
        const user = await usersDataMapper.findById(req.params.id);

        if (user.length < 1) {
            throw new ApiError(404, 'Cet utilisateur n\'existe pas');
        }

        const memberNumberExist = await usersDataMapper.findFiltered([
            { member_number: Number(req.body.member_number) },
        ]);

        if (memberNumberExist.length > 0) {
            if (memberNumberExist[0].id !== user[0].id) {
                throw new ApiError(404, 'Un autre adhérent a déjà ce numéro de membre ou cet email');
            }
        }

        const emailExist = await usersDataMapper.findFiltered([
            { email: req.body.email },
        ]);

        if (emailExist.length > 0) {
            if (emailExist[0].id !== user[0].id) {
                throw new ApiError(404, 'Un autre adhérent a déjà ce numéro de membre ou cet email');
            }
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashedPassword;
        }

        const updatedUser = await usersDataMapper.update(req.params.id, req.body);
        return res.json(updatedUser);
    },
    async delete(req, res) {
        const deletedUser = await usersDataMapper.delete(req.params.id);
        if (!deletedUser) {
            throw new ApiError(404, 'L\'utilisateur n\'a pas été trouvé, rien n\'a été supprimé');
        }
        return res.json(deletedUser);
    },
};
