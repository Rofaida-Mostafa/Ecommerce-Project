import { createContext, useState } from "react";





export const counterProvider = createContext() //return obj;



export default function CounterContext({ children }) {

const [counter, setcounter] = useState(0)
  return (
    <>
      <counterProvider.Provider value={{counter}}>
        {children}
        </counterProvider.Provider>
    </>
  );
}
