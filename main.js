const colorDisplay = document.querySelector("#data")

const width = 500
const height = 500

const two = new Two({
	width,
	height
}).appendTo(document.querySelector("#app"))

const origin = {
	x: width / 2 | 0,
	y: height / 2 | 0
}
const r = 200

render()

function render() {
	two.clear()
	const n = +document.querySelector("#number").value
	for(let i = 0; i < n; i++) {
		const s = 1
		const h = i / n * 360
		const rad = i / n * 2 * Math.PI
		const x = r * Math.cos(rad) + origin.x
		const y = r * Math.sin(rad) + origin.y
		const circle = two.makeCircle(x, y, 10)
		const rgb = hsv2rgb(h, s, 1)
		const red = rgb.r * 255
		const green = rgb.g * 255
		const blue = rgb.b * 255
		circle.fill = `rgb(${ red }, ${ green }, ${ blue })`
		circle.linewidth = 2
		circle.stroke = `rgb(${ red * 0.85 }, ${ green * 0.85 }, ${ blue * 0.85 })`
		const id = circle.id
		two.update()
		const el = document.querySelector(`#${ id }`)
		el.classList.add("dot")
		el.addEventListener("click", e => {
			colorDisplay.innerHTML = `#${ ("0" + (red | 0).toString(16)).slice(-2) }${ ("0" + (green | 0).toString(16)).slice(-2) }${ ("0" + (blue | 0).toString(16)).slice(-2) }`
		})
	}
}

function hsv2rgb(h, s, v = 1) {
	const rgb = function(r = 0, g = 0, b = 0) {
		return { r, g, b }
	}
	if(h === undefined)
		return rgb()
	if(h < 0)
		h *= -1
	if(h >= 360)
		h = h % 360
	const c = v * s
	const hp = h / 60
	const x = c * (1 - Math.abs(hp % 2 - 1))
	let ret = rgb()
	if(0 <= hp && hp < 1) {
		ret = rgb(c, x, 0)
	} else if(1 <= hp && hp < 2) {
		ret = rgb(x, c, 0)
	} else if(2 <= hp && hp < 3) {
		ret = rgb(0, c, x)
	} else if(3 <= hp && hp < 4) {
		ret = rgb(0, x, c)
	} else if(4 <= hp && hp < 5) {
		ret = rgb(x, 0, c)
	} else if(5 <= hp && hp < 6) {
		ret = rgb(c, 0, x)
	}
	for(let key in ret) {
		ret[key] += v - c
	}
	return ret
}
