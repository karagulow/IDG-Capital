/* =========================
   CONTROLS
   ========================= */
const UI_CONFIG = [
	{
		group: 'Render',
		key: 'lineSpacing',
		type: 'range',
		min: 8,
		max: 50,
		step: 1,
	},
	{
		group: 'Render',
		key: 'maxThickness',
		type: 'range',
		min: 2,
		max: 30,
		step: 1,
	},
	{
		group: 'Render',
		key: 'minThickness',
		type: 'range',
		min: 0,
		max: 3,
		step: 0.1,
	},
	{
		group: 'Render',
		key: 'breakThreshold',
		type: 'range',
		min: 0,
		max: 0.4,
		step: 0.01,
	},
	{
		group: 'Render',
		key: 'edgeFeather',
		type: 'range',
		min: 0.2,
		max: 6,
		step: 0.1,
	},

	{ group: 'Shape', key: 'bumpCount', type: 'range', min: 1, max: 5, step: 1 },
	{
		group: 'Shape',
		key: 'bumpWidth',
		type: 'range',
		min: 0.05,
		max: 0.4,
		step: 0.01,
	},
	{
		group: 'Shape',
		key: 'xJitter',
		type: 'range',
		min: 0,
		max: 0.3,
		step: 0.01,
	},
	{
		group: 'Shape',
		key: 'yEnvelope',
		type: 'range',
		min: 0.1,
		max: 1,
		step: 0.01,
	},

	{ group: 'Animation', key: 'isAnimating', type: 'checkbox' },
	{
		group: 'Animation',
		key: 'waveSpeed',
		type: 'range',
		min: 0,
		max: 3,
		step: 0.01,
	},
	{
		group: 'Animation',
		key: 'waveAmp',
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
	},

	{
		group: 'Hover',
		key: 'hoverRadius',
		type: 'range',
		min: 50,
		max: 800,
		step: 10,
	},
	{
		group: 'Hover',
		key: 'hoverNeighborRadius',
		type: 'range',
		min: 50,
		max: 1200,
		step: 10,
	},
	{
		group: 'Hover',
		key: 'hoverYSpread',
		type: 'range',
		min: 10,
		max: 200,
		step: 5,
	},
	{
		group: 'Hover',
		key: 'hoverStrength',
		type: 'range',
		min: 0,
		max: 2,
		step: 0.05,
	},
	{
		group: 'Hover',
		key: 'hoverFreq',
		type: 'range',
		min: 2,
		max: 20,
		step: 0.1,
	},

	{ group: 'Color', key: 'color', type: 'text' },
	{
		group: 'Color',
		key: 'alphaMin',
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		group: 'Color',
		key: 'alphaMax',
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
	},

	{
		group: 'Blur',
		key: 'blurRadius',
		type: 'range',
		min: 0,
		max: 8,
		step: 0.1,
	},
	{
		group: 'Blur',
		key: 'blurScale',
		type: 'range',
		min: 0.25,
		max: 1,
		step: 0.05,
	},

	{
		group: 'Dither',
		key: 'ditherStrength',
		type: 'range',
		min: 0,
		max: 1,
		step: 0.01,
	},
	{
		group: 'Dither',
		key: 'ditherScale',
		type: 'range',
		min: 0.5,
		max: 6,
		step: 0.1,
	},
	{ group: 'Dither', key: 'ditherOnly', type: 'checkbox' }, // если true, линии только из точек
];

let SETTINGS = {
	lineSpacing: 35,
	maxThickness: 15,
	minThickness: 0,
	breakThreshold: 0.1,
	edgeFeather: 6,

	bumpCount: 3,
	bumpWidth: 0.22,
	xJitter: 0.0,
	yEnvelope: 0.7,

	isAnimating: true,
	waveSpeed: 2.2,
	waveAmp: 0.65,

	hoverRadius: 100,
	hoverNeighborRadius: 300,
	hoverYSpread: 70,
	hoverStrength: 0.4,
	hoverFreq: 2.0,

	color: '#DD1600',
	alphaMin: 0.2,
	alphaMax: 1,

	blurRadius: 2,
	blurScale: 0.5,

	ditherStrength: 0.1,
	ditherScale: 6,
	ditherOnly: 0,
};

