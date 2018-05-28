import DecoupledEditor from '@ckeditor/ckeditor5-build-classic';


export default DecoupledEditor
.create( document.querySelector( '#MoTa' ),{

        image: {
            toolbar: [
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative'
            ]
        },
        allowedContent: {
            img: {
                attributes: [ 'src', 'alt', 'width', 'height' ],
                classes: { tip: true }
            },
            // $<n> is a rule name - it does not match element names.
            // These rules will allow <h1> and <h2> elements with all their data-* attributes.
            '$1': {
                elements: { h1: true, h2: true},
                attributes: 'data-*'
            }
         
        }
    }
)
