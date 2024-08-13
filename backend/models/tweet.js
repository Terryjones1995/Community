'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tweet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tweet.init({
    user: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    pollOptions: DataTypes.JSON,
    location: DataTypes.STRING,
    timestamp: DataTypes.DATE,
    views: DataTypes.INTEGER,
    reposts: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    replies: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Tweet',
  });
  return Tweet;
};