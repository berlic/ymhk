var script = document.createElement('script');
script.setAttribute("id","ymhk-script");
script.appendChild(document.createTextNode('document.addEventListener("ymhk-event", function(e){switch(e.detail.command){case "next-track": Mu.Songbird.playNext(); break; case "prev-track": Mu.Songbird.playPrev(); break; case "play-pause":switch(Mu.Player.state){case"waiting":Mu.events.trigger("player_start");break;case"playing":Mu.Player.pause();break;case"paused":Mu.Player.resume();break}} }, false);'));
(document.body || document.head || document.documentElement).appendChild(script);

var enext = new CustomEvent("ymhk-event", {detail: {command:"next-track"}, bubbles: true, cancelable: true});
var eprev = new CustomEvent("ymhk-event", {detail: {command:"prev-track"}, bubbles: true, cancelable: true});
var eplpa = new CustomEvent("ymhk-event", {detail: {command:"play-pause"}, bubbles: true, cancelable: true});

var port = chrome.runtime.connect({name: "tunnel"});
port.onMessage.addListener(function(msg) {
	var s = document.getElementById("ymhk-script") || null;
	if (s != null)
	{
		switch(msg.command)
		{
			case "next-track": s.dispatchEvent(enext); break;
			case "prev-track": s.dispatchEvent(eprev); break;
			case "play-pause": s.dispatchEvent(eplpa); break;
		}
	}
});
