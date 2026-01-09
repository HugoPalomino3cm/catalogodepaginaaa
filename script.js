// Configuración
const PRODUCTS_PER_PAGE = 24;
let currentPage = 1;
let currentCategory = 'all';
let currentSearch = '';

// Función para renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    
    // Filtrar productos por categoría y búsqueda
    let filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || 
            (Array.isArray(product.category) 
                ? product.category.includes(currentCategory)
                : product.category === currentCategory);
        const matchesSearch = product.name.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Calcular paginación
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    // Actualizar contador
    productCount.textContent = totalProducts;

    // Limpiar grid
    productsGrid.innerHTML = '';

    // Mostrar estado vacío si no hay productos
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <p>📦 No se encontraron productos</p>
                <p style="font-size: 0.9rem; color: #999;">Intenta con otra búsqueda o categoría</p>
            </div>
        `;
        renderPagination(0, 0);
        return;
    }

    // Aplicar/remover temas solo para Halloween y Fiestas Patrias
    productsGrid.classList.remove('halloween-theme', 'fiestas-patrias-theme');
    
    if (currentCategory === 'halloween') {
        productsGrid.classList.add('halloween-theme');
    } else if (currentCategory === 'fiestas-patrias') {
        productsGrid.classList.add('fiestas-patrias-theme');
    }

    // Renderizar productos
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        const categoryNames = {
            'escolar': 'Escolar',
            'oficina': 'Oficina',
            'papeleria': 'Papelería',
            'arte': 'Arte y Manualidades',
            'tecnologia': 'Tecnología',
            'jugueteria': 'Juguetería',
            'limpieza': 'Limpieza',
            'hogar': 'Hogar',
            'dulces': 'Dulces',
            'cuidado-personal': 'Cuidado Personal',
            'halloween': '🎃 Halloween',
            'fiestas-patrias': 'Fiestas Patrias'
        };

        const getCategoryLabel = (category) => {
            if (Array.isArray(category)) {
                return category.map(cat => categoryNames[cat] || cat).join(' • ');
            }
            return categoryNames[category] || category;
        };

        productCard.innerHTML = `
            <div class="product-image ${product.image ? '' : 'placeholder'}">
                ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.classList.add('placeholder'); this.style.display='none';">` : ''}
                <span class="category-badge">${getCategoryLabel(product.category)}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });

    // Renderizar paginación
    renderPagination(totalPages, totalProducts);
}

// Función para renderizar paginación
function renderPagination(totalPages, totalProducts) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Anterior';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    pagination.appendChild(prevBtn);

    // Información de página
    const pageInfo = document.createElement('span');
    pageInfo.className = 'page-info';
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    pagination.appendChild(pageInfo);

    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    pagination.appendChild(nextBtn);
}

// Event listeners para filtros de categoría
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            // Actualizar categoría actual y resetear página
            currentCategory = button.dataset.category;
            currentPage = 1;
            
            // Renderizar productos
            renderProducts();
        });
    });

    // Event listener para búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        currentPage = 1;
        renderProducts();
    });

    // Renderizar productos iniciales
    renderProducts();
});
