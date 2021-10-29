import { SyntaxHighlighter, prism } from '..'

import { Choice, Section, Chapter, Nav } from 'core/components'
import { BulletedList } from 'core/components/widgets'
import { PageType, Next } from 'core/types'

export const Page: PageType = () => (
    <Chapter filename="choices">
        <Section>
            <h2>Choices</h2>
            <p>
                Windrift interactivity is primarily composed of user choices—selecting from a menu
                of options to drive the next beat in the narrative.
            </p>
            <p>
                A <code>Choice</code> is composed of one or more <code>Options</code> collected into{' '}
                an <code>OptionGroup</code>. Each choice is given a unique <code>tag</code>. The
                simplest type of choice is a single option group from which the user picks:
            </p>

            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice options={['ripe banana', 'bulbous orange', 'fuzzy kiwi']} tag="fruit" />`}
            </SyntaxHighlighter>
            <aside>
                Would you like a{' '}
                <Choice options={['ripe banana', 'bulbous orange', 'fuzzy kiwi']} tag="fruit" />?
            </aside>
            <p>
                By default, selecting an option will record the user's choice, leave the selected
                option visible, and then open the next <code>Section</code> in the chapter. Click on
                any of the options above to open the next section.
            </p>
        </Section>
        <Section>
            <h3>First/last choices</h3>
            <p>
                A common pattern is to introduce some first text before revealing the options. You
                can achieve this through the <code>first</code> parameter applied to the
                <code>Choice</code> component:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    first="fine choices today..."
    options={['orange kale', 'purple cucumbers', 'green pumpkins']}
    tag="vegetables" />`}
            </SyntaxHighlighter>
            <aside>
                The vegetable vendor is offering you some{' '}
                <Choice
                    first="fine choices today..."
                    options={['orange kale', 'purple cucumbers', 'green pumpkins']}
                    tag="vegetables"
                    next={Next.None}
                />
                .
            </aside>
            <p>
                Similarly, you can apply a <code>last</code> parameter to show some final text after
                the user's selection was made:
            </p>
            <aside>
                The dessert cart contains{' '}
                <Choice
                    options={['towering birthday cake', 'bumbling soufflé', 'delicate cheesecake']}
                    last="too many delicious things to count"
                    tag="dessert"
                    next={Next.None}
                />
                .
            </aside>
            <p>Naturally both of these can be applied to the same element:</p>
            <aside>
                The waiter asks if you'd like to take home{' '}
                <Choice
                    first="the leftovers"
                    options={[
                        'spare appetizers',
                        'the second Porterhouse steak',
                        'an entire cheese cart'
                    ]}
                    last="enough food for a week"
                    tag="takehome"
                />
                .
            </aside>
        </Section>
        <Section>
            <h2>Choice displays: widgets</h2>
            <p>
                Display of choices is controlled by another component, called a widget, called by
                the
                <code>Choice</code>. By default, Windrift uses a widget called
                <code>InlineListEN</code>, which displays options in a comma-separated list ending
                in the conjunction "or". The separator and conjunction can be directly overridden,
                or a different widget can be substituted entirely by passing any widget's
                configuration options as an <code>extra</code> attribute:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    tag="pet"
    options={['an adorable skink', 'a sweet-tempered marmot']}
    extra={{ conjunction: 'and' }} />`}
            </SyntaxHighlighter>
            <aside>
                <p>
                    You are greeted by{' '}
                    <Choice
                        tag="pet"
                        options={['an adorable skink', 'a sweet-tempered marmot']}
                        extra={{ conjunction: 'and' }}
                    />
                    .
                </p>
            </aside>
            <p>
                See the source code for <code>InlineListEN</code> for an example of how to make a
                language-specific widget to avoid having to specify the conjunction each time, or to
                use a language-specific separator besides comma (or even to override Windrift's
                opinionated use of the Oxford comma!)
            </p>
            <h3>Bulleted list widget</h3>
            <p>
                Windrift ships with another type of widget with behavior worth noting. This
                preserves all of the options in a menu-style layout:
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice
    options={['smarmy poplar', 'clever elm', 'big dumb baobab']}
    tag="tree"
    widget={BulletedList} />`}
            </SyntaxHighlighter>
            <aside>
                <p>What is your favorite kind of sentient tree?</p>
                <Choice
                    options={['smarmy poplar', 'clever elm', 'big dumb baobab']}
                    tag="tree"
                    widget={BulletedList}
                />
            </aside>
            <p>
                This widget takes an additional parameter internally, called{' '}
                <code>initialOptions</code>, which is used to continue to display the possible
                choices even after a user has selected one. You're expected to use this code more as
                a guide rather than as-is, since you'll almost certainly want to customize the
                markup used to indicate the selected option.
            </p>

            <h3>Cycling choices</h3>
            <p>
                One pattern you may want to use is to have text replace itself repeatedly (this user
                interface is called "cycling choices" by Twine, though the semantics are different.)
            </p>
            <p>
                Using only a single <code>Choice</code> component, it's possible to present text
                that can replace itself three times, by combining the <code>first</code> and
                <code>last</code> parameters with a two-item <code>option</code> array, where the
                second item is <code>null</code>. Providing an option array with only a single item
                will cause Windrift to think it's a choice array that has been exhausted, and not
                display an anchor link.
            </p>
            <SyntaxHighlighter language="tsx" style={prism}>
                {`<Choice tag="countdown"
    first="Three..."
    options={['Two...', null]}
    last="One..."  />`}
            </SyntaxHighlighter>
            <aside>
                <Choice first="Three..." options={['Two...', null]} last="One..." tag="countdown" />
            </aside>
        </Section>
        <Section>
            <p>In the next section we'll see how selected or default values can be retrieved.</p>
            <Nav text="Learn about displaying inventory..." next="inventory" />
        </Section>
    </Chapter>
)
