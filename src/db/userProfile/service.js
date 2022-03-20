/**
 * UserProfileService will be exported and will be used by dev to fetch/update/create data in db
 */
class UserProfileService {
  

  constructor(UserProfile) {
    this.UserProfile = UserProfile;
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */
  async addUser(info, opts) {
    this.UserProfile.requiredFields(info);
    return this.UserProfile.add(info, opts);
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */
  async bulkAdd(info, opts) {
    await Promise.all(info.map((e) => this.UserProfile.requiredFields(e)));
    return this.UserProfile.bulkAdd(info, opts);
  }

  /**
   *
   * @param {objectId} _id
   * @param {object} info
   * @returns
   */
  async updateUser(playerId, info, opts) {
    return this.UserProfile.updateByCond(playerId, info, opts);
  }

  async getUser(where) {
    try {
      return this.UserProfile.getOne(where);
    } catch (error) {
      
      throw new Error(error);
    }
  }
}

module.exports = UserProfileService;
