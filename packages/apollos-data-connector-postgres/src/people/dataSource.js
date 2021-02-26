import { AuthenticationError, UserInputError } from 'apollo-server';
import { camelCase, mapKeys } from 'lodash';

import ApollosConfig from '@apollosproject/config';
import { PostgresDataSource } from '../postgres';

export const fieldsAsObject = (fields) =>
  fields.reduce(
    (accum, { field, value }) => ({
      ...accum,
      [field]: typeof value === 'string' ? value.trim() : value,
    }),
    {}
  );

export default class Person extends PostgresDataSource {
  modelName = 'people';

  // fields is an array of objects matching the pattern
  // [{ field: String, value: String }]
  updateProfile = async (fields) => {
    const currentPerson = await this.context.dataSources.Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    const profileFields = fieldsAsObject(fields);

    await User.update(
      { lastName: 'Doe' },
      {
        where: {
          lastName: null,
        },
      }
    );

    await this.patch(`/People/${currentPerson.id}`, profileFields);

    return {
      ...currentPerson,
      ...mapKeys(profileFields, (_, key) => camelCase(key)),
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

    const person = await this.updateProfile([
      { field: 'PhotoId', value: photoId },
    ]);

    const photo = await BinaryFiles.getFromId(photoId);
    return { ...person, photo };
  };
}
