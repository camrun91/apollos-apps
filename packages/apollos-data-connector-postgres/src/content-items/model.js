import { DataTypes } from 'sequelize';
import { defineModel, configureModel } from '../postgres';

const createModel = defineModel({
  modelName: 'contentItem',
  resolveType: () => 'UniversalContentItem', // shouldn't get called, ContentItem will be set on the shovel.
  external: true,
  attributes: {
    title: DataTypes.TEXT,
    summary: DataTypes.TEXT,
    htmlContent: DataTypes.TEXT,
    publishAt: DataTypes.DATE,
    active: DataTypes.BOOLEAN,
  },
  sequelizeOptions: {
    tableName: 'content_item',
    underscored: true,
  },
});

const setupModel = configureModel(({ sequelize }) => {
  sequelize.models.contentItem.addScope('defaultScope', {
    include: [{ model: sequelize.models.media, as: 'coverImage' }],
    where: { active: true },
  });
  sequelize.models.contentItem.belongsTo(sequelize.models.media, {
    as: 'coverImage',
    foreignKey: 'coverImageId',
  });

  sequelize.models.contentItem.belongsTo(sequelize.models.contentItem, {
    as: 'parent',
    foreignKey: 'parentId',
  });

  sequelize.models.contentItem.hasMany(sequelize.models.contentItem, {
    as: 'directChildren',
    foreignKey: 'parentId',
  });
});

export { createModel, setupModel };
