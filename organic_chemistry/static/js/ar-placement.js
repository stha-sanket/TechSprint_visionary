AFRAME.registerComponent('ar-hit-test', {
  init() {
    const scene = this.el.sceneEl;
    const lab = document.getElementById('lab');
    let placed = false;

    scene.addEventListener('click', () => {
      if (placed) return;

      const camera = scene.camera;
      const pos = new THREE.Vector3();
      camera.getWorldPosition(pos);

      lab.setAttribute('position', {
        x: pos.x,
        y: pos.y - 0.5,
        z: pos.z - 1
      });

      lab.setAttribute('visible', true);
      placed = true;

      const hint = document.getElementById('hint');
      if (hint) hint.remove();

      console.log('📍 Lab placed on surface');
    });
  }
});
