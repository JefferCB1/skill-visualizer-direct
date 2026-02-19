"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalIconPath = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const getLocalIconPath = async (workspaceRoot, iconRef) => {
    // Posibles nombres de carpeta que el usuario pudo crear
    const possibleFolders = ['icons', 'librerias', 'libraries'];
    for (const folder of possibleFolders) {
        const folderPath = path_1.default.join(workspaceRoot, folder);
        if (await fs_extra_1.default.pathExists(folderPath)) {
            // Buscamos el archivo con diferentes extensiones comunes
            const extensions = ['.svg', '.png', '.jpg', '.jpeg'];
            const fileName = iconRef.replace('icon_', ''); // Limpiamos el prefijo si existe
            for (const ext of extensions) {
                const fullPath = path_1.default.join(folderPath, `${fileName}${ext}`);
                if (await fs_extra_1.default.pathExists(fullPath)) {
                    return fullPath; // Devolvemos la ruta del icono encontrado
                }
            }
        }
    }
    return null; // No se encontró librería o icono
};
exports.getLocalIconPath = getLocalIconPath;
