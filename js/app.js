//app.js - additional unique scripts for full version - extension for api.js - deploy AFTER api.js

golos.config.set('websocket', 'wss://ws.testnet.golos.io');
golos.config.set('address_prefix', 'GLS');
golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
initLang('en');
hljs.initHighlightingOnLoad();

document.querySelector('.' + prefix + 'btn-add-fb').addEventListener('click', function() {
    openAddFbForm();
});

document.onreadystatechange = function () { 
	console.log('<f> doc ready');
	initVFX();
    document.getElementById('integration').addEventListener('click', function(e) {
        swal({
            title: document.querySelectorAll('.translate-phrases li')[16].innerHTML,
            html: document.getElementById('integration-html').innerHTML,
            type: 'info',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-lg',
            confirmButtonText: '<span class="icon-checkmark"></span> Cool!',
            position: 'top',
            showCloseButton: true
        })
    });
}

//document.getElementById('golos-urls').onclick = getUrls;


document.getElementById('aboutGolosFeedbackCallBtn').addEventListener('click', () => {
        swal({
            title: document.getElementById('about-html-title').innerHTML,
            html: document.getElementById('about-html').innerHTML,
            type: 'info',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-lg',
            confirmButtonText: document.getElementById('button-cool').innerHTML,
            position: 'top',
            showCloseButton: true
        });
    }, false);

document.getElementById('support').addEventListener('click', () => {
    swal({
        html: document.getElementById('support-body').innerHTML,
        showCloseButton: true,
        width: 600,
        type: 'question'
    })
});

/*script for loading VFX*/
var initVFX = function() {
    if (document.readyState === "complete") {
		document.querySelector('.lding').style.display = 'none';
	}
}