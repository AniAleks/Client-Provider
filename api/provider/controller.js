const mongoose = require('mongoose');
const httpStatus = require('http-status');
const _ = require('lodash');
const Provider = require('./model');
const AppError  = require('../../utils/api.response');

const { ObjectId } = mongoose.Types;

/**
 * Add provider
 * @public
 */

exports.add = async (req, res, next) => {
  try {
    const {
      name
    } = req.body;

    const provider = await Provider.findOne({ name });

    if (!_.isNil(provider)) {
      throw new AppError({
        message: 'A provider with that name is already created.',
        status: httpStatus.CONFLICT,
      });
    } else {
      const newprovider = await new Provider({
        name,
      }).save();

      return res.status(httpStatus.CREATED).json(newprovider);
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Providers List
 * @public
 */

exports.providers = async (req, res, next) => {
  try {
    const query = { status: { $ne: 'deleted' } };

    const providers = await Provider.find(query);

    if (_.isNil(providers)) {
      throw new AppError({
        message: 'There are no providers yet.',
        status: httpStatus.NOT_FOUND,
      });
    }
    return res.status(200).json({
      providers,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Single Provider Info
 * @public
 */

exports.provider = async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {};

    if (!_.isNil(id)) {
      query = { _id: ObjectId(id) };
    }

    const provider = await Provider.findOne(query);

    if (_.isNil(provider)) {
      throw new AppError({
        message: 'There is no provider with that Id.',
        status: httpStatus.NOT_FOUND,
      });
    }

    return res.status(httpStatus.OK).json(provider);
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

    const updateFields = {
      ...body,
      status: 'updated',
      updated_at: Date.now(),
    };

    const provider = await Provider.findOneAndUpdate(
      { _id: ObjectId(id) },
      updateFields,
      { new: true },
    );

    return res.status(httpStatus.OK).json(provider);
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
      updatedAt: DateTime.local().toSeconds(),
    };

    if (!_.isNil(id)) {
      const { nModified } = await Provider.updateOne(query, update);

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
