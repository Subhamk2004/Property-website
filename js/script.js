var state = "";
var img_number = Number(1);
function change_image() {
    var path = "images/hotel" + img_number + ".jpg";
    document.getElementById("hotel_imgs").setAttribute("src", path);

    img_number++;
    if (img_number > 5) {
        img_number = 1;
    }

}


let width = window.innerWidth;
if (width > 500) {
    $(".menu_icon_div").hide(0);
}
if (width <= 500) {
    $(".nav_btn_div").hide(0);
    document.getElementById("fr_mobile_link").setAttribute("href", "https://wa.me/911171279904?text=Regarding%20Franchise%20request")
}
var open = Number(0);
$(".menu_icon").click(function () {
    $(".nav_btn_div").slideDown(500);
    open++;
    if (open === 2) {
        $(".nav_btn_div").slideUp(500);
        open = 0;
    }
});

setInterval(change_image, 1500);
function fetchDataAndCreateCardsForhotels() {
    fetch('https://script.google.com/macros/s/AKfycbwBBTeAIUNGJsisAOxBqKDPDj7gdvsYTEQknFXzzlKW9WWYqF70_5PC0HAT0gPXFQ3dWA/exec')
        .then(response => response.json())
        .then(data => {
            const dataList = data.data;
            const cardRow = document.getElementById('cardRow');

            // Clear previous content
            cardRow.innerHTML = '';

            for (let i = 0; i < dataList.length; i++) {
                const item = dataList[i];

                // Create new elements
                const colDiv = document.createElement('div');
                colDiv.classList.add('col');

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = item.name;

                const imgDiv = document.createElement('div');
                imgDiv.classList.add('img_div');

                const img = document.createElement('img');
                img.classList.add('card-img-top');
                img.src = item.pic;
                img.alt = item.name;

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
                cardText.textContent = item.details;

                // Append elements to build the card
                imgDiv.appendChild(img);
                cardBody.appendChild(cardText);
                cardDiv.appendChild(cardTitle);
                cardDiv.appendChild(imgDiv);
                cardDiv.appendChild(cardBody);
                colDiv.appendChild(cardDiv);

                // Add event listener to image
                

                // Append the new card to the cardRow
                cardRow.appendChild(colDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching data for blogs:', error);
        });
}


fetchDataAndCreateCardsForhotels();

function fetchDataAndCreateCardsForStates() {
    fetch('https://script.google.com/macros/s/AKfycbwDQ4FC-3fg3W8sZKeJU7lAQEzBXfS7KbgIDFimy9qHxu3AFnXEZfFKolbFF_wDwW23/exec')
        .then(response => response.json())
        .then(data => {
            const dataList = data.data;
            const cardRow = document.getElementById('cardRow2');

            cardRow.innerHTML = ''; // Clear previous content

            dataList.forEach((item, index) => {
                const card = document.createElement('div');
                card.classList.add('col');
                card.innerHTML = `
                    <div class="card">
                        <h5 class="card-title">${item.name}</h5>
                        <div class="img_div">
                            <img src="${item.pic}" class="card-img-top" alt="${item.name}">
                        </div>
                    </div>`;
                cardRow.appendChild(card);

                // Add event listener directly to each image
                const image = card.querySelector('.card-img-top');
                image.addEventListener('click', function () {
                    const city = item.name;
                    console.log(city);
                    const url = `./states.html?state=${encodeURIComponent(city)}`;
                    window.location.href = url;
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data for blogs:', error);
        });
}

fetchDataAndCreateCardsForStates();



async function fetchDataAndCreateCardsForDestinations_nav() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwBSscxLLNjc6GS-so5tbNajqsZEfFPO65-S3bGTsCt8h4nNksM0hB2qMwFNo25VMih6Q/exec');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const dataList = data.data;
        const blogBody = document.querySelector('.nav_btn_div');

        for (const heading in dataList) {
            if (dataList.hasOwnProperty(heading) && Array.isArray(dataList[heading]) && dataList[heading].length > 0) {
                const divElement = document.createElement('div');
                divElement.classList.add('nav_btn');

                const headingElement = document.createElement('h2');
                headingElement.textContent = heading;
                headingElement.classList.add("heading");
                divElement.appendChild(headingElement);

                const ulElement = document.createElement('div');
                ulElement.classList.add("dropdown");
                divElement.appendChild(ulElement);

                dataList[heading].forEach((point, index) => {
                    if (point) {
                        const pointElement = document.createElement('a');
                        pointElement.classList.add("points");
                        pointElement.textContent = point;
                        ulElement.appendChild(pointElement);


                        // Add click event listener with index closure
                        pointElement.addEventListener('click', function (e) {
                            // console.log(e);
                            state = this.innerHTML;
                            var url = './states.html' + '?state=' + state;
                            window.location.href = url;
                        });
                        // pointElement.setAttribute("href", "cities.html");
                    }
                });

                if (ulElement.childNodes.length > 0) {
                    blogBody.appendChild(divElement);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

(async function () {
    await fetchDataAndCreateCardsForDestinations_nav();
})();

