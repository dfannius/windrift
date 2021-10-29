import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import { CombinedState, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { InventoryState, update as updateInventory } from 'core/features/inventory'
import { LogState, update as logUpdate } from 'core/features/log'
import { Tag, ENTRY_TYPES, Next, Config, NextType, RootState } from 'core/types'
import { gotoChapter, incrementSection, NavState } from 'core/features/navigation'
import { CounterState, increment } from 'core/features/counter'

export type Option = string
export type OptionGroup = Array<Option>
export type Options = Array<OptionGroup>

// A Choice is composed of a Tag and Options
// Options are one or more OptionGroups
// An OptionGroup is an array of one or more

export interface ChoiceState {
    [tag: Tag]: {
        readonly initialOptions: Options
        options: Options
    }
}

interface InitChoicePayload {
    tag: Tag
    options: Options
}
interface OptionAdvancePayload {
    tag: Tag
}

const initialState: ChoiceState = null

export interface NextPayload {
    next: NextType
    filename: string
}
export const makeChoice =
    (tag: Tag, option?: Option, nextPayload?: NextPayload) =>
    (dispatch: Dispatch, getState: () => RootState, config: Config): void => {
        const choiceId = uuidv4()
        const state = getState()
        const { counter } = state
        if (option) {
            dispatch(updateInventory({ tag, option }))
        }
        dispatch(
            logUpdate({
                entry: {
                    id: choiceId,
                    tag,
                    option,
                    entry: ENTRY_TYPES.Choice,
                    timestamp: new Date().toLocaleDateString()
                }
            })
        )
        console.log('next payload: ', nextPayload)
        // If we've now exhausted the list of possible choices, invoke `next`
        if (nextPayload) {
            const { next, filename } = nextPayload
            if (next === Next.Section) {
                dispatch(incrementSection({ filename }))
            } else if (next === Next.None) {
                // no-op
            } else if (typeof next === 'string') {
                dispatch(gotoChapter({ filename: next }))
            }
        }

        // Update browser do/redo
        const s = {}
        s[config.identifier] = counter.present.value
        window.history.pushState(s, `Turn: ${counter}`, null)

        dispatch(increment())
    }

export const choicesSlice = createSlice({
    name: 'choices',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<InitChoicePayload>) => {
            const { tag, options } = action.payload
            if (!(tag in state)) {
                state[tag] = {
                    options,
                    initialOptions: options
                }
            }
        },
        // Advance to the next option group. If no next group is available, do nothing
        advance: (state, action: PayloadAction<OptionAdvancePayload>) => {
            const { tag } = action.payload
            if (tag in state) {
                state[tag].options.shift()
            }
        }
    }
})

export const { init, advance } = choicesSlice.actions

export default undoable(choicesSlice.reducer, { filter: excludeAction('choices/init') })
