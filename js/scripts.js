$(function() {
    /* Main menu */
    $('.header__up-nav-link').click(function () {
        let href = $(this).attr('href').substr(1);
        let to = `.${href}`
        $('body, html').animate({scrollTop : $(to).offset().top} ,1000);
        // closing the menu after clicking on the item
        // the delay is necessary with a purpose so that when you rewind, the closing of the menu is not visible
        setTimeout(function(){
            $('#burger-menu-toggle').removeClass('burger-menu-open');
            $('.header__up-nav-log').removeClass('header__up-nav-log-open');
        }, 1000)
        return false;
    });

    /* Button in Slider */
    $('.slider__link').click(function () {
        $('body, html').animate({scrollTop : $('.contacts').offset().top} ,1000);
        return false;
    })

    /* Catalog: accordions */
    $('.catalog__tabs-accordion').each(function(){
        let accordionId =  $(this).attr('id');
        $(`#${accordionId}`).accordion({
            header: '.catalog__tabs-accordion-item-title',
            heightStyle: 'content'
        });
    })

    /* Catalog: scroll to painter info in mobile */
    $('.catalog__tabs-painters-list-item-link').click(function () {
        if (window.innerWidth <= 767) {
            const tabNo = this.closest('.catalog__tabs-item').dataset.target;            
            $('body, html').animate({scrollTop : $(`.catalog__tabs-item[data-target="${tabNo}"] .catalog__tabs-item-left.catalog__tabs-item-left_active_true`).offset().top} ,1000);
            // there is no need to have "return false" here because it is already written below
        }
    })

    /* Catalog Accordions: To Gallery  */
    $('.catalog__tabs-accordion-item-content-link').click(function () {
        let toGalHref = $(this).attr('href').substr(1);
        let goTo = `.${toGalHref}`
        $('body, html').animate({scrollTop : $(goTo).offset().top} ,1000);
        return false;
    });  
});


