import Cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

function AppProvider(props) {
  const [ appState, setAppState ] = useState({ user: null });
  const [ appReady, setAppReady ] = useState(false);

  async function lookupUser() {
    const authCheck = await fetch("/api/user/lookup");
    const checkResult = await authCheck.json();
    if( checkResult && checkResult.result === "success" ){
      setAppState({...appState, user: checkResult.payload});
      setAppReady(true);
    } else {
      setAppReady(true);
    }
  };

  function logout() {
    Cookie.remove("auth-token");
    window.location.href = `/${url_name}-login`;
  };

  useEffect(() => {
    if( !appState.user ) lookupUser()
  }, [appState.user]);

  return (
    <div>
      { appReady === true && (
        <AppContext.Provider value={{ appState, setAppState, logout }}>
          { props.children }
        </AppContext.Provider>
      )}
    </div>
  )
};

const AppConsumer = AppContext.Consumer
export { AppContext, AppConsumer, AppProvider }