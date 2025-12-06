export class MagneticButton {
    constructor(el, options = {}) {
        this.el = el;
        this.options = Object.assign({
            strength: 20, // How far it can move (pixels)
            textStrength: 10, // How much the text moves (parallax effect)
            ease: 0.1, // Lerp factor for smoothness
        }, options);

        this.text = this.el.querySelector('span') || this.el;

        this.mouse = { x: 0, y: 0 };
        this.pos = { x: 0, y: 0 }; // Current button position offset
        this.textPos = { x: 0, y: 0 }; // Current text position offset
        this.target = { x: 0, y: 0 };

        this.rect = this.el.getBoundingClientRect();
        this.isHovering = false;
        this.rafId = null;

        this.init();
    }

    init() {
        // Update rect on resize/scroll just in case, though usually on mouseenter is enough
        this.resizeObserver = new ResizeObserver(() => this.updateRect());
        this.resizeObserver.observe(this.el);
        window.addEventListener('scroll', () => this.updateRect(), { passive: true });

        this.el.addEventListener('mouseenter', (e) => this.onEnter(e));
        this.el.addEventListener('mousemove', (e) => this.onMove(e));
        this.el.addEventListener('mouseleave', (e) => this.onLeave(e));
    }

    updateRect() {
        this.rect = this.el.getBoundingClientRect();
    }

    onEnter(e) {
        this.isHovering = true;
        this.updateRect();
        if (!this.rafId) this.loop();
    }

    onMove(e) {
        // Calculate distance from center
        const center = {
            x: this.rect.left + this.rect.width / 2,
            y: this.rect.top + this.rect.height / 2
        };

        const dist = {
            x: e.clientX - center.x,
            y: e.clientY - center.y
        };

        // Normalize / scale the movement
        // We want the button to move towards the mouse, but clamped/scaled by strength
        // Calculate normalized position (-1 to 1) based on element size
        const normX = dist.x / (this.rect.width / 2);
        const normY = dist.y / (this.rect.height / 2);

        this.target.x = normX * this.options.strength;
        this.target.y = normY * this.options.strength;
    }

    onLeave(e) {
        this.isHovering = false;
        this.target = { x: 0, y: 0 };
    }

    loop() {
        // Lerp position values
        this.pos.x += (this.target.x - this.pos.x) * this.options.ease;
        this.pos.y += (this.target.y - this.pos.y) * this.options.ease;

        // Apply transform to button
        this.el.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;

        // Optional: Parallax for child text
        // This assumes the text is a direct child or passed as option
        // if (this.text && this.text !== this.el) {
        //     this.textPos.x += (this.target.x * 0.5 - this.textPos.x) * this.options.ease;
        //     this.textPos.y += (this.target.y * 0.5 - this.textPos.y) * this.options.ease;
        //     this.text.style.transform = `translate(${this.textPos.x}px, ${this.textPos.y}px)`;
        // }

        // Stop loop if not hovering and close to zero
        const isZero = Math.abs(this.pos.x) < 0.01 && Math.abs(this.pos.y) < 0.01;

        if (!this.isHovering && isZero) {
            this.rafId = null;
            this.el.style.transform = '';
            return;
        }

        this.rafId = requestAnimationFrame(() => this.loop());
    }
}
