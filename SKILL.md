---
name: visualize-with-libraries
description: Renderiza diagramas BPMN usando iconos de carpetas locales ('icons' o 'librerias'). Detecta automáticamente carpetas de iconos en el proyecto.
allowed-tools:
  - "Read"
  - "Write"
  - "Bash"
  - "glob"
  - "grep"
---

# Visualizer with Local Libraries

Esta skill renderiza diagramas BPMN utilizando iconos de carpetas locales encontradas en el proyecto del usuario.

## Características

- Detección automática de carpetas de iconos locales
- Soporte para extensiones: `.svg`, `.png`, `.jpg`, `.jpeg`
- Prioridad de búsqueda: `icons/` > `librerias/` > `libraries/`
- Fallback a emojis técnicos si no se encuentran iconos
- Estilo visual 60-30-10 para colores

## Uso

Cuando el usuario quiera renderizar un diagrama BPMN y desee usar iconos locales:

1. La skill escanea el proyecto buscando carpetas `icons/`, `librerias/` o `libraries/`
2. Busca iconos que coincidan con los tipos de tareas BPMN
3. Genera el diagrama usando los iconos encontrados

### Estructura de carpetas de iconos

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

### Nombres de archivos de iconos

| Tipo de tarea | Archivo esperado |
|---------------|------------------|
| Service Task  | `service.svg`, `service.png` |
| User Task     | `user.svg`, `user.png` |
| Script Task  | `script.svg`, `script.png` |
| Manual Task  | `manual.svg`, `manual.png` |
| Send Task    | `send.svg`, `send.png` |
| Receive Task | `receive.svg`, `receive.png` |

## Instalación manual

Para instalar esta skill:

```bash
# Crear directorio de skills
mkdir -p ~/.config/opencode/skills

# Copiar la skill
cp -r /ruta/a/skill-visualizer-direct ~/.config/opencode/skills/visualize-with-libraries
```