window.addEventListener('DOMContentLoaded', function() {
    
      
    /* Preloader */
    window.onload = function() {
        document.querySelector('.preloader').classList.add("preloader__remove");
    };
    
    /* Burger Menu */
    document.getElementById('burger-menu-toggle').addEventListener('click', function(event){
        this.classList.toggle('burger-menu-open');
        document.querySelector('.header__up-nav-log').classList.toggle('header__up-nav-log-open');
    });

    /* Search */
    document.querySelector('.header__up-mobile-search-button').addEventListener('click', function(event){
        document.querySelector('.header__up-mobile-search').classList.add('search__form-open');
    });
    document.querySelector('.header__up-mobile-search-close-button').addEventListener('click', function(event){
        document.querySelector('.header__up-mobile-search').classList.remove('search__form-open');
    });
    
    document.addEventListener('click', function(e) {
        let currentElement = e.target;
        // closing search form by clicking at any element except search block (needed for 10214 layout)
        if (!currentElement.closest('.header__up-container-right')) {
            document.querySelector('.header__up-mobile-search').classList.remove('search__form-open'); 
        }        
        // closing dropdowns item by clicking at any element except dropdowns container
        if (!currentElement.closest('.header__down-dropdowns')) {
            document.querySelectorAll('.header__down-dropdowns-item-btn').forEach(el => {
                el.classList.remove('header__down-dropdowns-item-btn_active_true');
            });
            document.querySelectorAll('.header__down-dropdowns-item-list-container').forEach(el => {
                el.classList.remove('header__down-dropdowns-item-list-container_active_true');
            })
        }
        // closing gallery modal by clicking at any element except modal itself   
        if (currentElement.closest('.gallery__modal') && !currentElement.closest('.gallery__modal-container')) {
            document.querySelector('.gallery__modal').classList.remove('gallery__modal_active_true'); 
        }
    })

    /* Down Header Menu */
    document.querySelectorAll('.header__down-dropdowns-item-btn').forEach(dropdownsItem => {
        dropdownsItem.addEventListener('click', function() {
            let btn = this;
            let dropdown = btn.parentElement.querySelector('.header__down-dropdowns-item-list-container');
            document.querySelectorAll('.header__down-dropdowns-item-btn').forEach(el=> {
                if (el != btn) {
                    el.classList.remove('header__down-dropdowns-item-btn_active_true');
                }
            });
            document.querySelectorAll('.header__down-dropdowns-item-list-container').forEach(el => {
                if (el != dropdown) {    
                    el.classList.remove('header__down-dropdowns-item-list-container_active_true');
                }
            })
            btn.classList.toggle('header__down-dropdowns-item-btn_active_true')
            dropdown.classList.toggle('header__down-dropdowns-item-list-container_active_true') 
        })
    })
    
    /* Down Header Menu Lists */
    document.querySelectorAll('.header__down-dropdowns-item-list').forEach(dropdownsItemList => {
        new SimpleBar(dropdownsItemList, {
            autoHide: false,
            scrollbarMaxSize: 28,
        })
    })

    /* Slider */
    const swiper = new Swiper('.slider__box', {
        autoplay: {
            delay: 7000,
        },
        effect: "fade",
        loop: true,
        scrollbar: {
            hide: true
        }
    })

    /* Gallery Select */
    const galleryFilter = document.querySelector('#gallery-filter');
    const galleryFilterSelection = new Choices (galleryFilter, {
        searchEnabled: false,
        // the following setting is needed so that the list items are displayed as layout, and not alphabetically
        shouldSort: false,
    })

    /* Gallery Slider */
    let gallerySlider = new Swiper('.gallery__images-box', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {rows: 1},
        spaceBetween: 0,
        pagination: {
            el: '.gallery__navi',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.gallery__navi-next',
            prevEl: '.gallery__navi-prev'
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                grid: {rows: 2},
                spaceBetween: 34
            },            
            1201: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                grid: {rows: 2},
                spaceBetween: 50
            }
        },
        a11y: {
            prevSlideMessage: 'Предыдущий',
            nextSlideMessage: 'Следующий',
        }
    })

    /* Gallery Modal */
    let galleryImgs = document.querySelectorAll('.gallery__item');
    let galleryModal = document.querySelector('.gallery__modal');
    let galleryModalClose = galleryModal.querySelector('.gallery__modal-close');
    galleryImgs.forEach(el => {
      el.addEventListener('click', function() { 
        let img = this.querySelector('img');
        let imgSrc = img.getAttribute('src');
        galleryModal.querySelector('img').setAttribute('src', imgSrc);
        galleryModal.classList.add('gallery__modal_active_true');
      })
    })
    galleryModalClose.addEventListener('click', function() {
      galleryModal.classList.remove('gallery__modal_active_true');
    });

    /* Catalog Flags */
    document.querySelectorAll('.catalog__languages-link').forEach(currentCatalogFlag => {
        currentCatalogFlag.addEventListener('click', function(event) {
            document.querySelectorAll('.catalog__languages-link').forEach(allCatalogFlags => {
                allCatalogFlags.classList.remove('catalog__languages-link_active_true')
            });
            this.classList.add('catalog__languages-link_active_true');
            const path = this.dataset.tab;
            document.querySelectorAll('.catalog__tabs-item').forEach(allCatalogTabsItems => {
                allCatalogTabsItems.classList.remove('catalog__tabs-item_active_true')
            });
            document.querySelector(`.catalog__tabs-item[data-target="${path}"]`).classList.add('catalog__tabs-item_active_true');
            event.preventDefault();
        })
    })

    /* Catalog: Painters Info */
    document.querySelectorAll('.catalog__tabs-painters-list-item-link').forEach(currentPainter => {
        currentPainter.addEventListener('click', function(event) {
            const tabNo = this.closest('.catalog__tabs-item').dataset.target;
            const painterNo = this.dataset.tab;
            document.querySelectorAll(`.catalog__tabs-item[data-target="${tabNo}"] .catalog__tabs-item-left`).forEach(allCatalogTabsItems => {
                allCatalogTabsItems.classList.remove('catalog__tabs-item-left_active_true')
            });
            document.querySelector(`.catalog__tabs-item[data-target="${tabNo}"] .catalog__tabs-item-left[data-target="${painterNo}"]`).classList.add('catalog__tabs-item-left_active_true');
            event.preventDefault();
        })
    })

    /* Events */
    let eventsSeeMoreBtn = document.querySelector('.events_see-more-btn');
    let eventsSlider = document.querySelector('.events__items');
    let allEvents = document.querySelectorAll('.events__item');
    eventsSeeMoreBtn.addEventListener("click", function() {
        allEvents.forEach(eventItem => {
            eventItem.style.display = "flex";
        })
        this.style.display = "none"; 
    })
    let eventsSwiper;
    function eventsSliderFunc() {
        if (window.innerWidth <= 767 && eventsSlider.dataset.mobile == 'false') {
            eventsSwiper = new Swiper(eventsSlider, {
                slidesPerView: 1,
                spaceBetween: 10,
                autoHeight: true,
                pagination: {
                    el: '.events__items-nav',
                    clickable: true,
                    bulletClass: 'events__items-nav-item',
                    bulletActiveClass: 'events__items-nav-item_active_true',
                    bulletElement: 'li',
                    modifierClass: 'events-nav-'
                },
            });
            eventsSlider.dataset.mobile = 'true';
        }
        if (window.innerWidth > 767 && eventsSlider.dataset.mobile == 'true') {
            eventsSlider.dataset.mobile = 'false';
            if (eventsSlider.classList.contains('swiper-initialized')) {
                // destroy is a Swiper's method
                eventsSwiper.destroy();
                // reset variable value
                eventsSwiper = undefined;
            }
        }
    }
    eventsSliderFunc()

    /* Publications Filter */
    function showCheckedPublicationsCategories() {
        document.querySelectorAll('.publications__filter-checkbox-label').forEach(currentCategory => {
            currentCategory.style.display = 'none';
            let currentCategoryInput = currentCategory.querySelector('.publications__filter-original-checkbox');        
            if (currentCategoryInput.checked) {
                currentCategory.style.display = 'block';
            }
        })
    }
    function showAllPublicationsCategories() {
        document.querySelectorAll('.publications__filter-checkbox-label').forEach(currentCategory => {
            currentCategory.style.display = 'block';
        })
    }
    function firstShowPublicationsCategories() {
        if (window.innerWidth > 767) {
            showAllPublicationsCategories();
        }
        else {
            showCheckedPublicationsCategories();
        }
    }
    firstShowPublicationsCategories();
    let publicationsCategoriesFilterMobileBtn = document.getElementById('publications__categories-filter-mobile-btn');
    let publicationsFilterOriginalCheckboxes = document.querySelectorAll('.publications__filter-original-checkbox');
    // when you click on the mobile button, the list of categories either appears in full or only the selected categories are visible
    publicationsCategoriesFilterMobileBtn.addEventListener('click', function() {
        this.classList.toggle('publications__categories-filter-mobile-btn_active_true');
        if (this.classList.contains('publications__categories-filter-mobile-btn_active_true')) {
            showAllPublicationsCategories();
        }
        else {
            showCheckedPublicationsCategories();
        }
    });
    // only at the mobile version: when only the selected categories are shown if you click on them they disappear
    publicationsFilterOriginalCheckboxes.forEach(currentCategoryCheckbox => {  
        currentCategoryCheckbox.addEventListener('change', function () {
            if (window.innerWidth <= 767 && publicationsCategoriesFilterMobileBtn.classList.length == 1) {
                this.closest('.publications__filter-checkbox-label').style.display = 'none';
            }
        })
    })

     /* Publications Slider */
     let publicationsSlider = document.querySelector('.publications__items-box');
     let publicationsSwiper;
     function publicationsSliderFunc() {    
         if (window.innerWidth <= 767 && publicationsSlider.dataset.mobile == 'true') {
             publicationsSlider.dataset.mobile = 'false';
             if (publicationsSlider.classList.contains('swiper-initialized')) {
                 publicationsSwiper.destroy();
                 publicationsSwiper = undefined;
             }
         }
         if (window.innerWidth > 767 && publicationsSlider.dataset.mobile == 'false') {
             publicationsSwiper = new Swiper(publicationsSlider, {
                 slidesPerView: 2,
                 slidesPerGroup: 2,
                 grid: {rows: 1},
                 spaceBetween: 35,
                 pagination: {
                     el: '.publications__navi',
                     type: 'fraction'
                 },
                 navigation: {
                     nextEl: '.publications__navi-next',
                     prevEl: '.publications__navi-prev'
                 },
                 breakpoints: {                    
                     1021: {
                         slidesPerView: 2,
                         slidesPerGroup: 2,
                         grid: {rows: 1},        
                         spaceBetween: 49
                     },  
                     1201: {
                         slidesPerView: 3,
                         slidesPerGroup: 3,
                         grid: {rows: 1},
                         spaceBetween: 50
                     }
                 },
                 a11y: {
                     prevSlideMessage: 'Предыдущий',
                     nextSlideMessage: 'Следующий',
                 }
             })
             publicationsSlider.dataset.mobile = 'true';
         }
     }
     publicationsSliderFunc()

    /* Projects tooltips */
    tippy('.tooltip-1', {
        content: 'Пример современных тенденций - современная&nbsp;методология разработки',
        theme: 'projects',
        trigger: 'click',
        trigger: 'focus'
      });
      tippy('.tooltip-2', {
        content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
        theme: 'projects',
        trigger: 'click',
        trigger: 'focus'
      });
      tippy('.tooltip-3', {
        content: 'В стремлении повысить качество',
        theme: 'projects',
        trigger: 'click',
        trigger: 'focus'
      });

    /* Partners Slider */
    let partnersSlider = new Swiper('.projects__partners', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.projects__partners-items-navi-next',
            prevEl: '.projects__partners-items-navi-prev'
        },
        breakpoints: {
            400: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 34
            },  
            1021: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 50
            },  
            1201: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 50
            }
        },
        a11y: {
            prevSlideMessage: 'Предыдущий',
            nextSlideMessage: 'Следующий',
        }
    })

    /* Contact Form: input mask for telephone */
    var selectorForInputMask = document.querySelector("input[type='tel']");
    var im = new Inputmask('+7(999) 999-99-99');
    im.mask(selectorForInputMask);
        
    /* Contact Form: validation */
    new JustValidate('.contacts__form', {
        rules: {
          name: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          phone: {
            required: true,
            function: (name, value) => {
                const phone = selectorForInputMask.inputmask.unmaskedvalue()
                return Number(phone) && phone.length === 10
            }
          }
        },
        messages: {
            name: {
                required: 'Это поле обязательное для заполнения',
                minLength: 'Вы ввели слишком мало символов',
                maxLength: 'Вы ввели слишком много символов'
            },
            phone: {
                required: 'Это поле обязательное для заполнения',
                function: 'Введите корректный номер телефона'
            }
        },
        
        submitHandler: function (form) {
            let formData = new FormData(form);
        
            fetch('mail.php', {
              method: 'POST',
              body: formData
            }).then(() => {
              console.log('Отправлено');
              form.reset();
            })
              .catch(() => console.log('Ошибка'))
          }
        });
        



    /* Map */
    ymaps.ready(function () { 
        var myMap = new ymaps.Map('contacts__map',
            {
                center: [55.75846806898367,37.60108849999989],
                zoom: 14
            }, 
            {
                searchControlProvider: 'yandex#search'
            }
        ),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), 
        {
            hintContent: 'Шоурум №4',
            balloonContent: 'Москва, Леонтьевский переулок, дом 5/1'
        }, 
        {
            iconLayout: 'default#image',
            iconImageHref: 'img/contacts/Group.svg',
            iconImageSize: [30, 42],
            iconImageOffset: [-5, -38]
        });
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(myPlacemark);
    });

    /* Functions that must work when changing the width of the browser window */
    window.addEventListener('resize', _ => {
        eventsSliderFunc();
        firstShowPublicationsCategories();
        publicationsSliderFunc();
    })

})