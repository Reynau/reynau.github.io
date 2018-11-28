
    darkBackground = true

    maxParticles = 2000
    maxSpeed = 0.5
    minRad = 0.2
    maxRad = 0.8
    minAlpha = 0.2
    maxAlpha = 0.4
    particles = []
    mouseForce = 25
    mouse = {
        x: -500,
        y: -500,
    }

    window.onload = function () {
    canvas = document.getElementById("gc")
    ctx = canvas.getContext("2d")

    window.addEventListener('resize', updateCanvasSize)
    window.addEventListener('mousemove', updateMouse)
    updateCanvasSize()

    init()
    setInterval(loop, 1000/30);
}
    
    function updateMouse (event) {
        mouse.x = event.clientX
        mouse.y = event.clientY
    }

    function updateCanvasSize () {
        canvas.width = document.body.clientWidth
        canvas.height = document.body.clientHeight

        // Reset the animation
        init()
    }

    function init () {
        particles = []
        for (let i = 0; i < maxParticles; ++i) {
            particles.push(newParticle())
        }
    }

    function newParticle () {
        let x = rand(0, canvas.width)
        let y = rand(0, canvas.height)

        return {
            x: rand(0, canvas.width),
            y: rand(0, canvas.height),
            r: rand(minRad, maxRad),
            vx: rand(-maxSpeed, maxSpeed),
            vy: rand(-maxSpeed, maxSpeed),
            a: rand(minAlpha, maxAlpha),
            update: function (mouse) {
                let dist = Math.hypot(mouse.x - this.x, mouse.y - this.y)

                if (dist < mouseForce) {
                    let xDist = mouse.x - this.x
                    let yDist = mouse.y - this.y

                    let xSpeed = xDist * maxSpeed / mouseForce
                    let ySpeed = yDist * maxSpeed / mouseForce

                    this.x += xSpeed
                    this.y += ySpeed
                }
                else {
                    this.x += this.vx
                    this.y += this.vy
                }
            },
            draw: function () {
                if (darkBackground) {
                    fillColor = "rgba(255, 255, 255, " + this.a + ")"
                }
                else {
                    fillColor = "rgba(0, 0, 0, " + (this.a + this.a) + ")"
                }
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
                ctx.fillStyle = fillColor
                ctx.fill()
            },
        }
    }

    function update () {
        particles.forEach((particle, i) => {
            particle.update(mouse)
            if (outsideCanvas(particle)) {
                particles[i] = newParticle()
            }
        })
    }

    function draw () {
        drawBackground()
        particles.forEach(particle => particle.draw())
    }   

    function loop () {
        update()
        draw()
    }

    function drawBackground () {
        if (darkBackground) {   
            bgColorInit = '#010114'
            bgColorEnd = '#1a162a'
        }
        else {
            bgColorInit = '#d2caf1'
            bgColorEnd = '#f1d7d7'
        }
        let grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        grad.addColorStop(0, bgColorInit)
        grad.addColorStop(1, bgColorEnd)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    function rand(min, max) {
        return Math.random() * (max -min) + min
    }

    function outsideCanvas (particle) {
        return particle.x < 0 || particle.y < 0 || 
            particle.x > canvas.width || particle.y > canvas.height
    }