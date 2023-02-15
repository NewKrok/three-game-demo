const TerrainFragmentShader = `
  #include <common>
  #include <packing>
  #include <bsdfs>
  #include <lights_pars_begin>
  #include <fog_pars_fragment>
  #include <normal_pars_fragment>
  #include <shadowmap_pars_fragment>
  #include <shadowmask_pars_fragment>
  #include <dithering_pars_fragment>

  uniform highp sampler2D textures[5];
  uniform highp float steps[25];

  varying vec2 vUV;
  varying float vAmount;

  void main()
  {
    int stepIndex = 0;
    vec3 color = vec3(0.0, 0.0, 0.0);

    for(int i = 0; i < 5; i++)
    {
      vec3 textureColor = texture2D(textures[0], vUV * steps[stepIndex + 4]).rgb;
      switch (i) {
        case 1:
          textureColor = texture2D(textures[1], vUV * steps[stepIndex + 4]).rgb;
          break;
        case 2:
          textureColor = texture2D(textures[2], vUV * steps[stepIndex + 4]).rgb;
          break;
        case 3:
          textureColor = texture2D(textures[3], vUV * steps[stepIndex + 4]).rgb;
          break;
        case 4:
          textureColor = texture2D(textures[4], vUV * steps[stepIndex + 4]).rgb;
          break;
      }
      color += (smoothstep(steps[stepIndex], steps[stepIndex + 1], vAmount) - smoothstep(steps[stepIndex + 2], steps[stepIndex + 3], vAmount)) * textureColor;
      stepIndex += 5;
    }

    vec3 shadowColor = vec3(0, 0, 0);
    float shadowPower = 0.5;
    gl_FragColor = vec4(mix(color, shadowColor, (1.0 - getShadowMask()) * shadowPower), 1.0);

    #include <normal_fragment_begin>
	  #include <normal_fragment_maps>
  
    #include <tonemapping_fragment>
    #include <fog_fragment>
    #include <dithering_fragment>
  }
`;

export default TerrainFragmentShader;
