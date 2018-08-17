import React from 'react';
import renderer from 'react-test-renderer';

import { ThemeProvider } from 'apollos-church-app/src/ui/theme';

import SkeletonImage from './SkeletonImage';

describe('the SkeletonImage component', () => {
  it('should render a loading state', () => {
    const tree = renderer.create(
      <ThemeProvider>
        <SkeletonImage onReady={false} />
      </ThemeProvider>
    );
    expect(tree).toMatchSnapshot();
  });
});
