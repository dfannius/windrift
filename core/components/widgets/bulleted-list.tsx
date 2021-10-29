/**
 * A bulleted list presentation where the unpicked items remain in the list
 * @example will produce "<ul><li>Item 1</li><li>Item 2</li></ul>"
 *
 * It's recommended to implement your own custom version of this component to match
 * the desired HTML.
 */

import * as React from 'react'
import { isEqual } from 'lodash'

import Link from 'core/components/link'
import { WidgetProps } from '.'

declare function BulletedListType(props: WidgetProps): JSX.Element

// Passing initialChoices means you can leave the existing ones there
const InlineList: typeof BulletedListType = ({
    group = [],
    handler = null,
    tag = null,
    initialOptions = [],
    className = null,
    isComplete = false
}: WidgetProps): JSX.Element => {
    return (
        <ul>
            {[...initialOptions].map((t, i) => (
                <li key={i} className={className}>
                    <Link handler={handler} text={t} tag={tag} isComplete={isComplete} />
                    {group.map((g) => {
                        if (!isEqual(initialOptions, group) && g === t) {
                            return ' (selected)'
                        }
                    })}
                </li>
            ))}
        </ul>
    )
}

export default InlineList
