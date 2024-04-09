var state_name = "";
var City = "";
var data;
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    console.log(params.length);

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = decodeURIComponent(tmp[1]);
    }

    document.getElementById('here').innerHTML = data.state;
    state_name = data.state;
    console.log(state_name);
    fetchDataAndCreateCardsForStates(state_name);
    
}

let width = window.innerWidth;
if (width>500)
{
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
    function fetchDataAndCreateCardsForStates(state_name) {
        // Encode the city_name to ensure the URL is formatted correctly
        const encodedCityName = encodeURIComponent(state_name);
    
        // Append the city_name as a query parameter
        const url = `https://script.google.com/macros/s/AKfycbxZ4mYMAc1aXi3M25TG5r-zgTYHRvs31pSWaWGB8G42lTbwm_6rTkFl_EaIRwmwjG6nDg/exec?name=${encodedCityName}`;
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const dataList = data.data;
    
                const blogBody = document.querySelector('.blog_body');
                blogBody.innerHTML = '';
    
                for (const heading in dataList) {
                    if (dataList.hasOwnProperty(heading) && Array.isArray(dataList[heading]) && dataList[heading].length > 0) {
    
                        const headingContainer = document.createElement('div');
                        headingContainer.classList.add('heading-container');
    
                        for (let i = 0; i < dataList[heading].length; i += 3) {
                            const headingText = dataList[heading][i];
                            const image = dataList[heading][i + 1];
                            const description = dataList[heading][i + 2];
    
                            const cardDiv = document.createElement('div');
                            cardDiv.classList.add('card');
    
                            const imgElement = document.createElement('img');
                            imgElement.src = image;
                            cardDiv.appendChild(imgElement);
    
                            const headingElement = document.createElement('h5');
                            headingElement.textContent = headingText;
                            cardDiv.appendChild(headingElement);
    
                            const descriptionElement = document.createElement('p');
                            descriptionElement.textContent = description;
                            cardDiv.appendChild(descriptionElement);
    
                            // Add click event listener to each imgElement
                            
                            headingContainer.appendChild(cardDiv);
                        }
                        blogBody.appendChild(headingContainer);
                    }
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
    



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
                            City = this.innerHTML;
                            console.log(City);
                            let city  = heading;
                            var url = './states.html' + '?state=' + City;
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

(async function() {
    await fetchDataAndCreateCardsForDestinations_nav();
})();