import { AuthenticationError, UserInputError } from 'apollo-server';
import { camelCase, mapKeys } from 'lodash';

import ApollosConfig from '@apollosproject/config';
import { PostgresDataSource, isApollosId } from '../postgres';

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
    const { Auth } = this.context.dataSources;
    const currentPerson = await Auth.getCurrentPerson();

    if (!currentPerson) throw new AuthenticationError('Invalid Credentials');

    let query = { id: currentPerson.id };

    if (!isApollosId(currentPerson.id) && Auth.ORIGIN_TYPE) {
      query = { originId: currentPerson.id, originType: Auth.ORIGIN_TYPE };
    }

    const profileFields = fieldsAsObject(fields);

    await this.model.update(profileFields, query);

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

    const person = await this.updateProfile([
      { field: 'PhotoId', value: photoId },
    ]);

    const photo = await BinaryFiles.getFromId(photoId);
    return { ...person, photo };
  };
}
