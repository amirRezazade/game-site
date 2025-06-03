  window.addEventListener('DOMContentLoaded' , ()=>{
       document.querySelector('.content').classList.remove('hidden')
     document.querySelector('.loader-container').style.display='none'
     })
        const slider = document.getElementById('slider-year');
        const minYear = document.getElementById('min-year');
        const maxYear = document.getElementById('max-year');

        noUiSlider.create(slider, {
          start: [1888, 2025],
          connect: true,
          step: 1,
          direction: 'ltr',
          range: {
            min: 1888,
            max: 2025
          },
          format: {
            to: value => Math.round(value), // اعداد انگلیسی
            from: value => Number(value)
          }
        });
      
        slider.noUiSlider.on('update', (values, handle) => {
          if (handle === 0) minYear.textContent = values[0];
          else maxYear.textContent = values[1];
        });
      
 

        const pointSlider = document.getElementById('slider-point');
        const minPoint = document.getElementById('min-point');
        const maxPoint = document.getElementById('max-point');
          
        noUiSlider.create(pointSlider, {
          start: [0, 5],
          connect: true,
          step: 0.1,
          direction: 'ltr',
          range: {
            min: 0,
            max: 5
          },
          format: {
            to: value =>Number(value), // اعداد انگلیسی
            from: value => Number(value)
          }
        });
      
        pointSlider.noUiSlider.on('update', (values, handle) => {
          if (handle === 0) minPoint.textContent = values[0];
          else maxPoint.textContent = values[1];
        });
      

      