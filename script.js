let pol = [...document.querySelectorAll('.gare polygon')];
let pol2 = [...document.querySelectorAll('.shida polygon')];
// let svgSold = document.querySeleqtorAll('choosesvg g circle, .choosesvg g polygon, .choosesvg g rect');
console.log(pol)
console.log(pol2)

function buildingAnimation() {
	let flor = document.querySelector('.floor-tooltip');
	pol.forEach(item => {
		item.addEventListener('mousemove', (e) => {
			let target = e.target;
			let florText = target.dataset.text;
			flor.textContent = florText;
			flor.style.top = e.pageY - 60 + 'px';
			flor.style.left = e.pageX + 'px';
			flor.style.display = 'block';
			if (target.getAttribute('data-sold') == '1') {
				target.classList.add('sold_active');
				item.disabled = true;
			}
		});
		item.addEventListener('click', (e) => {
			let target = e.target;
			let clickedElement = target.parentElement.parentElement.parentElement;
			let svgParentElement = target.parentElement.parentElement.parentElement.nextElementSibling;
			let florText = target.dataset.text;
			document.querySelector('.sartuli .floor_num').textContent = parseFloat(florText);
			if (target.getAttribute('data-sold') == '1') {
				item.disabled = true;
			} else if (svgParentElement.getAttribute('data-tooltip') == 'flat-tooltip') {
				clickedElement.style.display = 'none';
				svgParentElement.style.display = 'block';
				svgParentElement.animate([{
					opacity: '0',
				}, {
					opacity: '1'
				}], {
					duration: 500,
					fill: 'forwards'
				});
			}

		});
		item.addEventListener('mouseleave', (e) => {
			flor.style.display = 'none';
		});
	});
}

function shidaAnimation() {
	let flat = document.querySelector('.flat-tooltip');
	pol2.forEach(item => {
		item.addEventListener('mousemove', (e) => {
			let target = e.target;
			let flatText = target.dataset.text;
			flat.textContent = flatText;
			flat.style.top = e.pageY - 60 + 'px';
			flat.style.left = e.pageX - 50 + 'px';
			flat.style.display = 'block';
			if (target.getAttribute('data-sold') == '1') {
				target.classList.add('sold_active');
				flatText = 'gayidulia';
				item.disabled = true;
			}
		});
		item.addEventListener('click', (e) => {
			let target = e.target;
			let targetId = target.dataset.id;
			if (target.getAttribute('data-sold') == '1') {
				item.disabled = true;
			}
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'data.json');
			xhr.onload = (function () {
				if (this.status == 200) {
					const data = JSON.parse(this.responseText);
					data.forEach(item => {
						// console.log(item)
						if (targetId == item.id) {
							console.log(item)
							let fixedBox = document.querySelector('.fixed');
							let out = document.getElementById('out');
							fixedBox.classList.add('active');
							let result = `
								<div class="chosen_wrapper">
									<div class="close">x</div>
									<div class="img_box">
										<img src="${item.image}">
									</div>
									<div class="flat_info">
									<ul class="flat_ul">
										<li>საერთო ფართი ${item.meters}</li>
										<li>საცხოვრებელი ფართი ${item.flat}</li>
										<li>საზაფხულო ფართი ${item.summer}</li>
									</ul>	
									</div>
								</div>
							`;
							out.innerHTML = result;
							let close = document.querySelector('.close');
							close.addEventListener('click', (e) => {
								fixedBox.classList.remove('active');
							});
						}
					});
				} else {
					this.onerror();
				}
			});
			xhr.onerror = (function () {
				console.log('erorr');
			});
			xhr.send();
		});
		item.addEventListener('mouseleave', (e) => {
			flat.style.display = 'none';
		});
	});
}


document.querySelector('.sartuli').addEventListener('click', () => {
	document.querySelector('.shida').style.display = 'none';
	let gare = document.querySelector('.gare');
	gare.style.display = 'block';
	gare.animate([{
		opacity: '0',
	}, {
		opacity: '1'
	}], {
		duration: 500,
		fill: 'forwards'
	});
	document.querySelector('.sartuli .floor_num').textContent = '';
});
buildingAnimation();
shidaAnimation();