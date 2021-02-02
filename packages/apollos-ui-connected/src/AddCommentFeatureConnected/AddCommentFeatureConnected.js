import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { AddCommentInput } from '@apollosproject/ui-kit';
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

  const [addComment] = useMutation(ADD_COMMENT);
  const currentPerson = data?.currentUser;
  const node = data?.node;

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
