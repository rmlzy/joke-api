"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.MIN_LIKE_NUM = 100;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1626075104367_2894";

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: "mysql",
    host: "0.0.0.0",
    port: 3306,
    database: "databse",
    username: "username",
    password: "password",
  };

  return config;
};
