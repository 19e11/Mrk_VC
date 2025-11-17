# How to make a video calling application using peer.js

### 1. Pahile Remote Id Create Karo

```
    peer.on("open", (id) => {
      console.log("My Peer ID is:", id);
    });
```

### 2. LocalStream ko store karna padega variables me

- user se uska video and audio localstream me lelo
  aur localstream me set kardo

```
    let localStream;

    async function getMediaStream() {
     try {
        localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
        });
        myVideo.srcObject = localStream;
     } catch (err) {
        console.error("Error accessing camera/microphone:", err);
        alert("Could not access camera or microphone.");
     }
    }
```

### 3. Call Button par click karne ke baad remote id par apni localstream bheje

```
    callBtn.addEventListener("click", () => {
        const remoteId = connectInput.value.trim();
        if (!remoteId) return alert("Enter remote peer ID to start a call!");

        call = peer.call(remoteId, localStream);

        call.on("stream", (remoteStream) => {
            partnerVideo.srcObject = remoteStream;
        });

        call.on("close", () => {
            partnerVideo.srcObject = null;
            console.log("Call ended");
        });
    });
```

### 4. Call Receive Karna padega

```
    peer.on("call", (incomingCall) => {
        console.log("Incoming call from:", incomingCall.peer);
        incomingCall.answer(localStream);

        incomingCall.on("stream", (remoteStream) => {
            partnerVideo.srcObject = remoteStream;
        });

        incomingCall.on("close", () => {
            partnerVideo.srcObject = null;
            console.log("Call ended");
        });

        call = incomingCall;
    });
```

### 5. Call Ko End Karne ke button click ke baad call close function chalana honga

```
    endCallBtn.addEventListener("click", () => {
        if (call) {
            call.close();
            partnerVideo.srcObject = null;
        }
    });
````