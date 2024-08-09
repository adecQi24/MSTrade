document.addEventListener('DOMContentLoaded', () => {
    const minValues = {
        width: 4,
        et: -100,
        distance: 0,
        newWidth: 4,
        newEt: -100,
        newDistance: 0
    };

    const maxValues = {
        width: 12,
        et: 100,
        distance: 40,
        newWidth: 12,
        newEt: 100,
        newDistance: 40
    };

    document.querySelectorAll('.ET-value').forEach(container => {
        const decreaseButton = container.querySelector('.decrease');
        const increaseButton = container.querySelector('.increase');
        const input = container.querySelector('.value');
        const type = decreaseButton.dataset.type;
        const isWidth = type === 'width';

        if (isWidth) {
            decreaseButton.addEventListener('click', () => {
                let currentValue = parseFloat(input.value);
                const minValue = minValues[type];
                if (currentValue > minValue) {
                    input.value = (currentValue - 0.5).toFixed(1);
                    updateResults();
                }
            });

            increaseButton.addEventListener('click', () => {
                let currentValue = parseFloat(input.value);
                const maxValue = maxValues[type];
                if (currentValue < maxValue) {
                    input.value = (currentValue + 0.5).toFixed(1);
                    updateResults();
                }
            });
        } else {
            decreaseButton.addEventListener('click', () => {
                let currentValue = parseInt(input.value, 10);
                const minValue = minValues[type];
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                    updateResults();
                }
            });

            increaseButton.addEventListener('click', () => {
                let currentValue = parseInt(input.value, 10);
                const maxValue = maxValues[type];
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                    updateResults();
                }
            });
        }
    });

    // Inicjalizacja wyników przy załadowaniu strony
    updateResults();
});

