/* eslint-disable react/prop-types */
import { uploadToCloudinary } from '@/utils/uploadImg';
import { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';

const formats = [
    'header',
    'font',
    'size',
    'color',
    'align',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const ReactQuillCustom = props => {
    const { value, onChange } = props;
    const reactQuillRef = useRef();

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await uploadToCloudinary(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    console.log(range);
                    range &&
                        quill
                            .getEditor()
                            .insertEmbed(range.index, 'image', url);
                    quill
                        .getEditor()
                        .root.querySelectorAll('img')
                        .forEach(img => {
                            img.setAttribute('class', 'quill-image');
                        });
                }
            }
        };
    }, []);
    return (
        <ReactQuill
            ref={reactQuillRef}
            className='quill-image'
            theme='snow'
            value={value}
            onChange={onChange}
            modules={{
                toolbar: {
                    container: [
                        [
                            {
                                header: [1, 2, 3, 4, 5, 6, false],
                            },
                        ],
                        [{ font: [] }],
                        [{ size: [] }],
                        [{ color: [] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ align: [] }],
                        [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { indent: '-1' },
                            { indent: '+1' },
                        ],
                        ['link', 'image'],
                    ],
                    handlers: {
                        image: imageHandler,
                    },
                },
            }}
            formats={formats}
        />
    );
};

export default ReactQuillCustom;
