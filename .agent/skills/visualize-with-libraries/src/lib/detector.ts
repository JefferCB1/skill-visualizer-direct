import fs from 'fs-extra';
import path from 'path';

export const getLocalIconPath = async (workspaceRoot: string, iconRef: string): Promise<string | null> => {
  // Posibles nombres de carpeta que el usuario pudo crear
  const possibleFolders = ['icons', 'librerias', 'libraries'];
  
  for (const folder of possibleFolders) {
    const folderPath = path.join(workspaceRoot, folder);
    
    if (await fs.pathExists(folderPath)) {
      // Buscamos el archivo con diferentes extensiones comunes
      const extensions = ['.svg', '.png', '.jpg', '.jpeg'];
      const fileName = iconRef.replace('icon_', ''); // Limpiamos el prefijo si existe
      
      for (const ext of extensions) {
        const fullPath = path.join(folderPath, `${fileName}${ext}`);
        if (await fs.pathExists(fullPath)) {
          return fullPath; // Devolvemos la ruta del icono encontrado
        }
      }
    }
  }
  
  return null; // No se encontró librería o icono
};