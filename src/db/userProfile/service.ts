import { getUserInDBIg, userIf } from '../../interface/userSignUpIf';
/**
 * UserProfileService will be exported and will be used by dev to fetch/update/create data in db
 */
class UserProfileService {
  public UserProfile: any;

  constructor(UserProfile: any) {
    this.UserProfile = UserProfile;
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */
  async addUser(info: any, opts: any) {
    this.UserProfile.requiredFields(info);
    return this.UserProfile.add(info, opts);
  }

  /**
   *
   * @param {object} info
   * @returns created user
   */
  async bulkAdd(info: any, opts: any) {
    await Promise.all(info.map((e: any) => this.UserProfile.requiredFields(e)));
    return this.UserProfile.bulkAdd(info, opts);
  }

  /**
   *
   * @param {objectId} _id
   * @param {object} info
   * @returns
   */
  async updateUser(playerId: getUserInDBIg, info: userIf, opts: any) {
    return this.UserProfile.updateByCond(playerId, info, opts);
  }

  async getUser(where: getUserInDBIg) {
    try {
      return this.UserProfile.getOne(where);
    } catch (error) {
      // logger.error(error);
      throw new Error(error);
    }
  }
}

export = UserProfileService;