function updateResults() {
    const widthOriginal = parseFloat(document.querySelector('.ET-value .value.width[data-group="original"]').value);
    const etOriginal = parseFloat(document.querySelector('.ET-value .value.et[data-group="original"]').value);
    const distanceOriginal = parseFloat(document.querySelector('.ET-value .value.distance[data-group="original"]').value);

    const widthNew = parseFloat(document.querySelector('.ET-value .value.width[data-group="new"]').value);
    const etNew = parseFloat(document.querySelector('.ET-value .value.et[data-group="new"]').value);
    const distanceNew = parseFloat(document.querySelector('.ET-value .value.distance[data-group="new"]').value);

    // Przekształć szerokość z cali na mm (1 cal = 25.4 mm)
    const widthOriginalMM = widthOriginal * 25.4;
    const widthNewMM = widthNew * 25.4;

    // Oblicz zmiany dla widoku od zewnątrz (front felgi)
    const frontChange = ((etNew - etOriginal) + (widthOriginalMM - widthNewMM) / 2 - (distanceNew - distanceOriginal));
    
    // Oblicz zmiany dla widoku od wewnątrz (tył felgi)
    const rearChange = ((etOriginal - etNew) - (widthNewMM - widthOriginalMM) / 2 + (distanceNew - distanceOriginal));

    // Zaktualizuj sekcję wyników
    document.getElementById('result-front').innerHTML = `
        <span class="highlight"><strong>Od zewnątrz (front felgi) </strong></span><br>
        ${frontChange < 0 ? `Nowa felga będzie bardziej wystawać o ${Math.abs(frontChange).toFixed(1)} mm` :
          frontChange > 0 ? `Nowa felga będzie głębiej osadzona o ${Math.abs(frontChange).toFixed(1)} mm` :
          'Osadzenie nowej felgi będzie identyczne jak w przypadku wzorcowej felgi.'}
    `;
    document.getElementById('result-rear').innerHTML = `
        <span class="highlight"><strong>Od wewnątrz (tył felgi) </strong></span><br>
        ${rearChange > 0 ? `Nowa felga będzie dalej od elementów zawieszenia o ${Math.abs(rearChange).toFixed(1)} mm` :
          rearChange < 0 ? `Nowa felga będzie bliżej elementów zawieszenia o ${Math.abs(rearChange).toFixed(1)} mm` :
          'Osadzenie nowej felgi będzie identyczne jak w przypadku wzorcowej felgi.'}
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerNav = document.querySelector('.hamburger-nav');
    const closeIcon = document.querySelector('.close-icon');
    const mainContent = document.querySelector('main');
    const footerContent = document.querySelector('#footer');

    // Funkcja do zamykania menu
    const closeMenu = () => {
        hamburgerNav.classList.remove('open');
        mainContent.classList.remove('blurred');
        footerContent.classList.remove('blurred');
    };

    // Obsługuje kliknięcie w hamburgera
    hamburgerMenu.addEventListener('click', function() {
        if (hamburgerNav.classList.contains('open')) {
            closeMenu();
        } else {
            hamburgerNav.classList.add('open');
            mainContent.classList.add('blurred');
            footerContent.classList.add('blurred');
        }
    });

    // Obsługuje kliknięcie w ikonę zamknięcia (X)
    closeIcon.addEventListener('click', function() {
        closeMenu();
    });

    // Zamknięcie menu po kliknięciu poza nim
    document.addEventListener('click', function(event) {
        if (hamburgerNav.classList.contains('open') &&
            !hamburgerNav.contains(event.target) &&
            !hamburgerMenu.contains(event.target)) {
            closeMenu();
        }
    });

    // Zamknięcie menu po kliknięciu w link prowadzący do sekcji
    document.querySelectorAll('.hamburger-nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            if (link.getAttribute('href').startsWith('#')) {
                closeMenu();
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById("latest-products");

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });
});

/* OBSŁUGA GALERII */

document.addEventListener('DOMContentLoaded', () => {
    const photos = [
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
        'images/example1.svg', 'images/gallery-bg.svg', 'images/client-example.svg', 'images/car-brands.svg',
    ];

    const photoGrid = document.getElementById('photo-grid');
    const pagination = document.getElementById('pagination');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let itemsPerPage = 50;
    let currentPage = 1;
    let currentIndex = 0;

    function updateItemsPerPage() {
        const width = window.innerWidth;

        if (width <= 400) {
            itemsPerPage = 10;
        } else if (width <= 820) {
            itemsPerPage = 20;
        } else if (width <= 1024) {
            itemsPerPage = 40;
        } else {
            itemsPerPage = 50;
        }

        renderPhotos(currentPage);
        renderPagination();
    }

    function createPhotoItem(src, index) {
        const div = document.createElement('div');
        div.className = 'photo-item';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Galeria';
        img.addEventListener('click', () => openModal(index));
        div.appendChild(img);
        return div;
    }

    function renderPhotos(page) {
        photoGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, photos.length);

        for (let i = start; i < end; i++) {
            photoGrid.appendChild(createPhotoItem(photos[i], i));
        }
    }

    function renderPagination() {
        const totalPages = Math.ceil(photos.length / itemsPerPage);
        pagination.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            if (i != currentPage){
                link.classList.add('disabled');
            }
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderPhotos(currentPage);
                updateActivePage(currentPage);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            pagination.appendChild(link);
        }
    }

    function updateActivePage(page) {
        const links = pagination.querySelectorAll('a');
        links.forEach(link => {
            link.style.fontWeight = link.textContent == page ? 'bold' : 'normal';
            if (parseInt(link.textContent) === page) {
                link.classList.remove('disabled');
            } else {
                link.classList.add('disabled');
            }
        });
    }

    function openModal(index) {
        currentIndex = index;
        modalImg.src = photos[index];
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        modalImg.src = photos[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % photos.length;
        modalImg.src = photos[currentIndex];
    }

    // Initialize gallery
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    // Event listeners
    modalClose.addEventListener('click', closeModal);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    renderPhotos(currentPage);
    renderPagination();
});

/* Do osbsługi filtrów felg */


document.querySelectorAll('.collapsible').forEach(function(element) {
    element.addEventListener('click', function() {
        // Zwinięcie wszystkich innych sekcji rodzica i ich dzieci
        document.querySelectorAll('.collapsible').forEach(function(collapsible) {
            if (collapsible !== this) {
                collapsible.classList.remove('active');
                collapsible.nextElementSibling.style.display = 'none';
                // Zwijanie podsekcji
                collapsible.nextElementSibling.querySelectorAll('.sub-collapsible').forEach(function(subCollapsible) {
                    subCollapsible.classList.remove('active');
                    subCollapsible.nextElementSibling.style.display = 'none';
                });
            }
        }.bind(this));

        // Przełączanie aktywnej sekcji
        const content = this.nextElementSibling;
        const isActive = content.style.display === 'block';
        this.classList.toggle('active', !isActive);
        content.style.display = isActive ? 'none' : 'block';
    });
});

document.querySelectorAll('.sub-collapsible').forEach(function(element) {
    element.addEventListener('click', function(event) {
        // Zapobiega rozprzestrzenianiu się kliknięcia na rodzica
        event.stopPropagation();

        // Zwijanie wszystkich innych sub-sekcji w bieżącej sekcji rodzica
        const parentContent = this.closest('.content');
        parentContent.querySelectorAll('.sub-collapsible').forEach(function(subCollapsible) {
            if (subCollapsible !== this) {
                subCollapsible.classList.remove('active');
                subCollapsible.nextElementSibling.style.display = 'none';
            }
        }.bind(this));

        // Przełączanie aktywnej sub-sekcji
        const subContent = this.nextElementSibling;
        const isActive = subContent.style.display === 'block';
        this.classList.toggle('active', !isActive);
        subContent.style.display = isActive ? 'none' : 'block';
    });
});

/* Osbługa Felg -> produkty */

document.addEventListener("DOMContentLoaded", function() {
    const wheels = [
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
        { imgSrc: "images/example1.svg", title: "R17 Dezent KS Graphite 7.0''", description: ["Mazda 6 CX3", "Mazda 6 CX3", "Mazda 6 CX3"] },
    ];

    const itemsPerPage = 36;
    const paginationElement = document.getElementById('pagination');
    const wheelsElement = document.getElementById('wheels');
    let currentPage = 1;

    function renderWheels(page) {
        wheelsElement.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = wheels.slice(start, end);

        itemsToShow.forEach(item => {
            const wheelDiv = document.createElement('div');
            wheelDiv.classList.add('wheels-content-item');
            wheelDiv.innerHTML = `
                <div class="wheels-content-single">
                    <img src="${item.imgSrc}" alt="${item.title}">
                    <h5>${item.title}</h5>
                    <div class="wheels-description">
                        ${item.description.map(desc => `<p>${desc}</p>`).join('')}
                    </div>
                </div>
            `;
            wheelsElement.appendChild(wheelDiv);
        });
    }

    function renderPagination() {
        paginationElement.innerHTML = '';
        const totalPages = Math.ceil(wheels.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            if (i != currentPage) {
                button.classList.add('disabled');
            }
            button.addEventListener('click', function() {
                currentPage = i;
                renderWheels(currentPage);
                renderPagination();

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            paginationElement.appendChild(button);
        }
    }

    renderWheels(currentPage);
    renderPagination();
});

document.addEventListener('DOMContentLoaded', function() {
    // Funkcja rozwijania i zwijania filtrów
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });

    const subCollapsibles = document.querySelectorAll('.sub-collapsible');
    subCollapsibles.forEach(subCollapsible => {
        subCollapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const subContent = this.nextElementSibling;
            if (subContent.style.display === 'block') {
                subContent.style.display = 'none';
            } else {
                subContent.style.display = 'block';
            }
        });
    });

    // Pokazywanie menu filtra po kliknięciu ikony filtra
    document.querySelector('.filter-icon').addEventListener('click', function() {
        const filterMenu = document.querySelector('.filter-menu');
        if (filterMenu.style.display === 'block') {
            filterMenu.style.display = 'none';
        } else {
            filterMenu.style.display = 'block';
        }
    });
});