/* =========================
   HOVER INERTIA
   ========================= */
let hoverLevel = 0;
let hoverTarget = 0;
let lastMoveTime = 0;
const HOVER_ATTACK = 124.0;
const HOVER_RELEASE = 12.0;
const HOVER_IMPULSE = 0.35;
const HOVER_IDLE_MS = 240;

/* =========================
   UI
   ========================= */
function buildUI() {
	const panel = document.createElement('div');
	panel.style.cssText =
		'position:fixed;z-index:9999;top:12px;right:12px;width:260px;max-height:90vh;overflow:auto;background:rgba(20,20,20,0.85);color:#fff;padding:12px;border-radius:10px;font:12px/1.4 sans-serif;';
	panel.innerHTML =
		'<div style="font-weight:bold;margin-bottom:8px;">Controls</div>';

	const groups = {};
	UI_CONFIG.forEach(c => {
		if (!groups[c.group]) {
			const g = document.createElement('div');
			g.style.cssText =
				'margin:8px 0 12px 0;padding:6px 8px;border:1px solid rgba(255,255,255,0.1);border-radius:8px;';
			g.innerHTML =
				'<div style="font-weight:bold;margin-bottom:6px;">' +
				c.group +
				'</div>';
			panel.appendChild(g);
			groups[c.group] = g;
		}

		const row = document.createElement('div');
		row.style.cssText = 'margin:4px 0;display:flex;align-items:center;gap:6px;';
		const label = document.createElement('label');
		label.textContent = c.key;
		label.style.cssText = 'flex:1;opacity:0.85;';

		let input;
		if (c.type === 'checkbox') {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.checked = !!SETTINGS[c.key];
		} else if (c.type === 'text') {
			input = document.createElement('input');
			input.type = 'text';
			input.value = SETTINGS[c.key];
			input.style.flex = '1';
		} else {
			input = document.createElement('input');
			input.type = 'range';
			input.min = c.min;
			input.max = c.max;
			input.step = c.step;
			input.value = SETTINGS[c.key];
			input.style.flex = '1';
			const valueSpan = document.createElement('span');
			valueSpan.textContent = input.value;
			valueSpan.style.cssText = 'width:36px;text-align:right;';
			row.appendChild(valueSpan);
			input.addEventListener(
				'input',
				() => (valueSpan.textContent = input.value),
			);
		}

		input.addEventListener('input', () => {
			if (c.type === 'checkbox') SETTINGS[c.key] = input.checked;
			else if (c.type === 'text') SETTINGS[c.key] = input.value;
			else SETTINGS[c.key] = parseFloat(input.value);
			resize();
		});

		row.appendChild(label);
		row.appendChild(input);
		groups[c.group].appendChild(row);
	});

	document.body.appendChild(panel);
}

/* =========================
   WEBGL
   ========================= */
const canvas = document.getElementById('c');
const gl = canvas.getContext('webgl', {
	antialias: false,
	premultipliedAlpha: true,
});
if (!gl) throw new Error('WebGL not supported');

let w = 0,
	h = 0,
	dpr = 1;
let mouseX = 0,
	mouseY = 0;

const quadVtx = new Float32Array([
	-1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1,
]);

function createShader(type, src) {
	const s = gl.createShader(type);
	gl.shaderSource(s, src);
	gl.compileShader(s);
	if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
		throw new Error(gl.getShaderInfoLog(s));
	return s;
}
function createProgram(vs, fs) {
	const p = gl.createProgram();
	gl.attachShader(p, createShader(gl.VERTEX_SHADER, vs));
	gl.attachShader(p, createShader(gl.FRAGMENT_SHADER, fs));
	gl.linkProgram(p);
	if (!gl.getProgramParameter(p, gl.LINK_STATUS))
		throw new Error(gl.getProgramInfoLog(p));
	return p;
}

const VERT = `
attribute vec2 aPos;
attribute vec2 aUV;
varying vec2 vUV;
void main() {
  vUV = aUV;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_LINES = `
precision mediump float;
varying vec2 vUV;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

