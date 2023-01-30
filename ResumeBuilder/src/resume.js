let id = 0;
let tempData = await getData();

const profileElement = document.querySelector(".profile");
const contactElement = document.querySelector("#contact");
const educationElem = document.querySelector("#education");
const hobbiesElem = document.querySelector("#hobbies");
const expElem = document.querySelector("#experience");
const skillsElem = document.querySelector("#skills");
const projectElem = document.querySelector("#projects");
const internElem = document.querySelector("#intern");
const achieveElem = document.querySelector("#achievements");
const appNameElem = document.querySelector(".applicant_name");
const appliedElem = document.querySelector(".appliedFor");

const nextButtonElem = document.getElementById('next');
const prevButtonElem = document.getElementById('prev');
const searchElem = document.getElementById('search');
const container = document.getElementById('container');
const errormsg = document.getElementById('errormsg');
const appDetailsElem = document.getElementById('app-details');

const phoneSpan = '<span class="icon"><i = class"fa fa-phone" aria-hidden="true"></i></span>';
const mailSpan = '<span class="icon"><i = class"fa fa-envelope-o" aria-hidden="true"></i></span>';
const addressSpan = '<span class="icon"><i = class"fa fa-map-marker" aria-hidden="true"></i></span>';
const networkSpan = '<span class="icon"><i = class"fa fa-linkedin" aria-hidden="true"></i></span>';

const imgContainer = '<div class="imgBx"><img src="/res/icons/user.png"alt="UserProfile"/></div>';
const appliedFor ='Applied For: ';
const persHeader ='<h3 class="title">Personal Information</h3>';
const eduHeader ='<h3 class="title">Education</h3>';
const hobbiesHeader ='<h3 class="title">Hobbies</h3>';
const expHeader ='<h3 class="title">Experience</h3>';
const skillsHeader ='<h2 class="title2">Technical Skills</h2>';
const projHeader ='<h2 class="title2">Projects</h2>';
const internHeader ='<h2 class="title2">Interships</h2>';
const achieveHeader ='<h2 class="title2">Achievemnts</h2>';

async function getData(){
    let response ;
    await fetch ('/res/Data.json')
    .then((response) => response.json())
    .then((jsonResponse)=> {
        response = jsonResponse.resume;
        
    });
    return response;
}


function getProfile( id, resumeList){
    return `${imgContainer}
    <h2>${resumeList[id].basics.name}<br><span>${resumeList[id].basics.AppliedFor}</span></h2>`;
}

function getContact( id, resumeList ) {
    return `${persHeader}
    <ul>
        <li>
            ${phoneSpan}
            <span class="text">${resumeList[id].basics.phone}</span>
        </li>
        <li>
            ${mailSpan}
            <span class="text">${resumeList[id].basics.email}</span>
        </li>
        <li>
            ${addressSpan}
            <span class="text">${resumeList[id].basics.location.address}, ${resumeList[id].basics.location.city}, ${resumeList[id].basics.location.state} - ${resumeList[id].basics.location.postalCode}</span>
        </li>
        <li>
            ${networkSpan}
            <span class="text">${resumeList[id].basics.profiles.url}</span>
        </li>
    </ul>`;
}

function renderEducation( id, resumeList ) {
    return `<li>
    <h5>${resumeList[id].education.UG.StartDate} to ${resumeList[id].education.UG.EndDate}</h5>
    <h4>${resumeList[id].education.UG.course}</h4>
    <h4>${resumeList[id].education.UG.institute}</h4>
    <h6>CGPA: ${resumeList[id].education.UG.cgpa}</h6>
    </li>
    <li>
    <h4>${resumeList[id].education.SeniorSecondary.institute}</h4>
    <h6>CGPA: ${resumeList[id].education.SeniorSecondary.cgpa}</h6>
    </li>
    <li>
    <h4>${resumeList[id].education.HighSchool.institute}</h4>
    <h6>CGPA: ${resumeList[id].education.HighSchool.cgpa}</h6>
    </li>`;
}

function getEducation( id, resumeList ) {
    let education = renderEducation( id, resumeList );
    return `${eduHeader}
    <ul>
    ${education}
    </ul>`;
}

function skillPercent(level) {
    var percent = 20;
    switch (level) {
        case "Master":
            percent = 95;
            break;
        case "intermediate":
            percent = 50;
            break;
        case "beginner":
            percent = 30;
            break;
        default:
            percent = 25;
            break;
    }

    return percent;
}

function renderSkills( id , resumeList) {
    let keywords = resumeList[id].skills.keywords;
    var percent = skillPercent(resumeList[id].skills.level);
    var lang = ``;
    for (let i = 0; i < keywords.length; i++){
        lang += `<div class="box">
        <h4>${keywords[i]}</h4>
        <div class="percent">
        <div style="width: ${percent}%;"></div>
        </div>
        </div>`;
    }
    return lang;
}

function getSkills( id, resumeList ) {
    return `${skillsHeader}${renderSkills( id, resumeList )}`;
}

function renderHobbies( id, resumeList ) {
    let hobbies = resumeList[id].interests.hobbies;
    var lang = ``;
    for (let i = 0; i < hobbies.length; i++){
        lang += `<li>
        <span class="text">${hobbies[i]}</span>
        </li>`;
    }
    return lang;
}

