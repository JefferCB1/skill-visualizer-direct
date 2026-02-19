---
name: visualize-with-libraries
description: Renderiza diagramas BPMN usando iconos de carpetas locales ('icons' o 'librerias'). Detecta automáticamente carpetas de iconos en el proyecto. Genera JSON Excalidraw minimalista con coordenadas X/Y.
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

## REGLAS ESTRICTAS DE GENERACIÓN EXCALIDRAW (CRÍTICO)

### Minimalismo JSON
- **PROHIBIDO** usar el tipo `freedraw`
- Usa únicamente tipos primitivos: `rectangle`, `diamond`, `text`, `arrow`
- Omite metadatos redundantes para que el archivo pese menos de 500 líneas

### Motor de Conexiones
- Toda línea (`type: "arrow"`) **DEBE** estar conectada lógicamente
- Usa **obligatoriamente** `startBinding` y `endBinding` apuntando a los IDs de origen y destino
- Ejemplo obligatorio de flecha:
```json
{
  "type": "arrow",
  "id": "arr_1",
  "startBinding": {"elementId": "origen_1", "focus": 0, "gap": 5},
  "endBinding": {"elementId": "destino_1", "focus": 0, "gap": 5},
  "roundness": {"type": 2}
}
```

### Anclaje de Texto
- Todo texto dentro de un rectángulo o rombo debe estar vinculado usando la propiedad `boundElements` en la figura contenedora

### Estructura JSON de Salida

```json
{
  "type": "excalidraw",
  "version": 2,
  "elements": [
    {"type": "rectangle", "id": "task_1", "x": 100, "y": 100, "width": 120, "height": 60},
    {"type": "text", "id": "text_1", "x": 130, "y": 120, "content": "Recibir Email", "boundElements": [{"type": "rectangle", "id": "task_1"}]},
    {"type": "arrow", "id": "arr_1", "startBinding": {"elementId": "task_1", "focus": 0, "gap": 5}, "endBinding": {"elementId": "task_2", "focus": 0, "gap": 5}}
  ]
}
```

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

## Instalación

npx skills add JefferCB1/skill-visualizer-direct
