import { advertForm } from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const inputPhoto = advertForm.querySelector('.ad-form__field');
const photoPreview = advertForm.querySelector('.ad-form-header__preview');

const housePhotoInput = advertForm.querySelector('.ad-form__upload');
const housePhotoPreview = advertForm.querySelector('.ad-form__photo');

const previewUploadedImage = (chooser, preview, isImage) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const url = URL.createObjectURL(file);

    if (isImage) {
      preview.src = url;
    } else {
      preview.style.backgroundImage = `url(${url})`;
    }
  }
};

inputPhoto.addEventListener('change', (evt) => {
  previewUploadedImage(evt.target, photoPreview.children[0], true);
});

housePhotoInput.addEventListener('change', (evt) => {
  previewUploadedImage(evt.target, housePhotoPreview);
});

export { previewUploadedImage };
