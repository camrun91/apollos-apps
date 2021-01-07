import { DataTypes } from 'sequelize';
import { defineModel, configureModel } from '../postgres';

const createModel = defineModel({
  modelName: 'content_channel',
  attributes: {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
  },
  external: true,
});

const setupModel = configureModel(({ sequelize }) => {
  console.log('SETUP CHANNEL BLA');
  // eslint-disable-next-line camelcase
  const { content_item, content_channel } = sequelize.models;
  content_channel.hasMany(content_item);
  content_item.belongsTo(content_channel);
});

export { createModel, setupModel };
