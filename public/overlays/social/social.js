(function () {
    let socials = document.querySelectorAll(".social");
    let currentSocial = 0;
    setInterval(() => {
        socials[currentSocial].classList.add("active");
        setTimeout(() => {
            socials[currentSocial].classList.remove("active");
            currentSocial = (currentSocial + 1) % socials.length;
        }, 10000);
    }, 12000)

})();