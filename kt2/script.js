const themeButton = document.querySelector('.theme-btn');
let dark = false;

themeButton.addEventListener('click', () => {
    if (dark == false) {
        document.body.classList.add('dark');
        dark = true;
    } else {
        document.body.classList.remove('dark');
        dark = false;
    }
});

let cart = [];
const counter = document.querySelector('.counter');
const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
    const name = card.querySelector('.card-title').textContent;
    const buyButton = card.querySelector('.btn-buy');
    const minusButton = card.querySelector('.btn-minus');

    buyButton.addEventListener('click', () => {
        cart.push(name);
        counter.textContent = cart.length;
        console.log(cart);
    });

    minusButton.addEventListener('click', () => {
        cart = cart.filter(item => item != name);
        counter.textContent = cart.length;
        console.log(cart);
    });
});

class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dots = container.querySelectorAll('.dot');
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.currentSlide = 0;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        this.showSlide(this.currentSlide);
    }

    showSlide(index) {
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }

    next() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }

    prev() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }
}

class AutoSlider extends Slider {
    constructor(container, interval = 3000) {
        super(container);
        this.interval = interval;
        this.autoPlayId = null;
        this.startAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayId = setInterval(() => {
            this.next();
        }, this.interval);
    }

    stopAutoPlay() {
        if (this.autoPlayId) {
            clearInterval(this.autoPlayId);
            this.autoPlayId = null;
        }
    }

    next() {
        super.next();
        this.restartAutoPlay();
    }

    prev() {
        super.prev();
        this.restartAutoPlay();
    }

    goToSlide(index) {
        super.goToSlide(index);
        this.restartAutoPlay();
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

const slider = new AutoSlider(document.querySelector('.slider'), 4000);
