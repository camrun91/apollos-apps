import { DataTypes } from 'sequelize';
import { defineModel } from '../postgres';

const createModel = defineModel({
  modelName: 'media',
  attributes: {
    type: DataTypes.ENUM(['audio', 'video']),
    name: DataTypes.STRING,
    sourceUrl: DataTypes.STRING,
    embedHtml: DataTypes.STRING,
    // Sets up a polymorphic relationship so we can attach media to more than just ContentItems
    mediableType: DataTypes.STRING,
    mediableId: DataTypes.STRING,
  },
  external: true,
});

export { createModel };
