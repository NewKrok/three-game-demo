import { TextureId } from "./assets-config";

export const EffectId = {
  SHOOTING: "SHOOTING",
  BULLET: "BULLET",
  BULLET_EXPLOSION: "BULLET_EXPLOSION",
  BULLET_EXPLOSION_SMOKE: "BULLET_EXPLOSION_SMOKE",
  CRATE_EXPLOSION: "CRATE_EXPLOSION",
  CRATE_EXPLOSION_SMOKE: "CRATE_EXPLOSION_SMOKE",
  CRATE_EXPLOSION_FIRE: "CRATE_EXPLOSION_FIRE",
  DASH: "DASH",
  ACTIVATE_COIN: "ACTIVATE_COIN",
  COLLECT_COIN: "COLLECT_COIN",
};

export const effectsConfig = {
  [EffectId.SHOOTING]: {
    looping: false,
    duration: 0.1,
    startLifetime: { min: 0.3, max: 0.5 },
    startSpeed: { min: 6, max: 12 },
    startSize: { min: 0.2, max: 0.4 },
    startRotation: { min: -360, max: 360 },
    startColor: {
      min: {
        r: 0.9098039215686274,
        g: 0.9019607843137255,
        b: 0.9372549019607843,
      },
      max: {
        r: 0.4980392156862745,
        g: 0.4588235294117647,
        b: 0.7803921568627451,
      },
    },
    gravity: 0.2,
    simulationSpace: "WORLD",
    maxParticles: 15,
    emission: { rateOverTime: 100 },
    shape: { shape: "CONE", cone: { angle: 2, radius: 0.0001 } },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0.3, percentage: 0 },
        { x: 0, y: 0.8, percentage: 0.4 },
        { x: 1, y: 1, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0, y: 0.5, percentage: 0.5 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: { movements: "DISABLED", movementSpeed: 1 },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: {
        textureId: "WIREFRAME",
        movements: "DISABLED",
        movementSpeed: 1,
      },
    },
    map: TextureId.POINT,
  },
  [EffectId.BULLET]: {
    startLifetime: { min: 0.05, max: 0.05 },
    startSpeed: { min: 0, max: 0 },
    startSize: { min: 0.5, max: 0.5 },
    startOpacity: { min: 0.5, max: 0.5 },
    startColor: {
      min: {
        r: 0.9098039215686274,
        g: 0.9019607843137255,
        b: 0.9372549019607843,
      },
      max: {
        r: 0.4980392156862745,
        g: 0.4588235294117647,
        b: 0.7803921568627451,
      },
    },
    simulationSpace: "WORLD",
    maxParticles: 75,
    emission: { rateOverDistance: 10 },
    shape: { shape: "CONE", cone: { angle: 8.1528, radius: 0.0001 } },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0.1666, y: 0.8333 },
        { x: 0.3333, y: 0.6666 },
        { x: 0.5, y: 0.5, percentage: 0.5 },
        { x: 0.6666, y: 0.3332 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0.1666, y: 0.8333 },
        { x: 0.3333, y: 0.6666 },
        { x: 0.5, y: 0.5, percentage: 0.5 },
        { x: 0.6666, y: 0.3332 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    map: TextureId.POINT,
  },
  [EffectId.BULLET_EXPLOSION_SMOKE]: {
    duration: 0.25,
    looping: false,
    startLifetime: { min: 0.3, max: 1 },
    startSpeed: { min: 0.05, max: 0.3 },
    startSize: { min: 5, max: 10 },
    startRotation: { min: -360, max: 360 },
    startOpacity: { min: 0.3, max: 0.5 },
    gravity: -0.05,
    maxParticles: 5,
    emission: { rateOverTime: 20 },
    shape: { sphere: { radius: 0.0001 } },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0.3333, y: 0 },
        { x: 0.1666, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 0.8333, y: 1 },
        { x: 0.6666, y: 0.5449 },
        { x: 1, y: 0.5449, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1.0149 },
        { x: 1, y: 0.015, percentage: 1 },
      ],
    },
    map: TextureId.POINT,
    _editorData: {
      textureId: "CLOUD",
      simulation: { movements: "DISABLED" },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: { textureId: "WIREFRAME", movements: "DISABLED" },
    },
  },
  [EffectId.BULLET_EXPLOSION]: {
    duration: 0.2,
    looping: false,
    startLifetime: { min: 0.3, max: 0.8 },
    startSpeed: { max: 1.5 },
    startSize: { min: 0.2, max: 0.4 },
    startColor: {
      min: {
        r: 0.9098039215686274,
        g: 0.9019607843137255,
        b: 0.9372549019607843,
      },
      max: {
        r: 0.4980392156862745,
        g: 0.4588235294117647,
        b: 0.7803921568627451,
      },
    },
    gravity: 2,
    maxParticles: 15,
    emission: { rateOverTime: 40 },
    shape: { sphere: { radius: 0.01, arc: 180 } },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0.7, percentage: 0 },
        { x: 0.1666, y: 0.5333 },
        { x: 0.5633, y: 1.0566 },
        { x: 0.73, y: 0.89, percentage: 0.73 },
        { x: 0.8966, y: 0.7233 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0.7, percentage: 0 },
        { x: 0.18, y: 0.77 },
        { x: 0.5633, y: 1.0566 },
        { x: 0.73, y: 0.89, percentage: 0.73 },
        { x: 0.8966, y: 0.7233 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: { movements: "DISABLED" },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: { textureId: "WIREFRAME", movements: "DISABLED" },
    },
    map: TextureId.POINT,
  },
  [EffectId.CRATE_EXPLOSION]: {
    duration: 0.3,
    looping: false,
    startLifetime: { min: 0.4, max: 1 },
    startSpeed: { min: 2, max: 7 },
    startSize: { min: 0.5, max: 4 },
    startColor: {
      min: {
        r: 0.1,
        g: 0.1,
        b: 0.1,
      },
      max: {
        r: 0.2,
        g: 0.2,
        b: 0.2,
      },
    },
    gravity: 0.06,
    maxParticles: 50,
    emission: { rateOverTime: 200 },
    shape: { sphere: { radius: 0.2939, arc: 180 } },
    sizeOverLifetime: {
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 1, y: 1, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0.825, percentage: 0 },
        { x: 0.2033, y: 0.97 },
        { x: 0.47, y: 0.985 },
        { x: 0.7133, y: 0.965, percentage: 0.7133 },
        { x: 0.9132, y: 0.9485 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: { movements: "DISABLED" },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: { textureId: "WIREFRAME", movements: "DISABLED" },
    },
    textureSheetAnimation: {
      tiles: { x: 2, y: 2 },
      timeMode: "FPS",
      fps: 0,
      startFrame: { max: 4 },
    },
    map: TextureId.GROUND_DEBRIS,
  },
  [EffectId.CRATE_EXPLOSION_SMOKE]: {
    duration: 1,
    looping: false,
    startLifetime: { min: 0.67, max: 2.86 },
    startSpeed: { min: 1, max: 2.2 },
    startSize: { min: 35, max: 60 },
    startRotation: { min: -360, max: 360 },
    startOpacity: { min: 1, max: 1 },
    startColor: {
      min: {
        r: 0.1,
        g: 0.1,
        b: 0.1,
      },
      max: {
        r: 0.2,
        g: 0.2,
        b: 0.2,
      },
    },
    gravity: -0.004,
    emission: { rateOverTime: 500 },
    shape: {
      sphere: { radius: 0.4, arc: 180 },
    },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0.1666, y: 0.8333 },
        { x: 0.3333, y: 0.6666 },
        { x: 0.5, y: 0.5, percentage: 0.5 },
        { x: 0.6666, y: 0.3332 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    rotationOverLifetime: { isActive: true, min: -22.4, max: 24.3 },
    noise: {
      isActive: true,
      useRandomOffset: true,
      strength: 0.09,
      positionAmount: 0.191,
      rotationAmount: 1.677,
    },
    _editorData: {
      textureId: "CLOUD",
      simulation: { movements: "DISABLED" },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: { textureId: "WIREFRAME", movements: "DISABLED" },
    },
    map: TextureId.SMOKE,
  },
  [EffectId.CRATE_EXPLOSION_FIRE]: {
    duration: 0.5,
    looping: false,
    startLifetime: { min: 0.2, max: 1 },
    startSpeed: { min: 1, max: 2.2 },
    startSize: { min: 15, max: 30 },
    startRotation: { min: -360, max: 360 },
    startOpacity: { min: 1, max: 1 },
    startColor: {
      min: {
        r: 0.9725490196078431,
        g: 0.050980392156862744,
        b: 0.050980392156862744,
      },
      max: {
        r: 0.9921568627450981,
        g: 0.7803921568627451,
        b: 0.03137254901960784,
      },
    },
    gravity: -0.004,
    emission: { rateOverTime: 200 },
    shape: {
      sphere: { radius: 0.4, arc: 180 },
    },
    renderer: { blending: "THREE.NormalBlending" },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0.1666, y: 0.8333 },
        { x: 0.3333, y: 0.6666 },
        { x: 0.5, y: 0.5, percentage: 0.5 },
        { x: 0.6666, y: 0.3332 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    rotationOverLifetime: { isActive: true, min: -22.4, max: 24.3 },
    noise: {
      isActive: true,
      useRandomOffset: true,
      strength: 0.09,
      positionAmount: 0.191,
      rotationAmount: 1.677,
    },
    _editorData: {
      textureId: "CLOUD",
      simulation: { movements: "DISABLED" },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: { textureId: "WIREFRAME", movements: "DISABLED" },
    },
    map: TextureId.FIRE,
  },
  [EffectId.DASH]: {
    transform: { position: { y: 0.8 }, rotation: { y: 0 } },
    duration: 0.36,
    looping: false,
    startLifetime: { min: 0.01, max: 0.67 },
    startSpeed: { min: 0, max: 0 },
    simulationSpace: "WORLD",
    maxParticles: 25,
    emission: { rateOverTime: 100 },
    shape: { shape: "RECTANGLE", rectangle: { scale: { x: 0.5, y: 1.8 } } },
    renderer: { blending: "THREE.AdditiveBlending" },
    startSize: { min: 0.2, max: 0.4 },
    sizeOverLifetime: {
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 1, y: 1, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 1, percentage: 0 },
        { x: 0.1666, y: 0.8333 },
        { x: 0.3333, y: 0.6666 },
        { x: 0.5, y: 0.5, percentage: 0.5 },
        { x: 0.6666, y: 0.3332 },
        { x: 0.8333, y: 0.1665 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: { movements: "DISABLED", movementSpeed: 1.3 },
      showLocalAxes: false,
      showWorldAxes: false,
      terrain: {
        textureId: "WIREFRAME",
        movements: "DISABLED",
        movementSpeed: 1,
      },
    },
    map: TextureId.POINT,
  },
  [EffectId.ACTIVATE_COIN]: {
    transform: { rotation: { x: -90 } },
    duration: 0.4,
    looping: false,
    startLifetime: { min: 0.2, max: 0.6 },
    startSpeed: { min: 0.8, max: 1.5 },
    startSize: { min: 0.1, max: 2 },
    startColor: {
      min: {
        r: 0.596078431372549,
        g: 0.08235294117647059,
        b: 0.9372549019607843,
      },
      max: { g: 0, b: 0.8666666666666667 },
    },
    gravity: -2,
    maxParticles: 30,
    emission: { rateOverTime: 100 },
    shape: {
      sphere: { radius: 0.05, radiusThickness: 0.5 },
      cone: { angle: 17.5967, radius: 0.1 },
    },
    renderer: { blending: "THREE.NormalBlending" },
    velocityOverLifetime: {
      isActive: true,
      orbital: {
        x: { min: -25, max: 25 },
        y: { min: -25, max: 25 },
        z: { min: -5, max: 5 },
      },
    },
    sizeOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0.3333, y: 0 },
        { x: 0.1666, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 0.8333, y: 1 },
        { x: 0.6666, y: 0 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: {
        movements: "DISABLED",
        movementSpeed: 1,
        rotation: "DISABLED",
        rotationSpeed: 1,
      },
      showLocalAxes: false,
      showWorldAxes: false,
      frustumCulled: true,
      terrain: {
        textureId: "WIREFRAME",
        movements: "DISABLED",
        movementSpeed: 1,
        rotation: "DISABLED",
        rotationSpeed: 1,
      },
    },
    map: TextureId.POINT,
  },
  [EffectId.COLLECT_COIN]: {
    transform: { rotation: { x: -90 } },
    duration: 0.2,
    looping: false,
    startLifetime: { min: 0.3, max: 0.8 },
    startSpeed: { min: 0.5 },
    startSize: { min: 0.1, max: 1.5 },
    startColor: {
      min: {
        r: 0.596078431372549,
        g: 0.08235294117647059,
        b: 0.9372549019607843,
      },
      max: { g: 0, b: 0.8666666666666667 },
    },
    maxParticles: 30,
    emission: { rateOverTime: 200 },
    shape: { sphere: { radius: 0.4 }, cone: { angle: 17.5967, radius: 0.1 } },
    renderer: { blending: "THREE.NormalBlending" },
    velocityOverLifetime: { isActive: true, orbital: { y: { max: 5 } } },
    sizeOverLifetime: {
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0.3333, y: 0 },
        { x: 0.1666, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 0.8333, y: 1 },
        { x: 0.6666, y: 0 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    opacityOverLifetime: {
      isActive: true,
      bezierPoints: [
        { x: 0, y: 0, percentage: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
        { x: 0.5, y: 1, percentage: 0.5 },
        { x: 1, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 0, percentage: 1 },
      ],
    },
    _editorData: {
      textureId: "POINT",
      simulation: {
        movements: "DISABLED",
        movementSpeed: 1,
        rotation: "DISABLED",
        rotationSpeed: 1,
      },
      showLocalAxes: false,
      showWorldAxes: false,
      frustumCulled: true,
      terrain: {
        textureId: "WIREFRAME",
        movements: "DISABLED",
        movementSpeed: 1,
        rotation: "DISABLED",
        rotationSpeed: 1,
      },
    },
    map: TextureId.POINT,
  },
};
