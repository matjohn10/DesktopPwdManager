import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "path";
import { UserForm } from "./types/user";
import { saveJwt, getJwt, delJwt } from "./utils/jwt";
require("dotenv").config();
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
let mainWindow: BrowserWindow;
const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  session.defaultSession.protocol.registerFileProtocol(
    "static",
    (request, callback) => {
      const fileUrl = request.url.replace("static://", "");
      const filePath = path.join(
        app.getAppPath(),
        ".webpack/renderer",
        fileUrl
      );
      callback(filePath);
    }
  );

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("login", async (event, user: UserForm) => {
  const res = await fetch(process.env.REACT_APP_SERVER_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  });
  if (res.status !== 200) {
    console.log(res.status, res.statusText);
    return { status: res.status, error: res.statusText };
  } else {
    const data = await res.json();
    return { status: res.status, data };
  }
});

ipcMain.handle("register", async (event, user: UserForm) => {
  const res = await fetch(process.env.REACT_APP_SERVER_URL + "/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  });
  if (res.status !== 201) {
    console.log(res.status, res.statusText);
    return { status: res.status, error: res.statusText };
  } else {
    const data = await res.json();
    return { status: res.status, data };
  }
});

ipcMain.handle("refresh", async (event, userId: string) => {
  const res = await fetch(process.env.REACT_APP_SERVER_URL + "/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
    }),
  });
  if (res.status !== 200) {
    console.log(res.status, res.statusText);
    return { status: res.status, error: res.statusText };
  } else {
    const data = await res.json();
    return { status: res.status, data };
  }
});

ipcMain.handle("getUserData", async (event, userId: string, token: string) => {
  const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/" + userId, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status !== 200) {
    console.log(res.status, res.statusText);
    return { status: res.status, error: res.statusText };
  } else {
    const data = await res.json();
    return { status: res.status, data };
  }
});

ipcMain.handle("save-jwt", (event, token: string) => saveJwt(token));
ipcMain.handle("get-jwt", (event) => getJwt());
ipcMain.handle("del-jwt", (event, id) => delJwt(id));
