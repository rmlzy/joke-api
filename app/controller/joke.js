"use strict";

const Controller = require("egg").Controller;

class JokeController extends Controller {
  async random() {
    const { ctx } = this;
    try {
      const joke = await ctx.service.qsbk.random();
      ctx.body = { code: 200, message: "SUCCESS", data: joke };
    } catch (e) {
      console.log(e);
      ctx.body = { code: 500, message: "ERROR" };
    }
  }

  async fetch() {
    const { ctx } = this;
    try {
      ctx.runInBackground(async () => {
        await ctx.service.qsbk.fetch();
      });
      ctx.body = { code: 200, message: "SUCCESS" };
    } catch (e) {
      console.log(e);
      ctx.body = { code: 500, message: "ERROR" };
    }
  }
}

module.exports = JokeController;
