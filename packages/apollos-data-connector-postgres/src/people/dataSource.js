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

    const profileFields = fieldsAsObject(fields);

    await this.model.update(profileFields, { where: { id: currentPerson.id } });

    return {
      ...currentPerson,
      ...profileFields,
    };
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

    await this.model.update(
      { profileImageUrl: url },
      { where: { id: currentPerson.id } }
    );

    return { ...currentPerson, { profileImageUrl: url } };
  };
}