uniform float lineSpacing;
uniform float maxThickness;
uniform float minThickness;
uniform float breakThreshold;
uniform float edgeFeather;

uniform float bumpCount;
uniform float bumpWidth;
uniform float xJitter;
uniform float yEnvelope;

uniform float waveSpeed;
uniform float waveAmp;
uniform float isAnimating;

uniform float hoverRadius;
uniform float hoverNeighborRadius;
uniform float hoverYSpread;
uniform float hoverStrength;
uniform float hoverFreq;
uniform float hoverLevel;

uniform vec3 baseColor;
uniform float alphaMin;
uniform float alphaMax;

float hash(float n){ return fract(sin(n)*43758.5453); }

float bumps(float x, float rowId){
  float t = 0.0;
  for (int i=0; i<5; i++){
    if (float(i) >= bumpCount) break;
    float seed = rowId*100.0 + float(i)*37.7;
    float cx = 0.1 + 0.8*hash(seed);
    float amp = 0.5 + 0.5*hash(seed+11.1);
    float w = bumpWidth*(0.6 + 0.8*hash(seed+22.2));
    float dx = (x - cx)/w;
    t += amp * exp(-dx*dx);
  }
  return t;
}

void main(){
  vec2 uv = vUV;
  float y = uv.y * uRes.y;

  float row = floor(y / lineSpacing);
  float rowCenter = (row + 0.5) * lineSpacing;

  float ny = (rowCenter / uRes.y) * 2.0 - 1.0;
  float env = exp(-ny*ny * (2.5 / yEnvelope));

  float t = bumps(uv.x, row);
  float jitter = (hash(row*999.0 + uv.x*17.3) - 0.5) * xJitter;
  t = max(0.0, t + jitter);

  float thickness = minThickness + t * maxThickness * env;
  float norm = thickness / (maxThickness + minThickness + 0.0001);

  if (norm < breakThreshold) discard;

  float wave = 1.0;
  if (isAnimating > 0.5) {
    float phase = uv.x * 6.28318 * 2.0;
    float wv = 0.5 + 0.5 * sin(phase - uTime*waveSpeed);
    wave = mix(1.0 - waveAmp, 1.0, wv);
  }

  thickness *= wave;

  float dx = abs(uv.x * uRes.x - uMouse.x);
  float dy = abs(rowCenter - uMouse.y);

  float core = smoothstep(hoverYSpread, 0.0, dy);
  float localRadius = mix(hoverNeighborRadius, hoverRadius, core);

  float falloffX = smoothstep(localRadius, 0.0, dx);
  float falloffY = smoothstep(hoverYSpread, 0.0, dy);
  float falloff = falloffX * falloffY * hoverLevel;

  float ripple = sin((uv.x * uRes.x - uMouse.x) * hoverFreq * 0.02 - uTime * 6.0)
               * hoverStrength * falloff;

  thickness *= (1.0 + ripple);

  float dist = abs(y - rowCenter);
  float edge = smoothstep(thickness*0.5, thickness*0.5 - edgeFeather, dist);

  float alpha = mix(alphaMin, alphaMax, norm) * edge;
  gl_FragColor = vec4(baseColor * alpha, alpha);
}
`;

const FRAG_BLUR = `
precision mediump float;
varying vec2 vUV;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uDir;
uniform float blurRadius;

