import { AuthenticationError } from 'apollo-server';
import { camelCase } from 'lodash';

import { PostgresDataSource } from '../postgres';

export const fieldsAsObject = (fields) =>
  fields.reduce(
    (accum, { field, value }) => ({
      ...accum,
      [camelCase(field)]: typeof value === 'string' ? value.trim() : value,
    }),
    {}
  );

export default class Person extends PostgresDataSource {
  modelName = 'people';

  // fields is an array of objects matching the pattern
  // [{ field: String, value: String }]
  updateProfile = async (fields) => {
    const { Auth } = this.context.dataSources;
    const currentPerson = await Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    let where = { id: currentPerson.id };
    if (Auth.ORIGIN_TYPE) {
      where = {
        originId: String(currentPerson.id),
        originType: Auth.ORIGIN_TYPE,
      };
    }

    const profileFields = fieldsAsObject(fields);

    await this.model.update(profileFields, { where });

    return this.model.findOne({ where });
  };

  uploadProfileImage = async (file, length) => {
    const {
      dataSources: { Auth, BinaryFiles },
    } = this.context;

    const currentPerson = await Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    const { createReadStream, filename } = await file;

    const stream = createReadStream();

    const photoId = await BinaryFiles.uploadFile({ filename, stream, length });
    const url = await BinaryFiles.findOrReturnImageUrl({ id: photoId });

    let where = { id: currentPerson.id };
    if (Auth.ORIGIN_TYPE) {
      where = {
        originId: String(currentPerson.id),
        originType: Auth.ORIGIN_TYPE,
      };
    }

    await this.model.update({ profileImageUrl: url }, { where });

    return this.model.findOne({ where });
  };
}
