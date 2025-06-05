const startBtn = document.getElementById("startBtn");
const downloadSpan = document.getElementById("download");
const uploadSpan = document.getElementById("upload");
const pingSpan = document.getElementById("ping");

startBtn.addEventListener("click", async () => {
  downloadSpan.textContent = "Tes...";
  uploadSpan.textContent = "Tes...";
  pingSpan.textContent = "Tes...";

  const ping = await testPing();
  pingSpan.textContent = ping + " ms";

  const download = await testDownloadSpeed();
  downloadSpan.textContent = download.toFixed(2) + " Mbps";

  const upload = await testUploadSpeed();
  uploadSpan.textContent = upload.toFixed(2) + " Mbps";
});

function testPing() {
  return new Promise(resolve => {
    const start = Date.now();
    fetch("https://cors.eu.org/https://www.google.com/generate_204")
      .then(() => {
        const end = Date.now();
        resolve(end - start);
      })
      .catch(() => resolve("Error"));
  });
}

function testDownloadSpeed() {
  return new Promise(resolve => {
    const image = new Image();
    const imageSize = 5 * 1024 * 1024; // 5MB
    const startTime = new Date().getTime();

    image.onload = function () {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsLoaded = imageSize * 8;
      const speedMbps = (bitsLoaded / duration / 1024 / 1024);
      resolve(speedMbps);
    };

    image.onerror = () => resolve(0);

    image.src = "https://speed.hetzner.de/5MB.bin?" + Math.random();
  });
}

function testUploadSpeed() {
  return new Promise(resolve => {
    const data = new Blob([new ArrayBuffer(2 * 1024 * 1024)]); // 2MB
    const startTime = new Date().getTime();

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: data
    }).then(() => {
      const endTime = new Date().getTime();
      const duration = (endTime - startTime) / 1000;
      const bitsUploaded = data.size * 8;
      const speedMbps = (bitsUploaded / duration / 1024 / 1024);
      resolve(speedMbps);
    }).catch(() => resolve(0));
  });
}
