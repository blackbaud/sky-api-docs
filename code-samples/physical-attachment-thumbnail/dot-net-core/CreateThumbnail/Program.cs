using System;
using System.IO;
using ImageMagick;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var image = new MagickImage(@"https://github.com/recurser/exif-orientation-examples/blob/master/Landscape_2.jpg?raw=true"))
            {
                // set default thumbnail to recommended size of 100px by 100px
                var thumbnailSize = 100;
                var resize = new MagickGeometry();
                MagickGeometry crop = null;

                if (image.Height == image.Width)
                {
                    // if aspect ratio is 1:1 just scale down to 100px
                    resize.Width = thumbnailSize;
                }
                else
                {
                    // resize to shorter dimension to 100px and then crop equal amounts off other dimension
                    crop = new MagickGeometry();
                    if (image.Height < image.Width)
                    {
                        resize.Height = thumbnailSize;
                        var resizedWidth = Convert.ToInt32((double)resize.Height / image.Height * image.Width);
                        crop.Width = thumbnailSize;
                        crop.X = (resizedWidth - thumbnailSize) / 2;
                    }
                    if (image.Width < image.Height)
                    {
                        resize.Width = thumbnailSize;
                        var resizedHeight = Convert.ToInt32((double)resize.Width / image.Width * image.Height);
                        crop.Height = thumbnailSize;
                        crop.Y = (resizedHeight - thumbnailSize) / 2;
                    }
                }

                // apply transformations
                image.AdaptiveResize(resize);
                if (crop != null)
                {
                    image.Crop(crop);
                }

                // auto orient using exif data
                image.AutoOrient();

                // make PUT request to thumbnail_upload_url using buffer
            }
        }
    }
}

