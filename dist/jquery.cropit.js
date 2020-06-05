/*! cropit - v0.5.1 <https://github.com/scottcheng/cropit> */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?exports.cropit=t(require("jquery")):e.cropit=t(e.jQuery)}(window,(function(e){return function(e){var t={};function i(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(o,s,function(t){return e[t]}.bind(null,s));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(t,i){t.exports=e},function(e,t,i){"use strict";i.r(t);var o=i(0),s=i.n(o);var a=class{constructor(){this.minZoom=this.maxZoom=1}setup({imageSize:e,previewSize:t,exportZoom:i,maxZoom:o,minZoom:s,smallImage:a}){const r=t.width/e.width,n=t.height/e.height;this.minZoom="fit"===s?Math.min(r,n):Math.max(r,n),"allow"===a&&(this.minZoom=Math.min(this.minZoom,1)),this.maxZoom=Math.max(this.minZoom,o/i)}getZoom(e){return this.minZoom&&this.maxZoom?e*(this.maxZoom-this.minZoom)+this.minZoom:null}getSliderPos(e){return this.minZoom&&this.maxZoom?this.minZoom===this.maxZoom?0:(e-this.minZoom)/(this.maxZoom-this.minZoom):null}isZoomable(){return this.minZoom&&this.maxZoom?this.minZoom!==this.maxZoom:null}fixZoom(e){return Math.max(this.minZoom,Math.min(this.maxZoom,e))}};const r="cropit-preview",n="cropit-preview-image-container",h="cropit-preview-image",m="cropit-preview-background-container",l="cropit-preview-background",d="cropit-image-input",g="cropit-image-zoom-input",p="cropit-drag-hovered",c="cropit-image-loading",f="cropit-image-loaded",u="cropit-disabled",w={code:0,message:"Image failed to load."},v={code:1,message:"Image is too small."},b=e=>e.map(e=>e+".cropit").join(" "),z={PREVIEW:b(["mousedown","mouseup","mouseleave","touchstart","touchend","touchcancel","touchleave"]),PREVIEW_MOVE:b(["mousemove","touchmove"]),ZOOM_INPUT:b(["mousemove","touchmove","change"])},Z={elements:[{name:"$preview",description:"The HTML element that displays image preview.",defaultSelector:"."+r},{name:"$fileInput",description:"File input element.",defaultSelector:"input."+d},{name:"$zoomSlider",description:"Range input element that controls image zoom.",defaultSelector:"input."+g}].map(e=>(e.type="jQuery element",e.default=`$imageCropper.find('${e.defaultSelector}')`,e)),values:[{name:"width",type:"number",description:"Width of image preview in pixels. If set, it will override the CSS property.",default:null},{name:"height",type:"number",description:"Height of image preview in pixels. If set, it will override the CSS property.",default:null},{name:"imageBackground",type:"boolean",description:"Whether or not to display the background image beyond the preview area.",default:!1},{name:"imageBackgroundBorderWidth",type:"array or number",description:"Width of background image border in pixels.\n\t\t\t\tThe four array elements specify the width of background image width on the top, right, bottom, left side respectively.\n\t\t\t\tThe background image beyond the width will be hidden.\n\t\t\t\tIf specified as a number, border with uniform width on all sides will be applied.",default:[0,0,0,0]},{name:"exportZoom",type:"number",description:"The ratio between the desired image size to export and the preview size.\n\t\t\t\tFor example, if the preview size is `300px * 200px`, and `exportZoom = 2`, then\n\t\t\t\tthe exported image size will be `600px * 400px`.\n\t\t\t\tThis also affects the maximum zoom level, since the exported image cannot be zoomed to larger than its original size.",default:1},{name:"allowDragNDrop",type:"boolean",description:"When set to true, you can load an image by dragging it from local file browser onto the preview area.",default:!0},{name:"minZoom",type:"string",description:"This options decides the minimal zoom level of the image.\n\t\t\t\tIf set to `'fill'`, the image has to fill the preview area, i.e. both width and height must not go smaller than the preview area.\n\t\t\t\tIf set to `'fit'`, the image can shrink further to fit the preview area, i.e. at least one of its edges must not go smaller than the preview area.",default:"fill"},{name:"maxZoom",type:"number",description:"Determines how big the image can be zoomed. E.g. if set to 1.5, the image can be zoomed to 150% of its original size.",default:1},{name:"initialZoom",type:"string",description:"Determines the zoom when an image is loaded.\n\t\t\t\tWhen set to `'min'`, image is zoomed to the smallest when loaded.\n\t\t\t\tWhen set to `'image'`, image is zoomed to 100% when loaded.",default:"min"},{name:"freeMove",type:"boolean",description:"When set to true, you can freely move the image instead of being bound to the container borders",default:!1},{name:"smallImage",type:"string",description:"When set to `'reject'`, `onImageError` would be called when cropit loads an image that is smaller than the container.\n\t\t\t\tWhen set to `'allow'`, images smaller than the container can be zoomed down to its original size, overiding `minZoom` option.\n\t\t\t\tWhen set to `'stretch'`, the minimum zoom of small images would follow `minZoom` option.",default:"reject"}],callbacks:[{name:"onFileChange",description:"Called when user selects a file in the select file input.",params:[{name:"event",type:"object",description:"File change event object"}]},{name:"onFileReaderError",description:"Called when `FileReader` encounters an error while loading the image file."},{name:"onImageLoading",description:"Called when image starts to be loaded."},{name:"onImageLoaded",description:"Called when image is loaded."},{name:"onImageError",description:"Called when image cannot be loaded.",params:[{name:"error",type:"object",description:"Error object."},{name:"error.code",type:"number",description:"Error code. `0` means generic image loading failure. `1` means image is too small."},{name:"error.message",type:"string",description:"A message explaining the error."}]},{name:"onZoomEnabled",description:"Called when image the zoom slider is enabled."},{name:"onZoomDisabled",description:"Called when image the zoom slider is disabled."},{name:"onZoomChange",description:"Called when zoom changes.",params:[{name:"zoom",type:"number",description:"New zoom."}]},{name:"onOffsetChange",description:"Called when image offset changes.",params:[{name:"offset",type:"object",description:"New offset, with `x` and `y` values."}]}].map(e=>(e.type="function",e))};const x=e=>void 0!==e,y=e=>+(Math.round(100*e)+"e-2");var S=class{constructor(e,t,i){this.$el=s()(t);const o=(e=>{const t={};return e&&Z.elements.forEach(i=>{t[i.name]=e.find(i.defaultSelector)}),Z.values.forEach(e=>{t[e.name]=e.default}),Z.callbacks.forEach(e=>{t[e.name]=()=>{}}),t})(this.$el);this.options=s.a.extend({},o,i),this.init()}init(){this.image=new Image,this.preImage=new Image,this.image.onload=this.onImageLoaded.bind(this),this.preImage.onload=this.onPreImageLoaded.bind(this),this.image.onerror=this.preImage.onerror=()=>{this.onImageError.call(this,w)},this.$preview=this.options.$preview.css("position","relative"),this.$fileInput=this.options.$fileInput.attr({accept:"image/*"}),this.$zoomSlider=this.options.$zoomSlider.attr({min:0,max:1,step:.01}),this.previewSize={width:this.options.width||this.$preview.innerWidth(),height:this.options.height||this.$preview.innerHeight()},this.$image=s()("<img />").addClass(h).attr("alt","").css({transformOrigin:"top left",webkitTransformOrigin:"top left",willChange:"transform"}),this.$imageContainer=s()("<div />").addClass(n).css({position:"absolute",overflow:"hidden",left:0,top:0,width:"100%",height:"100%"}).append(this.$image),this.$preview.append(this.$imageContainer),this.options.imageBackground&&(s.a.isArray(this.options.imageBackgroundBorderWidth)?this.bgBorderWidthArray=this.options.imageBackgroundBorderWidth:this.bgBorderWidthArray=[0,1,2,3].map(()=>this.options.imageBackgroundBorderWidth),this.$bg=s()("<img />").addClass(l).attr("alt","").css({position:"relative",left:this.bgBorderWidthArray[3],top:this.bgBorderWidthArray[0],transformOrigin:"top left",webkitTransformOrigin:"top left",willChange:"transform"}),this.$bgContainer=s()("<div />").addClass(m).css({position:"absolute",zIndex:0,top:-this.bgBorderWidthArray[0],right:-this.bgBorderWidthArray[1],bottom:-this.bgBorderWidthArray[2],left:-this.bgBorderWidthArray[3]}).append(this.$bg),this.bgBorderWidthArray[0]>0&&this.$bgContainer.css("overflow","hidden"),this.$preview.prepend(this.$bgContainer)),this.initialZoom=this.options.initialZoom,this.imageLoaded=!1,this.moveContinue=!1,this.zoomer=new a,this.options.allowDragNDrop&&s.a.event.props.push("dataTransfer"),this.bindListeners(),this.options.imageState&&this.options.imageState.src&&this.loadImage(this.options.imageState.src)}bindListeners(){this.$fileInput.on("change.cropit",this.onFileChange.bind(this)),this.$imageContainer.on(z.PREVIEW,this.onPreviewEvent.bind(this)),this.$zoomSlider.on(z.ZOOM_INPUT,this.onZoomSliderChange.bind(this)),this.options.allowDragNDrop&&(this.$imageContainer.on("dragover.cropit dragleave.cropit",this.onDragOver.bind(this)),this.$imageContainer.on("drop.cropit",this.onDrop.bind(this)))}unbindListeners(){this.$fileInput.off("change.cropit"),this.$imageContainer.off(z.PREVIEW),this.$imageContainer.off("dragover.cropit dragleave.cropit drop.cropit"),this.$zoomSlider.off(z.ZOOM_INPUT)}onFileChange(e){this.options.onFileChange(e),this.$fileInput.get(0).files&&this.loadFile(this.$fileInput.get(0).files[0])}loadFile(e){const t=new FileReader;e&&e.type.match("image")?(t.readAsDataURL(e),t.onload=this.onFileReaderLoaded.bind(this),t.onerror=this.onFileReaderError.bind(this)):e&&this.onFileReaderError()}onFileReaderLoaded(e){this.loadImage(e.target.result)}onFileReaderError(){this.options.onFileReaderError()}onDragOver(e){e.preventDefault(),e.dataTransfer.dropEffect="copy",this.$preview.toggleClass(p,"dragover"===e.type)}onDrop(e){e.preventDefault(),e.stopPropagation();Array.prototype.slice.call(e.dataTransfer.files,0).some(e=>!!e.type.match("image")&&(this.loadFile(e),!0)),this.$preview.removeClass(p)}loadImage(e){if(e)if(this.options.onImageLoading(),this.setImageLoadingClass(),0===e.indexOf("data"))this.preImage.src=e;else{const t=new XMLHttpRequest;t.onload=e=>{e.target.status>=300?this.onImageError.call(this,w):this.loadFile(e.target.response)},t.open("GET",e),t.responseType="blob",t.send()}}onPreImageLoaded(){if(this.shouldRejectImage({imageWidth:this.preImage.width,imageHeight:this.preImage.height,previewSize:this.previewSize,maxZoom:this.options.maxZoom,exportZoom:this.options.exportZoom,smallImage:this.options.smallImage}))return this.onImageError(v),void(this.image.src&&this.setImageLoadedClass());this.image.src=this.preImage.src}onImageLoaded(){this.rotation=0,this.horizontalFlipFactor=1,this.verticalFlipFactor=1,this.setupZoomer(this.options.imageState&&this.options.imageState.zoom||this._initialZoom),this.options.imageState&&this.options.imageState.offset?this.offset=this.options.imageState.offset:this.centerImage(),this.options.imageState={},this.$image.attr("src",this.image.src),this.options.imageBackground&&this.$bg.attr("src",this.image.src),this.setImageLoadedClass(),this.imageLoaded=!0,this.options.onImageLoaded()}onImageError(){this.options.onImageError.apply(this,arguments),this.removeImageLoadingClass()}setImageLoadingClass(){this.$preview.removeClass(f).addClass(c)}setImageLoadedClass(){this.$preview.removeClass(c).addClass(f)}removeImageLoadingClass(){this.$preview.removeClass(c)}getEventPosition(e){if(e.originalEvent&&e.originalEvent.touches&&e.originalEvent.touches[0]&&(e=e.originalEvent.touches[0]),e.clientX&&e.clientY)return{x:e.clientX,y:e.clientY}}onPreviewEvent(e){if(this.imageLoaded)return this.moveContinue=!1,this.$imageContainer.off(z.PREVIEW_MOVE),"mousedown"===e.type||"touchstart"===e.type?(this.origin=this.getEventPosition(e),this.moveContinue=!0,this.$imageContainer.on(z.PREVIEW_MOVE,this.onMove.bind(this))):s()(document.body).focus(),e.stopPropagation(),!1}onMove(e){const t=this.getEventPosition(e);return this.moveContinue&&t&&(this.offset={x:this.offset.x+t.x-this.origin.x,y:this.offset.y+t.y-this.origin.y}),this.origin=t,e.stopPropagation(),!1}set offset(e){e&&x(e.x)&&x(e.y)&&(this._offset=this.fixOffset(e),this.renderImage(),this.options.onOffsetChange(e))}fixOffset(e){if(!this.imageLoaded)return e;const t={x:e.x,y:e.y};return this.options.freeMove||(this.imageWidth*this.zoom>=this.previewSize.width?t.x=Math.min(0,Math.max(t.x,this.previewSize.width-this.imageWidth*this.zoom)):t.x=Math.max(0,Math.min(t.x,this.previewSize.width-this.imageWidth*this.zoom)),this.imageHeight*this.zoom>=this.previewSize.height?t.y=Math.min(0,Math.max(t.y,this.previewSize.height-this.imageHeight*this.zoom)):t.y=Math.max(0,Math.min(t.y,this.previewSize.height-this.imageHeight*this.zoom))),t.x=y(t.x),t.y=y(t.y),t}centerImage(){this.image.width&&this.image.height&&this.zoom&&(this.offset={x:(this.previewSize.width-this.imageWidth*this.zoom)/2,y:(this.previewSize.height-this.imageHeight*this.zoom)/2})}onZoomSliderChange(){if(!this.imageLoaded)return;this.zoomSliderPos=Number(this.$zoomSlider.val());const e=this.zoomer.getZoom(this.zoomSliderPos);e!==this.zoom&&(this.zoom=e)}enableZoomSlider(){this.$zoomSlider.removeAttr("disabled"),this.options.onZoomEnabled()}disableZoomSlider(){this.$zoomSlider.attr("disabled",!0),this.options.onZoomDisabled()}setupZoomer(e){this.zoomer.setup({imageSize:this.imageSize,previewSize:this.previewSize,exportZoom:this.options.exportZoom,maxZoom:this.options.maxZoom,minZoom:this.options.minZoom,smallImage:this.options.smallImage}),this.zoom=x(e)?e:this._zoom,this.isZoomable()?this.enableZoomSlider():this.disableZoomSlider()}set zoom(e){if(e=this.fixZoom(e),this.imageLoaded){const t=this.zoom,i=this.previewSize.width/2-(this.previewSize.width/2-this.offset.x)*e/t,o=this.previewSize.height/2-(this.previewSize.height/2-this.offset.y)*e/t;this._zoom=e,this.offset={x:i,y:o}}else this._zoom=e;this.zoomSliderPos=this.zoomer.getSliderPos(this.zoom),this.$zoomSlider.val(this.zoomSliderPos),this.options.onZoomChange(e)}fixZoom(e){return this.zoomer.fixZoom(e)}isZoomable(){return this.zoomer.isZoomable()}get rotatedOffset(){const e={x:this.offset.x,y:this.offset.y};switch(this.rotation){case 90:e.x+=this.image.height*this.zoom;break;case 180:e.x+=this.image.width*this.zoom,e.y+=this.image.height*this.zoom;break;case 270:e.y+=this.image.width*this.zoom}if(-1===this.horizontalFlipFactor)switch(this.rotation){case 0:e.x+=this.image.width*this.zoom;break;case 90:e.x-=this.image.height*this.zoom;break;case 180:e.x-=this.image.width*this.zoom;break;case 270:e.x+=this.image.height*this.zoom}if(-1===this.verticalFlipFactor)switch(this.rotation){case 0:e.y+=this.image.height*this.zoom;break;case 90:e.y+=this.image.width*this.zoom;break;case 180:e.y-=this.image.height*this.zoom;break;case 270:e.y-=this.image.width*this.zoom}return e}renderImage(){const e=`\n\t\t\ttranslate(${this.rotatedOffset.x}px, ${this.rotatedOffset.y}px)\n\t\t\tscale(${this.zoom*this.horizontalFlipFactor}, ${this.zoom*this.verticalFlipFactor})\n\t\t\trotate(${this.rotation}deg)`;this.$image.css({transform:e,webkitTransform:e}),this.options.imageBackground&&this.$bg.css({transform:e,webkitTransform:e})}set rotation(e){this._rotation=e,this.imageLoaded&&this.setupZoomer()}get rotation(){return this._rotation}rotateCW(){this.shouldRejectImage({imageWidth:this.image.height,imageHeight:this.image.width,previewSize:this.previewSize,maxZoom:this.options.maxZoom,exportZoom:this.options.exportZoom,smallImage:this.options.smallImage})?this.rotation=(this.rotation+180)%360:this.rotation=(this.rotation+90)%360}rotateCCW(){this.shouldRejectImage({imageWidth:this.image.height,imageHeight:this.image.width,previewSize:this.previewSize,maxZoom:this.options.maxZoom,exportZoom:this.options.exportZoom,smallImage:this.options.smallImage})?this.rotation=(this.rotation+180)%360:this.rotation=(this.rotation+270)%360}set horizontalFlipFactor(e){this._horizontalFlipFactor=e,this.imageLoaded&&this.setupZoomer()}get horizontalFlipFactor(){return this._horizontalFlipFactor}flipH(){this.horizontalFlipFactor*=-1}set verticalFlipFactor(e){this._verticalFlipFactor=e,this.imageLoaded&&this.setupZoomer()}get verticalFlipFactor(){return this._verticalFlipFactor}flipV(){this.verticalFlipFactor*=-1}shouldRejectImage({imageWidth:e,imageHeight:t,previewSize:i,maxZoom:o,exportZoom:s,smallImage:a}){return"reject"===a&&(e*o<i.width*s||t*o<i.height*s)}getCroppedImageData(e){if(!this.image.src)return;const t=(e={type:"image/png",quality:.75,originalSize:!1,fillBg:"#fff",...e}).originalSize?1/this.zoom:this.options.exportZoom,i={width:this.zoom*t*this.image.width,height:this.zoom*t*this.image.height},o=s()("<canvas />").attr({width:this.previewSize.width*t,height:this.previewSize.height*t}).get(0),a=o.getContext("2d");return"image/jpeg"===e.type&&(a.fillStyle=e.fillBg,a.fillRect(0,0,o.width,o.height)),a.translate(this.rotatedOffset.x*t,this.rotatedOffset.y*t),a.rotate(this.rotation*Math.PI/180),a.scale(this.horizontalFlipFactor,this.verticalFlipFactor),a.drawImage(this.image,0,0,i.width,i.height),o.toDataURL(e.type,e.quality)}get imageState(){return{src:this.image.src,offset:this.offset,zoom:this.zoom}}get imageSrc(){return this.image.src}set imageSrc(e){this.loadImage(e)}get offset(){return this._offset}get zoom(){return this._zoom}get imageWidth(){return this.rotation%180==0?this.image.width:this.image.height}get imageHeight(){return this.rotation%180==0?this.image.height:this.image.width}get imageSize(){return{width:this.imageWidth,height:this.imageHeight}}get initialZoom(){return this.options.initialZoom}set initialZoom(e){this.options.initialZoom=e,this._initialZoom="min"===e?0:"image"===e?1:0}get exportZoom(){return this.options.exportZoom}set exportZoom(e){this.options.exportZoom=e,this.setupZoomer()}get minZoom(){return this.options.minZoom}set minZoom(e){this.options.minZoom=e,this.setupZoomer()}get maxZoom(){return this.options.maxZoom}set maxZoom(e){this.options.maxZoom=e,this.setupZoomer()}get previewSize(){return this._previewSize}set previewSize(e){!e||e.width<=0||e.height<=0||(this._previewSize={width:e.width,height:e.height},this.$preview.innerWidth(this.previewSize.width).innerHeight(this.previewSize.height),this.imageLoaded&&this.setupZoomer())}disable(){this.unbindListeners(),this.disableZoomSlider(),this.$el.addClass(u)}reenable(){this.bindListeners(),this.enableZoomSlider(),this.$el.removeClass(u)}$(e){return this.$el?this.$el.find(e):null}};const I=(e,t)=>e.each((function(){const e=s.a.data(this,"cropit");e&&t(e)})),C=(e,t,i)=>{const o=e.first().data("cropit");return o&&s.a.isFunction(o[t])?o[t](i):null},$={init(e){return this.each((function(){if(s.a.data(this,"cropit"))return;const t=new S(s.a,this,e);s.a.data(this,"cropit",t)}))},destroy(){return this.each((function(){s.a.removeData(this,"cropit")}))},isZoomable(){return C(this,"isZoomable")},export(e){return C(this,"getCroppedImageData",e)}},F=(e,t)=>I(e,e=>{e[t]()}),E=(e,t,i)=>{if(x(i))return I(e,e=>{e[t]=i});return e.first().data("cropit")[t]};s.a.fn.cropit=function(e){return $[e]?$[e].apply(this,Array.prototype.slice.call(arguments,1)):["imageState","imageSrc","offset","previewSize","imageSize","zoom","initialZoom","exportZoom","minZoom","maxZoom"].includes(e)?E(this,...arguments):["rotateCW","rotateCCW","flipH","flipV","disable","reenable"].includes(e)?F(this,...arguments):$.init.apply(this,arguments)}}])}));