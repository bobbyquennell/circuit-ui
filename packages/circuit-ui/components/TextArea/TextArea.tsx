/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { forwardRef } from 'react';
import { css } from '@emotion/core';

import Input from '../Input';
import { InputProps } from '../Input/Input';

export type TextAreaProps = InputProps;

const textAreaStyles = css`
  overflow: auto;
  resize: vertical;
`;

/**
 * TextArea component for forms.
 */
export const TextArea = forwardRef(
  (props: TextAreaProps, ref: TextAreaProps['ref']) => (
    <Input {...props} inputStyles={textAreaStyles} as="textarea" ref={ref} />
  ),
);

TextArea.displayName = 'TextArea';
