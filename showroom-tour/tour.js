(() => {
  "use strict";

  const scenes = {
    storefront: { title: "Storefront", alt: "The H&H auto window tint shop facade and entrance", yaw: -2, pitch: 11, hfov: 115, mobileFov: 79 },
    bay: { title: "Installation Bay", alt: "Red display cars and automotive film samples in the installation bay", yaw: -23, pitch: -2, hfov: 97, mobileFov: 68 },
    lounge: { title: "Customer Lounge", alt: "The customer seating area beside the H&H display wall", yaw: -9, pitch: -2, hfov: 103, mobileFov: 70 }
  };
  const tour = document.getElementById("tour");
  const stage = document.getElementById("stage");
  const panorama = document.getElementById("panorama");
  const still = document.getElementById("still");
  const guide = document.getElementById("guide");
  const fullscreen = document.getElementById("fullscreen");
  const plus = document.getElementById("zoom-in");
  const minus = document.getElementById("zoom-out");
  const sceneLinks = Array.from(document.querySelectorAll(".scene"));
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let sceneId;
  let viewer;
  let readyFrame;
  let rendererFailed = false;

  function showPhoto() {
    stage.classList.remove("interactive");
    stage.classList.add("photo");
    panorama.tabIndex = -1;
    plus.hidden = minus.hidden = true;
    guide.textContent = "Photo view · Choose a scene below";
  }

  function usePhotos() {
    rendererFailed = true;
    cancelAnimationFrame(readyFrame);
    showPhoto();
  }

  function revealScene() {
    if (viewer.getScene() !== sceneId) {
      loadRequestedScene();
      return;
    }
    const renderer = viewer.getRenderer();
    // Test after the first draw, when the renderer has its visible tile list.
    readyFrame = requestAnimationFrame(function waitForTiles() {
      if (rendererFailed) return;
      if (renderer.isLoading()) {
        readyFrame = requestAnimationFrame(waitForTiles);
        return;
      }
      stage.classList.remove("photo");
      stage.classList.add("interactive");
      panorama.tabIndex = 0;
      plus.hidden = minus.hidden = false;
      guide.textContent = matchMedia("(pointer: coarse)").matches
        ? "Drag to explore · Pinch to zoom" : "Drag to explore · Scroll to zoom";
    });
  }

  const configs = {};
  for (const [id, scene] of Object.entries(scenes)) {
    configs[id] = {
      type: "multires", pitch: scene.pitch, yaw: scene.yaw,
      multiRes: {
        basePath: new URL("panos/" + id, document.baseURI).href,
        path: "/%l/%s%y_%x", extension: "jpg",
        tileResolution: 1024, maxLevel: 3, cubeResolution: 4096
      }
    };
  }

  function loadRequestedScene() {
    const scene = scenes[sceneId];
    const ratio = stage.clientWidth / Math.max(1, stage.clientHeight);
    const fit = Math.max(0, Math.min(1, (ratio - 0.6) / 0.95));
    const hfov = scene.mobileFov + (scene.hfov - scene.mobileFov) * fit;
    try {
      viewer.loadScene(sceneId, scene.pitch, scene.yaw, hfov);
    } catch {
      usePhotos();
    }
  }

  function selectScene(id) {
    if (id === sceneId || !scenes[id]) return;
    sceneId = id;
    const scene = scenes[id];
    for (const link of sceneLinks) {
      if (link.dataset.id === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    cancelAnimationFrame(readyFrame);
    stage.classList.remove("interactive", "photo");
    plus.hidden = minus.hidden = true;
    panorama.tabIndex = -1;
    still.src = new URL("stills/" + id + ".jpg", document.baseURI).href;
    still.alt = scene.alt;
    stage.setAttribute("aria-label", scene.title);
    if (rendererFailed || !viewer) {
      showPhoto();
      return;
    }
    guide.textContent = "Opening 360° view…";
    loadRequestedScene();
  }

  for (const link of sceneLinks) {
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectScene(link.dataset.id);
    });
  }
  plus.addEventListener("click", () => viewer.setHfov(viewer.getHfov() / 1.25, reducedMotion.matches ? 0 : 220));
  minus.addEventListener("click", () => viewer.setHfov(viewer.getHfov() * 1.25, reducedMotion.matches ? 0 : 220));

  if (document.fullscreenEnabled && tour.requestFullscreen) {
    fullscreen.hidden = false;
    fullscreen.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await tour.requestFullscreen();
      } catch {
        // The host browser may disallow full-screen mode in an embedded tab.
        fullscreen.hidden = true;
      }
    });
    document.addEventListener("fullscreenchange", () => {
      const expanded = Boolean(document.fullscreenElement);
      const label = expanded ? "Exit full screen" : "Enter full screen";
      fullscreen.title = label;
      fullscreen.setAttribute("aria-label", label);
      fullscreen.setAttribute("aria-pressed", String(expanded));
      document.getElementById("full-icon").setAttribute("d", expanded
        ? "M4 9h5V4m6 0v5h5m0 6h-5v5m-6 0v-5H4"
        : "M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5");
      if (viewer && !rendererFailed) viewer.resize();
    });
  }

  try {
    panorama.hidden = false;
    viewer = window.pannellum.viewer(panorama, {
      default: {
        firstScene: "storefront", autoLoad: false, compass: false,
        minHfov: 24, maxHfov: 120, multiResMinHfov: true,
        showControls: false, mouseZoom: true, keyboardZoom: true,
        sceneFadeDuration: 0, escapeHTML: true
      },
      scenes: configs
    });
    viewer.on("load", revealScene);
    viewer.on("error", usePhotos);
    panorama.addEventListener("webglcontextlost", usePhotos, true);
  } catch {
    usePhotos();
  }
  selectScene("storefront");
})();
