/* ==========================================================================
   IRA GROW - GENTLE ORGANIC FARM BREEZE & LEAF DRIFT
   Natural agricultural particle motion for hero section
   ========================================================================== */

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let leaves = [];
  const LEAF_COUNT = 36;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class OrganicParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.7 + 0.35;
      this.speedX = (Math.random() - 0.3) * 0.6;
      this.angle = Math.random() * Math.PI * 2;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = Math.random() * 0.4 + 0.15;
      
      // Natural agricultural shades: Sage green, Forest leaf, Golden wheat, Amber
      const colors = [
        'rgba(43, 112, 76, ',   // Green leaf
        'rgba(64, 145, 108, ',  // Fresh herbal green
        'rgba(201, 138, 44, ',  // Golden harvest wheat
        'rgba(180, 83, 9, '     // Warm spice amber
      ];
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.isLeaf = Math.random() > 0.4;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.015) * 0.4;
      this.angle += this.angularSpeed;

      if (this.y > height + 25 || this.x > width + 25 || this.x < -25) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      if (this.isLeaf) {
        // Draw natural leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.45, Math.PI / 4, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.fill();

        // Delicate vein
        ctx.beginPath();
        ctx.moveTo(-this.size * 0.7, 0);
        ctx.lineTo(this.size * 0.7, 0);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      } else {
        // Small organic seed / pollen spore
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.28, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorBase}${this.opacity})`;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < LEAF_COUNT; i++) {
    leaves.push(new OrganicParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < leaves.length; i++) {
      leaves[i].update();
      leaves[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
