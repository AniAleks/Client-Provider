const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { DateTime } = require('luxon');
const _ = require('lodash');
const Client = require('./model');
const AppError  = require('../../utils/api.response');

const { ObjectId } = mongoose.Types;


/**
 * Add
 * @public
 */

exports.add = async (req, res, next) => {
  try {
    const {
      name, email, phone, providers
    } = req.body;

    const client = await Client.findOne({ email });

    if (!_.isNil(client)) {
      throw new AppError({
        message: 'A client with that name is already created.',
        status: httpStatus.CONFLICT,
      });
    } else {
      const newClient = await new Client({
        name,
        email,
        phone,
        providers
      }).save();

      return res.status(httpStatus.CREATED).json(newClient);
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = { _id: ObjectId(id) };
    const update = {
      status: 'deleted',
      // updatedAt: DateTime.local().toSeconds(),
    };

    if (!_.isNil(id)) {
      const { nModified } = await Client.updateOne(query, update);

      if (nModified !== 1) {
        throw new AppError({
          message: 'There is no client with that Id.',
          status: httpStatus.NOT_FOUND,
        });
      }

      return res.status(httpStatus.NO_CONTENT).json();
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Clients List
 * @public
 */


 exports.clients = async (req, res, next) => {
  try {
    const query = { status: { $ne: 'deleted' } };
    

    const clients = await Client.find(query).populate('provider');

    if (_.isNil(clients)) {
      throw new AppError({
        message: 'There are no clients yet.',
        status: httpStatus.NOT_FOUND,
      });
    }

    return res.status(200).json(
      clients
    );
  } catch (error) {
    return next(error);
  }
};

/**
 * Single Client Info
 * @public
 */


exports.client = async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {};

    if (!_.isNil(id)) {
      query = { _id: ObjectId(id) };
    }

    const client = await Client.findOne(query);

    if (_.isNil(client)) {
      throw new AppError({
        message: 'There is no client with that Id.',
        status: httpStatus.NOT_FOUND,
      });
    }

    return res.status(httpStatus.OK).json(client);
  } catch (error) {
    return next(error);
  }
};
/**
 * Edit Profile
 * @public
 */

exports.edit = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    let updateFields = {
      ...body,
    };

    const client = await Client.findOneAndUpdate(
      { _id: ObjectId(id) },
      updateFields,
      { new: true },
    );
    const populatedclient = await client.populate('provider');

    return res.status(httpStatus.OK).json(populatedclient);
  } catch (error) {
    return next(error);
  }
};


