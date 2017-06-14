import debounce from './utilities/debounce';

let app = {

    start: function(){
        console.log('app started');

        window.addEventListener('resize', debounce(() => {
            console.log('resize');
        }, 250));

    }


};

export default app;