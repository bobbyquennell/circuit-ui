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

import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { includes } from 'lodash/fp';

import { typography, shadowSingle } from '../../styles/style-mixins';
import {
  positionPropType,
  childrenPropType,
} from '../../util/shared-prop-types';

const baseStyles = ({ theme }) => css`
  display: inline-block;
  width: auto;
  max-width: 280px;
  min-width: 120px;
  background-color: ${theme.colors.n900};
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.bit};
  padding: ${theme.spacings.byte} ${theme.spacings.kilo};
  position: absolute;
  z-index: ${theme.zIndex.tooltip};
  transition: opacity 0.3s;

  &::after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border: ${theme.spacings.byte} solid transparent;
  }
`;

const positionMap = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

const getPositionStyles = ({ theme, position }) => {
  const absolutePosition = positionMap[position];

  // The first absolute position rule is a fallback.
  return `
    ${absolutePosition}: 100%;
    ${absolutePosition}: calc(100% + ${theme.spacings.kilo});

    &::after {
      ${position}: 100%;
      border-${position}-color: ${theme.colors.n900};
    }
  `;
};

const getAlignmentStyles = ({ theme, position, align }) => {
  const isHorizontal = includes(position, ['top', 'bottom']);

  if (isHorizontal && includes(align, ['top', 'bottom', 'center'])) {
    return `
      left: 50%;
      transform: translateX(-50%);

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    `;
  }

  if (!isHorizontal && includes(align, ['left', 'right', 'center'])) {
    return `
      top: 50%;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        transform: translateY(-50%);
      }
    `;
  }

  const absolutePosition = positionMap[align];

  /* eslint-disable max-len */
  return `
    ${absolutePosition}: 50%;
    ${absolutePosition}: calc(50% - (${theme.spacings.mega} + ${theme.spacings.bit}));

    &::after {
      ${absolutePosition}: ${theme.spacings.kilo};
    }
  `;
  /* eslint-enable max-len */
};

const positionAndAlignStyles = ({
  theme,
  position = 'right',
  align = 'center',
}) => css`
  ${getAlignmentStyles({ theme, position, align })};
  ${getPositionStyles({ theme, position })};
`;

/**
 * A Tooltip component
 */
const Tooltip = styled('div')(
  typography('two'),
  baseStyles,
  shadowSingle,
  positionAndAlignStyles,
);

Tooltip.propTypes = {
  /**
   * The content of the tooltip.
   */
  children: childrenPropType.isRequired,
  /**
   * The position of the tooltip in relation to its reference point.
   */
  position: positionPropType,
  /**
   * The alignment of the tooltip relative to its position.
   */
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
};

/**
 * @component
 */
export default Tooltip;
