import { createContext, useState } from "react";

const SessionContext = createContext();
const SessionProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(); //useState()の中は空白でないとログイン状態になるので注意

  return (
    //Provider内のvalueにある{currentUser, setCurrentUser}の両データをprops.childrenでは使えるようになる
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
