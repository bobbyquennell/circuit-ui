/**
 * Copyright 2020, SumUp Ltd.
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

import { Transform, JSCodeshift, Collection } from 'jscodeshift';

import { findLocalNames } from './utils';

function transformFactory(
  j: JSCodeshift,
  root: Collection,
  filePath: string,
  buttonName: string,
): void {
  const components = findLocalNames(j, root, buttonName);

  if (!components) {
    return;
  }

  components.forEach((component) => {
    root
      .findJSXElements(component)
      .find(j.JSXAttribute, {
        name: {
          type: 'JSXIdentifier',
          name: 'bold',
        },
      })
      .filter((nodePath) => {
        const hasValue = Boolean(nodePath.value.value);
        if (hasValue) {
          console.error(
            [
              `Cannot migrate the "${component}" component automatically,`,
              `please apply the change manually.\n  in ${filePath}`,
            ].join(' '),
          );
        }
        return !hasValue;
      })
      .replaceWith(() =>
        j.jsxAttribute(
          j.jsxIdentifier('variant'),
          j.stringLiteral('highlight'),
        ),
      );
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const filePath = file.path;

  transformFactory(j, root, filePath, 'Body');
  transformFactory(j, root, filePath, 'Text');
  transformFactory(j, root, filePath, 'Anchor');

  return root.toSource();
};

export default transform;
