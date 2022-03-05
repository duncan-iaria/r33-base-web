import React, { useEffect, createContext, FC } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';

export const GAME_NAME = 'ForgeBots Riptide';

const unityContext = new UnityContext({
  loaderUrl: './Build/Riptide_01.loader.js',
  dataUrl: './Build/Riptide_01.data',
  frameworkUrl: './Build/Riptide_01.framework.js',
  codeUrl: './Build/Riptide_01.wasm',
});

export const UnityContextData = createContext(unityContext);

export const UnityContextProvider: FC = ({ children }) => {
  return <UnityContextData.Provider value={unityContext}>{children}</UnityContextData.Provider>;
};
