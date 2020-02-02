// import regeneratorRuntime from "node_modules/regenerator-runtime/runtime.js";

const url = 'http://localhost:3000/vehicles';

async function GetVehicleList() {
    let response = await fetch(url),
        data = await response.json();

    data.forEach((e) => {

        // create tile elements
        const vehicleList_Item = document.createElement('li'),
            vehicleList_Button = document.createElement('button'),
            vehicleList_DataDiv = document.createElement('div'),
            vehicleList_CoverImg = document.createElement('img'),
            vehicleList_InfoDiv = document.createElement('div'),
            vehicleList_InfoDiv__text = document.createTextNode('Meer informatie');

        // tile data
        const vehicleList_brandName = document.createElement('h2'),
            vehicleList_brandName__text = document.createTextNode(e.brand + ' ' + e.model),
            vehicleList_yearOfManufacture = document.createElement('span'),
            vehicleList_yearOfManufacture__text = document.createTextNode(e.yearOfManufacture),
            vehicleList_price = document.createElement('span'),
            vehicleList_price__text = document.createTextNode('€ ' + e.price.toLocaleString() + ',-'),
            vehicleList_mileage = document.createElement('span'),
            vehicleList_mileage__text = document.createTextNode(e.mileage.toLocaleString() + 'km');

        // create tile attributes
        vehicleList_Item.className = 'vehicleList--item';
        vehicleList_Button.className = 'vehicleList--trigger';
        vehicleList_Button.setAttribute('onclick', 'triggerDetails("' + e.id + '")');
        vehicleList_DataDiv.className = 'vehicleList--data';
        vehicleList_CoverImg.className = 'vehicleList--cover';
        vehicleList_CoverImg.src = 'http://localhost:3000/' + e.images[1]
        vehicleList_CoverImg.alt = e.brand + ' ' + e.model;
        vehicleList_InfoDiv.className = 'vehicleList--moreInfo';

        // tile data classes
        vehicleList_brandName.className = 'vehicleList--data-brandName';
        vehicleList_yearOfManufacture.className = 'vehicleList--data-year';
        vehicleList_price.className = 'vehicleList--data-price';
        vehicleList_mileage.className = 'vehicleList--data-milage';

        vehicleList_Item.appendChild(vehicleList_Button);
        vehicleList_Button.appendChild(vehicleList_DataDiv);
        vehicleList_Button.appendChild(vehicleList_CoverImg);
        vehicleList_Button.appendChild(vehicleList_InfoDiv);

        vehicleList_DataDiv.appendChild(vehicleList_brandName);
        vehicleList_DataDiv.appendChild(vehicleList_yearOfManufacture);
        vehicleList_DataDiv.appendChild(vehicleList_price);
        vehicleList_DataDiv.appendChild(vehicleList_mileage);

        vehicleList_InfoDiv.appendChild(vehicleList_InfoDiv__text);

        vehicleList_brandName.appendChild(vehicleList_brandName__text);
        vehicleList_yearOfManufacture.appendChild(vehicleList_yearOfManufacture__text);
        vehicleList_price.appendChild(vehicleList_price__text);
        vehicleList_mileage.appendChild(vehicleList_mileage__text);

        document.getElementById("vehicleList").appendChild(vehicleList_Item);
    });
};

async function detailList(e) {
    let response = await fetch(url + '/' + e),
        data = await response.json();

    const Details_WrapperDiv = document.createElement('div'),
        Details_ContainerDiv = document.createElement('section'),
        Details_ContainerCloseButton = document.createElement('button'),
        Details_ImageContainer = document.createElement('div'),
        Details_textContainer = document.createElement('ul');

    // create detail text 
    const Details_Brand = document.createElement('li'),
        Details_Brand__text = document.createTextNode(data.brand),
        Details_Model = document.createElement('li'),
        Details_Model__text = document.createTextNode(data.model),
        Details_price = document.createElement('li'),
        Details_price__text = document.createTextNode('€ ' + data.price.toLocaleString() + ',-'),
        Details_mileage = document.createElement('li'),
        Details_mileage__text = document.createTextNode(data.mileage.toLocaleString() + 'km'),
        Details_yearOfManufacture = document.createElement('li'),
        Details_yearOfManufacture__text = document.createTextNode(data.yearOfManufacture),
        Details_fuelType = document.createElement('li'),
        Details_fuelType__text = document.createTextNode(data.fuelType),
        Details_transmission = document.createElement('li'),
        Details_transmission__text = document.createTextNode(data.transmission);



    Details_WrapperDiv.className = 'detail-wrapper';
    Details_ContainerDiv.className = 'detail-container';
    Details_ContainerCloseButton.className = 'detail-container--close';
    Details_ContainerCloseButton.setAttribute('onclick', 'closeModal()');
    Details_ImageContainer.className = 'detail-container_image';
    Details_ImageContainer.style.backgroundImage = 'url("http://localhost:3000' + data.images[3] + '")';
    Details_textContainer.className = 'detail-container_list';

    setTimeout(() => {
        Details_ContainerDiv.className = 'detail-container detail-container--visible'
    }, 200);

    // detail text classes
    Details_Brand.className = 'detail-brand';
    Details_Model.className = 'detail-model';
    Details_price.className = 'detail-price';
    Details_mileage.className = 'detail-milage';
    Details_yearOfManufacture.className = 'detail-year';
    Details_fuelType.className = 'detail-fueltype';
    Details_transmission.className = 'detail-transmission';

    // append detail text
    Details_Brand.appendChild(Details_Brand__text);
    Details_Model.appendChild(Details_Model__text);
    Details_price.appendChild(Details_price__text)
    Details_mileage.appendChild(Details_mileage__text)
    Details_yearOfManufacture.appendChild(Details_yearOfManufacture__text)
    Details_fuelType.appendChild(Details_fuelType__text)
    Details_transmission.appendChild(Details_transmission__text)

    // append detail text
    Details_textContainer.appendChild(Details_Brand);
    Details_textContainer.appendChild(Details_Model);
    Details_textContainer.appendChild(Details_price);
    Details_textContainer.appendChild(Details_mileage);
    Details_textContainer.appendChild(Details_yearOfManufacture);
    Details_textContainer.appendChild(Details_fuelType);
    Details_textContainer.appendChild(Details_transmission);


    Details_ContainerDiv.appendChild(Details_ContainerCloseButton);
    Details_ContainerDiv.appendChild(Details_ImageContainer);
    Details_ContainerDiv.appendChild(Details_textContainer);
    Details_WrapperDiv.appendChild(Details_ContainerDiv);

    document.getElementById("modal").appendChild(Details_WrapperDiv);
};

GetVehicleList();


function triggerDetails(e) {
    detailList(e);
};

function closeModal() {
    document.getElementById('modal').children[0].remove();
}