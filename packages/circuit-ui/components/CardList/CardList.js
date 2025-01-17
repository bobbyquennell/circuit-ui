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

import styled from '@emotion/styled';

import Card from '../Card';

/**
 * Component that wraps a list of CardList.Item components
 */
const Wrapper = styled(Card)`
  padding: 0;
  border-radius: ${(p) => p.theme.borderRadius.bit};
  border: ${(p) => `${p.theme.borderWidth.kilo} solid ${p.theme.colors.n300}`};
`;

Wrapper.defaultProps = Card.defaultProps;
Wrapper.displayName = 'CardList';

/**
 * @component
 */
export default Wrapper;
