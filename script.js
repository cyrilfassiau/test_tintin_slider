const itemData = {
    fetiche: {
        title: "Le Fétiche Arumbaya",
       
         images: [
            src="images/fetiche2.png",
            src="images/fetiche3.png",
            src="images/fetiche4.png"
        ],
        description: "« En juin 1979, une importante exposition, destinée à voyager ensuite, sera inaugurée aux Palais des Beaux Arts de Bruxelles. Le détail de son contenu échappe à Hergé, mais ses concepteurs lui ont expliqué qu’il s’agirait de confronter les objets mythiques collectés par Tintin au cours de ses aventures aux objets réels qui les ont inspirés. Sur l’affiche de l’exposition, Hergé tente d’organiser l’incursion de ses principaux personnages au beau milieu d’une installation imaginaire propre à rendre fous de jalousie tous les collectionneurs. » Extrait : Chronologie d’une œuvre – tome 7.",
       
    },
    sceptre: {
        title: "Le Sceptre d'Ottokar",
       
        images: [
            
            src="images/sceptre3.png",
            src="images/sceptre4.png"
        ],
        description: "Le sceptre et pas n’importe quel sceptre: Le Sceptre d’Ottokar. La collection Les Icônes Cette fois, c’est le symbole royal qui est mis à l’honneur: Le symbole royal de la Syldavie, minuscule pays constitué de quelques villages et de forêts, si petit que Tintin n'a pas de difficulté à le traverser rapidement d’un bout à l’autre. ",
       
    },
    mochica: {
        title: "Vase Mochica",
        
        images: [
            src="images/mochica1.png",
            src="images/mochica2.png"
        ],
        description: "Comme ce fut le cas pour la création de plusieurs de ses aventures, Hergé se rendit au musée du Cinquantenaire qui fait partie des Musées royaux d'Art et d'Histoire, afin de se documenter. C'est notamment en ces lieux qu'il vit un modèle de vase-portrait (communément appelé vase étrier car grâce à sa boucle, il était possible d'y passer une corde et d'ainsi l'attacher aux lamas avec d'autres vases du même type) de la culture Mochica dont il s'inspira pour dessiner celui présent à la page 45 de l'aventure de Tintin.",
       
    },
    civa: {
        title: "Autel de Shiva",
        
        images: [
            src="images/civa2.png",
            src="images/civa3.png"
        ],
        description: "Qui est Shiva ? Il est généralement représenté comme un être soit plongé dans une méditation profonde soit, comme on le voit dans Les Cigares du Pharaon (p.50), dansant le Nataraja . Shiva signifie en sanskrit ‘ le bon, celui qui porte bonheur ‘. Dans la pratique hindouiste, Shiva qui appartient au pan - théon védique est considéré différemment selon les tradi - tions: selon la tradition Shaiva, Shiva est considéré comme le Dieu suprême, et selon la tradition Smarta il est perçu comme l’une des cinq formes primaires de Dieu.",
       
    },
    sirius: {
        title: "Le bateau Sirius",
        
        images: [
            src="images/sirius2.png",
            src="images/sirius3.png"
        ],
        description: "Le Sirius est un chalutier commandé par le capitaine Chester. Il le prêta à son ami le capitaine Archibald Haddock afin que ce dernier puisse partir à la recherche du trésor de Rackham le Rouge dans l'épave de La Licorne. ",
        
    },
    fusee: {
        title: "La Fusée",
        
        images: [
            src="images/fusee1.png",
            src="images/fusee2.png"
        ],
        description: "Cette fusée rouge et blanche devient une figure à part entière. Aucun véhicule réel ne lui ressemble, et pourtant, elle est immédiatement reconnaissable. Sa silhouette élancée, ses damiers géométriques, ses ailerons courbes en font un objet graphique parfait, un totem de science maîtrisée. Elle dépasse le cadre de l’album pour devenir un emblème universel, repris sur des affiches, transformé en jouet, décliné sous toutes les formes. On la retrouve dans les vitrines comme dans les musées, dans les intérieurs design comme dans les chambres d’enfants. ",
       
    }
};

let currentItem = null;
let currentImageIndex = 0;

function showDetails(itemKey) {
    const item = itemData[itemKey];
    if (!item) return;

    currentItem = item;
    currentImageIndex = 0;

    document.getElementById('detailsTitle').textContent = item.title;
    document.getElementById('detailsCategory').textContent = item.category;
    document.getElementById('detailsDescription').textContent = item.description;


    updateGalleryImage();
    createGalleryIndicators();

    document.getElementById('detailsPanel').classList.add('active');
    

    setTimeout(() => {
        document.getElementById('detailsPanel').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }, 100);
}

function updateGalleryImage() {
    if (!currentItem || !currentItem.images) return;
    
    document.getElementById('detailsImage').src = currentItem.images[currentImageIndex];

    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentImageIndex);
    });
}

function createGalleryIndicators() {
    if (!currentItem || !currentItem.images) return;
    
    const indicatorsContainer = document.getElementById('galleryIndicators');
    indicatorsContainer.innerHTML = '';
    
    currentItem.images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot';
        if (index === currentImageIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentImageIndex = index;
            updateGalleryImage();
        });
        indicatorsContainer.appendChild(dot);
    });
}

function changeImage(direction) {
    if (!currentItem || !currentItem.images) return;
    
    currentImageIndex += direction;
    
    
    if (currentImageIndex >= currentItem.images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentItem.images.length - 1;
    }
    
    updateGalleryImage();
}

function closeDetails() {
    document.getElementById('detailsPanel').classList.remove('active');
}


document.addEventListener('DOMContentLoaded', function() {
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let hasDragged = false;

    const slider = document.getElementById('imageSlider');

    if (!slider) {
        console.error('Slider element not found!');
        return;
    }

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        hasDragged = false;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = 'grabbing';
    });

    
    document.addEventListener('mouseup', () => {
        if (isDown) {
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
            
            
            setTimeout(() => {
                hasDragged = false;
            }, 100);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        hasDragged = true;
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX; // 1:1 ratio for natural mouse movement
        slider.scrollLeft = scrollLeft - walk;
    });

    
    const slideItems = document.querySelectorAll('.slide-item');
    
    slideItems.forEach(item => {
        item.addEventListener('click', function(e) {
            
            if (hasDragged) {
                e.preventDefault();
                return;
            }
            const itemKey = this.getAttribute('data-item');
            showDetails(itemKey);
        });
    });

   
    slider.style.cursor = 'grab';

   
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetails();
        }
    });
});