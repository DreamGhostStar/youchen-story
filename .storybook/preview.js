import '../src/styles/index.scss'
import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true }
}
addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});