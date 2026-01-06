# Catálogo de Productos

Página web profesional de catálogo de productos, responsive y organizada por categorías.

## 📋 Características

- ✅ Diseño responsive (móvil y PC)
- ✅ Organización por categorías
- ✅ Búsqueda de productos
- ✅ Paginación automática (24 productos por página)
- ✅ Sin precios (solo nombre y foto)
- ✅ Diseño profesional y moderno

## 🚀 Cómo usar

### 1. Agregar productos desde Excel

Abre el archivo `products.js` y agrega tus productos siguiendo este formato:

```javascript
{
    name: "Nombre del producto",
    category: "categoria",  // escolar, oficina, papeleria, arte, tecnologia
    image: "ruta/a/imagen.jpg"  // o déjalo vacío ""
}
```

#### Ejemplo:
```javascript
{
    name: "Cuaderno Profesional 100 hojas",
    category: "escolar",
    image: "imagenes/cuaderno.jpg"
}
```

### 2. Agregar imágenes de productos

Opción A: **Usar URLs de internet**
```javascript
image: "https://ejemplo.com/imagen.jpg"
```

Opción B: **Usar imágenes locales**
1. Crea una carpeta llamada `imagenes` en este directorio
2. Coloca tus imágenes ahí
3. Referencia: `image: "imagenes/nombre-imagen.jpg"`

Opción C: **Sin imagen**
```javascript
image: ""  // Mostrará un ícono de placeholder
```

### 3. Categorías disponibles

- `escolar` - Productos escolares
- `oficina` - Artículos de oficina
- `papeleria` - Papelería general
- `arte` - Arte y manualidades
- `tecnologia` - Productos tecnológicos

**Puedes agregar más categorías:**
1. En `index.html` (línea 22-28): Agrega un nuevo botón
2. En `script.js` (línea 56-62): Agrega el nombre en español

### 4. Convertir Excel a formato de productos

Para facilitar la conversión de tu archivo Excel:

1. Abre tu Excel
2. Asegúrate de tener columnas: Nombre, Categoría
3. Usa esta fórmula en una columna auxiliar:
```
="{name: """ & A2 & """, category: """ & B2 & """, image: """"},"
```
4. Copia los resultados y pégalos en `products.js`

### 5. Abrir la página

Simplemente abre el archivo `index.html` en tu navegador web.

## 🎨 Personalización

### Cambiar colores
Edita el archivo `styles.css`:
- Línea 24: Color del header
- Línea 68: Color de botones de categoría

### Cambiar productos por página
En `script.js`, línea 2:
```javascript
const PRODUCTS_PER_PAGE = 24; // Cambia este número
```

### Cambiar título
En `index.html`, línea 7 y 13:
```html
<title>Tu Título</title>
<h1>Tu Título</h1>
```

## 📱 Subir a Internet

### Opción 1: GitHub Pages (Gratis)
1. Crea una cuenta en GitHub
2. Sube estos archivos
3. Activa GitHub Pages en la configuración

### Opción 2: Netlify (Gratis)
1. Ve a netlify.com
2. Arrastra la carpeta completa
3. Obtendrás una URL automáticamente

### Opción 3: Hosting tradicional
1. Sube todos los archivos por FTP
2. Asegúrate de que `index.html` esté en la raíz

## 📝 Archivos incluidos

- `index.html` - Estructura de la página
- `styles.css` - Estilos y diseño
- `script.js` - Funcionalidad (filtros, búsqueda, paginación)
- `products.js` - Base de datos de productos
- `README.md` - Este archivo de instrucciones

## 💡 Consejos

- Las imágenes deben ser cuadradas o rectangulares para verse mejor
- Tamaño recomendado: 500x500 píxeles
- Formato: JPG o PNG
- Mantén los nombres de archivo sin espacios ni caracteres especiales

## ❓ Soporte

Si tienes dudas sobre cómo agregar productos o personalizar la página, revisa los comentarios en cada archivo.
