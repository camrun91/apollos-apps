import { AuthenticationError } from 'apollo-server';

export const enforceCurrentUser = (func) => async (
  root,
  args,
  context,
  info
) => {
  try {
    const currentPerson = await context.dataSources.Auth.getCurrentPerson();
    // If the root is a postgres person
    // And the auth datasource is not
    if (root.originType && !currentPerson.originType) {
      // Check the originId against the postgres id
      if (String(root.originId) !== String(currentPerson.id)) {
        return null;
      }
      // otherwise check id against id
    } else if (root.id !== currentPerson.id) {
      return null;
    }
  } catch (e) {
    if (!(e instanceof AuthenticationError)) {
      throw e;
    }
    return null;
  }
  return func(root, args, context, info);
};

export const latLonDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};
