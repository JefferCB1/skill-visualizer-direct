"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visualizerSkill = void 0;
const zod_1 = require("zod");
const prompt_1 = require("./prompt");
const generator_1 = require("./lib/generator");
exports.visualizerSkill = {
    name: "visualize-with-libraries",
    description: "Renderiza diagramas usando iconos de carpetas locales ('icons' o 'librerias').",
    systemPrompt: prompt_1.VISUALIZER_SYSTEM_PROMPT,
    parameters: zod_1.z.object({
        bpmn_data: zod_1.z.any(),
        project_root: zod_1.z.string().describe("Ruta del proyecto actual para buscar librerías")
    }),
    execute: async (params) => {
        // La Skill ahora tiene la capacidad de buscar antes de dibujar
        console.log("🔍 Escaneando librerías de iconos locales...");
        const filePath = await (0, generator_1.generateDiagramFile)(params.bpmn_data, params.project_root);
        return {
            status: "success",
            file_path: filePath,
            details: "Se priorizaron las carpetas 'icons' o 'librerias' del usuario."
        };
    }
};
