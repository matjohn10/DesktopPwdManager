// See the Electron documentation for details on how to use preload scripts:

import { UserForm } from "./types/user";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("keys", {
  server: () => process.env.REACT_APP_SERVER_URL,
});

contextBridge.exposeInMainWorld("server", {
  login: async (user: UserForm) => {
    const res = await ipcRenderer.invoke("login", user);
    return res;
  },
  refresh: async (userId: string) => {
    const res = await ipcRenderer.invoke("refresh", userId);
    return res;
  },
  getUserData: async (userId: string, token: string) => {
    const res = await ipcRenderer.invoke("getUserData", userId, token);
    return res;
  },
});
