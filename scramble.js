export class ScrambleText {
    constructor(el, options = {}) {
        this.el = el;
        this.chars = options.chars || '01'; // Binary vibe
        this.duration = options.duration || 1200;
        this.revealDelay = options.revealDelay || 0; // Delay before starting to reveal
        this.running = false;
        
        // Pre-calculate text nodes
        this.textNodes = [];
        this.totalLength = 0;
        this._walk(this.el);
        
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: 0.2, // Trigger when 20% visible
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before bottom
        });
        this.observer.observe(this.el);
    }

    _walk(node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent;
            // Store the node and its metadata
            this.textNodes.push({
                node: node,
                original: text,
                start: this.totalLength,
                length: text.length
            });
            this.totalLength += text.length;
        } else if (node.nodeType === 1) { // Element node
            node.childNodes.forEach(child => this._walk(child));
        }
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.running) {
                this.start();
                this.observer.unobserve(this.el);
            }
        });
    }

    start() {
        this.running = true;
        
        // Lock dimensions and prevent wrapping to stop layout shift
        const originalStyle = {
            width: this.el.style.width,
            height: this.el.style.height,
            display: this.el.style.display,
            whiteSpace: this.el.style.whiteSpace
        };
        
        // Check if we need to force block/inline-block to accept width
        const computedStyle = window.getComputedStyle(this.el);
        const isInline = computedStyle.display === 'inline';
        
        if (isInline) {
            this.el.style.display = 'inline-block';
        }
        
        // Set fixed width/height to current computed values
        const rect = this.el.getBoundingClientRect();
        this.el.style.width = `${rect.width + 2}px`; // Buffer for font width variance
        this.el.style.height = `${rect.height}px`;
        
        // Use 'normal' whitespace if it was normal, but lock width. 
        // 'nowrap' might force single line on multi-line headings.
        // Since we preserve the original structure (including <br>), we usually don't want to force nowrap 
        // UNLESS the user specifically wants to prevent word wrapping shifts.
        // Given the previous request was "don't change lines", locking width should handle it.
        // But to be safe against overflow, we can stick to width lock only.
        // this.el.style.whiteSpace = 'nowrap'; 

        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            
            // Calculate progress: 0 to 1 over duration
            let progress = Math.max(0, Math.min((elapsed - this.revealDelay) / this.duration, 1));
            
            if (elapsed < this.revealDelay) progress = 0;

            // Global number of chars to reveal
            const globalRevealIndex = Math.floor(progress * this.totalLength);
            
            this.textNodes.forEach(item => {
                const localStart = item.start;
                const localEnd = item.start + item.length;
                
                // Determine how much of THIS node is revealed
                // If globalRevealIndex is past this node, all revealed.
                
                let nodeText = '';
                
                // Optimization: If completely revealed, restore original
                if (globalRevealIndex >= localEnd) {
                    if (item.node.textContent !== item.original) {
                        item.node.textContent = item.original;
                    }
                    return;
                }
                
                for (let i = 0; i < item.length; i++) {
                    const globalIndex = localStart + i;
                    const char = item.original[i];
                    
                    // Skip spaces/newlines to preserve layout
                    if (char === ' ' || char === '\n' || char === '\t') {
                        nodeText += char;
                        continue;
                    }

                    if (globalIndex < globalRevealIndex) {
                        // Revealed character
                        nodeText += char;
                    } else {
                        // Scrambled character
                        nodeText += this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                }
                
                item.node.textContent = nodeText;
            });
            
            if (elapsed < this.duration + this.revealDelay) {
                requestAnimationFrame(animate);
            } else {
                // Ensure everything is final
                this.textNodes.forEach(item => {
                    item.node.textContent = item.original;
                });
                
                // Restore original styles
                this.el.style.width = originalStyle.width;
                this.el.style.height = originalStyle.height;
                this.el.style.display = originalStyle.display;
                this.el.style.whiteSpace = originalStyle.whiteSpace;
                
                this.running = false;
            }
        };
        
        requestAnimationFrame(animate);
    }
}
