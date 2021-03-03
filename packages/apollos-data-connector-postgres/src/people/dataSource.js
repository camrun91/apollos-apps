import { AuthenticationError } from 'apollo-server';
import { camelCase, get } from 'lodash';
import ApollosConfig from '@apollosproject/config';
import { Op } from 'sequelize';

import { PostgresDataSource, assertUuid } from '../postgres';

export const fieldsAsObject = (fields) =>
  fields.reduce(
    (accum, { field, value }) => ({
      ...accum,
      [camelCase(field)]: typeof value === 'string' ? value.trim() : value,
    }),
    {}
  );

export const camelCaseKeys = (obj) => {
  return Object.keys(obj).reduce((accum, curr) => {
    // eslint-disable-next-line no-param-reassign
    accum[camelCase(curr)] = obj[curr];
    return accum;
  }, {});
};

export default class Person extends PostgresDataSource {
  modelName = 'people';

  async create(attributes) {
    const cleanedAttributes = camelCaseKeys(attributes);
    const person = await this.model.create({
      ...cleanedAttributes,
      ...(cleanedAttributes.gender
        ? { gender: cleanedAttributes.gender.toUpperCase() }
        : {}),
    });
    return person.id;
  }

  buildFindOneQuery = () => {};

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

  getStaticSuggestedFollowsFor = async ({ campusId, id }) => {
    assertUuid(campusId, 'getStaticSuggestedFollowsFor');
    assertUuid(id, 'getStaticSuggestedFollowsFor');

    const suggestedFollowers = get(ApollosConfig, 'SUGGESTED_FOLLOWERS', []);
    const suggestedFollowersForCampus = suggestedFollowers.filter((p) => {
      // if the suggested follower has a specific campus.
      if (p.campusId) {
        // match it against the user's campus, if they have a campus
        return !!campusId && p.campusId === campusId;
      }
      // If not, return true.
      return true;
    });

    // Suggested followers is a list of mixed emails strings and objects with an email key.
    const suggestedEmails = suggestedFollowersForCampus.map((p) =>
      p.email ? p.email : p
    );

    // TODO: add code that hides users who you haven't followed before.
    return this.model.findAll({
      where: { email: { [Op.in]: suggestedEmails }, id: { [Op.ne]: id } },
    });
  };
}
