const Subscription = require("egg").Subscription;

class FetchQsbk extends Subscription {
  static get schedule() {
    return {
      interval: "4h",
      type: "all",
      immediate: true,
    };
  }

  async subscribe() {
    const { ctx } = this;
    try {
      await ctx.service.qsbk.fetch();
    } catch (e) {
      ctx.logger.error("定时抓取糗事百科失败: ", e);
    }
  }
}

module.exports = FetchQsbk;
