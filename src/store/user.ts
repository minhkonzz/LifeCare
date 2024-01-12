import { createSlice } from '@reduxjs/toolkit'
import { UserState } from '@utils/types'
import { BACKGROUND } from '@utils/constants/indent'
import { encrypt, decrypt } from '@utils/encryption'
import { autoId } from '@utils/helpers'

const initialState: UserState = {
   session: null,
   metadata: null,
   isLoading: true,
   queuedActions: []
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateSession: (state, action) => {
         state.session = action.payload
      },

      updateMetadata: (state, action) => {
         state.metadata = state.metadata && {...state.metadata, ...action.payload } || { ...action.payload }
      },

      addRec: (state, action) => {
         const { key, rec } = action.payload
         const collection = state.metadata[key]
         collection.push(rec)
      },

      updateRec: (state, action) => {
         const { key, id, payload } = action.payload
         const collection = state.metadata[key]
         let rec = collection.find((e: any) => e.id === id)
         rec = { ...payload }
      },

      enqueueAction: (state, action) => {
         const newAction = action.payload
         const { userId, name, ...rest } = newAction
         const userQueuedActions = state.queuedActions[userId]

         if (![
            'UPDATE_WEIGHT', 
            'UPDATE_WEIGHTS', 
            'UPDATE_BMI', 
            'UPDATE_HIPS',
            'UPDATE_CHEST',
            'UPDATE_WAIST',
            'UPDATE_THIGH',
            'UPDATE_START_FASTING_TIME',
            'UPDATE_END_FASTING_TIME'
         ].includes(name)) {
            state.queuedActions[userId] = { ...userQueuedActions, [name]: rest }
            return
         }
 
         if (['UPDATE_WEIGHT', 'UPDATE_WEIGHTS', 'UPDATE_BMI'].includes(name)) {
            const { currentWeight, newBodyRecId, currentDate } = newAction.params[1]
            state.queuedActions[userId] = {
               ...userQueuedActions,
               UPDATE_WEIGHT: {
                  actionId: autoId('qaid'),
                  invoker: 'updateWeight',
                  params: [userId, { currentWeight, newBodyRecId, currentDate }]
               },
               ...((() => {
                  switch (name) {
                     case 'UPDATE_WEIGHTS': {
                        const { goalWeight } = newAction.params[1]
                        return {
                           UPDATE_GOAL_WEIGHT: {
                              actionId: autoId('qaid'),
                              invoker: 'updatePersonalData',
                              params: [userId, { goalWeight }]
                           }
                        }
                     }
                     case 'UPDATE_BMI': {
                        const { currentHeight } = newAction.params[1]
                        return {
                           UPDATE_HEIGHT: {
                              actionId: autoId('qaid'),
                              invoker: 'updatePersonalData',
                              params: [userId, { currentHeight }]
                           }
                        }
                     }
                  }
               })())
            }
         }

         if (['UPDATE_HIPS', 'UPDATE_CHEST', 'UPDATE_WAIST', 'UPDATE_THIGH'].includes(name)) {
            const { currentDate, type, value, newBodyRecId } = newAction.params[1]

            state.queuedActions[userId] = {
               ...userQueuedActions,
               ...((() => {
                  switch (name) {
                     case 'UPDATE_HIPS': return {
                        UPDATE_HIPS: {
                           actionId: autoId('qaid'),
                           invoker: 'updatePersonalData',
                           params: [userId, { hipsMeasure: value }]
                        }
                     }
                     case 'UPDATE_WAIST': return {
                        UPDATE_WAIST: {
                           actionId: autoId('qaid'),
                           invoker: 'updatePersonalData',
                           params: [userId, { waistMeasure: value }]
                        }
                     }
                     case 'UPDATE_THIGH': return {
                        UPDATE_THIGH: {
                           actionId: autoId('qaid'),
                           invoker: 'updatePersonalData',
                           params: [userId, { thighMeasure: value }]
                        }
                     }
                     case 'UPDATE_CHEST': return {
                        UPDATE_CHEST: {
                           actionId: autoId('qaid'),
                           invoker: 'updatePersonalData',
                           params: [userId, { chestMeasure: value }]
                        }
                     }
                  }
               })()),
               [`UPDATE_BODY_REC_${currentDate}_${type}`]: {
                  actionId: autoId('qaid'),
                  invoker: 'updateBodyRec',
                  params: [userId, { value, type, currentDate, newBodyRecId }]
               }
            }
            return 
         }

         if (['UPDATE_START_FASTING_TIME', 'UPDATE_END_FASTING_TIME'].includes(name)) {
            const [ id, payload ] = newAction.params
            const rec = userQueuedActions[`UPDATE_FASTING_REC_${id}`] || null
            state.queuedActions[userId] = {
               ...userQueuedActions,
               [`UPDATE_FASTING_REC_${id}`]: {
                  ...(rec && payload || {
                     actionId: autoId('qaid'),
                     invoker: 'updateFastingRec',
                     params: [id, payload]
                  })
               }
            }            
            return
         }
      },

      updateQueuedActions: (state, action) => {
         state.queuedActions = action.payload
      },

      updateAppState: (state, action) => {
         // const secretKey = new Uint8Array(16)
         const appState: string = action.payload
         state.isLoading = appState === BACKGROUND
         // const transform = state.isLoading && encrypt || decrypt
         // if (state.metadata) state.metadata = transform(secretKey, state.metadata)
         // if (state.session) state.session = transform(secretKey, state.session)
      },

      updateIsLoading: (state, action) => {
         state.isLoading = action.payload
      }
   }
})

export const { 
   updateMetadata, 
   updateSession, 
   addRec, 
   updateRec, 
   enqueueAction, 
   updateQueuedActions, 
   updateAppState, 
   updateIsLoading 
} = userSlice.actions

export default userSlice.reducer