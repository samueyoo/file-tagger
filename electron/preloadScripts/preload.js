//Preload scripts are used to access both the HTML DOM environment + the Node.js environment
    // These scripts are injected before a web page loads in the renderer, similar to a Chrome extension's content scripts
    // This is necessary since Node.js has full operating system access, but renderer processes responsible for running
    // web pages do not run Node.js by default for security reasons.
// Preload scrips essentially bridge the Node.js environment with the renderer processes (limited web page environment)

//To add features to the renderer that require privileged access, you can define global objects through the contextBridge API
    //Global objects are just objects that exist in the global scope

//This file will create a preload script that exposes this app's versions of Chrome, Node, and Electron into the renderer!
    // More specifically, this script will expose selected properties of Electron's process.versions object to the renderer
    // in a versions global variable

//contextBridge creates a safe, bi-directional, synchronous bridge across isolated contexts
const { contextBridge } = require('electron');

//Main World is the JavaScript context that the main renderer code runs in
//By default, the page you load into the renderer executes code in this world
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
})
//contextBridge.exposeInMainWorld() module has two methods:
    // apiKey (the key to inject the API onto window with; API will be accessible on window[apiKey])
    // api (your API)