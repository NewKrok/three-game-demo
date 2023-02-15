const TerrainVertexShader = `
  #include <common>
  #include <fog_pars_vertex>
  #include <normal_pars_vertex>
  #include <shadowmap_pars_vertex>

  uniform sampler2D bumpTexture;

  varying float vAmount;
  varying vec2 vUV;

  void main()
  {
    vUV = uv;

    vec4 bumpData = texture2D(bumpTexture, uv);
    vAmount = bumpData.r;

    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
	  #include <normal_vertex>

    #include <begin_vertex>
    #include <project_vertex>
    #include <worldpos_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>
  }
`;

export default TerrainVertexShader;
