import React from 'react';
import { useQuery } from '@apollo/client';
import { ContentSectionList } from '@apollosproject/ui-kit';

import ContentNodeConnected, {
  GET_CONTENT_NODE,
} from '../ContentNodeConnected';
import ContentParentFeedConnected from '../ContentParentFeedConnected';
import ContentChildFeedConnected from '../ContentChildFeedConnected';
import UpNextButtonConnected from '../UpNextButtonConnected';
import NodeFeaturesConnected from '../NodeFeaturesConnected';
import ScriptureNodeConnected from '../ScriptureNodeConnected';

// const NodeSingleInner = ({ nodeId, ImageWrapperComponent, ...props }) => (
//   <View {...props}>
//     <ScriptureNodeConnected nodeId={nodeId} />
//     <NodeFeaturesConnected nodeId={nodeId} />
//     <UpNextButtonConnected nodeId={nodeId} />
//     <ContentParentFeedConnected nodeId={nodeId} />
//     <ContentChildFeedConnected nodeId={nodeId} />
//   </View>
// );
const makeHtmlSection = ({ nodeId }) => [
  {
    key: 'html-content',
    title: 'A very long multiline title la de dah hello there! Even longer yo!',
    data: [
      {
        key: 'html-content',
        renderItem: () => (
          <ContentNodeConnected
            showTitle={false}
            showCoverImage={false}
            nodeId={nodeId}
          />
        ),
      },
    ],
  },
];

const makeScriptureSection = ({ nodeId }) => [
  {
    key: 'scripture',
    title: 'Scripture',
    data: [
      {
        key: 'scripture',
        renderItem: () => <ScriptureNodeConnected nodeId={nodeId} />,
      },
    ],
  },
];

const NodeSectionInner = ({ nodeId }) => {
  const { data: { node: contentNode } = {} } = useQuery(GET_CONTENT_NODE, {
    variables: { nodeId },
  });
  const sections = [
    ...makeHtmlSection({ nodeId }),
    ...makeScriptureSection({ nodeId }),
  ];

  return (
    <ContentSectionList
      sections={sections}
      title={contentNode?.title}
      summary={contentNode?.summary}
      onPressLike={() => {}}
      onPressShare={() => {}}
      coverImage={contentNode?.coverImage}
    />
  );
};

export default NodeSectionInner;
