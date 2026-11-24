precision highp float;

/** @resolution */
uniform vec2 u_resolution;

/** @label Content */
uniform sampler2D u_content;

/**
 * @label Stroke angle (degrees)
 * @default 20
 * @range -90, 90
 */
uniform float u_angle;

/**
 * @label Roughness
 * @default 1
 * @range 0, 3
 */
uniform float u_rough;

/**
 * @label Bristles
 * @default 1
 * @range 0, 2
 */
uniform float u_bristles;

/**
 * @label Paint
 * @color
 * @default #3b3027
 */
uniform vec3 u_paint;

/**
 * @label Highlight
 * @color
 * @default #8a7a68
 */
uniform vec3 u_light;

/**
 * @label Linen (alpha 0 for none)
 * @color
 * @default #efe9df
 */
uniform vec4 u_linen;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float a = radians(u_angle);
  vec2 dir = vec2(cos(a), sin(a));
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 px = gl_FragCoord.xy;
  // Wobble the edge along the stroke so it reads as a brush, not a vector.
  float s = u_resolution.x / 240.0;
  vec2 warp = nrm * (noise(px / (14.0 * s)) - 0.5) * 6.0 * s * u_rough + dir * (noise(px / (40.0 * s) + 7.0) - 0.5) * 4.0 * s * u_rough;
  float cov = texture2D(u_content, (px + warp) / u_resolution).a;
  // Dry-brush: streaks along the stroke drop paint near the edges.
  float along = dot(px, dir), across = dot(px, nrm);
  float streak = noise(vec2(across / (1.6 * s), along / (60.0 * s)));
  float streak2 = noise(vec2(across / (0.7 * s), along / (25.0 * s)) + 3.0);
  float dry = smoothstep(0.15, 0.55, cov + (streak - 0.55) * 0.5 * u_bristles);
  float paint = clamp(dry * smoothstep(0.02, 0.3, cov) * (0.82 + 0.18 * streak2), 0.0, 1.0);
  vec3 color = mix(u_paint, u_light, smoothstep(0.55, 0.9, streak2) * 0.55 * u_bristles);
  // Linen weave under everything.
  float weave = 0.5 + 0.5 * sin(px.x * 1.9 / s) * sin(px.y * 1.9 / s);
  vec3 linen = u_linen.rgb * (0.965 + 0.035 * weave + (noise(px / (3.0 * s)) - 0.5) * 0.04);
  vec4 bg = vec4(linen * u_linen.a, u_linen.a);
  vec4 fg = vec4(color * paint, paint);
  gl_FragColor = fg + bg * (1.0 - fg.a);
}
