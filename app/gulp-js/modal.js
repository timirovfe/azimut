let getScrollbarWidth = function () {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
}

document.addEventListener('DOMContentLoaded', function(){

    (function() {

        let Modal = function(el, options) {
            let self = this;

            this.el = document.querySelector(el);
            this.options = options;

            try {
                var list = document.querySelectorAll('#'+this.el.id+' [data-dismiss="modal"]');
                for (let x = 0; x < list.length; x++){
                    list[x].addEventListener('click', function(e){
                        if(e) e.preventDefault();
                        self.hide();
                    });
                }
            }
            catch(e){
                console.log(e);
            }
        };

        Modal.prototype.show = function() {
            let self = this;
            if (self.options.backdrop) {
                let backdrop = document.getElementById('bs.backdrop');
                if (backdrop === null) {
                    backdrop = document.createElement('div');
                    backdrop.id = "bs.backdrop";
                    backdrop.className = "modal-backdrop";
                    document.body.appendChild(backdrop);

                }
                fadeIn(backdrop);
            }
            fadeIn(this.el);
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
            document.getElementById('header').style.paddingRight = getScrollbarWidth() + 'px';
            document.body.classList.add('modal-open');
        };

        Modal.prototype.hide = function() {
            let self = this;
            fadeOut(this.el);
            document.body.style = '';
            document.getElementById('header').style = '';
            document.body.classList.remove('modal-open');

            // removing backdrop
            if (self.options.backdrop) {
                let backdrop = document.getElementById('bs.backdrop');
                if (backdrop !== null) {
                    fadeOut(backdrop);
                }
            }
        };

        let modalShowLinks = document.querySelectorAll('[data-toggle="modal"]');
        for (let i = 0; i < modalShowLinks.length; i++) {
            let modalId = modalShowLinks[i].getAttribute('href');
            let modalElement = new Modal(modalId, {
                backdrop: true
            });
            modalShowLinks[i].addEventListener('click', function(e) {
                e.preventDefault();
                modalElement.show();
            });
        }

    })();

});