const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const inputPhoto = document.querySelector('.ad-form__field');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const housePhotoInput = document.querySelector('.ad-form__upload');
const housePhotoPreview = document.querySelector('.ad-form__photo');

const previewUploadedImage = (chooser, preview, isImage) => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    const url = URL.createObjectURL(file);

    if (isImage) {
      preview.src = url;
    } else {
      housePhotoPreview.innerHTML = '';
      const image = document.createElement('img');
      image.src = url;
      image.style.maxWidth = '100%';
      image.style.height = 'auto';
      housePhotoPreview.append(image);
    }
  }
};

const resetPhoto = () => {
  const img = avatarPreview.querySelector('img');
  img.src = DEFAULT_AVATAR;
  housePhotoPreview.innerHTML = '';
};

inputPhoto.addEventListener('change', (evt) => {
  previewUploadedImage(evt.target, avatarPreview.children[0], true);
});

housePhotoInput.addEventListener('change', (evt) => {
  previewUploadedImage(evt.target, housePhotoPreview);
});

export { resetPhoto, avatarPreview, housePhotoPreview };
