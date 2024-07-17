// import React, { createContext, useReducer } from 'react';

// const initialState = {
//   cases: [],
//   documents: [],
//   schedule: [],
//   billing: [],
//   communication: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_CASES':
//       return { ...state, cases: action.payload };
//     case 'SET_DOCUMENTS':
//       return { ...state, documents: action.payload };
//     // Add more cases for other sections
//     default:
//       return state;
//   }
// };

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
