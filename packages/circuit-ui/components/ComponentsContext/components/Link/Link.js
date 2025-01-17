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
import PropTypes from 'prop-types';

import { childrenPropType } from '../../../../util/shared-prop-types';

/**
 * A barebones Link component that's basically just an `<a>` tag
 */
const Link = forwardRef(({ children, ...props }, ref) => (
  <a {...props} ref={ref}>
    {children}
  </a>
));

Link.displayName = 'Link';

Link.propTypes = {
  children: childrenPropType,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

/**
 * @component
 */
export default Link;
