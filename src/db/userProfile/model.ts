/* eslint-disable node/no-unsupported-features/es-syntax */
const Joi = require('joi');
const JoiObjectId = require('joi-oid');
import BaseModel from '../baseModel';
import logger from '../../logger';
import { MONGO } from '../../../constants';

/**
 * UserProfile model
 */
class UserProfile extends BaseModel {
  public db: any;
  public collectionName: any;
  public collection: any;

  /**
   * initialised collection
   * @param {Instance} db
   */
  constructor(db: any) {
    super(db);
    this.db = db;
    this.collectionName = MONGO.GAME_USERS;
    this.collection = db.collection(this.collectionName);
  }

  /**
   * model schema, it will parse throw db create and update queries
   * @returns {Object}
   */
  // eslint-disable-next-line class-methods-use-this
  joiSchema() {
    return Joi.object()
      .keys({
        _id: JoiObjectId.objectId().description('unique object id'),
        username: Joi.string().description('username'),
        deviceId: Joi.string().description('user device id'),
        lobbyId: Joi.number().integer().greater(0).description('Mpl lobby Id'),
        gameId: Joi.number().integer().greater(0).description('Mpl db game Id'),
        sessionId: Joi.string().description('session id'),
        userId: Joi.number().description('player id, get from mpl db'),
        profilePicture: Joi.string().allow('').description('profile pic url'),
        authtoken: Joi.string().description('authtoken'),
        createdAt: Joi.date().description('document created date'),
        updatedAt: Joi.date().description('last updated time for a document'),
        balance: Joi.number().default(0).integer().description('Mpl Money'),
        fromBack: Joi.boolean()
          .default(false)
          .description('rejoin Flag for BG/FG'),
        rejoinId: Joi.string()
          .description(
            'Random id, which will help us to rejoin player to table',
          )
          .empty(''),
        socketId: Joi.string().description('SocketId of User').empty(''),
      })
      .unknown(true);
  }

  /**
   * @param {object} info
   * @returns throw error if required field is not in info object
   */
  requiredFields(info: any) {
    return super.checkRequiredFields(info, ['userId', 'username']);
  }

  /**
   * add a document to tableConfiguration table
   * @param {Object} info
   * @returns {Object} create document
   */
  async add(info: any, opts = { returnOriginal: true }) {
    try {
      const insertObj = super.beforeInsert(info);
      const isValidSchema = this.joiSchema().validate(insertObj);

      if (isValidSchema.error) throw isValidSchema.error;

      const inserteData = await this.collection.insertOne(
        isValidSchema.value,
        opts,
      );
      return { _id: inserteData.inserteId, ...inserteData.ops[0] };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  /**
   *
   * @param {Array} info
   * @param {Object} opts
   * @returns
   */
  async bulkAdd(users: any, opts = { returnOriginal: false }) {
    const usersArray = users.map((e: any) => {
      const user = super.beforeInsert(e);
      const isValidSchema = this.joiSchema().validate(user);
      if (isValidSchema.error) throw isValidSchema.error;
      return isValidSchema.value;
    });
    return this.collection.insertMany(usersArray, opts);
  }

  /**
   *
   * @param {Object} _id
   * @param {Object} info
   * @returns {Object} updated document
   */
  async update(_id: any, info: any, opts = { returnOriginal: false }) {
    const updateObj = super.beforeUpdate(info.$set);
    const isValidSchema = this.joiSchema().validate(updateObj);
    if (isValidSchema.error) throw isValidSchema.error;
    return this.collection.findOneAndUpdate(
      { _id },
      { $set: isValidSchema.value },
      opts,
    );
  }

  async updateByCond(where: any, info: any, opts = { returnOriginal: false }) {
    const updateObj = super.beforeUpdate(info.$set);
    const isValidSchema = this.joiSchema().validate(updateObj);
    if (isValidSchema.error) throw isValidSchema.error;

    return this.collection.findOneAndUpdate(
      where,
      { $set: isValidSchema.value },
      opts,
    );
  }

  /**
   * Find a specific document by ID
   * @param {Object} _id
   * @returns {Object} a document
   */
  async get(where: any) {
    console.log('=====> get <====moth==', where);
    return this.collection.find(where).toArray();
  }

  async getOne(where: any) {
    return this.collection.findOne(where);
  }
}

export = UserProfile;
