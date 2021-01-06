import { createModel, PostgresDataSource } from '../postgres';

const { ROCK, ROCK_MAPPINGS, ROCK_CONSTANTS } = ApollosConfig;

const ContentItemModel = createModel();

export default class ContentItem extends PostgresDataSource {}
