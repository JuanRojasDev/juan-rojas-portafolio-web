import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import styled, { keyframes } from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  /* Forzar que no afecte el layout */
  will-change: transform;
  contain: layout style paint;
`;

// Estrellas de fondo (las pequeñitas)
const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(4000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Animación de caída de meteorito
const meteorFall = keyframes`
  0% {
    transform: translate(0, -100px) rotate(-45deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translate(100vw, 100vh) rotate(-45deg);
    opacity: 0;
  }
`;

// Solo el icono, sin nada más
const TechMeteor = styled.div`
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  will-change: transform, opacity;
  
  animation: ${meteorFall} ${({ $duration }) => $duration}s linear infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    display: block;
  }
`;

const technologies = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "rgba(133,76,230,0.7)" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "rgba(255,127,0,0.7)" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "rgba(255,127,0,0.7)" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "rgba(133,76,230,0.7)" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "rgba(19,173,199,0.7)" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "rgba(255,127,0,0.7)" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "rgba(255,127,0,0.7)" },
];

const TechMeteors = () => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    // Generar meteoritos con posiciones y tiempos aleatorios
    const generatedMeteors = [];
    for (let i = 0; i < 10; i++) {
      const tech = technologies[i % technologies.length];
      generatedMeteors.push({
        id: i,
        tech,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 8, // 10-18 segundos
        delay: Math.random() * 10, // 0-10 segundos de delay
      });
    }
    setMeteors(generatedMeteors);
  }, []);

  return (
    <>
      {meteors.map((meteor) => (
        <TechMeteor
          key={meteor.id}
          $color={meteor.tech.color}
          $top={meteor.top}
          $left={meteor.left}
          $duration={meteor.duration}
          $delay={meteor.delay}
        >
          <img src={meteor.tech.icon} alt={meteor.tech.name} />
        </TechMeteor>
      ))}
    </>
  );
};

const StyledStarsCanvas = () => {
  return (
    <StyledCanvasWrapper aria-hidden="true">
      {/* Estrellas pequeñas de fondo */}
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
      
      {/* Meteoritos de tecnologías */}
      <TechMeteors />
    </StyledCanvasWrapper>
  );
};

export default StyledStarsCanvas;
