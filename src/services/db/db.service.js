import { Model } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { HTTP_CODES } from "../../utils/httpCodes.js";
import { AUTH_MESSAGES } from "../../utils/messages/auth.message.js";

export const db = {
  //========== CREATE ONE ==============
  createOne: async (Model, data) => {
    const doc = new Model(data);
    return doc.save();
  },

  //========== CREATE MANY ====================
  findOrCreate: async (Model, data) => {
    const existing = await Model.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existing) {
      throw new ApiError(HTTP_CODES.CONFLICT, AUTH_MESSAGES.ALREADY_EXISTS);
    }

    return db.createOne(Model, data);
  },

  //============ createOneAndUpdate========
  createOneAndUpdate: async (Modal, filter = {}, data, options = {}) => {
    return await Modal.findOneAndUpdate(filter, data, { upsert: true, new: true, ...options });
  },

  // =============== UPDATE ONE ================
  updateOne: async (
    Model,
    filter = {},
    value = {},
    options = { new: false, runValidators: true }
  ) => {
    const updatedDoc = await Model.findOneAndUpdate(filter, value, options);
    return updatedDoc;
  },

  //=========== UPDATE MANY ==================
  updateMany: async () => {},

  //================DELETE ONE ==============

  deleteOne: async (Model , filter={}) => {
    return await Model.deleteMany(filter);
  },

  // =================DELETE MANY============

  deleteMany: async (Model, filter = {}) => {
    return await Model.deleteMany(filter);
  },

  //========= fetchOne ==================

  fetchOne: async (Model, filter, select = "") => {
    const doc = await Model.findOne(filter).select(select);
    return doc;
  },

  //=========== fetchById====================

  fetchById: async (Modal, id) => {
    const doc = await Modal.findById(id);
    return doc;
  },

  //=========== fetchMany=================

  fetchMany: async () => {},

  //============= check data exist or not

  exists: async (Model, filter = {}) => {
    const isExist = await Model.findOne(filter);
    return !!isExist; // true / false
  },
};
