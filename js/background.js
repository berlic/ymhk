tunnel = null;

chrome.commands.onCommand.addListener(function(command) {
  if (tunnel && (command == "next-track" || command == "prev-track" || command == "play-pause")) tunnel.postMessage({command: command});
});

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name == "tunnel") tunnel = port;
});