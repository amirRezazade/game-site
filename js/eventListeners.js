const card = document.querySelectorAll('.card');
    let bounds;

function rotateToMouse(elem , e) {        
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds.x;
  const topY = mouseY - bounds.y;
  const center = {
    x: leftX - bounds.width / 2,
    y: topY - bounds.height / 2
  }
  const distance = Math.sqrt(center.x**2 + center.y**2);
  
  elem.style.transform = `
   scale3d(1.02, 1.02, 1.02)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance)* 2}deg
    )
  `;
  
  elem.querySelector('.glow').style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds.width/2}px
      ${center.y * 2 + bounds.height/2}px,
      #ffffff10,
      #00000009
    )
  `;
}

card.forEach(elem=>{
  elem.addEventListener('mousemove', (e) => {
      bounds = elem.getBoundingClientRect();
        rotateToMouse(elem , e)
    });
})

card.forEach(elem=>{
    elem.addEventListener('mouseleave', () => {
      elem.style.transform = '';
      elem.style.background = '';
    });

})