import React from 'https://cdn.skypack.dev/react';
import { BackgroundCircle } from './BackgroundCircle.jsx';
import { Eyes } from './Eyes.jsx';
import { Mouth } from './Mouth.jsx';
import { FaceContainer } from './FaceContainer.jsx';

export const Face = ({
  width, 
  height,
  centerX, 
  centerY,
  strokeWidth,
  eyeOffsetX,
  eyeOffsetY,
  eyeRadius,
  mouthRadius,
  mouthWidth
}) => (
  <FaceContainer
    width={width}
    height={height} 
    centerX={centerX} 
    centerY={centerY}
  >
    <BackgroundCircle radius={centerY - strokeWidth / 2} strokeWidth={strokeWidth} />
    <Eyes
      eyeOffsetX={eyeOffsetX}
      eyeOffsetY={eyeOffsetY} 
      eyeRadius={eyeRadius} 
    />      
    <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
  </FaceContainer>
);
