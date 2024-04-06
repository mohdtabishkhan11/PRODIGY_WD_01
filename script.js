document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader-container");
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 2000);
  });
  
  document.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    nav.classList.toggle("navbar-scrolled", window.scrollY > 50);
  });
  
  const landingBackground = document.querySelector("#landing-background");
  const images = ["bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg", "bg-5.jpg"];
  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = `assets/backgrounds/${image}`;
    img.classList.add("landing-background-image");
    landingBackground.appendChild(img);
  });
  
  const backgroundIndicators = document.querySelector("#background-indicators");
  images.forEach((image, index) => {
    const indicator = document.createElement("div");
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.classList.add("background-indicator");
    indicator.addEventListener("click", () => {
      index = images.indexOf(image);
      slideImages();
    });
    backgroundIndicators.appendChild(indicator);
  });
  
  const landingBackgroundImages = document.querySelectorAll(
    "#landing-background img"
  );
  
  let index = 0;
  const nextSlide = () => {
    index++;
    if (index > landingBackgroundImages.length - 1) {
      index = 0;
    }
    slideImages();
  };
  
  landingBackgroundImages.forEach((image, index) => {
    image.style.left = `${index * 100}%`;
  });
  
  let autoSlide = setInterval(nextSlide, 5000);
  
  const slideImages = () => {
    landingBackgroundImages.forEach((image) => {
      image.style.transform = `translateX(-${index * 100}%)`;
    });
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
    backgroundIndicators.querySelectorAll("div").forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  };
  
  const prevSlide = () => {
    index--;
    if (index < 0) {
      index = landingBackgroundImages.length - 1;
    }
    slideImages();
  };
  
  backgroundIndicators.querySelectorAll("div").forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      index = i;
      slideImages();
    });
  });
  
  const productItemsContainer = document.querySelector(".product-items-container");
  const productItemsDetails = document.querySelector("#product-item-details");
  const overlay = document.querySelector(".product-item-detailed-overlay");
  fetch("/assets/products.json")
    .then(async (productItems) => {
      productItems = await productItems.json();
      let i = 0;
      let j = 0;
      productItems.forEach((item, index) => {
        const productItemDetails = document.createElement("div");
        productItemDetails.classList.add("product-item-detailed");
        productItemDetails.style.backgroundImage = `url(${item.images[1]})`;
        productItemDetails.innerHTML = `
        <button class="close">&#10006;</button>
        <div class="bottom-content">
          <div class="headings">
            <h3>$ ${item.price}</h3>
            <h2>${item.name}</h2>
          </div>
          <p>
            ${item.description}
          </p>
          <button class="button-primary">Add to Cart</button>
        </div>
          `;
  
        productItemDetails.querySelector(".close").addEventListener("click", () => {
          overlay.classList.remove("active");
          productItemDetails.classList.remove("active");
        });
        productItemDetails
          .querySelector(".button-primary")
          .addEventListener("click", () => {
            overlay.classList.remove("active");
            productItemDetails.classList.remove("active");
          });
  
        const productItemImage = document.createElement("div");
        productItemImage.classList.add("product-item-image");
        productItemImage.classList.add("product-item");
        productItemImage.innerHTML = `
        <img src="${item.images[0]}" alt="" />
        <img src="/assets/zoom-in-icon.svg" alt="" class="icon" />
        <span class="overlay"></span>
        `;
        productItemImage.addEventListener("click", () => {
          overlay.classList.add("active");
          productItemDetails.classList.add("active");
        });
  
        const productItemInfo = document.createElement("div");
        productItemInfo.classList.add("product-item-info");
        productItemInfo.classList.add(`product-item`);
        productItemInfo.innerHTML = `
        <h3>$${item.price}</h3>
        <h2>${item.name}</h2>
        <span> &#9733; </span>
        <p>
          ${item.description}
        </p>
        `;
        productItemInfo.addEventListener("click", () => {
          productItemDetails.classList.add("active");
          overlay.classList.add("active");
        });
  
        productItemImage.addEventListener("mouseover", () => {
          productItemImage.querySelector(".overlay").classList.add("active");
          productItemImage.querySelector(".icon").classList.add("active");
        });
        productItemImage.addEventListener("mouseout", () => {
          productItemImage.querySelector(".overlay").classList.remove("active");
          productItemImage.querySelector(".icon").classList.remove("active");
        });
  
        productItemInfo.addEventListener("mouseover", () => {
          productItemImage.querySelector(".icon").classList.add("active");
        });
        productItemInfo.addEventListener("mouseout", () => {
          productItemImage.querySelector(".icon").classList.remove("active");
        });
  
        productItemsDetails.appendChild(productItemDetails);
  
        if (i % 2 === 0) {
          productItemsContainer.appendChild(productItemInfo);
          productItemsContainer.appendChild(productItemImage);
        } else {
          productItemsContainer.appendChild(productItemImage);
          productItemsContainer.appendChild(productItemInfo);
        }
  
        if (j >= 1) {
          j = 0;
          i++;
        } else {
          j++;
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching product items:", error);
    });
  
  const scroll = document.querySelector(".scrollbar");
  document.addEventListener("scroll", () => {
    scroll.style.height = `${
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    }vh`;
  });
  