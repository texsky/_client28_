import { createSlice, configureStore } from '@reduxjs/toolkit';

const Slice = createSlice({
    name: 'store',
    initialState: {
        user: {},
        Auth: true
    },
    reducers: {
        /**
         * Set the user state with the given payload
         * @param {Object} state - current state
         * @param {Object} actions - action with payload
         */
        setUser(state, actions) {
            state.user = actions.payload
        },
        /**
         * Set the Auth state with the given payload
         * @param {Object} state - current state
         * @param {Object} actions - action with payload
         */

        setAuth(state, actions) {
            state.Auth = actions.payload
        }
    }
});

const Store = configureStore({ reducer: Slice.reducer });
const Actions = Slice.actions;

export { Store, Actions };