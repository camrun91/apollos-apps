import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { AddCommentInput } from '@apollosproject/ui-kit';

import GET_NODE_FEATURE_FEED from '../FeaturesFeedConnected/getFeatureFeed';
import GET_NODE_FEATURES from '../NodeFeaturesConnected/getNodeFeatures';
import GET_COMMENT_LIST_FEATURE from '../CommentListFeatureConnected/getCommentListFeature';

import GET_ADD_COMMENT_FEATURE from './getAddCommentFeature';
import ADD_COMMENT from './addComment';

const AddCommentFeatureConnected = ({
  featureId,
  Component,
  isLoading,
  refetchRef,
  ...props
}) => {
  const { data, loading, refetch } = useQuery(GET_ADD_COMMENT_FEATURE, {
    variables: {
      featureId,
    },
  });

  if (featureId && refetch && refetchRef)
    refetchRef({ refetch, id: featureId });

  const currentPerson = data?.currentUser;
  const node = data?.node;

  const [addComment] = useMutation(ADD_COMMENT, {
    update: (cache, { data: { addComment } }) => {
      try {
        const parentNode = cache.readQuery({
          query: GET_NODE_FEATURES,
          variables: { nodeId: node.relatedNode.id },
        }).node;
        const myFeatureFeed = cache.readQuery({
          query: GET_NODE_FEATURE_FEED,
          variables: { featureFeedId: parentNode.featureFeed.id },
        }).node;

        const commentListFeatureId = myFeatureFeed.features.find(
          ({ __typename }) => __typename === 'CommentListFeature'
        ).id;

        const commentListFeature = cache.readQuery({
          query: GET_COMMENT_LIST_FEATURE,
          variables: { featureId: commentListFeatureId },
        });

        cache.writeQuery({
          query: GET_COMMENT_LIST_FEATURE,
          variables: { featureId: commentListFeatureId },
          data: {
            ...commentListFeature,
            node: {
              ...commentListFeature.node,
              comments: [addComment, ...commentListFeature.node.comments],
            },
          },
        });
      } catch (e) {
        console.warn('Failed to update cache after adding comment', e);
      }
    },
  });

  return (
    <Component
      {...node}
      {...props}
      loading={isLoading || loading}
      onSubmit={(text) =>
        addComment({
          variables: {
            text,
            parentId: node.relatedNode.id,
          },
        })
      }
      profile={currentPerson?.profile}
    />
  );
};

AddCommentFeatureConnected.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  featureId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  refetchRef: PropTypes.func,
};

AddCommentFeatureConnected.defaultProps = {
  Component: AddCommentInput,
};

export default AddCommentFeatureConnected;
