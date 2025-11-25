export async function readNFC() {
    if ("NDEFReader" in window === false) {
        document.getElementById("output").innerText = "❌ Web NFC not supported!";
        return;
    }

    try {
        const ndef = new NDEFReader();
        await ndef.scan();
        document.getElementById("output").innerText = "👀 Tap the NFC tag...";

        ndef.onreading = event => {
            const uid = event.serialNumber;
            const decoder = new TextDecoder();
            let text = "";

            for (const record of event.message.records) {
                text += decoder.decode(record.data);
            }

            document.getElementById("output").innerText =
                `UID: ${uid}\nNDEF Text: ${text}`;
        };

        ndef.onreadingerror = () => {
            document.getElementById("output").innerText = "❌ Cannot read NFC tag.";
        };
    } catch (err) {
        document.getElementById("output").innerText = "ERROR: " + err;
    }
}

// Bind button click
document.getElementById("scanBtn").addEventListener("click", () => {
    readNFC();
});
