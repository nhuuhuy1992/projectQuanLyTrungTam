import 'froala-editor';
import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/code_view.css';
import 'froala-editor/js/plugins/code_view.min.js';
// import 'froala-editor/css/plugins/video.min.css';
// import 'froala-editor/js/plugins/video.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/js/plugins/fullscreen.min.js';
// import 'froala-editor/css/plugins/fullscreen.min.css';

export default $('#MoTa').froalaEditor({
    height: 'auto',
    heightMin: 300,
    codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
    },
    videoAllowedProviders: ['youtube', 'vimeo'],
    enter: $.FroalaEditor.ENTER_BR,
    videoMove: true

});