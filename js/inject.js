var ckeditor, moment, bootstrapMin, styleInject, golosJs, sweetAlert, gAuth, gFeedbackApi, gFeedbackWidth, gFeedbackContainer , bootstrapNativeGithub, bootstrapNativeCloudflare, i18next, i18nextBackend, i18nextBrowserLD;


ckeditor = document.createElement('script');
ckeditor.src = 'https://cdn.ckeditor.com/ckeditor5/10.0.0/classic/ckeditor.js';
(document.head || document.documentElement).appendChild(ckeditor);

moment = document.createElement('script');
moment.src = 'https://cdn.jsdelivr.net/npm/moment@2.21.0/min/moment.min.js';
(document.head || document.documentElement).appendChild(moment);

bootstrapMin = document.createElement('link');
bootstrapMin.rel = 'stylesheet';
bootstrapMin.type = 'text/css';
bootstrapMin.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css';
(document.head || document.documentElement).appendChild(bootstrapMin);

bootstrapNativeGithub = document.createElement('script');
bootstrapNativeGithub.src = 'https://thednp.github.io/bootstrap.native/dist/bootstrap-native-v4.min.js';
(document.head || document.documentElement).appendChild(bootstrapNativeGithub);

bootstrapNativeCloudflare = document.createElement('script');
bootstrapNativeCloudflare.src = 'https://cdn.jsdelivr.net/npm/bootstrap.native@2.0.22/dist/bootstrap-native-v4.min.js';
(document.head || document.documentElement).appendChild(bootstrapNativeCloudflare);

bootstrapMin = document.createElement('link');
bootstrapMin.rel = 'stylesheet';
bootstrapMin.type = 'text/css';
bootstrapMin.href = 'https://golosfeedback.com/css/style.css';
(document.head || document.documentElement).appendChild(bootstrapMin);

styleInject = document.createElement('link');
styleInject.rel = 'stylesheet';
styleInject.type = 'text/css';
styleInject.href = 'https://golosfeedback.com/css/styleInject.css';
(document.head || document.documentElement).appendChild(styleInject);

i18next = document.createElement('script');
i18next.src = 'https://cdn.jsdelivr.net/npm/i18next@11.2.3/i18next.min.js';
(document.head || document.documentElement).appendChild(i18next);

i18nextBackend = document.createElement('script');
i18nextBackend.src = 'https://cdn.jsdelivr.net/npm/i18next-xhr-backend@1.5.1/i18nextXHRBackend.min.js';
(document.head || document.documentElement).appendChild(i18nextBackend);

i18nextBrowserLD = document.createElement('script');
i18nextBrowserLD.src = 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@2.2.0/i18nextBrowserLanguageDetector.min.js';
(document.head || document.documentElement).appendChild(i18nextBrowserLD);

golosJs = document.createElement('script');
golosJs.src = 'https://cdn.rawgit.com/epexa/cd0cb942eabe09f1cb4c9143c4c04418/raw/golos.min.js';
(document.head || document.documentElement).appendChild(golosJs);

sweetAlert = document.createElement('script');
sweetAlert.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@7.19.1/dist/sweetalert2.all.min.js';
(document.head || document.documentElement).appendChild(sweetAlert);

gAuth = document.createElement('script');
gAuth.src = 'https://golospolls.com/auth.js';
(document.head || document.documentElement).appendChild(gAuth);

gLang = document.createElement('script');
gLang.src = 'https://golosimages.com/lang.js';
(document.head || document.documentElement).appendChild(gLang);

gApi = document.createElement('script');
gApi.src = 'https://golosfeedback.com/js/api.js';
(document.head || document.documentElement).appendChild(gApi);

window.addEventListener('load', function() {
    
    //TODO сделать параметр z-index чтобы его мог задавать пользователь
    startGolosFeedback(gFeedbackOptions);
});

var startGolosFeedback = function(parameters) {
    setTestnetWebsocket();
    setupModalWindow();
    setupButton(parameters);
    
    addEventsForButton();
    
    /*launch the main building algorythm of injecting GolosFeedback*/
    initGolosFeedback();
    
    // event for btn add feedback
    document.querySelector('.' + prefix + 'btn-add-fb').addEventListener('click', function(){
        openAddFbForm();
    });
}

var setTestnetWebsocket = function() {
    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('address_prefix', 'GLS');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
}
    
var setupModalWindow = function() {
    let block = document.createElement('div');
    block.className = 'modal-window-block';
    block.innerHTML = '<div class="close-button-space"></div><div class="background"><div class="modal-window"><div class="card"><div class="card-header"><img src="https://golosfeedback.com/graphics/logo.png" width="25" height="25" class="d-inline-block align-top" alt=""><a href="https://golosfeedback.com/" target="_blank">GolosFeedback.com</a></div><div class="card-header-right"><button class="btn btn-primary gFbtn-add-fb"><span class="icon-forward"></span> Add feedback</button><button class="btn btn-success" id="golos-urls"><span class="icon-box-add"></span> Get my feedbacks</button></div><div class="card-body text-dark"><div class="gFwrapper"></div></div></div></div></div>';
    document.querySelector('body').appendChild(block);
}

var setupButton = function(parameters) {
    /*creating the button-toggler*/
    let button = document.createElement('button');
    button.className = 'btn btn-primary modal-golos-feedback-toggler';
    button.setAttribute('type','button');
    button.innerHTML = 'Open Golos Feedback';
    applyButtonStyle(button, defineButtonStyle(parameters));
    document.querySelector('body').appendChild(button);  
}
    
var addEventsForButton = function() {
    document.querySelector('.modal-golos-feedback-toggler').addEventListener('click', function() {
        modal.open();   
    });
    document.getElementsByClassName('close-button-space')[0].addEventListener('click', function() {
        modal.close();
    });    
}

var modal = {
    open: function() {
        document.getElementsByClassName('modal-window-block')[0].style.display = 'block';
    },
    close: function() {
        document.getElementsByClassName('modal-window-block')[0].style.display = 'none';
    }
}

var defineButtonStyle = function(parameters) {
    
    /*Default parameters*/
    gFeedbackOptions = new Object();
    gFeedbackOptions.corner = 'right';
    gFeedbackOptions.buttonTextColor = '#fff';
    gFeedbackOptions.buttonBackgroundColor = '#0079a1';
    gFeedbackOptions.buttonShadow = true;
    gFeedbackOptions.zIndex = 3;    
    
    if(parameters != undefined) {
        for (option in gFeedbackOptions) {
            for (par in parameters) {
                if (par == option) {
                    gFeedbackOptions[option] = parameters[par];
                    console.log(option);          
                }
            }
        }
    }
    
    return gFeedbackOptions;      
}

var applyButtonStyle = function(button, gFeedbackOptions) {

    if(gFeedbackOptions.corner == 'right') {
        button.style.right = '3%';
    } else if (gFeedbackOptions.corner == 'left') {
        button.style.left = '3%';
    }
    
    if(gFeedbackOptions.buttonShadow) {
        button.style.boxShadow = '2px 2px 2px rgba(0,0,0,.5)';
    }
    
    button.style.color = gFeedbackOptions.buttonTextColor;
    button.style.backgroundColor = gFeedbackOptions.buttonBackgroundColor;
    
    button.style.zIndex = gFeedbackOptions.zIndex;
    document.querySelector('.modal-window-block .modal-window').style.zIndex = gFeedbackOptions.zIndex + 1;
}