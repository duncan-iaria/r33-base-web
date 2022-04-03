import React, { createContext, FC } from 'react';
import { UnityContext } from 'react-unity-webgl';

export const GAME_NAME = 'ForgeBots Riptide';

const locaLoaderSrc =  './Build/Riptide_01.loader.js'
const localDataUrlSrc = './Build/Riptide_01.data';
const localFrameworkUrlSrc = './Build/Riptide_01.framework.js';
const localWasmCodeSrc = './Build/Riptide_01.wasm';

const loaderSrc = "https://forgebots.nyc3.cdn.digitaloceanspaces.com/builds/gem-collector/gem-collector.loader.js"
const dataUrlSrc = "https://forgebots.nyc3.cdn.digitaloceanspaces.com/builds/gem-collector/gem-collector.data";
const frameworkUrlSrc = "https://forgebots.nyc3.cdn.digitaloceanspaces.com/builds/gem-collector/gem-collector.framework.js"
const wasmCodeSrc = "https://forgebots.nyc3.cdn.digitaloceanspaces.com/builds/gem-collector/gem-collector.wasm";

const unityContext = new UnityContext({
  loaderUrl: loaderSrc,
  dataUrl: dataUrlSrc,
  frameworkUrl: frameworkUrlSrc,
  codeUrl: wasmCodeSrc
});

export const UnityContextData = createContext(unityContext);

export const UnityContextProvider: FC = ({ children }) => {
  return <UnityContextData.Provider value={unityContext}>{children}</UnityContextData.Provider>;
};
