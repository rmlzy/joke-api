"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.joke.home);
  router.get("/fetch", controller.joke.fetch);
  router.get("/random", controller.joke.random);
};
