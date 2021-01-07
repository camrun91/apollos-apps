import ApollosConfig from '@apollosproject/config';
import { PostgresDataSource } from '../postgres';

const { ROCK, ROCK_MAPPINGS, ROCK_CONSTANTS } = ApollosConfig;

export default class ContentItem extends PostgresDataSource {
  initialize(...args) {
    super.initialize(...args);
    this.model = this.sequelize.models.content_item;
  }
}
