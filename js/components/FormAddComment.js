class FormAddComment {
    constructor(mountPlace) {
        this.className = 'form-add-comment';
        this.editor = null;
        this.mountPlace = mountPlace;
    }
    
    getThisEl() {
        return document.querySelector('.row.' + this.className);
    }
    
    place() {
        let el = document.createElement('div');
        el.className = 'row ' + this.className;
        el.innerHTML = 
            '<div class="col-lg-10 offset-lg-1 col-md-10 offset-md-1">'+
                '<div class="wrapper tile">'+
                    '<div class="form-text">'+
                        '<span class="title">Text</span>'+
                        '<textarea placeholder="My comment is ..." required rows="5"></textarea>'+
                    '</div>'+
                    '<div class="utility">'+
                        '<button class="btn btn-success" type="submit">Submit</button>'+
                        '<button class="btn btn-danger" type="button">Cancel</button>'+
                    '</div>'+
                '</div>'+
            '</div>';
        document.querySelector(this.mountPlace).appendChild(el);
        
    /*ClassicEditor
        .create( document.querySelector( '#commentBody' ), {
                language: detectLang(),
                removePlugins: [ 'ImageUpload' ],
            } )
        .then( editor => {
            ckeditor = editor;
            
            let but = document.createElement('button');
            but.className = "ck ck-button ck-enabled ck-off attach-image";
            but.innerHTML = '<svg class="ck ck-icon ck-button__icon" viewBox="0 0 20 20"><path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z" fill="#000" fill-rule="nonzero"></path></svg><span class="ck ck-tooltip ck-tooltip_s"><span class="ck ck-tooltip__text">Attach image via GolosImages</span></span><span class="ck ck-button__label">Attach image</span>';
            but.id = "upload";
            but.type = "button";
            document.querySelector('div.ck.ck-toolbar').appendChild(but);
            addEventForBtnUploadImg();
        } )
        .catch( err => {
            console.error( err.stack );
        } );
    
    addEventsForComDone(fbId);
    clearJsonMetadata();*/
    }
    
    remove() {
        this.getThisEl().remove();
    }
    
}