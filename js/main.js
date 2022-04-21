// Get Color Option From Local Storage
let colorOption = window.localStorage.getItem('colorOption');

// Get RandomBackground Option From Local Storage
let randomizeBackground = window.localStorage.getItem('backgroundOption');

// Check If Ther's Color Option In Local Storage
if (colorOption) {
       // Set Root Style For Color From Local Storage
       document.documentElement.style.setProperty('--main-color', colorOption);
}

// Set Background Accept
let backgroundAccept = true;

// Check If Ther's Random Background Option In Local Storage
if (randomizeBackground) {
       if (randomizeBackground === 'yes') {
              backgroundAccept = true;
       } else {
              backgroundAccept = false;
       }
}

// Get Setting Gear
let settingGear = document.querySelector('.setting-icon i');

// Get Setting Box
let settingBox = document.querySelector('.setting-box');

// On Function When Gear Is Clicked
settingGear.onclick = function () {
       // Toggle Class For Setting Gear To Stop Animate
       settingGear.classList.toggle('no-animate');

       // Toggle Class For Setting Box To Show It
       settingBox.classList.toggle('opened');
};

// Stop Propagation For Setting Box
settingBox.onclick = function (e) {
       e.stopPropagation();
};

// Close Setting Box If User Click Any Part Of Screen
document.addEventListener('click', function (e) {
       if (e.target !== settingBox && e.target !== settingGear) {
              if (settingBox.classList.contains('opened')) {
                     settingGear.classList.toggle('no-animate');
                     settingBox.classList.toggle('opened');
              }
       }
});

// Get Colors List
var colorsList = document.querySelectorAll('.colors-list li');

// Check If Ther's Color Option In Local Storage
if (colorOption) {
       // Loop On The Array To Get Every Li
       colorsList.forEach((li) => {
              // Remove Active Class From Every Li
              li.classList.remove('active');

              // Add Active Class To Li Who Exist In Local Storage
              if (li.dataset.color == colorOption) {
                     li.classList.add('active');
              }
       });
}

// Get Span For Background Element
let backgroundSpan = document.querySelectorAll('.random-background span');

// Get Span For Show Bullets Element
let bulletsSpan = document.querySelectorAll('.bullets-box span');

// Get Show Bullets Span Box
let bulletsBox = document.querySelector('.bullets');

// Get RandomBackground Option From Local Storage
let bulletsOption = window.localStorage.getItem('bullets-option');

if (bulletsOption) {
       if (bulletsOption === 'block') {
              bulletsBox.style.display = 'block';
       } else {
              bulletsBox.style.display = 'none';
       }
       // Loop On All Span To Set Active Class From Local Storage Value
       bulletsSpan.forEach((span) => {
              span.classList.remove('active');
              if (span.dataset.show == bulletsOption) {
                     span.classList.add('active');
              }
       });
}

// Check If Ther's Random Background Option In Local Storage
if (randomizeBackground) {
       backgroundSpan.forEach((e) => {
              e.classList.remove('active');
              if (e.dataset.background === randomizeBackground) {
                     e.classList.add('active');
              }
       });
}

// Loop On The Array To Get Ever Li
colorsList.forEach((li) => {
       li.addEventListener('click', () => {
              // Call handle Active Function
              handleActive(colorsList, li);

              // Set Root Style For Color
              document.documentElement.style.setProperty(
                     '--main-color',
                     li.dataset.color
              );

              // Set Color Property In The Local Storage
              window.localStorage.setItem('colorOption', li.dataset.color);
       });
});

// Set Variable To Store Interval In It
let randomBackground;

// Loop On Span To Add And Remove Active Class
backgroundSpan.forEach((e) => {
       // Add Click Listener To All Spans
       e.addEventListener('click', () => {
              // Call handle Active Function

              handleActive(backgroundSpan, e);
              window.localStorage.setItem(
                     'backgroundOption',
                     e.dataset.background
              );
              if (e.dataset.background === 'yes') {
                     backgroundAccept = true;
                     backgroundRandomize();
              } else {
                     clearInterval(randomBackground);
              }
       });
});

// Loop On All Show Bullets Span
bulletsSpan.forEach((span) => {
       span.addEventListener('click', () => {
              handleActive(bulletsSpan, span);
              window.localStorage.setItem('bullets-option', span.dataset.show);
              if (span.dataset.show === 'block') {
                     bulletsBox.style.display = 'block';
              } else {
                     bulletsBox.style.display = 'none';
              }
       });
});

