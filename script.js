const peer = new Peer();

// select all the elements
const peerIdDisplay = document.getElementById("peer-id");
const connectInput = document.getElementById("connect-to-id");
const callBtn = document.getElementById("call-btn");
const endCallBtn = document.getElementById("end-call-btn");
const myVideo = document.getElementById("my-video");
const partnerVideo = document.getElementById("partner-video");
let localStream;
let call;

peer.on("open", (id) => {
  peerIdDisplay.textContent = `${id}`;
});

async function getStream() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    myVideo.srcObject = localStream;
  } catch (error) {
    console.error(error);
  }
}
getStream();

callBtn.addEventListener("click", () => {
  const fid = connectInput.value;
  call = peer.call(fid, localStream);

  call.on("stream", (fStream) => {
    partnerVideo.srcObject = fStream;
  });

  call.on("close", () => {
    fStream.srcObject = null;
    alert("Call Ended");
  });
});

peer.on("call", (incoming) => {
  alert(`Incoming Call from ${incoming.peer}`);
  incoming.answer(localStream);
  incoming.on("stream", (fStream) => {
    partnerVideo.srcObject = fStream;
  });

  incoming.on("close", () => {
    partnerVideo.srcObject = null;
    alert("Call Ended");
  });

  call = incoming;
});

endCallBtn.addEventListener("click", () => {
  if (call) {
    call.close();
  }
});


function copyUID() {
    const uidText = document.getElementById('peer-id').innerText;
    navigator.clipboard.writeText(uidText).then(() => {
      alert('UID copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy UID');
      console.error(err);
    });
  }