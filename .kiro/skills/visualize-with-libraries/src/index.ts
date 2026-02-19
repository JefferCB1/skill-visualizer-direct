import { z } from 'zod';
import { VISUALIZER_SYSTEM_PROMPT } from './prompt';
import { generateDiagramFile } from './lib/generator'; 
import { getLocalIconPath } from './lib/detector';

export const visualizerSkill = {
  name: "visualize-with-libraries",
  description: "Renderiza diagramas usando iconos de carpetas locales ('icons' o 'librerias').",
  
  systemPrompt: VISUALIZER_SYSTEM_PROMPT,
  
  parameters: z.object({
    bpmn_data: z.any(),
    project_root: z.string().describe("Ruta del proyecto actual para buscar librerías")
  }),

  execute: async (params: any) => {
    // La Skill ahora tiene la capacidad de buscar antes de dibujar
    console.log("🔍 Escaneando librerías de iconos locales...");
    
    const filePath = await generateDiagramFile(params.bpmn_data, params.project_root);
    
    return {
      status: "success",
      file_path: filePath,
      details: "Se priorizaron las carpetas 'icons' o 'librerias' del usuario."
    };
  }
};