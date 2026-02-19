"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDiagramFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const detector_1 = require("./detector");
const generateDiagramFile = async (bpmnData, projectRoot) => {
    const outputDir = path_1.default.join(projectRoot, 'output');
    await fs_extra_1.default.ensureDir(outputDir);
    const diagramPath = path_1.default.join(outputDir, `diagram-${Date.now()}.svg`);
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">`;
    svgContent += `<rect width="100%" height="100%" fill="#f9f9f9"/>`;
    const tasks = bpmnData?.tasks || [];
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const iconPath = await (0, detector_1.getLocalIconPath)(projectRoot, task.icon || task.type);
        const x = 100 + (i % 3) * 200;
        const y = 100 + Math.floor(i / 3) * 150;
        svgContent += `
      <g transform="translate(${x}, ${y})">
        <rect width="150" height="80" rx="8" fill="#ffffff" stroke="#3b82f6" stroke-width="2"/>
        <text x="75" y="35" text-anchor="middle" font-family="Arial" font-size="12">${task.name || task.type}</text>
        ${iconPath ? `<image href="${iconPath}" x="60" y="45" width="30" height="30"/>` : `<text x="75" y="60" text-anchor="middle" font-size="16">⚙️</text>`}
      </g>
    `;
    }
    svgContent += `</svg>`;
    await fs_extra_1.default.writeFile(diagramPath, svgContent);
    return diagramPath;
};
exports.generateDiagramFile = generateDiagramFile;
