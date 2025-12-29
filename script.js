document.addEventListener("click", function(event) {
    for (let i = 0; i < 30; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        document.body.appendChild(firework);

        let x = event.clientX;
        let y = event.clientY;
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 100;

        let fx = x + Math.cos(angle) * distance;
        let fy = y + Math.sin(angle) * distance;

        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        firework.style.transform = `translate(${fx - x}px, ${fy - y}px)`;
        firework.style.animationDelay = `${Math.random() * 0.5}s`;
        
        setTimeout(() => firework.remove(), 1500);
    }
});