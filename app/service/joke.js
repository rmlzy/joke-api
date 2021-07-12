"use strict";

const Service = require("egg").Service;

class JokeService extends Service {
  async create({ id, like, content }) {
    const { ctx, config } = this;
    if (like < config.MIN_LIKE_NUM) {
      console.log("点赞数太少, 已跳过");
      return;
    }
    const exist = await ctx.model.Joke.findByPk(id);
    if (exist) {
      console.log("已存在, 跳过");
      return;
    }
    const created = await ctx.model.Joke.create({ id, like, content });
    console.log("新增了一条笑话");
    return created;
  }

  async findIds() {
    const { ctx } = this;
    const rows = await ctx.model.Joke.findAll({ attributes: ["id"] });
    return rows.map((item) => item.id);
  }

  async findContentById(id) {
    const { ctx } = this;
    const exist = await ctx.model.Joke.findByPk(id);
    ctx.runInBackground(async () => {
      await ctx.model.Joke.update({ read: exist.read + 1 }, { where: { id } });
    });
    return exist ? exist.content : null;
  }
}

module.exports = JokeService;
