AFRAME.registerComponent('draggable', {
  schema: {
    dragPlaneZ: { type: 'number', default: -2.2 }
  },

  init() {
    this.isDragging = false;
    this.dragOffset = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.plane = new THREE.Plane();

    this.onDown = this.onDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onUp = this.onUp.bind(this);

    this.el.addEventListener('mousedown', this.onDown);
    this.el.addEventListener('touchstart', this.onDown, { passive: false });

    console.log('✅ Draggable ready:', this.el.id);
  },

  onDown(evt) {
    if (evt.shiftKey) return;

    evt.preventDefault();
    evt.stopPropagation();

    if (window._activeDrag && window._activeDrag !== this) return;
    window._activeDrag = this;

    this.isDragging = true;

    const worldPos = new THREE.Vector3();
    this.el.object3D.getWorldPosition(worldPos);

    if (evt.detail?.intersection) {
      this.dragOffset.copy(worldPos).sub(evt.detail.intersection.point);
    } else {
      this.dragOffset.set(0, 0, 0);
    }

    window.addEventListener('mousemove', this.onMove);
    window.addEventListener('mouseup', this.onUp);
    window.addEventListener('touchmove', this.onMove, { passive: false });
    window.addEventListener('touchend', this.onUp);

    console.log('🖱️ Drag start:', this.el.id);
  },

  onMove(evt) {
    if (!this.isDragging) return;
    evt.preventDefault();

    const touch = evt.touches?.[0];
    const clientX = touch ? touch.clientX : evt.clientX;
    const clientY = touch ? touch.clientY : evt.clientY;

    this.mouse.x = (clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    const camera = this.el.sceneEl.camera;
    this.raycaster.setFromCamera(this.mouse, camera);

    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);

    this.plane.setFromNormalAndCoplanarPoint(
      camDir,
      new THREE.Vector3(0, 0, this.data.dragPlaneZ)
    );

    const hit = new THREE.Vector3();
    if (this.raycaster.ray.intersectPlane(this.plane, hit)) {
      hit.add(this.dragOffset);

      if (this.el.object3D.parent) {
        this.el.object3D.parent.worldToLocal(hit);
      }

      this.el.object3D.position.copy(hit);
    }
  },

  onUp() {
    if (!this.isDragging) return;

    this.isDragging = false;
    window._activeDrag = null;

    window.removeEventListener('mousemove', this.onMove);
    window.removeEventListener('mouseup', this.onUp);
    window.removeEventListener('touchmove', this.onMove);
    window.removeEventListener('touchend', this.onUp);

    console.log('✋ Drag end:', this.el.id);

    window.checkReaction?.();
  }
});

console.log('🧲 Drag system stable');
