<?php

// set thumbnail dimensions
$thumbnailSize = 100;

$width = $thumbnailSize;
$height = $thumbnailSize;

// load an image
$i = new Imagick("https://github.com/recurser/exif-orientation-examples/blob/master/Portrait_8.jpg?raw=true");

// get the current image dimensions
$geo = $i->getImageGeometry();

// crop the image
if(($geo['width']/$width) < ($geo['height']/$height))
{
    $i->cropImage($geo['width'], floor($height*$geo['width']/$width), 0, (($geo['height']-($height*$geo['width']/$width))/2));
}
else
{
    $i->cropImage(ceil($width*$geo['height']/$height), $geo['height'], (($geo['width']-($width*$geo['height']/$height))/2), 0);
}

// scale image to thumbnail size
$i->ThumbnailImage($width,$height,true);

// apply appropriate transform for image orientation
$imagick_orientation = $i->getImageOrientation();
    
switch($imagick_orientation)
{
    case '2':
    // horizontal flip
    $i->flopImage();
    break;

    case '3':
    $i->rotateImage(new ImagickPixel(), 180);
    break;

    case '4':
    $i->flopImage();
    $i->rotateImage(new ImagickPixel(), 180);
    break;

    case '5':
    $i->flopImage();
    $i->rotateImage(new ImagickPixel(), 270);
    break;

    case '6':
    $i->rotateImage(new ImagickPixel(), 90);
    break;

    case '7':
    $i->flopImage();
    $i->rotateImage(new ImagickPixel(), 90);
    break;

    case '8':
    $i->rotateImage(new ImagickPixel(), 270);
    break;
}

// make PUT request to thumbnail_upload_url using $i

?>
