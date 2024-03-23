// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { UserForm } from "./types/user";
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("keys", {
  server: () => process.env.REACT_APP_SERVER_URL,
  saveJwt: async (token: string) => {
    await ipcRenderer.invoke("save-jwt", token);
  },
  getJwt: async () => {
    const token = await ipcRenderer.invoke("get-jwt");
    return token;
  },
  delJwt: async () => {
    await ipcRenderer.invoke("del-jwt");
  },
});

contextBridge.exposeInMainWorld("server", {
  login: async (user: UserForm) => {
    const res = await ipcRenderer.invoke("login", user);
    return res;
  },
  register: async (user: UserForm) => {
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
