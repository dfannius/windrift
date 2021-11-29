import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { emitPresence, getStoryInstance } from 'core/multiplayer/api-client'
import { StoryContext } from 'pages/[story]/[[...chapter]]'

const useMultiplayer = (): void => {
    const dispatch = useDispatch()
    const { config } = React.useContext(StoryContext)
    const router = useRouter()

    React.useEffect(() => {
        const { instance, playerId } = router.query

        if (instance && playerId) {
            getStoryInstance(config.identifier, instance as string, playerId as string, dispatch)
            // Trigger a presence POST
            emitPresence(config.identifier, instance as string, playerId as string)
        }
    }, [dispatch])
}
export default useMultiplayer
