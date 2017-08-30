import React from 'react';
import { storiesOf } from '@storybook/react';

import TestInput from './TestInput';
import TestLayout from './TestLayout';

storiesOf('Components', module).add('Input', () => <TestInput />)
    .add('Layout', () => <TestLayout />);
