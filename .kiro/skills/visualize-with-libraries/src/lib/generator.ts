import fs from 'fs-extra';
import path from 'path';
import { getLocalIconPath } from './detector';

export const generateDiagramFile = async (bpmnData: any, projectRoot: string): Promise<string> => {
  const outputDir = path.join(projectRoot, 'output');
  await fs.ensureDir(outputDir);
  
  const diagramPath = path.join(outputDir, `diagram-${Date.now()}.svg`);
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">`;
  svgContent += `<rect width="100%" height="100%" fill="#f9f9f9"/>`;
  
  const tasks = bpmnData?.tasks || [];
  
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const iconPath = await getLocalIconPath(projectRoot, task.icon || task.type);
    
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
  
  await fs.writeFile(diagramPath, svgContent);
  
  return diagramPath;
};
