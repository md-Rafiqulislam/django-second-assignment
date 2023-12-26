import { createTag, appendElement, callById, setId, apiCall, secondToTime } from './functions.js';

const startApi = 'https://openapi.programming-hero.com/api/videos/categories';


const allId = [];
const allButton = [];



const parentDivNav =callById('category-nav');
const allDetailsDataContainer = callById('all-details-data');




const startData = apiCall(startApi);
startData.then(data => {
    const allData = data.data;
    allData.map(singleData => {
        // console.log(singleData);
        const buttonId = singleData.category_id;
        allId.push(buttonId);
        const button = createTag('button');
        allButton.push(button);
        // console.log(button);
        button.classList.add('text-white', 'btn', 'bg-danger', 'ps-4', 'pe-4', 'me-2', 'pt-1', 'pb-1');
        button.innerText = singleData.category;
        setId(button,buttonId);
        const detailsDataUrl = `https://openapi.programming-hero.com/api/videos/category/${buttonId}`;

        // new section
        // allDetailsDataContainer.innerHTML = ''; // ------------------------------
        button.onclick = function () {
            const allCategoryData = apiCall(detailsDataUrl);
            allCategoryData.then(allDetailsData => {
            const allDataArray = allDetailsData.data;

            if (allDataArray.length === 0){
                const div = createTag('div');
                div.innerHTML = `
                    <img src='../images/Icon.png' class="img-fluid"/>
                    <h1>Opps!! Sorry, There is no content here</h1>
                `;
                div.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'mt-5', 'mb-5');
                appendElement(allDetailsDataContainer, div);
            }
            else {
                allDataArray.map(singleDataDetails => {

                    const postTimeSeconds = singleDataDetails.others.posted_date;
                    const verified = singleDataDetails.authors[0].verified;
                    const postTime = secondToTime(postTimeSeconds);

                    const div = createTag('div');
                    div.innerHTML = `
                        <div class="row m-2">
                            <div class="col-12 position-relative">
                                <img src=${singleDataDetails.thumbnail} class="img-fluid rounded" />
                                <p class="position-absolute post-time">${postTime}</p>
                            </div>
                            <div class="col-12">
                                <div class="row d-flex flex-row justify-content-start mt-2">
                                    <div class="col me-3">
                                        <img src=${singleDataDetails.authors[0].profile_picture} class="img-fluid profile-pic" />

                                        ${verified ? '<img src="../images/tik.jpg" class="tik"/>' : ''}
                                        
                                    </div>
                                    <div class="col">
                                        <h1 class="fs-6">${singleDataDetails.authors[0].profile_name}</h1>
                                        <p class="text-info bg-danger rounded">${singleDataDetails.others.views}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    div.classList.add('col-sm-12', 'col-md-3', 'border-success', 'border', 'rounded');
                    appendElement(allDetailsDataContainer, div);
                });
            }
            });
            allDetailsDataContainer.innerHTML = ''; // -----------------------------------
        };
        // new section end

        appendElement(parentDivNav, button);
    });
});


