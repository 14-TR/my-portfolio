// Speed up orbit on hover
document.querySelectorAll('.orbiting-photo').forEach(function(photo) {
    photo.addEventListener('mouseover', function() {
        this.style.animationDuration = '5s'; // Speed up on hover
    });
    photo.addEventListener('mouseout', function() {
        this.style.animationDuration = '10s'; // Return to normal speed
    });
});
