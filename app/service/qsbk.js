"use strict";

const Service = require("egg").Service;
const _ = require("lodash");

const ua =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

class QsbkService extends Service {
  async random() {
    const { ctx } = this;
    const ids = await ctx.service.joke.findIds();
    const randomIndex = _.random(0, ids.length);
    const randomJoke = await ctx.service.joke.findContentById(ids[randomIndex]);
    return randomJoke;
  }

  async fetch() {
    const maxPage = 10;
    for (let i = 1; i <= maxPage; i++) {
      try {
        await this.fetchByPage(i);
      } catch (e) {
        // ignore
      }
    }
  }

  async fetchByPage(page) {
    const { ctx } = this;
    const url = `https://www.qiushibaike.com/text/?page=${page}`;
    const res = await ctx.curl(url, {
      type: "GET",
      dataType: "json",
      timeout: 10000,
      headers: {
        "User-Agent": ua,
      },
    });
    if (res.status !== 200) {
      return;
    }
    if (!_.isArray(res.data)) {
      return;
    }
    for (let i = 0; i < res.data.length; i++) {
      const joke = res.data[i].data;
      try {
        await ctx.service.joke.create({
          id: joke.id,
          like: joke.pos || 0,
          content: joke.content,
        });
      } catch (e) {
        console.log(e);
        // ignore
      }
    }
  }
}

module.exports = QsbkService;