// Set Function To Hide Setting Box On Press Escape Key
document.onkeydown = function (e) {
       if (e.key == 'Escape') {
              if (settingBox.classList.contains('opened')) {
                     settingBox.classList.remove('opened');
                     settingGear.classList.remove('no-animate');
              }
       }
};

// Set Mobile Bar Variable
let mobileBar = document.querySelector('.mobile-bar');

// Set Navbars Button
let navBar = document.querySelector('.nav-bars');

// Open Bar For Mobile Screen
navBar.onclick = function () {
       mobileBar.classList.add('opened');
};

// Close Bar For Mobile Screen
document.querySelector('.close').onclick = function () {
       mobileBar.classList.remove('opened');
};

// Close Navbar If User Click Any Part Of Screen
document.addEventListener('click', function (e) {
       if (e.target !== mobileBar && e.target !== navBar) {
              if (mobileBar.classList.contains('opened')) {
                     mobileBar.classList.remove('opened');
              }
       }
});

// Get Bullets
let bullets = document.querySelectorAll('.bullets .bullet');

// Loop On All Bullets
bullets.forEach((bullet) => {
       bullet.addEventListener('click', () => {
              document.querySelector(bullet.dataset.section).scrollIntoView({
                     behavior: 'smooth',
              });
       });
});

// Get Landing Page Element
let landingPage = document.querySelector('.landing');

// Set Array To Iamges Background
let imgsArray = [
       'background1.jpg',
       'background2.jpg',
       'background3.jpg',
       'background4.jpg',
       'background5.jpg',
       'background6.jpg',
];

// Set Interval To Get Random Background
function backgroundRandomize() {
       if (backgroundAccept) {
              randomBackground = setInterval(() => {
                     let random = Math.floor(Math.random() * imgsArray.length);
                     landingPage.style.backgroundImage = `url('images/${imgsArray[random]}')`;
              }, 10000);
       }
}
backgroundRandomize();

// Get Our Skills Section
let ourSkills = document.querySelector('.skills');

// Check If Scrolling Get Our Skills Section
window.onscroll = function () {
       if (scrollY >= ourSkills.offsetTop - 200) {
              let skills = document.querySelectorAll('.skill-progress span');
              skills.forEach((skill) => {
                     skill.style.width = skill.dataset.progress;
              });
       }
};

// Get Gallery Div
let gallery = document.querySelectorAll('.gallery .box img');

// Loop On Gallery Childs
gallery.forEach((img) => {
       img.addEventListener('click', () => {
              // Create Overlay Div Container
              let overlay = document.createElement('div');

              // Add Class Name To The Overlay
              overlay.className = 'pop-overlay';

              // Check If There's Alt To Image
              if (img.alt) {
                     // Create Heading
                     let heading = document.createElement('h2');

                     // Create Text Node From Image Alt
                     let headingText = document.createTextNode(img.alt);

                     // Append Heading Text To Heading Parent
                     heading.appendChild(headingText);

                     // Append Heading To Overlay
                     overlay.appendChild(heading);
              }

              // Create Poup Box
              let popupBox = document.createElement('div');

              // Add Class Name To Popup Box
              popupBox.className = 'popup-box';

              // Create Image To Poup
              let popupImage = document.createElement('img');

              // Add Source For Poup Image
              popupImage.src = img.src;

              // Create Close Button
              let closeButton = document.createElement('span');

              // Create Close Button Text
              let closeButtonText = document.createTextNode('X');

              // Append Close Button Text To Close Button
              closeButton.appendChild(closeButtonText);

              // Add Class Name To Close Button
              closeButton.className = 'close-button';

              // Append Close Button To Overlay
              overlay.appendChild(closeButton);

              // Add Poup Image To Poup Box
              popupBox.appendChild(popupImage);

              // Add Poup Box To Poup Overlay
              overlay.appendChild(popupBox);

              // Add Overlay To Body
              document.body.appendChild(overlay);
       });
});

// Add Event Listener "Click" To All Items In Document
document.addEventListener('click', function (e) {
       // Check If Item Who User Click In It Is Close Button Or No
       if (e.target.className == 'close-button') {
              // Remove Popup From Body
              e.target.parentElement.remove();
       }
});

// Handle Active Function
function handleActive(pare, ele) {
       // Repeat loop On The Elements To Remove Active Class From All Childrens
       pare.forEach((e) => {
              e.classList.remove('active');
       });

       // Set Active Class On The Current Element
       ele.classList.add('active');
}

document.querySelector('.reset-option').onclick = function () {
       window.localStorage.clear();
       window.location.reload();
};
