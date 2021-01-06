/* eslint-disable no-param-reassign */

import { Sequelize, DataTypes } from 'sequelize';
import { Config } from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';

const sequelize = new Sequelize(
  Config?.DATABASE?.URL ||
    `sqlite:${process.env.PWD}/${process.env.NODE_ENV}.db`
);

class PostgresDataSource {
  initialize(config) {
    this.context = config.context;
    this.sequelize = sequelize;
  }
}

const createModel = ({
  modelName,
  attributes,
  sequelizeOptions,
  resolveType,
  external = false,
}) => {
  const model = sequelize.define(
    modelName,
    {
      ...attributes,
      apollos_id: DataTypes.STRING,
      ...(resolveType ? { apollos_type: DataTypes.STRING } : {}),
      ...(external
        ? { origin_id: DataTypes.STRING, origin_type: DataTypes.STRING }
        : {}),
    },
    {
      beforeCreate: (instance) => {
        // First, compoute the apollos type from the resolve type, if passed.
        if (resolveType && !instance.apollos_type) {
          instance.apollos_type = resolveType(instance);
        }
        // Second, use the origin id to copmute the apollos id (if it exists)
        if (
          instance.origin_id != null &&
          instance.apollos_type != null &&
          !instance.apollos_id
        ) {
          instance.apollos_id = createGlobalId(
            instance.apollos_type,
            instance.origin_id
          );
          // Finally, compute the apollos_id from the apollos_type and the id if passed.
          // } else if (instance.id != null && instance.apollos_type && != null && !instance.apollos_id){
          // instance.apollos_id = createGlobalId(instance.apollos_type, instance.origin_id);
        }
      },
    },
    {
      ...sequelizeOptions,
      indexes: [
        { unique: true, fields: ['apollos_id'] },
        ...sequelizeOptions.indexes,
      ],
    }
  );

  return model;
};

const sync = async () => await sequelize.sync();

export { createModel, sync, sequelize, PostgresDataSource };
