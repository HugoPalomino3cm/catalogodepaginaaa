import pandas as pd
import json

# Leer el archivo Excel
df = pd.read_excel('lista de precios 2025.xlsx')

# Limpiar datos - solo productos válidos
df_clean = df[df['Producto'].notna() & (df['Producto'] != 'Producto')]

products = []

# Categorizar automáticamente los productos
for idx, row in df_clean.iterrows():
    nombre = str(row['Producto']).strip()
    categoria = 'papeleria'  # Categoría por defecto
    
    nombre_lower = nombre.lower()
    
    # Categorización inteligente basada en palabras clave
    if any(x in nombre_lower for x in ['cuaderno', 'lapiz', 'regla', 'compas', 'block', 'boligrafo', 'goma', 'borrador', 'sacapunta', 'tijera', 'colores', 'mochila', 'estuche']):
        categoria = 'escolar'
    elif any(x in nombre_lower for x in ['carpeta', 'archivador', 'marcador', 'destacador', 'clip', 'perforadora', 'engrapadora', 'post-it', 'corrector', 'tinta', 'folder', 'separador']):
        categoria = 'oficina'
    elif any(x in nombre_lower for x in ['acuarela', 'pincel', 'tempera', 'plasticina', 'arcilla', 'manualidad', 'pintura', 'barniz', 'virutilla', 'glitter']):
        categoria = 'arte'
    elif any(x in nombre_lower for x in ['calculadora', 'audifono', 'parlante', 'bateria', 'pila', 'bluetooth', 'usb', 'cable', 'cargador']):
        categoria = 'tecnologia'
    
    products.append({
        'name': nombre,
        'category': categoria,
        'image': ''
    })

print(f'✅ Total productos procesados: {len(products)}')

# Guardar en JSON temporal
with open('products_data.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, ensure_ascii=False, indent=2)

# Generar el código JavaScript para products.js
js_code = "// Array de productos - Generado automáticamente desde Excel\n"
js_code += "// Total de productos: " + str(len(products)) + "\n\n"
js_code += "const products = [\n"

for i, product in enumerate(products):
    name = product['name'].replace('"', '\\"')
    category = product['category']
    
    js_code += f'    {{\n'
    js_code += f'        name: "{name}",\n'
    js_code += f'        category: "{category}",\n'
    js_code += f'        image: ""\n'
    js_code += f'    }}'
    
    if i < len(products) - 1:
        js_code += ','
    
    js_code += '\n'

js_code += "];\n"

# Guardar el archivo products.js
with open('products.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f'✅ Archivo products.js generado con éxito')
print(f'\nCategorías distribuidas:')
print(f"  - Escolar: {len([p for p in products if p['category'] == 'escolar'])} productos")
print(f"  - Oficina: {len([p for p in products if p['category'] == 'oficina'])} productos")
print(f"  - Papelería: {len([p for p in products if p['category'] == 'papeleria'])} productos")
print(f"  - Arte: {len([p for p in products if p['category'] == 'arte'])} productos")
print(f"  - Tecnología: {len([p for p in products if p['category'] == 'tecnologia'])} productos")
