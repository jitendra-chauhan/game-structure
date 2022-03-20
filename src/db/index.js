const UserProfileService = require('./userProfile/service');

class DB {

  init(db, client) {
    this.mongoClient = client;
    this.UserProfile = new UserProfileService(new UserProfileModel(db)); 
  }
}

/**
 * exports db model services, it will be used to devs to fetch,insert or update data to databse
 */
module.exports = new DB();
