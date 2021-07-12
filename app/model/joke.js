module.exports = (app) => {
  const { INTEGER, TEXT } = app.Sequelize;

  const Joke = app.model.define("joke", {
    id: {
      type: INTEGER(10),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    content: {
      type: TEXT,
    },

    like: {
      type: INTEGER,
      default: 0,
    },

    read: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  return Joke;
};
