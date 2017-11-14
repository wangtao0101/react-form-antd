import React from 'react';
import { storiesOf } from '@storybook/react';

import TestInput from './TestInput';
import TestLayout from './TestLayout';
import TestTextArea from './TestTextArea';
import TestInputNumber from './TestInputNumber';

storiesOf('Components', module)
    .add('Layout', () => <TestLayout />)
    .add('Input', () => <TestInput />)
    .add('Area', () => <TestTextArea />)
    .add('InputNumber', () => <TestInputNumber />);
