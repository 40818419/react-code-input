import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

// addon-info
setDefaults({
              header: false, // Toggles display of header with component name and description
            });
