export default function swDev() {
  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  var vapidPublicKey =
    "BDrSZE2Nkgskqgadya2Ch_wIqUZ1apYk5D7QqfZgu_-D-2bfzrtOFypt_YdJF1UnmTEkZotw3zubAWafufUZ8sc";
  function determineAppServerKey() {
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  let swURL = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker.register(swURL).then((response) => {
    // console.warn("response");
    return response.pushManager.getSubscription().then(function (subscription) {
      return response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey(),
      });
    });
  });
}