function getHobbies( id, resumeList ) {
    return `${hobbiesHeader}
    <ul>
    ${renderHobbies( id, resumeList )}
    </ul>`;
}

function getExperience( id, resumeList ) {
    return `${expHeader}
    <div class="box">
        <div class="year_company">
            <h5>${resumeList[id].work.StartDate} to ${resumeList[id].work.EndDate}</h5>
            <h5>${resumeList[id].work.CompanyName}</h5>
        </div>
        <div class="role_summary">
            <h4>${resumeList[id].work.Position}</h4>
            <p>${resumeList[id].work.Summary}</p>
        </div>
    </div>`;
}

// function to render projects element
function getProjects( id, resumeList ) {
    return `${projHeader}
    <h4>${resumeList[id].projects.name}</h4>
    <p>${resumeList[id].projects.description}</p>`;
}

// function to render internship element
function getIntern( id, resumeList ) {
    return `${internHeader}
    <div class="box">
        <div class="year_company">
            <h5>${resumeList[id].Internship.StartDate} to ${resumeList[id].Internship.EndDate}</h5>
            <h5>${resumeList[id].Internship.CompanyName}</h5>
        </div>
        <div class="role_summary">
            <h4>${resumeList[id].Internship.Position}</h4>
            <p>${resumeList[id].Internship.Summary}</p>
        </div>
    </div>`
}

// function to render list of achievement element
function renderAchievements( id, resumeList ) {
    let summary = resumeList[id].achievements.Summary;
    var result = ``;
    for (let i = 0; i < summary.length; i++) {
        result += `<li>${summary[i]}</li>`;
    }
    return result;
}

// function to render achievement element
function getAchievements( id, resumeList ) {
    return `${achieveHeader}
    <ul>
    ${renderAchievements(id, resumeList)}
    </ul>`;
}

// function to get applicant name
function getApplicantName( id, resumeList ) {
    return `${resumeList[id].basics.name}`;
}

// function to get applied job role
function getAppliedFor( id, resumeList ) {
    return `${appliedFor}${resumeList[id].basics.AppliedFor}`;
}


function runApplication (id, resumeList){
    profileElement.innerHTML = getProfile( id, resumeList );
    contactElement.innerHTML = getContact( id, resumeList );
    educationElem.innerHTML = getEducation( id, resumeList );
    hobbiesElem.innerHTML = getHobbies( id, resumeList );
    expElem.innerHTML = getExperience( id, resumeList );
    skillsElem.innerHTML = getSkills( id, resumeList );
    projectElem.innerHTML = getProjects( id, resumeList );
    internElem.innerHTML = getIntern( id, resumeList );
    achieveElem.innerHTML = getAchievements( id, resumeList );
    appNameElem.innerHTML = getApplicantName( id, resumeList );
    appliedElem.innerHTML = getAppliedFor( id, resumeList );

    setupInteractions( id, resumeList);
}

// function to setup previous and next button
function setupInteractions( id, resumeList) {
    if ( id === 0 ) {
        prevButtonElem.style.display = 'none';
    } else {
        prevButtonElem.style.display = 'block';
    }

    if ( id === resumeList.length - 1 ) {
        nextButtonElem.style.display = 'none';
    } else {
        nextButtonElem.style.display = 'block';
    }
}

nextButtonElem.addEventListener('click', async function(){
    if ( searchElem.innerText !== '' ) {
       runApplication(++id, await getData());
    } else {
        console.log(tempData);
        runApplication(++id, tempData);
    }
});

// function to run and display the previous resume data in the weppage
prevButtonElem.addEventListener('click', async function(){
    if ( searchElem.innerText !== '' ) {
        runApplication(--id, await getData());
     } else {
         runApplication(--id, tempData);
     }
});

// screen update delay function
function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

// search box input listener
searchElem.addEventListener( "input", delay( async function( event ) {

    if (searchElem.value === '' ) {
        showNoResult(false);
        runApplication(id, await getData());
    }

    if(event.isComposing) {
        event.preventDefault();
        return;
    }

    // fecthing data from json and assgining to a variable
    let resumeData = await getData();

    // search box main function to read job keyword

    tempData = resumeData.map((item) => { // map function to get data which mathces the search value
        if ( item.basics.AppliedFor.toLowerCase().includes(searchElem.value.toLowerCase()) ) {
            return item;
        }
    }).filter(element => {
        return element !== undefined; // function to filter only the element which as data
    });
    
    if (tempData === undefined || tempData == 0){
        showNoResult(true, true); // show no result msg if no data found.
    }
    runApplication(id, tempData);
    
}, 400));

// function to show no reult element
function showNoResult(bool, hideButtons = false) {
    if (hideButtons) {
        nextButtonElem.style.display = 'none';
        prevButtonElem.style.display = 'none';
    } else {
        nextButtonElem.style.display = 'block';
        prevButtonElem.style.display = 'block';
    }

    if (!bool) {
        container.style.display = 'grid';
        errormsg.style.display = 'none';
        appDetailsElem.style.display = 'block';
    } else {
        container.style.display = 'none';
        errormsg.style.display = 'grid';
        appDetailsElem.style.display = 'none';
    }
}

runApplication(id, await getData());