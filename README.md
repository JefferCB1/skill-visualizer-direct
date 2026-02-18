# Skill Visualizer Direct

Skill para renderizado de diagramas BPMN con soporte de iconos locales.

## Descripción

Esta skill escanea automáticamente carpetas `icons`, `librerias` o `libraries` en el proyecto del usuario para usar iconos personalizados al renderizar diagramas BPMN.

## Características

- Detección automática de carpetas de iconos locales
- Soporte para extensiones: `.svg`, `.png`, `.jpg`, `.jpeg`
- Prioridad de búsqueda: `icons/` > `librerias/` > `libraries/`
- Fallback a emojis técnicos si no se encuentran iconos
- Estilo visual 60-30-10 para colores

## Instalación

### Opción 1: Instalación directa desde npm (recomendado)

```bash
npm install skill-visualizer-direct
```

### Opción 2: Instalación desde código fuente

```bash
# Clonar el repositorio
git clone https://github.com/JefferCB1/skill-visualizer-direct.git
cd skill-visualizer-direct

# Instalar dependencias
npm install

# Compilar TypeScript
npm run build
```

### Opción 3: Enlace simbólico (desarrollo)

```bash
# En el directorio de la skill
npm link

# En tu proyecto opencode
npm link skill-visualizer-direct
```

## Uso

### Estructura de carpetas de iconos

La skill busca iconos en estas ubicaciones (en orden de prioridad):

```
tu-proyecto/
├── icons/           # Prioridad 1
│   ├── db.svg
│   ├── user.png
│   └── api.jpg
├── librerias/        # Prioridad 2
│   └── ...
└── libraries/        # Prioridad 3
    └── ...
```

### Nombres de archivos

Los iconos deben nombrarse según el tipo de tarea BPMN:

| Tipo de tarea | Archivo esperado |
|---------------|------------------|
| Service Task  | `service.svg`, `service.png` |
| User Task     | `user.svg`, `user.png` |
| Script Task  | `script.svg`, `script.png` |
| Manual Task  | `manual.svg`, `manual.png` |
| Send Task    | `send.svg`, `send.png` |
| Receive Task | `receive.svg`, `receive.png` |

### Ejemplo de uso en código

```typescript
import { visualizerSkill } from 'skill-visualizer-direct';

// La skill se integra automáticamente con opencode
const result = await visualizerSkill.execute({
  bpmn_data: {
    tasks: [
      { type: 'user', name: 'Crear usuario', icon: 'user' },
      { type: 'service', name: 'Guardar en DB', icon: 'db' }
    ]
  },
  project_root: '/path/to/project'
});

console.log(result.file_path); // Ruta del diagrama generado
```

## Integración con Opencode

Para registrar la skill en opencode, agrega a tu configuración:

```json
{
  "skills": {
    "visualize-with-libraries": {
      "path": "node_modules/skill-visualizer-direct"
    }
  }
}
```

## API

### `visualizerSkill`

Objeto principal de la skill con la siguiente estructura:

```typescript
{
  name: "visualize-with-libraries",
  description: "Renderiza diagramas usando iconos de carpetas locales",
  systemPrompt: string,
  parameters: {
    bpmn_data: any,
    project_root: string
  },
  execute: (params) => Promise<{
    status: string,
    file_path: string,
    details: string
  }>
}
```

## Licencia

MIT
