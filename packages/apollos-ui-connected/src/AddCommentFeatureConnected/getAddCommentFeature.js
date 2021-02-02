import gql from 'graphql-tag';
import ApollosConfig from '@apollosproject/config';

export default gql`
  query getAddCommentFeature($featureId: ID!) {
    node(id: $featureId) {
      ...AddCommentFeatureFragment
    }
  }
  ${ApollosConfig.FRAGMENTS.ADD_COMMENT_FEATURE_FRAGMENT}
`;
