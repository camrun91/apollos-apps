import { DataTypes } from 'sequelize';
import { defineModel, configureModel } from '../postgres';

const createModel = defineModel({
  modelName: 'content_item',
  attributes: {
    title: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    coverImageUrl: DataTypes.STRING,
    publishedAt: DataTypes.DATE,
    htmlContent: DataTypes.TEXT,
  },
  external: true,
});

const setupModel = configureModel(({ sequelize }) => {
  // eslint-disable-next-line camelcase
  const { content_item, media } = sequelize.models;
  content_item.hasMany(media, {
    foreignKey: 'mediableId',
    constraints: false,
    scope: {
      mediableType: 'content_item',
    },
  });
  media.belongsTo(content_item, {
    foreignKey: 'mediableId',
    constraints: false,
  });
});

export { createModel, setupModel };
