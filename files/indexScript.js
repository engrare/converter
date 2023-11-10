var window_height, window_width;
//var ismenuopen = false;
//var is_mobile_phone = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) ? true : false;


$( document ).ready(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	setTimeout(function() { beReadyPage();}, 1000);

const upload = document.getElementById('myFile');
const qualityInput = document.getElementById('quality');

upload.addEventListener('change', async (evt) => {
  const file = evt.target.files[0];
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    quality: qualityInput.value / 100
  };
  
  try {
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);
    reader.onloadend = function () {
      theFile = reader.result;
      downloadJpg();
    }
  } catch (error) {
    console.log(error);
  }
})
	
	qualityInput.addEventListener('input', function() {
  document.getElementById('qualityValue').textContent = this.value;
});
});


$(document).keydown(function(e){
	//e.preventDefault();
	
	//alert(e.keyCode);
	
	//if(e.keyCode == 13)
});




$(window).scroll(function(event){
	
	
	
	
});


function beReadyPage () {
	window_height = parseInt($( window ).height());
	window_width = parseInt($( window ).width());
}




$( window ).resize(function() {
	beReadyPage();
	setTimeout(function() { beReadyPage();}, 100);
	return;
});

/*function downloadFile() {
	var conceptName = $('#extensionselect').find(":selected").text();
	$(".info_text").text("File converting to " + conceptName).fadeIn(500);
}*/

let theFile;

function convertToJpg() {
    return new Promise((resolve, reject) => {
        const fileInput = document.getElementById('myFile');
        const file = fileInput.files[0];
        if (!file) reject();

        loadImage.parseMetaData(file, function(data) {
            let options = {};
            if (data.exif) {
                options.orientation = data.exif.get('Orientation');
            }

            loadImage(
                file,
                function(img) {
                    createCanvasFromImage(img);
                    resolve();
                },
                options
            );
        });
    });
}

function createCanvasFromImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var conceptName = $('#extensionselect').find(":selected").text();
    let conceptNamecutted = conceptName.slice(1);
    let quality = document.getElementById('quality').value / 100;
	console.log(quality);
    theFile = canvas.toDataURL('image/' + conceptNamecutted, quality);

    if (!(canvas instanceof HTMLCanvasElement)) {
        console.error('Conversion to canvas failed. Unable to convert image.');
        return;
    }
}

function downloadJpg() {
    if (!theFile) return;
    const link = document.createElement('a');
    var conceptName = $('#extensionselect').find(":selected").text();
    $(".info_text").text("File converting to " + conceptName).fadeIn(500);
    link.download = 'output' + conceptName;
    link.href = theFile;
    link.click();
}

function convertAndDownload() {
    convertToJpg().then(downloadJpg);
}

function downloadJpg() {
	convertToJpg();
    if (!theFile) return;
    const link = document.createElement('a');
    var conceptName = $('#extensionselect').find(":selected").text();
    $(".info_text").text("File converting to " + conceptName).fadeIn(500);
    link.download = 'output' + conceptName;
    link.href = theFile;
    link.click();
}