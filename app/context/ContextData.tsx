import {createContext} from 'react';

export const ContextData = createContext({
    exerciseStatus: [null,null,null,null,null,null,null],
    day: null,
    week: null,
});