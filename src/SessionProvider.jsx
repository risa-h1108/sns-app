import { createContext, useEffect, useState } from "react";
import { authRepository } from "./repositories/auth";

const SessionContext = createContext();
const SessionProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(); //useState()の中は空白でないとログイン状態になるので注意
  const [isLoading, setIsLoading] = useState(true);

  //ログイン状態の維持
  useEffect(() => {
    setSession();
  }, []);

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    setCurrentUser(currentUser);
    setIsLoading(false);
  };

  if (isLoading) return <div />;

  return (
    //Provider内のvalueにある{currentUser, setCurrentUser}の両データをprops.childrenでは使えるようになる
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
