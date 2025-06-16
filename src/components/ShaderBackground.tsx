
import { useEffect, useRef } from 'react';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // @ts-ignore - Three.js types
    const scene = new THREE.Scene();
    // @ts-ignore
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // @ts-ignore
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // @ts-ignore
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        // @ts-ignore
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;

        #define TAU 6.2831853071795865
        #define TUNNEL_LAYERS 128
        #define RING_POINTS 144
        #define POINT_SIZE 2.4
        #define POINT_COLOR_A vec3(0.5, 0.7, 1.0)
        #define POINT_COLOR_B vec3(0.3, 0.55, 0.9)
        #define SPEED 0.8

        float sq(float x) {
          return x*x;   
        }

        vec2 AngRep(vec2 uv, float angle) {
          vec2 polar = vec2(atan(uv.y, uv.x), length(uv));
          polar.x = mod(polar.x + angle / 2.0, angle) - angle / 2.0; 
          return polar.y * vec2(cos(polar.x), sin(polar.x));
        }

        float sdCircle(vec2 uv, float r) {
          return length(uv) - r;
        }

        vec3 MixShape(float sd, vec3 fill, vec3 target) {
          float blend = smoothstep(0.0, 1.5/iResolution.y, sd);
          return mix(fill, target, blend);
        }

        vec2 TunnelPath(float x) {
          vec2 offs = vec2(0, 0);
          offs.x = 0.2 * sin(TAU * x * 0.5) + 0.3 * sin(TAU * x * 0.18 + 0.3);
          offs.y = 0.25 * cos(TAU * x * 0.3) + 0.2 * cos(TAU * x * 0.1);
          offs *= smoothstep(1.0, 4.0, x);
          return offs;
        }

        void main() {
          vec2 res = iResolution.xy / iResolution.y;
          vec2 uv = gl_FragCoord.xy / iResolution.y;
          uv -= res/2.0;
          
          vec3 color = vec3(0);
          
          float repAngle = TAU / float(RING_POINTS);
          float pointSize = POINT_SIZE/2.0/iResolution.y;
          
          float camZ = iTime * SPEED;
          vec2 camOffs = TunnelPath(camZ);
          
          for(int i = 1; i <= TUNNEL_LAYERS; i++) {
            float pz = 1.0 - (float(i) / float(TUNNEL_LAYERS));
            pz -= mod(camZ, 4.0 / float(TUNNEL_LAYERS));
            
            vec2 offs = TunnelPath(camZ + pz) - camOffs;
            float ringRad = 0.15 * (1.0 / sq(pz * 0.6 + 0.4));
            
            if(abs(length(uv + offs) - ringRad) < pointSize * 2.0) {
              vec2 aruv = AngRep(uv + offs, repAngle);
              float pdist = sdCircle(aruv - vec2(ringRad, 0), pointSize);
              vec3 ptColor = (mod(float(i / 2), 2.0) == 0.0) ? POINT_COLOR_A : POINT_COLOR_B;
              float shade = (1.0-pz) * 0.8 + 0.2;
              color = MixShape(pdist, ptColor * shade, color);
            }
          }
          
          // Add some ambient glow
          float glow = length(uv) * 0.1;
          color += vec3(0.05, 0.1, 0.2) * (1.0 - glow);
          
          gl_FragColor = vec4(color, 0.6);
        }
      `
    });

    // @ts-ignore
    const geometry = new THREE.PlaneGeometry(2, 2);
    // @ts-ignore
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    let lastTime = 0;
    const speedMultiplier = 0.6;

    function animate(time: number) {
      requestAnimationFrame(animate);
      time *= 0.001;
      const deltaTime = time - lastTime;
      lastTime = time;
      
      shaderMaterial.uniforms.iTime.value += deltaTime * speedMultiplier;
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      shaderMaterial.dispose();
      geometry.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.4 }}
    />
  );
};

export default ShaderBackground;
