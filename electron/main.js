//This script controls the main process, which runs in a Node.js environment and is 
// responsible for controlling your app's lifecycle, displaying native interfaces, 
// performing privileged operations, and managing renderer processes (more on that later).

const { app, BrowserWindow } = require('electron');
//app controls application's lifecycle
//BrowserWindow creates and manages app windows
const path = require('path');

//Instantiates new BrowserWindow instance, loading index.html in the process
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'electron', 'preloadScripts', 'preload.js'),
        },
    })
    win.loadURL('http://localhost:3000') //Loads this HTML file (in this case, a URL instead of .loadFile() ) into the BrowserWindow instance
}

//Instead of app.on(), Electron uses .whenReady() specifically for the ready event (https://github.com/electron/electron/pull/21972)
app.whenReady().then(() => {
    createWindow();
    console.log('Application has launched');

    //Opens a window if none are open and app is activated (macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

//Quits the app when all windows are closed (Windows + Linux)
// Node's process.platform env variable can be used to run code conditionally;
// Electron supports win32, linux, and darwin (macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
//Still terminates per console without this code though when hitting X?