void main(){
  vec2 px = uDir / uRes;
  float r = blurRadius;

  vec4 sum = vec4(0.0);
  sum += texture2D(uTex, vUV) * 0.227027;
  sum += texture2D(uTex, vUV + px * r * 1.384615) * 0.316216;
  sum += texture2D(uTex, vUV - px * r * 1.384615) * 0.316216;
  sum += texture2D(uTex, vUV + px * r * 3.230769) * 0.070270;
  sum += texture2D(uTex, vUV - px * r * 3.230769) * 0.070270;

  gl_FragColor = sum;
}
`;

const FRAG_DITHER = `
precision mediump float;
varying vec2 vUV;
uniform sampler2D uTex;
uniform float ditherStrength;
uniform float ditherScale;
uniform float ditherOnly;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
  vec4 c = texture2D(uTex, vUV);
  float n = rand(vUV * ditherScale);

  // mask only where line exists
  float mask = smoothstep(0.0, 0.15, c.a);
  float a = c.a;

  // convert to dotted by alpha
  float d = step(n, a);
  if (ditherOnly > 0.5) {
    a = d * a;
  } else {
    a = mix(a, d * a, ditherStrength);
  }

  gl_FragColor = vec4(c.rgb, a);
}
`;

const progLines = createProgram(VERT, FRAG_LINES);
const progBlur = createProgram(VERT, FRAG_BLUR);
const progDither = createProgram(VERT, FRAG_DITHER);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, quadVtx, gl.STATIC_DRAW);

function setupAttribs(prog) {
	gl.useProgram(prog);
	const aPos = gl.getAttribLocation(prog, 'aPos');
	const aUV = gl.getAttribLocation(prog, 'aUV');
	gl.enableVertexAttribArray(aPos);
	gl.enableVertexAttribArray(aUV);
	gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
	gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 16, 8);
}

/* =========================
   FBO
   ========================= */
function createFBO(w, h) {
	const tex = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		gl.RGBA,
		w,
		h,
		0,
		gl.RGBA,
		gl.UNSIGNED_BYTE,
		null,
	);

	const fbo = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER,
		gl.COLOR_ATTACHMENT0,
		gl.TEXTURE_2D,
		tex,
		0,
	);

	return { fbo, tex, w, h };
}

let fboA = null,
	fboB = null;

function resize() {
	dpr = window.devicePixelRatio || 1;
	w = innerWidth;
	h = innerHeight;
	canvas.width = w * dpr;
	canvas.height = h * dpr;
	gl.viewport(0, 0, w * dpr, h * dpr);

	const bw = Math.max(1, Math.floor(w * dpr * SETTINGS.blurScale));
	const bh = Math.max(1, Math.floor(h * dpr * SETTINGS.blurScale));
	fboA = createFBO(bw, bh);
	fboB = createFBO(bw, bh);
}
window.addEventListener('resize', resize);

/* =========================
   DRAW
   ========================= */
function hexToRGB(hex) {
	const c = hex.replace('#', '');
	const bigint = parseInt(c, 16);
	return [
		((bigint >> 16) & 255) / 255,
		((bigint >> 8) & 255) / 255,
		(bigint & 255) / 255,
	];
}

function updateHover() {
	const now = performance.now();
	hoverTarget = now - lastMoveTime < HOVER_IDLE_MS ? 1 : 0;
	const dt = 1 / 60;
	if (hoverTarget > hoverLevel)
		hoverLevel += (hoverTarget - hoverLevel) * HOVER_ATTACK * dt;
	else hoverLevel += (hoverTarget - hoverLevel) * HOVER_RELEASE * dt;
}

function renderLines() {
	gl.bindFramebuffer(gl.FRAMEBUFFER, fboA.fbo);
	gl.viewport(0, 0, fboA.w, fboA.h);
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	setupAttribs(progLines);
	gl.useProgram(progLines);

	const color = hexToRGB(SETTINGS.color);
	gl.uniform2f(gl.getUniformLocation(progLines, 'uRes'), fboA.w, fboA.h);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'uTime'),
		performance.now() * 0.001,
	);
	gl.uniform2f(
		gl.getUniformLocation(progLines, 'uMouse'),
		mouseX * dpr * SETTINGS.blurScale,
		(h - mouseY) * dpr * SETTINGS.blurScale,
	);

	gl.uniform1f(
		gl.getUniformLocation(progLines, 'lineSpacing'),
		SETTINGS.lineSpacing * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'maxThickness'),
		SETTINGS.maxThickness * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'minThickness'),
		SETTINGS.minThickness * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'breakThreshold'),
		SETTINGS.breakThreshold,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'edgeFeather'),
		SETTINGS.edgeFeather * dpr * SETTINGS.blurScale,
	);

	gl.uniform1f(
		gl.getUniformLocation(progLines, 'bumpCount'),
		SETTINGS.bumpCount,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'bumpWidth'),
		SETTINGS.bumpWidth,
	);
	gl.uniform1f(gl.getUniformLocation(progLines, 'xJitter'), SETTINGS.xJitter);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'yEnvelope'),
		SETTINGS.yEnvelope,
	);

	gl.uniform1f(
		gl.getUniformLocation(progLines, 'waveSpeed'),
		SETTINGS.waveSpeed,
	);
	gl.uniform1f(gl.getUniformLocation(progLines, 'waveAmp'), SETTINGS.waveAmp);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'isAnimating'),
		SETTINGS.isAnimating ? 1 : 0,
	);

	gl.uniform1f(
		gl.getUniformLocation(progLines, 'hoverRadius'),
		SETTINGS.hoverRadius * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'hoverNeighborRadius'),
		SETTINGS.hoverNeighborRadius * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'hoverYSpread'),
		SETTINGS.hoverYSpread * dpr * SETTINGS.blurScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'hoverStrength'),
		SETTINGS.hoverStrength,
	);
	gl.uniform1f(
		gl.getUniformLocation(progLines, 'hoverFreq'),
		SETTINGS.hoverFreq,
	);
	gl.uniform1f(gl.getUniformLocation(progLines, 'hoverLevel'), hoverLevel);

	gl.uniform3f(
		gl.getUniformLocation(progLines, 'baseColor'),
		color[0],
		color[1],
		color[2],
	);
	gl.uniform1f(gl.getUniformLocation(progLines, 'alphaMin'), SETTINGS.alphaMin);
	gl.uniform1f(gl.getUniformLocation(progLines, 'alphaMax'), SETTINGS.alphaMax);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function blurPass(inputTex, outputFBO, dir) {
	gl.bindFramebuffer(gl.FRAMEBUFFER, outputFBO ? outputFBO.fbo : null);
	gl.viewport(
		0,
		0,
		outputFBO ? outputFBO.w : w * dpr,
		outputFBO ? outputFBO.h : h * dpr,
	);

	setupAttribs(progBlur);
	gl.useProgram(progBlur);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, inputTex);
	gl.uniform1i(gl.getUniformLocation(progBlur, 'uTex'), 0);
	gl.uniform2f(gl.getUniformLocation(progBlur, 'uRes'), fboA.w, fboA.h);
	gl.uniform2f(gl.getUniformLocation(progBlur, 'uDir'), dir[0], dir[1]);
	gl.uniform1f(
		gl.getUniformLocation(progBlur, 'blurRadius'),
		SETTINGS.blurRadius,
	);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function ditherPass(inputTex) {
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0, 0, w * dpr, h * dpr);

	setupAttribs(progDither);
	gl.useProgram(progDither);

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, inputTex);
	gl.uniform1i(gl.getUniformLocation(progDither, 'uTex'), 0);
	gl.uniform1f(
		gl.getUniformLocation(progDither, 'ditherStrength'),
		SETTINGS.ditherStrength,
	);
	gl.uniform1f(
		gl.getUniformLocation(progDither, 'ditherScale'),
		SETTINGS.ditherScale,
	);
	gl.uniform1f(
		gl.getUniformLocation(progDither, 'ditherOnly'),
		SETTINGS.ditherOnly ? 1 : 0,
	);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

function draw() {
	updateHover();
	renderLines();

	if (SETTINGS.blurRadius > 0.01) {
		blurPass(fboA.tex, fboB, [1, 0]);
		blurPass(fboB.tex, fboA, [0, 1]);
		ditherPass(fboA.tex);
	} else {
		ditherPass(fboA.tex);
	}

	requestAnimationFrame(draw);
}

/* =========================
   INPUT
   ========================= */
window.addEventListener('mousemove', e => {
	mouseX = e.clientX;
	mouseY = e.clientY;
	lastMoveTime = performance.now();
	hoverLevel = Math.min(1, hoverLevel + HOVER_IMPULSE);
});
window.addEventListener(
	'touchmove',
	e => {
		const t = e.touches[0];
		mouseX = t.clientX;
		mouseY = t.clientY;
		lastMoveTime = performance.now();
		hoverLevel = Math.min(1, hoverLevel + HOVER_IMPULSE);
	},
	{ passive: true },
);

/* =========================
   INIT
   ========================= */
// buildUI();
resize();
draw();
