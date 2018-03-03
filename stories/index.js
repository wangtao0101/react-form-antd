import React from 'react';
import { storiesOf } from '@storybook/react';
import 'antd/lib/form/style/css';

import TestInput from './TestInput';
import TestLayout from './TestLayout';
import TestTextArea from './TestTextArea';
import TestInputNumber from './TestInputNumber';
import TestSetValue from './TestSetValue';

storiesOf('Components', module)
    .add('setValue', () => <TestSetValue />)
    .add('Layout', () => <TestLayout />)
    .add('Input', () => <TestInput />)
    .add('Area', () => <TestTextArea />)
    .add('InputNumber', () => <TestInputNumber />);
