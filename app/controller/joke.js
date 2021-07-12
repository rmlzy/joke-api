"use strict";

const Controller = require("egg").Controller;

class JokeController extends Controller {
  async home() {
    const { ctx } = this;
    try {
      const joke = await ctx.service.qsbk.random();
      ctx.body = `<div style="height: 100vh; display: flex; align-items: center; padding: 0 100px; font-size: 30px"><p>${joke}</p></div>`;
    } catch (e) {
      ctx.body = "Something went wrong";
    }
  }

  async random() {
    const { ctx } = this;
    try {
      const joke = await ctx.service.qsbk.random();
      ctx.body = { code: 200, message: "SUCCESS", data: joke };
    } catch (e) {
      console.log(e);
      ctx.body = { code: 500, message: "Something went wrong" };
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
      ctx.body = { code: 500, message: "Something went wrong" };
    }
  }
}

module.exports = JokeController;
